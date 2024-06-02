import { ProductsLoader } from './product.js'
import { money_to_string } from './utils/money.js';

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

  remove(id) {
    if (this.cart[`${id}`]) delete this.cart[`${id}`]
    this.save()
  }
  save() { storage.setItem("cart", JSON.stringify(this.cart)) }
  update() { this.cart = JSON.parse(storage.getItem('cart')) }
  get_cart() { this.update(); return this.cart; }
  count() { return Object.keys(this.cart).length; }
  clear() { this.cart = {}; storage.removeItem('cart'); }
  get_item(id) { this.update(); return this.cart[`${id}`]; }

  get_subtotal() {
    this.update()
    let acc = 0;
    for (let [k, v] of Object.entries(this.cart)) {
      let loader = new ProductsLoader()
      let product = loader.getSingleproduct(k)
      acc += product.price;
    }
    return acc;
  }

  renderItems(container) {
    this.update()
    let loader = new ProductsLoader()
    let html = "";
    let product;
    if (container) {
      for (let [k, v] of Object.entries(this.cart)) {
        let quantity = 0;
        v.forEach(variation => { quantity += parseInt(variation.quantity) });
        product = loader.getSingleproduct(k)
        html += `
          <div class="cart-items">
            <div class="cart-item-img">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="cart-item-detail">
              <p class="txt-s-16">${product.name}</p>
              <p class="item-price-quantity">
                <span>${quantity}</span>
                <span class="multiply">X</span>
                <span class="currency">${money_to_string(product.price, product.currency)}</span>
              </p>
            </div>
            <div class="discard-btn" data-id="${product.id}"><img src="assets/icons/close.svg" alt=""></div>
          </div>
        `
      }
      container.innerHTML = html;
    }

    const discard_buttons = document.querySelectorAll('.discard-btn')
    if (discard_buttons) {
      discard_buttons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
          this.remove(btn.getAttribute('data-id'))
          this.renderItems(container);
        })
      })
    }
  }

}
