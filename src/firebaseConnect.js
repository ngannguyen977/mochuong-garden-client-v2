import * as firebase from 'firebase';

var firebaseConfig = {
  apiKey: "AIzaSyBCkXtEjObk5SVWVucS5Oqt6SiI0D4SAek",
  authDomain: "note-react-f3db5.firebaseapp.com",
  databaseURL: "https://note-react-f3db5.firebaseio.com",
  projectId: "note-react-f3db5",
  storageBucket: "note-react-f3db5.appspot.com",
  messagingSenderId: "637533453967",
  appId: "1:637533453967:web:2b6dca16221e0d29dffafa",
  measurementId: "G-W8L417K1XK"
};
// Initialize Firebase

const firebaseData = firebase.initializeApp(firebaseConfig);

export const getData = (pageIndex) => new Promise((resolve, reject) => {
  var productRef = firebaseData.database().ref('products');
  productRef.on('value', function (snapshot) {
    let list = snapshot.val() || []
    console.log("getting...", list)
    let totalItem = list.length
    let pageSize = 5;
    let dataPaging = 0;
    console.log(typeof list)
    // if (Array.isArray(list)) {
    dataPaging = list.slice(pageIndex * pageSize, ((pageIndex + 1) * pageSize))
    // }
    const totalPage = Math.ceil(list.length / pageSize)
    let products = {
      totalItem: totalItem,
      totalPage: totalPage,
      dataPaging: dataPaging,
      list: list
    }
    return resolve(products);
  })
})
export const addData = (product) => new Promise((resolve, reject) => {
  var productRef = firebaseData.database().ref('products')

  productRef.once('value', function (snapshot) {
    let list = snapshot.val() || []
    list.push(product)
    productRef.set(list)
    return resolve(product)
  })
})
export const updateData = (id,product) => new Promise((resolve, reject) => {
  var productRef = firebaseData.database().ref('products')

  productRef.once('value', function (snapshot) {
    let list = snapshot.val() || []
    list = list.filter(x => x.id != id)
    product.id = id
    list.push(product)
    productRef.set(list)
    return resolve(product)
  })
})
export const deleteData = (id) => new Promise((resolve, reject) => {
  var productRef = firebaseData.database().ref('products')

  productRef.once('value', function (snapshot) {
    let list = snapshot.val() || []
    list = list.filter(x => x.id != id)
    productRef.set(list)
    return resolve(true)
  })
})
export const getOne = (id) => new Promise((resolve, reject) => {
  var productRef = firebaseData.database().ref('products');
  productRef.once('value', function (snapshot) {
    let list = snapshot.val() || []
    return resolve(list.find(x=>x.id===id));
  })
})
let database = {
  getData,
  addData,
  updateData,
  deleteData,
  getOne
}
export default database