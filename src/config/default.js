export default {
  google:{
    key:'AIzaSyC3759DMY8J3Ax-pHog-rGl4X_h2aUk-fs'
  },
  api: {
    authen: {
      host: "https://api.onskycloud.com/authen/v1/api",
      // host: "http://system-authen-service.micro:8082/v1/api",
      login: "auth/observe",
      info: "auth/me",
      register: "clients",
      observer: 'clients/observer',
      group: "groups",
      user: "users",
      usersByGroup: "bygroup",
      groupsByUser: "byuser",
      confirmEmail: "customers/activate",
      password: 'password',
      forgot: 'auth/reset-password',
      recovery: 'auth/recovery-password',
      external: 'auth/external'
    },
    policy: {
      // host: 'http://localhost:8080/v1/api',
      host: "https://api.onskycloud.com/policy-service/v1/api",
      token: "iot-frontend-client-token",
      policy: "policies",
      group: "groups",
      user: "users",
    },
    micro: {
      host: "https://lambda-api.onskycloud.com",
      // host: "http://micro-api.lambda",
      iot: "system-micro-iot-srv/IotSvc",
      statistic:"system-micro-statistic-srv/SystemSvc",
      notification:"customer-micro-simple-notification-srv/NotificationSvc",
      getLog: "HistoryByCustomer",
      getLogForThing: "HistoryBySerial",
      sendEmail:"SendObserverEmailAPI"
    },
    iot: {
      host: "https://api.onskycloud.com/iot-service/v1/api",
      // host: "http://system-iot-service.micro:8082/v1/api",
      certificate: "certificates",
      configures: "configures",
      policies: "policies",
      priority: "priorities",
      project: "projects",
      //template
      template: "thing-templates",
      templateProperty: "property-templates",
      alertTemplate: "alert-templates",
      //thing
      thing: "things",
      thingProperty: "thing-properties",
      alertThing: "property-alerts",
    },
    configure: {
      host: "https://api.onskycloud.com/iot-service/v1/api",
      dataType: "configures/data-types",
      alertType: "configures/alert-types",
      priority: "priorities",
      thingType: "configures/thing-types",
      iotAction: "configures/iot-actions",
    },
    upload: {
      host: "https://api.onskycloud.com/storage-service/v1/api/storages",
    },
  },
  customer: {
    number: "1969541697209631746",
  },
  ws_mqtt: {
    host: 'websocket.onskycloud.com',
    port: 443,
    clientId: 'iot-observer-react-client-',
    path: '/ws',
    userName: 'onsky',
    ssl: true,
    mqttVersion: 3,
    timeout: 20,
    keepAliveInterval: 60*6,
    reconnect: true,
    cleanSession: true,
  },
}