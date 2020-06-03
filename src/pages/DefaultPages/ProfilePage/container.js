import {
  changePassword,
} from "reducers/user"
import {
  addSetting
} from 'reducers/customer'

export const mapDispatchToProps = {
  changePassword: (id, model) => changePassword(id, model),
  addSetting: (model) => addSetting(model)
}
export const mapStateToProps = (state, props) => {
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
  let customer = (state.app.userState || {}).customer || {}
  let _otherSetting = ((customer.setting || {}).other || {}).value
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
  phone.firstName.value = customer.firstName
  phone.lastName.value = customer.lastName
  phone.email.value = customer.email
  phone.address.value = customer.address1

  return {
    customer,
    phone,
  }
}

export default {
  mapStateToProps,
  mapDispatchToProps
}