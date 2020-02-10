import {
  changePassword,
} from "reducers/user"
import {
  addSetting
} from 'reducers/customer'

export const mapDispathToProps = {
  changePassword: (id, model) => changePassword(id, model),
  addSetting: (model) => addSetting(model)
}
export const mapStateToProps = (state, props) => {
  let phone = {
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
    _otherSetting = `{\"quota\":60,\"phoneNumbers\":[]}`
  }
  let otherSetting = JSON.parse(_otherSetting)
  if (otherSetting.PhoneNumbers && otherSetting.PhoneNumbers.length > 0) {
    let masterPhone = otherSetting.PhoneNumbers.find(x => x.isMaster)
    if (!masterPhone) {
      masterPhone = otherSetting.PhoneNumbers[0]
    }
    phone.masterPhone = masterPhone
    if (otherSetting.PhoneNumbers.length === 2) {
      phone.phoneNumber1 = otherSetting.PhoneNumbers[1]
    }
    if (otherSetting.PhoneNumbers.length === 3) {
      phone.phoneNumber1 = otherSetting.PhoneNumbers[2]
    }
  }

  return {
    customer,
    phone,
  }
}

export default {
  mapStateToProps,
  mapDispathToProps
}