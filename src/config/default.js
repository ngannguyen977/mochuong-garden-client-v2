export default {
  api: {
    authen: {
      host: "https://api.onskycloud.com/authen/v1/api",
      login: "auth/client",
      info: "auth/me",
      register: "clients",
      group: "groups",
      user: "users",
      usersByGroup: "bygroup",
      groupsByUser: "byuser",
      confirmEmail: "customers/activate",
      password:'password'
    },
    policy: {
      // host: 'http://localhost:8080/v1/api',
      host: "https://api.onskycloud.com/policy-service/v1/api",
      token: "iot-frontend-client-token",
      policy: "policies",
      group: "groups",
      user: "users",
    },
    resource: {
      // host: 'http://localhost:8081/v1/api',
      host: "https://api.onskycloud.com/resource-service",
      token: "sdfiusfi98234632rwhczyr392yr02u-23r9t34uy23r9t3fsfskhfo",
      service: "services",
      serviceSummary: "summary",
      serviceGetByShortName: "shortname",
      serviceGetActions: "actions",
      serviceCreate: "register",
      serviceDisable: "disable",
      serviceEnable: "enable",
      serviceDelete: "shortname",
      serviceDeletes: "deletes",
    },
    iot: {
      host: "https://api.onskycloud.com/iot-service/v1/api",
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
}
