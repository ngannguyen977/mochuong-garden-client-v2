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
export default { formatDate, onlyUnique }
