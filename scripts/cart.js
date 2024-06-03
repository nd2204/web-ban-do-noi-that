import { ProductsLoader } from './product.js'
import { money_to_string } from './utils/money.js';

var loader = new ProductsLoader()

if (!window.localStorage) {
  throw Error("Browser not supported")
}

const storage = window.localStorage
export class Cart {
  constructor() {
    const cart_string = storage.getItem('cart')
    if (!cart_string)
      storage.setItem('cart', '{}')
    this.cart = JSON.parse((cart_string) ? cart_string : {});
    this.cart_subtotal_listeners = new Set();
    this.item_subtotal_listeners = {};
  }

  save() { storage.setItem("cart", JSON.stringify(this.cart)) }
  update() { this.cart = JSON.parse(storage.getItem('cart')) }
  clear() { this.cart = {}; storage.removeItem('cart'); }

  //------------------------------------------------------------
  // GETTERS
  //------------------------------------------------------------
  get_cart() {
    this.update();
    return this.cart;
  }

  get_cart_subtotal() {
    this.update()
    let acc = 0;
    for (let [k, v] of Object.entries(this.cart)) {
      let product = loader.getSingleproduct(k)
      acc += product.price * v.quantity;
    }
    return acc;
  }

  get_cart_quantity() {
    this.update()
    let acc = 0;
    for (let [k, v] of Object.entries(this.cart)) {
      acc += v.quantity;
    }
    return acc;
  }

  get_item(id) {
    this.update();
    return this.cart[`${id}`];
  }

  get_item_subtotal(id) {
    this.update();
    let product = loader.getSingleproduct(id)
    return this.get_item_quantity(id) * product.price;
  }

  get_item_quantity(id) {
    this.update();
    if (typeof id !== 'string') return
    let item = this.get_item(id)
    if (!item) return;
    let acc = 0;
    acc += parseInt(item.quantity);
    return acc;
  }

  count() {
    this.update();
    return Object.keys(this.cart).length;
  }

  //------------------------------------------------------------
  // SETTERS 
  //------------------------------------------------------------
  add(id, options) {
    this.update();
    this.cart[`${id}`] = options;
    this.save();
    this.onUpdate();
  }

  remove(id) {
    this.update();
    if (this.cart[`${id}`]) delete this.cart[`${id}`]
    this.save()
    this.onUpdate();
  }

  updateQuantity(id, quantity) {
    this.update();
    this.cart[id + ''].quantity = quantity;
    this.save();
    this.onUpdate();
  }

  //------------------------------------------------------------
  // UTIL
  //------------------------------------------------------------
  renderItems(container) {
    this.update()
    let html = "";
    let product;
    if (!container) return
    for (let [k, v] of Object.entries(this.cart)) {
      product = loader.getSingleproduct(k)
      html += `
        <div class="cart-items">
          <div class="cart-item-img flex-center">
            <img src="${product.image}" alt="${product.name}">
          </div>
          <div class="cart-item-detail">
            <p class="txt-s-16">${product.name}</p>
            <p class="item-price-quantity">
              <span>${v.quantity}</span>
              <span class="multiply">X</span>
              <span class="currency">${money_to_string(product.price, product.currency)}</span>
            </p>
          </div>
          <div class="discard-btn" data-id="${product.id}"><img src="assets/icons/close.svg" alt=""></div>
        </div>
      `
    }
    container.innerHTML = html;

    const discard_buttons = document.querySelectorAll('.discard-btn')
    if (discard_buttons) {
      discard_buttons.forEach((btn) => {
        btn.addEventListener("click", (event) => {
          this.remove(btn.getAttribute('data-id'))
          this.renderItems(container);
          this.onUpdate();
        })
      })
    }
  }

  //------------------------------------------------------------
  // OBSERVER REGISTRAR
  //------------------------------------------------------------
  register_cart_subtotal(container) {
    if (!container) return;
    this.cart_subtotal_listeners.add(container)
  }

  register_item_subtotal(id, container) {
    if (!container || !id) return;
    this.item_subtotal_listeners[id+''] = container
  }

  //------------------------------------------------------------
  // CART UPDATE EVENT HANDLERS
  //------------------------------------------------------------
  onUpdate() {
    console.log("cart onUpdate called")
    this.cart_subtotal_listeners.forEach(element => {
      element.innerText = money_to_string(this.get_cart_subtotal(), "Rs.")
    });
    let iterListener = this.cart_subtotal_listeners.entries()
    for (const entry of iterListener){
      entry.innerText = money_to_string(
        this.get_cart_subtotal(),
        "Rs."
      )
    }
    let iterPairListener = Object.entries(this.item_subtotal_listeners)
    for (let [id, container] of iterPairListener) {
      container.innerText = money_to_string(
        this.get_item_subtotal(id),
        "Rs."
      )
    }
  }
}

