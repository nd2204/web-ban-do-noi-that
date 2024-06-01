if (!window.localStorage) {
  throw Error("Browser not supported")
}

const storage = window.localStorage
export class Cart {
  constructor() {
    this.cart = {};
    if (storage.getItem('cart')) {
      this.cart = JSON.parse(storage.getItem('cart'));
      return;
    }
  }

  add(id, options) {
    if (!this.get_item(id)) {
      this.cart[`${id}`] = [options];
    }
    else {
      const product_opt = this.get_item(id)
      for (let i = 0; i < product_opt.length; ++i) {
        if (product_opt[i].size == options.size
            && product_opt[i].color == options.color
            && product_opt[i].quantity != options.quantity) {
          this.cart[`${id}`][i].quantity = options.quantity
          return
        }
        else if (JSON.stringify(product_opt[i]) === JSON.stringify(options)) {
          return
        }

      }
      this.cart[`${id}`].push(options);
    }
  }

  save() {
    storage.setItem("cart", JSON.stringify(this.cart))
  }

  get_cart() {
    return this.cart;
  }

  clear() {
    this.cart = {}
    storage.removeItem('cart')
  }

  get_item(id) {
    return this.cart[`${id}`]
  }
}
