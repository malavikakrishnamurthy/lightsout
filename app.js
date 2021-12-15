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
  // If user wanted to turn off Station 1
  if(document.getElementById("workStation1").checked == false){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:OFF:1");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }

  // If user wanted to turn on Station 1
  else if(document.getElementById("workStation1").checked == true){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:ON:1");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }
}

// This function sends a message to the Raspberry Pi to either turn on or off station 2
function workStation2(button)
{
  // If user wanted to turn off Station 2
  if(document.getElementById("workStation2").checked==false){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:OFF:2");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }

  // If user wanted to turn on Station 2
  else if(document.getElementById("workStation2").checked==true){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:ON:2");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }
}

// This function sends a message to the Raspberry Pi to either turn on or off station 3
function workStation3(button)
{
  // If user wanted to turn off Station 3
  if(document.getElementById("workStation3").checked==false){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:OFF:3");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }

  // If user wanted to turn on Station 3
  else if(document.getElementById("workStation3").checked==true){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:ON:3");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }
}

// This function sends a message to the Raspberry Pi to either turn on or off station 4
function workStation4(button)
{
  // If user wanted to turn off Station 4
  if(document.getElementById("workStation4").checked==false){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:OFF:4");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }

  // If user wanted to turn on Station 4
  else if(document.getElementById("workStation4").checked==true){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:ON:4");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }
}

// This function sends a message to the Raspberry Pi to either turn on or off all lights
function allStations(button)
{
  // If user wanted to turn off all stations
  if(document.getElementById("workStation5").checked==false){
    // Create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:OFF:5");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }

  // If user wanted to turn on all stations
  else if(document.getElementById("workStation5").checked==true){
    // Create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("STATION:ON:5");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }
}

// This function sends a message to the Raspberry Pi to either turn on or off pir sensors
function pirs(button)
{
  // If user wanted to turn off motion sensors
  if(document.getElementById("pirs").checked==false){
    // Create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("PIRS:OFF");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }

  // If user wanted to turn on motion sensors
  else if(document.getElementById("pirs").checked==true){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("PIRS:ON");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }
}

// This function sends a message to the Raspberry Pi to either turn on or off microphones
function mics(button)
{
  // If user wanted to turn off microphones
  if(document.getElementById("mics").checked==false){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("MICS:OFF");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }

  // If user wanted to turn on microphones
  else if(document.getElementById("mics").checked==true){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("MICS:ON");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
  }
}

// This function sends a message to the Raspberry Pi to either turn on or off automatic weighting
function weightControl(button)
{
  // If user wanted to control weights manually
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
    document.getElementById("weightControl").value="Revert to Automatic Weighting";}

  // If user wanted to revert to automatic weighting
  else if(document.getElementById("weightControl").value=="Revert to Automatic Weighting"){
    // create a new MQTT message with a specific payload
    var mqttMessage = new Paho.MQTT.Message("WEIGHT:OFF");
  
    // Set the topic it should be published to
    mqttMessage.destinationName = "pir/data/web";
  
    // Publish the message
    MQTT_CLIENT.send(mqttMessage);
    document.getElementById("weightControl").value="Switch to Manual Weighting";}
}

document.getElementById("weightControl").addEventListener("click", weightControl);

// Update Text Input called on change for slider object on html, updates textArea with current
// value when slider bar changes
function updateTextInput(val) {
  var micWeight = 100 - val
  document.getElementById('textInput').value=val+"% PIRS "+micWeight+"% MICS"; 
  var mqttMessage = new Paho.MQTT.Message("WEIGHT:ON:"+val+":"+micWeight);
  
  // Set the topic it should be published to
  mqttMessage.destinationName = "pir/data/web";
  
  // Publish the message
  MQTT_CLIENT.send(mqttMessage);

  // Update Weight Setting Info
  document.getElementById('textInput').value=val+"% PIRS "+micWeight+"% MICS"; 
}

// This is the function which handles subscribing to topics after a connection is made
function myClientConnected() {
    // Subscribe to whichever topic you are reading from
    MQTT_CLIENT.subscribe("pir/data/baseStation");
    //alert("Connected to Raspberry Pi");
}

// This is the function which handles received messages
function myMessageArrived(message) {
  
  // Parse and case actions on incoming messages
  var messageString = String(message.payloadString);
  const myArray = messageString.split(":");
    
  // Weight Setting Message
  if (myArray[0] == "WEIGHT"){
    //document.getElementById('textInput').value=myArray[1]+"% PIRS "+myArray[2]+"% MICS"; 
    document.getElementById('textInput').value="50% PIRS 50% MICS";
  }

  // Station On/Off Message
  else if (myArray[0] == "STATION"){
    // Station 1
    if (myArray[2] == "1") {
      // Turned On
      if (myArray[1] == "ON"){
        document.getElementById('zone1').style.borderColor = 'yellow';
      }
      // Turned Off
      else {
        document.getElementById('zone1').style.borderColor = 'black';
      }
    }

    // Station 2
    else if (myArray[2] == "2") {
      // Turned On
      if (myArray[1] == "ON"){
        document.getElementById('zone2').style.borderColor = 'yellow';
      }
      // Turned Off
      else {
        document.getElementById('zone2').style.borderColor = 'black';
      }
    }

    // Station 3
    else if (myArray[2] == "3") {
      // Turned On
      if (myArray[1] == "ON"){
        document.getElementById('zone3').style.borderColor = 'yellow';
      }
      // Turned Off
      else {
        document.getElementById('zone3').style.borderColor = 'black';
      }
    }

    // Station 4
    else if (myArray[2] == "4") {
      // Turned On
      if (myArray[1] == "ON"){
        document.getElementById('zone4').style.borderColor = 'yellow';
      }
      // Turned Off
      else {
        document.getElementById('zone4').style.borderColor = 'black';
      }
    }
  }
};
  
  // Tell MQTT_CLIENT to call myMessageArrived(message) each time a new message arrives
  MQTT_CLIENT.onMessageArrived = myMessageArrived;