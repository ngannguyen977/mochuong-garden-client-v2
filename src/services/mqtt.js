import constant from "../config/default"
import Paho from "paho-mqtt"
import helper from "../helper"

export const connect = (username, callback) => {
  let token = "Bearer " + window.localStorage.getItem("app.token")
  let userState = JSON.parse(window.localStorage.getItem("app.userState")) || {}
  let things = JSON.parse(window.localStorage.getItem("app.things")) || []
  let clientId = constant.ws_mqtt.clientId + helper.makeid()

  let client = new Paho.Client(
    constant.ws_mqtt.host,
    constant.ws_mqtt.port,
    constant.ws_mqtt.path,
    clientId,
  )
  let options = {
    onSuccess: onConnect,
    onFailure,
    timeout: constant.ws_mqtt.timeout,
    userName: userState.username,
    password: token,
    keepAliveInterval: constant.ws_mqtt.keepAliveInterval,
    cleanSession: constant.ws_mqtt.cleanSession,
    useSSL: constant.ws_mqtt.ssl,
    reconnect: constant.ws_mqtt.reconnect,
  }
  console.log("connecting websocket...")
  // set callback handlers
  client.onConnectionLost = onConnectionLost
  client.onMessageArrived = onMessageArrived

  // connect the client
  client.connect(options)
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("onConnect")
    for (let thing of things) {
      console.log('subscribe topic ',`things/${thing.serial}/security_calling`,`things/${thing.serial}/safety_calling`)
      client.subscribe(`things/${thing.serial}/security_calling`)
      client.subscribe(`things/${thing.serial}/safety_calling`)
    }
    // let message = new Paho.Message("helo");
    // message.destinationName = "World";
    // client.send(message);
  }

  function onFailure() {
    console.log("connection failed ", arguments[0].errorMessage)
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:" + responseObject.errorMessage)
    }
  }
  // called when a message arrives
  // function onMessageArrived(message) {
  //   let data = { topic: message.topic, payload: message.payloadString }
  //   console.log(message.topic)
  //   callback(data)
  // }
  function onMessageArrived(r_message) {
    let packet = {
      topic: r_message.destinationName,
      payload: r_message.payloadString
    }
    // if (packet.topic == "things/00:96:e3:b4:08:00/tpi_rev1") {
    // if(packet.topic.includes('tpi_rev1_command')){
    //   console.log(packet)
    // }
    console.log("onMessageArrived", packet.topic)
    // }
    // callback(packet)
  }
}

export default {
  connect
}