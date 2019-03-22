import constant from "../config/default"
/// factory
export const prepareThingPermission = (uuid, thingName, type) => {
  let actions = []
  switch (type) {
    case "control":
      actions.push("iot:controlThing")
      break
    case "view":
      actions.push("iot:listThing")
      actions.push("iot:readThing")
      break
    default:
      break
  }
  return {
    name: `iot-client-${uuid}-${thingName}-${type}`,
    description: `IoT client permission for client user ${uuid} ${type} for thing ${thingName}`,
    resourceTypes: [
      {
        name: "things",
        effect: "Allow",
        actions,
        // "orn:[partition]:[service]:[region]:[account-id]:resource_type/name"
        resources: [`orn::iot::${constant.customer.number}:things/${thingName}`],
      },
    ],
  }
}

export default {}
