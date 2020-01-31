import JsBarcode from "jsbarcode"
export const updateArray = (arr, obj) => {
  if (!arr || !Array.isArray(arr) || arr.length === 0) {
    return []
  }

  const index = arr.findIndex(e => e.id === obj.id)

  if (index === -1) {
    arr.push(obj)
  } else {
    arr[index] = obj
  }
  return arr
}
export const barcodeGenerator = (dom, text) => {
  if (!text) {
    return
  }
  if (typeof text !== 'string') {
    text = text.toString()
  }
  setTimeout(() => {
    JsBarcode(dom, text, {
      width: 1.5,
    })
  }, 1000)
}
export const parseResourceOrn = (resourceOrn) => {
  try {
    if (!resourceOrn || typeof resourceOrn !== 'string') {
      return
    }
    let arr = resourceOrn.split(':')
    if (arr.length !== 6)
      return
    if (!arr[5].includes('/'))
      return
    return arr[5].split('/')[1]
  } catch (error) {
    console.log(error)
    return
  }
}
export const getDataType = typeId => {
  try {
    let dataTypes = JSON.parse(window.localStorage.getItem("app.dataTypes"))
    return dataTypes.find(x => x.id == typeId).name.toUpperCase()
  } catch (error) {
    return "STRING"
  }
}
export const checkDate = (date = null) => {
  if (!date || typeof date !== "object") {
    date = new Date(date)
  }
  var year = date.getFullYear()
  if (year <= 1970) {
    return false
  }
  return date
}
export function formatDate(date) {
  if (typeof date !== "object") {
    date = new Date(date)
  }
  var monthNames = [
    "Jan",
    "Feb",
    "March",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ]

  var day = date.getDate()
  var monthIndex = date.getMonth()
  var year = date.getFullYear()
  if (year <= 1970) {
    return "Not connected"
  }
  return monthNames[monthIndex] + " " + day + ", " + year
}
export function onlyUnique(value, index, self) {
  if (!value) {
    return false
  }
  return self.indexOf(value) === index
}

function download(filename, text) {
  var element = document.createElement("a")
  element.setAttribute("href", "data:text/plain;charset=utf-8," + encodeURIComponent(text))
  element.setAttribute("download", filename)

  element.style.display = "none"
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
const colorFull = (type = "all") => {
  let allColor = [
    "#ff4d4f",
    "#cf1322",
    "#a8071a",
    "#fa541c",
    "#ff7a45",
    "#ad2102",
    "#ffa940",
    "#fa8c16",
    "#ad4e00",
    "#ffc53d",
    "#faad14",
    "#d48806",
    // '#fff566', vang choa mat wa
    "#ffec3d",
    "#fadb14",
    "#d4b106",
    "#d3f261",
    "#bae637",
    "#a0d911",
    "#7cb305",
    "#5b8c00",
    "#73d13d",
    "#52c41a",
    "#389e0d",
    "#237804",
    "#135200",
    "#5cdbd3",
    "#13c2c2",
    "#1890ff",
    "#597ef7",
    "#b37feb",
    "#ff85c0",
    "#722ed1",
    "#eb2f96",
    "#595959",
  ]

  return allColor[Math.floor(Math.random() * allColor.length)]
}
const detectIcon = name => {
  if (!name) {
    return "ticket"
  }
  let _name = name.toLowerCase()
  if (_name.includes("mac") || _name.includes("serial")) {
    return "barcode"
  }
  if (_name.includes("call")) {
    return "whatsapp"
  }
  if (_name.includes("status")) {
    return "spinner10"
  }
  if (_name.includes("description")) {
    return "bubbles4"
  }
  if (_name.includes("description")) {
    return "bubbles4"
  }
  if (_name.includes("create")) {
    return "clock"
  }
  if (_name.includes("update")) {
    return "history"
  }
  if (_name.includes("connect")) {
    return "connection"
  }
  if (_name.includes("security") || _name.includes("safety")) {
    return "lock"
  }
  if (_name.includes("purchase")) {
    return "cart"
  }
  if (_name.includes("shipped")) {
    return "truck"
  }
  if (_name.includes("configure") || _name.includes("setting")) {
    return "cogs"
  }
  if (_name.includes("active") || _name.includes("onoff")) {
    return "switch"
  }
  if (_name.includes("type")) {
    return "clipboard"
  }
  if (_name.includes("heart")) {
    return "heart"
  }
  if (_name.includes("customer") || _name.includes("user")) {
    return "user"
  }
  if (_name.includes("protocol") || _name.includes("version")) {
    return "superscript2"
  }
  if (_name.includes("image") || _name.includes("picture")) {
    return "file-picture"
  }
  if (_name.includes("time") || _name.includes("date") || _name.includes("alarm")) {
    return "clock"
  }
  if (_name.includes("zone") || _name.includes("world") || _name.includes("earth")) {
    return "earth"
  }
  if (_name.includes("temp")) {
    return "fire"
  }
  if (_name.includes("humidity")) {
    return "droplet"
  }
  if (_name.includes("mode")) {
    return "flickr2"
  }
  if (_name.includes("light")) {
    return "spinner3"
  }
  if (_name.includes("motion")) {
    return "feed"
  }
  if (_name.includes("slider")) {
    return "equalizer"
  }
  if (_name.includes("reachable")) {
    return "podcast"
  }
  if (_name.includes("sleep")) {
    return "hour-glass"
  }
  if (_name.includes("door")) {
    return "enter"
  }
  if (_name.includes("battery")) {
    return "meter"
  }
  if (_name.includes("smoke") || _name.includes("co")) {
    return "cloud"
  }
  return "ticket"
}
export const makeid = () => {
  var text = ""
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

  for (var i = 0; i < 5; i++) text += possible.charAt(Math.floor(Math.random() * possible.length))

  return text
}
export const convertToBoolean = value => {
  if (!value) {
    return false
  }
  if (typeof value === "string") {
    return value == "true" || value == "1"
  }
  if (typeof value === "boolean") {
    return value
  }
  if (typeof value === "number") {
    return value === 1
  }
  return false
}
export const getPropertyValue = (properties, field) => {
  if (!properties || !Array.isArray(properties) || properties.length === 0) {
    return 0
  }
  let property = properties.find(x => x.name === field || (x.template || {}).name === field)
  if (!property) {
    return 0
  }
  return property.value || property.defaultValue
}
export const convertOnSkyPropertyValue = value => {
  if (!value) {
    return 0
  }
  if (typeof value === "boolean") {
    return value ? 1 : 0
  }
  return value
}

function arrayUnique(array) {
  var a = array.concat()
  for (var i = 0; i < a.length; ++i) {
    for (var j = i + 1; j < a.length; ++j) {
      if (a[i] === a[j]) a.splice(j--, 1)
    }
  }

  return a
}
export const pruneText = (text) => {
  try {
    if (text.length > 30)
      return text.substr(0, 30)
  } catch (error) {
    console.log(error)
  }
  return text
}
if (!String.prototype.trim) {
  (function () {
    // Make sure we trim BOM and NBSP
    var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
    String.prototype.trim = function () {
      return this.replace(rtrim, '');
    };
  })();
}

function formatPhoneNumber(phoneNumberString) {
  var cleaned = ('' + phoneNumberString).replace(/\D/g, '')
  var match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/)
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3]
  }
  return null
}

function detectTemplate(template) {
  switch (template) {
    case 'Light Temperature':
    case 'Temperature-Humidity Sensor':
      return 'https://www.onskyinc.com/wp-content/uploads/2019/03/dim.png'
    case 'Light DIM':
    case 'Light DIM Old':
      return 'https://www.onskyinc.com/wp-content/uploads/2019/03/dim.png'
    case 'Motion Sensor':
      return 'https://www.onskyinc.com/wp-content/uploads/2018/11/motion-dung-pin3-300x300.png'
    case 'Door Sensor':
    case 'Zigbee Door Lock':
      return 'https://www.onskyinc.com/wp-content/uploads/2018/11/door-sensor-3.png'
    case 'CO Detector':
      return 'https://www.onskyinc.com/wp-content/uploads/2018/11/CO-3-3-300x300.png'
    case 'Smoke Detector':
      return 'https://www.onskyinc.com/wp-content/uploads/2018/11/Smoke-1-2-300x300.png'
    case 'Smart Siren':
      return 'https://www.onskyinc.com/wp-content/uploads/2018/11/siren-3-2-300x300.png'
    case 'Switch 1C':
      return 'https://www.onskyinc.com/wp-content/uploads/2018/11/SW-121C-S1-300x300.png'
    case 'Switch 3C':
      return 'https://www.onskyinc.com/wp-content/uploads/2018/11/SW-123C-G-1-2-300x300.png'
    case 'Lamp 4PWM':
    case 'LAM 110':
    case 'LAM 130':
    case 'Turnable':
      return 'https://www.onskyinc.com/wp-content/uploads/2018/11/LAM-RGB-300x300.png'
    case 'Security Plug':
      return 'https://www.onskyinc.com/wp-content/uploads/2018/11/plugS-4-1-300x300.png'
    case 'Switch Type Plug A':
      return 'https://www.onskyinc.com/wp-content/uploads/2018/11/plugA-4-300x300.png'
    case 'Light RGB Old':
    case 'Light RGB':
      return 'http://www.onskyinc.com/wp-content/uploads/2019/03/light_rgb.png'
    case 'SOS Button':
      return 'https://www.onskyinc.com/wp-content/uploads/2018/11/Smoke-1-2-300x300.png'
    case 'OnSky gateway':
    default:
      return 'https://www.onskyinc.com/wp-content/uploads/2018/11/gateway-3-300x240.png'
  }
}
export default {
  formatDate,
  onlyUnique,
  download,
  colorFull,
  detectIcon,
  makeid,
  convertToBoolean,
  getPropertyValue,
  convertOnSkyPropertyValue,
  barcodeGenerator,
  updateArray,
  getDataType,
  checkDate,
  arrayUnique,
  parseResourceOrn,
  pruneText,
  formatPhoneNumber,
  detectTemplate
}