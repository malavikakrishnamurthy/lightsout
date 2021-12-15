import threading
import time
import queue
import random
import paho.mqtt.client as mqtt
from datetime import datetime

MQTT_SERVER = "localhost"
MQTT_PATH = "pir/data/#"
MQTT_PUBLISH_PATH_START = "pir/data/connect"
MQTT_PUBLISH_PATH = "pir/data/baseStation"

mac_to_index = dict()
index_to_mac = dict()

#to be modified with testing 
NUM_STATIONS = 3
onThreshold = 2
timeDec = 2
weightMic = 50/100
scoreInc = 2
weightPir = 50/100
maxTimeSinceLastPIR = 15 # sec #gives it another 30 seconds 
upperLimit = 32
lowerLimit = 0

#constant
#types of commands
micId = 0
pirId = 1
forceOn = 2
forceOff = 3
micDataOn = 4
micDataOff = 5
pirDataOn = 6
pirDataOff = 7
weightOn = 8
weightOff = 9

qWeb = queue.Queue()
qClients = queue.Queue()
threads = []
def on_connect(client,userdata,flags,rc):
    print("Connected with result code "+str(rc))
    if rc==0:
        client.connected_flag=True
        client.subscribe(MQTT_PATH)

def on_message(client,userdata,msg):
    device = str(msg.topic).split('/')[2]
    if device == "workstation":
        return
    if device =="baseStation":
        return 
    if device=="web":
        p = str(msg.payload)[2:-1]
        payload = p.split(':')
        print("receive",payload)
        if payload[0]=="STATION":
            commandType = forceOff
            if payload[1]=="ON":
                commandType =forceOn
            if payload[2]=="5":#send to all
                for i in range(NUM_STATIONS):
                   producer([i,commandType])
            else:
                producer([int(payload[2])-1,commandType])
        elif payload[0]=="MICS":
            commandType = micDataOff
            if payload[1]=="ON":
                commandType =micDataOn
            for i in range(NUM_STATIONS):
                producer([i,commandType])
                    
        elif payload[0]=="PIRS":
            commandType = pirDataOff
            if payload[1]=="ON":
                commandType =pirDataOn
            for i in range(NUM_STATIONS):
                producer([i,commandType])
        elif payload[0]=="WEIGHT":
            if payload[1]=="ON":
                for i in range(NUM_STATIONS):
                    producer([i,weightOn,payload[2],payload[3]])
            else:
                status = "WEIGHT:"+str(weightPir)+":"+str(weightMic)
                qWeb.put(status)
                for i in range(NUM_STATIONS):
                    producer([i,weightOff,weightPir,weightMic])
    
        return

    mac = str(msg.topic).split('/')[3]
    sensor_type = str(msg.topic).split('/')[2]
    if mac not in mac_to_index.keys():
        print(mac,len(mac_to_index)+1)
        mac_to_index[mac] = len(mac_to_index)
        index_to_mac[mac_to_index[mac]] = str(mac)
    producer([mac_to_index[mac],sensor_type])

def producer(curmessage):
    workStation = threads
    if curmessage[1]=="m":
        workStation[curmessage[0]].queue.put(micId)
    elif curmessage[1]=="p":
        workStation[curmessage[0]].queue.put(pirId)
    else:
        if len(curmessage)>2:
            workStation[curmessage[0]].queue.put([curmessage[0],curmessage[2],curmessage[3]])
        else:
            workStation[curmessage[0]].queue.put([curmessage[1]])
                
def sendToWeb(client,q,input_queue):
    while True:
        if input_queue.empty():
            pass
        else:
            return
        if q.empty():
            pass
        else:
            msg = q.get() 
            client.publish(MQTT_PUBLISH_PATH,str(msg))
            
def sendToStations(client,q,input_queue):
    client.publish(MQTT_PUBLISH_PATH_START,"H")
    while True:
        if input_queue.empty():
            pass
        else:
            print("closing send To Stations")
            while not q.empty():
                [path,msg] = q.get()
                print(path,msg)
                client.publish(path,str(msg))
            return
        if q.empty():
            pass
        else:
            [path,msg] = q.get()
            client.publish(path,str(msg))

class thread(threading.Thread):
    def __init__(self,iD,qWeb,qClients,args=(), kwargs=None):
        thread = threading.Thread.__init__(self,args=(), kwargs=None)
        self.iD = iD
        self.score = 0
        self.queue = queue.Queue()
        self.daemon = True
        self.stop = False
        self.lock = threading.Lock()
        self.time = time.time()
        self.on = False # if light is on or off
        self.lastPirTime = -1
        self.pirOn = False
        self.forceOn = False
        self.micIgnore = False
        self.pirIgnore = False
        self.queueWeb = qWeb
        self.qClients = qClients
        self.micInc= scoreInc*weightMic
        self.pirInc = scoreInc*weightPir

    def run(self):
        start = time.time()
        while True:
            oldScore = self.score
            if self.stop:
                if (self.iD-1) in index_to_mac:
                    self.qClients.put(["pir/data/workstation/"+index_to_mac[self.iD-1], "0"])
                return
            if self.queue:
                val = self.queue.get()
                with self.lock:
                    self.do_thing_with_message(val)
            #after x amount of time decrement the score
            if not self.forceOn and time.time()-start > 1:
                    if self.pirOn==False and self.score>lowerLimit and (oldScore==self.score and abs(time.time()-self.lastPirTime)<=maxTimeSinceLastPIR):#and self.micOn==False:#for now afer one second decrement the score
                        self.score -=timeDec
                    if self.pirIgnore==False and self.pirOn:
                        if self.score < upperLimit:
                            self.score+=self.pirInc
                    start = time.time()
                
            if self.forceOn ==False and self.score<onThreshold and self.on:
                self.on=False
                status = "STATION:OFF:"+str(self.iD)
                self.queueWeb.put(status)
                #publish back to board
                if (self.iD-1) in index_to_mac:
                    self.qClients.put(["pir/data/workstation/"+index_to_mac[self.iD-1], "0"])
            elif (self.forceOn or self.score>=onThreshold) and self.on==False:
                self.on = True                
                status = "STATION:ON:"+str(self.iD)
                self.queueWeb.put(status)
                #publish back to board
                if (self.iD-1) in index_to_mac:
                    self.qClients.put(["pir/data/workstation/"+index_to_mac[self.iD-1], "1"])

    def do_thing_with_message(self, message):
        if message==None:
            self.stop=True
            return
        else:
            if type(message)==list:
                self.weightPir = scoreInc*int(message[1])/100
                self.weightMic = scoreInc*int(message[2])/100
            else:
                curTime =time.time()
                if self.micIgnore==False and int(message)==micId:
                #only consider mics when pirs are off
                    if self.pirOn==False and self.lastPirTime!=-1 and abs(curTime-self.lastPirTime)<=maxTimeSinceLastPIR:
                        if self.score < upperLimit:
                            self.score+=self.micInc
                        
                elif int(message)==pirId:
                    self.pirOn = not self.pirOn
                    if self.pirOn:
                        self.lastPirTime = curTime 
                        if self.score < upperLimit:
                            self.score+=self.pirInc
                   
                elif int(message)==forceOn:
                    self.forceOn = True
                elif int(message)==forceOff:
                    self.forceOn = False
                elif int(message)==micDataOn:
                    self.micIgnore = False
                elif int(message)==micDataOff:
                    self.micIgnore = True
                    self.micOn = False
                elif int(message)==pirDataOn:
                    self.pirIgnore = False
                elif int(message)==pirDataOff:
                    self.pirIgnore= True
                    self.pirOn = False
                
if __name__ == '__main__':
    #build all the threads (1 thread = 1 workstation)

    for t in range(NUM_STATIONS):
        t1 = thread(t+1,qWeb,qClients,args=())
        threads.append(t1)
        threads[t].start()
        time.sleep(0.1)
    time.sleep(3)
    client = mqtt.Client()
    client.connect(MQTT_SERVER, 1883,60)
    client.on_connect = on_connect
    client.on_message = on_message
    
    client1 = mqtt.Client()
    client1.connect(MQTT_SERVER, 8883,60)
    client1.on_connect = on_connect
    client1.on_message = on_message

    qIn2 = queue.Queue()
    qIn3 = queue.Queue()
    t3 = threading.Thread(target=sendToWeb, args=(client,qWeb,qIn2,))
    t4 = threading.Thread(target=sendToStations, args=(client,qClients,qIn3,))
    t3.start()
    t4.start()
    client.loop_start()
    client1.loop_start()
    #before closing threads
    time.sleep(120) # 2 seconds is the testing time
    for t in threads:
        t.queue.put(None)
    qIn2.put(None)
    qIn3.put(None)
    
    # time.sleep(5)
    client.loop_stop()
    client1.loop_stop()
    #close all threads
    for t in threads:
        t.join()
    t3.join()
    t4.join()
