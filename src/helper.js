export function formatDate(date) {
  var monthNames = [
    'Jan',
    'Feb',
    'March',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sept',
    'Oct',
    'Nov',
    'Dec',
  ]

  var day = date.getDate()
  var monthIndex = date.getMonth()
  var year = date.getFullYear()
  if (year === '0001') {
    return 'Not connected'
  }
  return monthNames[monthIndex] + ' ' + day + ', ' + year
}
export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index
}
function download(filename, text) {
  var element = document.createElement('a')
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text))
  element.setAttribute('download', filename)

  element.style.display = 'none'
  document.body.appendChild(element)

  element.click()

  document.body.removeChild(element)
}
const colorFull = (type = 'all') => {
  let allColor = ['#ff4d4f', '#cf1322', '#a8071a', '#fa541c', '#ff7a45', '#ad2102', '#ffa940', '#fa8c16', '#ad4e00', '#ffc53d', '#faad14', '#d48806'
    , '#fff566', '#ffec3d', '#fadb14', '#d4b106', '#d3f261', '#bae637', '#a0d911', '#7cb305', '#5b8c00', '#73d13d', '#52c41a', '#389e0d', '#237804', '#135200',
    '#5cdbd3', '#13c2c2', '#1890ff', '#597ef7', '#b37feb', '#ff85c0', '#722ed1', '#eb2f96', '#595959']

  return allColor[Math.floor(Math.random() * allColor.length)]
}
export default { formatDate, onlyUnique, download, colorFull }
