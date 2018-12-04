import nconf from 'nconf'
import path from 'path'

//config nconf
let environment = process.env.NODE_ENV || 'development'
console.log(path.resolve(process.cwd(), '../config/' + environment.toLowerCase() + '.json'))
nconf
  .argv()
  .env()
  // .file(
  //   environment,
  //   path.resolve(process.cwd(), '../config/' + environment.toLowerCase() + '.json'),
  // )
  .file('config','../config/default.json')
global.nconf = nconf
