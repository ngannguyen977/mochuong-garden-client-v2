import {
  getList,
  getOne,
  changeStatus,
  create,
  destroy,
  getLog,
  getNotification,
  sendEmail,
} from "reducers/customer"
import {
  getList as getThings,
  getListByGraphQL,
  createThingPolicy,
  removeThingPolicy,
  commandThing
} from "reducers/thing"
import helper from "../../../helper"

const steps = [{
    title: "Adding details",
    subTitle: "Adding Client Information",
    icon: "loading",
    iconDefault: "client",
    status: "process",
    index: 0,
    nextTitle: "Next: Permission",
  },
  {
    title: "Set permission",
    subTitle: "Set Permission for Client",
    icon: "solution",
    iconDefault: "solution",
    status: "wait",
    index: 1,
    nextTitle: "Next: Review",
  },
  {
    title: "Review",
    subTitle: "Review",
    icon: "menu-unfold",
    iconDefault: "menu-unfold",
    status: "wait",
    index: 2,
    nextTitle: "Create Client",
  },
  {
    title: "Done",
    subTitle: "Create Client Complete",
    icon: "check-circle",
    iconDefault: "check-circle",
    status: "wait",
    index: 3,
    nextTitle: "Go to Clients List",
  },
]

const type = {
  del: "DELETE",
  changeStatus: "CHANGE_STATUS",
  assignThing: "ASSIGN_THING",
}
const summaryColumns = [{
    title: "Clientname",
    dataIndex: "clientname",
    sorter: true,
    width: "33%",
  },
  {
    title: "Role",
    dataIndex: "role.name",
    sorter: true,
    width: "33%",
  },
  {
    title: "Last Activity",
    dataIndex: "last_login",
    sorter: true,
    width: "15%",
    render: x => helper.formatDate(new Date(x)),
  },
]

export const mapDispathToProps = {
  getListByGraphQL: (keyword, limit, page, sort, isAsc, types, templateName, templateType) =>
    getListByGraphQL(keyword, limit, page, sort, isAsc, types, templateName, templateType),
  getList: (limit, page, sort, isAsc) => getList(limit, page, sort, isAsc),
  getThings: (keyword, limit, page, sort, isAsc, customers) => getThings(keyword, limit, page, sort, isAsc, customers),
  changeStatus: (clientName, status) => changeStatus(clientName, status),
  create: (model, iscreate) => create(model, iscreate),
  destroy: clientNames => destroy(clientNames),
  getOne: cn => getOne(cn),
  sendEmail: to => sendEmail(to),
  getLog: (customerNumber, propertyName, limit) => getLog(customerNumber, propertyName, limit),
  commandThing: (cn,serial,propertyCommand,propertyName,isGateway,payload) => commandThing(cn,serial,propertyCommand,propertyName,isGateway,payload),
  getNotification: (cn, serial, limit) => getNotification(cn, serial, limit),
}

export const mapStateToProps = (state, props) => {
  let client = state.customer || {}
  let detail = client.detail || {}
  let phone = {
    firstName: {
      value: ''
    },
    lastName: {
      value: ''
    },
    address: {
      value: ''
    },
    email: {
      value: ''
    },
    masterPhone: {
      value: ''
    },
    phoneNumber1: {
      value: ''
    },
    phoneNumber2: {
      value: ''
    },
  }
  let _otherSetting = ((detail.setting || {}).other || {}).value
  if (!_otherSetting || _otherSetting == "") {
    _otherSetting = `{\"quota\":60,\"phoneNumbers\":[{}]}`
  }
  let otherSetting = JSON.parse(_otherSetting)
  if (otherSetting.phoneNumbers.length > 0) {
    let masterPhone = otherSetting.phoneNumbers.find(x => x.isMaster)
    if (!masterPhone) {
      masterPhone = otherSetting.phoneNumbers[0]
    }
    phone.masterPhone.value = masterPhone.phone
    if (otherSetting.phoneNumbers.length === 2) {
      phone.phoneNumber1.value = otherSetting.phoneNumbers[1].phone
    }
    if (otherSetting.phoneNumbers.length === 3) {
      phone.phoneNumber1.value = otherSetting.phoneNumbers[2].phone
    }
  }
  phone.firstName.value = detail.firstName
  phone.lastName.value = detail.lastName
  phone.email.value = detail.email
  phone.address.value = detail.address1

  // get security status 
  return {
    // master
    client,
    // page
    totalItems: client.totalItems,
    page: client.page,
    data: client.clients || [],
    // detail
    detail: client.detail || {},
    // model
    steps,
    summaryColumns,
    type,
    clientCreatePermission: (state.group || {}).permissions || [],
    clientCreate: client.clientCreate || {},
    clientUpdate: (client.detail || {}).clientUpdate || {},
    // thing
    thing: state.thing,
    log: client.log || [],
    notifications: client.notification || [],
    observer: state.app.userState || {},
    phone,
    // gatewayStatus: getSecurityStatus(state.thing.things)
  }
}


export default {
  mapStateToProps,
  mapDispathToProps
}