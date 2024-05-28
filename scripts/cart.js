if (!window.localStorage) {
  throw Error("Browser not supported")
}

let storage = window.localStorage

if (!storage.getItem('cart')) {
  storage.setItem('cart', `{"1": "hello", "2": "hi"}`)
}
storage.setItem('cart', `{"1": "hello", "2": "hi"}`)

console.log(storage.getItem('cart'))
