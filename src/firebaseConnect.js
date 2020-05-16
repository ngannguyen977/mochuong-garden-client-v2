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
////////////////PRODUCTS//////////////////
export const getData = (pageIndex, keyword) => new Promise((resolve, reject) => {
  var productRef = firebaseData.database().ref('products');
  productRef.on('value', function (snapshot) {
    let list = snapshot.val() || []
    console.log("getting...", list)
    let totalItem = list.length
    let pageSize = 5;
    let dataPaging = 0;
    // search
    if (keyword)
      list = list.filter(x => x.displayName && x.displayName.includes(keyword))

    dataPaging = list.slice(pageIndex * pageSize, ((pageIndex + 1) * pageSize))
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
export const updateData = (id, product) => new Promise((resolve, reject) => {
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
    return resolve(list.find(x => x.id === id));
  })
})

/////////////////CATEGORIES//////////////////

export const getDataCategory = (pageIndex, keyword) => new Promise((resolve, reject) => {
  console.log('kffff', keyword)
  var productRef = firebaseData.database().ref('categories');
  productRef.on('value', function (snapshot) {
    let list = snapshot.val() || []
    let totalItem = list.length
    let pageSize = 5;
    // search
    if (keyword)
      list = list.filter(x => x.name && x.name.includes(keyword))

    let dataPaging = list.slice(pageIndex * pageSize, ((pageIndex + 1) * pageSize))
    const totalPage = Math.ceil(list.length / pageSize)
    let categories = {
      totalItem: totalItem,
      totalPage: totalPage,
      dataPaging: dataPaging,
      list: list
    }
    return resolve(categories);
  })
})
export const addDataCategory = (category) => new Promise((resolve, reject) => {
  var categoryRef = firebaseData.database().ref('categories')

  categoryRef.once('value', function (snapshot) {
    let list = snapshot.val() || []
    list.push(category)
    categoryRef.set(list)
    return resolve(category)
  })
})

export const deleteCategory = (id) => new Promise((resolve, reject) => {
  var categoryRef = firebaseData.database().ref('categories')

  categoryRef.once('value', function (snapshot) {
    let list = snapshot.val() || []
    list = list.filter(x => x.id != id)
    categoryRef.set(list)
    return resolve(true)
  })
})
export const getOneCate = (id) => new Promise((resolve, reject) => {
  var categoryRef = firebaseData.database().ref('categories');
  categoryRef.once('value', function (snapshot) {
    let list = snapshot.val() || []
    return resolve(list.find(x => x.id === id));
  })
})

export const updateCategory = (id, category) => new Promise((resolve, reject) => {
  var categoryRef = firebaseData.database().ref('categories')

  categoryRef.once('value', function (snapshot) {
    let list = snapshot.val() || []
    list = list.filter(x => x.id != id)
    category.id = id
    list.push(category)
    categoryRef.set(list)
    return resolve(category)
  })
})
////////////////////////ORDER/////////////////
export const getDataOrders = (pageIndex, keyword) => new Promise((resolve, reject) => {
  var orderRef = firebaseData.database().ref('orders');
  orderRef.on('value', function (snapshot) {
    let list = snapshot.val() || []
    let totalItem = list.length
    let pageSize = 5;
    let dataPaging = 0;
    // search
    if (keyword)
      list = list.filter(x => x.displayName && x.displayName.includes(keyword))

    dataPaging = list.slice(pageIndex * pageSize, ((pageIndex + 1) * pageSize))
    const totalPage = Math.ceil(list.length / pageSize)
    let orders = {
      totalItem: totalItem,
      totalPage: totalPage,
      dataPaging: dataPaging,
      list: list
    }
    return resolve(orders);
  })
})

export const getOrderDetail = (orderId) => new Promise((resolve, reject) => {
  var orderRef = firebaseData.database().ref('order_items');
  orderRef.on('value', function (snapshot) {
    let list = snapshot.val() || []
    let totalItem = list.length
    let pageSize = 5;
    let dataPaging = 0;
    list = list.filter(x => x.orderId && x.orderId === orderId)

    dataPaging = list.slice(pageIndex * pageSize, ((pageIndex + 1) * pageSize))
    const totalPage = Math.ceil(list.length / pageSize)
    let orders = {
      totalItem: totalItem,
      totalPage: totalPage,
      dataPaging: dataPaging,
      list: list
    }
    return resolve(orders);
  })
})
export const getOrderFull = (pageIndex=0, pageSize=10) => new Promise((resolve, reject) => {
  var orderRef = firebaseData.database().ref('orders');
  var orderDetailRef = firebaseData.database().ref('order_items');
  var productRef = firebaseData.database().ref('products');
  orderRef.once('value', function (snapshot) {
    let list = snapshot.val() || []
    let totalItem = list.length
    let dataPaging = list.slice(pageIndex * pageSize, ((pageIndex + 1) * pageSize))
    const totalPage = Math.ceil(list.length / pageSize)
    let orders = {
      totalItem: totalItem,
      totalPage: totalPage,
      dataPaging: dataPaging,
      list: list
    }
    let orderIds = dataPaging.map(x => x.id)
    // get order details
    orderDetailRef.once('value', function (snapshot) {
      let orderDetailList = snapshot.val() || []
      orderDetailList = orderDetailList.filter(x => orderIds.includes(x.orderId))
      let productIds = orderDetailList.map(x => x.productId)
      // get products
      productRef.once('value', function (snapshot) {
        let productList = snapshot.val() || []
        productList = productList.filter(x => productIds.includes(x.id))
        // gan product vao order items
        for (let product of productList) {
          for (let orderItem of orderDetailList) {
            // tim thay product match vs order item => cho vao orders.orderItems.products
            if (orderItem.productId === product.id) {
              orderItem.product = product
            }
          }
        }
        // gan order item list vao orders
        for (let order of orders.dataPaging) {
          // tim order detail bo vao order list
          order.orderItems = orderDetailList.filter(orderDetail => orderDetail.orderId === order.id)
        }
        return resolve(orders);
      })
    })
  })
})
/////////////////////////////////////////////////////////////////
let database = {
  getData,
  addData,
  updateData,
  deleteData,
  getOne,
  getDataCategory,
  addDataCategory,
  deleteCategory,
  getOneCate,
  updateCategory,
  getDataOrders,
  getOrderDetail,
  getOrderFull
}
export default database