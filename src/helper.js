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
  var element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', filename);

  element.style.display = 'none';
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
export default { formatDate, onlyUnique, download }
