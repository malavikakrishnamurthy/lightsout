// Generate a new random MQTT client id on each page load
var MQTT_CLIENT_ID = "iot_web_"+Math.floor((1 + Math.random()) * 0x10000000000).toString(16);

// Create a MQTT client instance
// var MQTT_CLIENT = new Paho.MQTT.Client("172.26.161.183", 1883, "/ws", MQTT_CLIENT_ID);
var MQTT_CLIENT = new Paho.MQTT.Client("172.26.161.183", 8883, "/ws", MQTT_CLIENT_ID);
// Tell the client instance to connect to the MQTT broker
MQTT_CLIENT.connect({ onSuccess: myClientConnected });

// This function sends a message to the Raspberry Pi to either turn on or off station 1
function workStation1(button)
{
  if(document.getElementById("workStation1").value=="Turn OFF Station 1"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:OFF:1");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn Off Station 1");
   document.getElementById("workStation1").value="Turn ON Station 1";}

  else if(document.getElementById("workStation1").value=="Turn ON Station 1"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:ON:1");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn On Station 1");
   document.getElementById("workStation1").value="Turn OFF Station 1";}
}

// This function sends a message to the Raspberry Pi to either turn on or off station 2
function workStation2(button)
{
  if(document.getElementById("workStation2").value=="Turn OFF Station 2"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:OFF:2");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn Off Station 2");
   document.getElementById("workStation2").value="Turn ON Station 2";}

  else if(document.getElementById("workStation2").value=="Turn ON Station 2"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:ON:2");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn On Station 2");
   document.getElementById("workStation2").value="Turn OFF Station 2";}
}

// This function sends a message to the Raspberry Pi to either turn on or off station 3
function workStation3(button)
{
  if(document.getElementById("workStation3").value=="Turn OFF Station 3"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:OFF:3");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn Off Station 3");
   document.getElementById("workStation3").value="Turn ON Station 3";}

  else if(document.getElementById("workStation3").value=="Turn ON Station 3"){
    
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:ON:3");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn On Station 3");
   document.getElementById("workStation3").value="Turn OFF Station 3";}
}

// This function sends a message to the Raspberry Pi to either turn on or off station 4
function workStation4(button)
{
  if(document.getElementById("workStation4").value=="Turn OFF Station 4"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:OFF:4");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn Off Station 4");
   document.getElementById("workStation4").value="Turn ON Station 4";}

  else if(document.getElementById("workStation4").value=="Turn ON Station 4"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:ON:4");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn On Station 4");
   document.getElementById("workStation4").value="Turn OFF Station 4";}
}

// This function sends a message to the Raspberry Pi to either turn on or off all lights
function allStations(button)
{
  if(document.getElementById("workStation5").value=="Turn OFF All Stations"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:OFF:5");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn Off All Stations");
   document.getElementById("workStation5").value="Turn ON All Stations";}

  else if(document.getElementById("workStation5").value=="Turn ON All Stations"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:ON:5");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn On All Stations");
   document.getElementById("workStation5").value="Turn OFF All Stations";}
}

// This function sends a message to the Raspberry Pi to either turn on or off pir sensors
function pirs(button)
{
  if(document.getElementById("pirs").value=="Turn OFF Motion Sensors"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("PIRS:OFF");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn Off Motion Sensors");
   document.getElementById("pirs").value="Turn ON Motion Sensors";}

  else if(document.getElementById("pirs").value=="Turn ON Motion Sensors"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("PIRS:ON");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn On Motion Sensors");
   document.getElementById("pirs").value="Turn OFF Motion Sensors";}
}

// This function sends a message to the Raspberry Pi to either turn on or off microphones
function mics(button)
{
  if(document.getElementById("mics").value=="Turn OFF Microphones"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("MICS:OFF");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn Off Microphones");
   document.getElementById("mics").value="Turn ON Microphones";}

  else if(document.getElementById("mics").value=="Turn ON Microphones"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("MICS:ON");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn On Microphones");
   document.getElementById("mics").value="Turn OFF Microphones";}
}

// This function sends a message to the Raspberry Pi to either turn on or off automatic weighting
function weightControl(button)
{
  if(document.getElementById("weightControl").value=="Switch to Manual Weighting"){
    // create a new MQTT message with a specific payload
    PIRweight = document.getElementById("weighting").value;
    MICweight = 100 - PIRweight ;
    var mqttMessage = new Paho.MQTT.Message("WEIGHT:ON:"+PIRweight+":"+MICweight);
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);

    // Update Weight Setting Info
    document.getElementById('textInput').value=PIRweight+"% PIRS "+MICweight+"% MICS"; 
    alert("Published Turn On Manual Weighting");
    document.getElementById("weightControl").value="Revert to Automatic Weighting";}

  else if(document.getElementById("weightControl").value=="Revert to Automatic Weighting"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("WEIGHT:OFF");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    alert("Published Turn On Automatic Weighting");
   document.getElementById("weightControl").value="Switch to Manual Weighting";}
}

function updateTextInput(val) {

  var micWeight = 100 - val

  var mqttMessage = new Paho.MQTT.Message("WEIGHT:ON:"+val+":"+micWeight);
  
  // Set the topic it should be published to
  mqttMessage.destinationName = "pir/data/web";
  
  // Publish the message
  MQTT_CLIENT.send(mqttMessage);
  alert("Published Manual Weighting Setting");

  // Update Weight Setting Info
  document.getElementById('textInput').value=val+"% PIRS "+micWeight+"% MICS"; 
}

// This is the function which handles subscribing to topics after a connection is made
function myClientConnected() {
    alert("In connect function");
    // Subscribe to whichever topic you are reading from
    MQTT_CLIENT.subscribe("pir/data/baseStation");
    alert("Subscribed to topic");
}

// This is the function which handles received messages
function myMessageArrived(message) {

  alert("New message arrived");
  
  
    // Parse and case actions on incoming messages
    var messageString = String(message.payloadString);
    const myArray = messageString.split(":");
    alert(myArray[0]);
    // Weight Setting (edit like in updateTextInputFunction)
    if (myArray[0] == "WEIGHT"){
      alert("New message arrived: WEIGHT")
      document.getElementById('textInput').value=myArray[1]+"% PIRS "+myArray[2]+"% MICS"; 
    }

    // Station On/Off
    

    // Get the payload
    var messageBody = message.payloadString;
  
    // Create a new HTML element wrapping the message payload
    var messageHTML = $("<p>"+messageBody+"</p>");
  
    // Insert it inside the ```id=updateMe``` element above everything else that is there 
    $("#updateMe").prepend(messageHTML);
  };
  
  // Tell MQTT_CLIENT to call myMessageArrived(message) each time a new message arrives
  MQTT_CLIENT.onMessageArrived = myMessageArrived;