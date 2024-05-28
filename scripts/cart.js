if (!window.localStorage) {
  throw Error("Browser not supported")
}

let storage = window.localStorage

if (storage.getItem('cart')) {
  
}
