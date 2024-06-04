import { Cart } from './cart.js'
import { money_to_string } from './utils/money.js'
const header_template = document.createElement('template');
let g_cart = new Cart();

header_template.innerHTML = `
  <style>
  a {
    text-decoration: none;
  }

  header {
    font-family: "Poppins", sans-serif;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(255, 255, 255, 0);
    z-index: 1000;
    overflow: hidden;
  }

  .middle-section {
    display: flex;
    justify-content: space-between;
    min-width: 430px;
    z-index: 1000;
  }

  .middle-section a {
    color: #000000;
    cursor: pointer;
    font-weight: 500;
    font-size: 16;
  }

  .middle-section a:hover {
    transition: 
  }

  .right-section {
    display: flex;
    justify-content: space-between;
    width: 247px;
    flex-shrink: 0;
    position: absolute;
    right: 100px;
    z-index: 1000;
  }

  .right-section button {
    z-index: 1000;
    height: 28px;
    background-color: #00000000;
    border-width: 0;
    cursor: pointer;
  }

  .right-section button#cart {
    position: relative;
  }

  .shop-count {
    position: absolute;
    width: 15px;
    height: 15px;
    bottom: 0;
    right: 2;
    background-color: #f40005;
    border-radius: 10px;
    box-shadow: 0 0 1px 0 white inset;
    color: white;
    font-size: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 600;
  }

  @media (max-width: 1200px) {
    header {
      justify-content: space-between;
    }
    .middle-section {
      margin-left: 100px;
      margin-right: 100px;
    }
    .right-section {
      display: flex;
      position: static;
      margin-right: 100px;
    }
  }
  </style>
  <header>
    <div class="middle-section">
      <a href="./">Home</a>
      <a href="./shop.html">Shop</a>
      <a href="#">About</a>
      <a href="./contact.html">Contact</a>
    </div>
    <div class="right-section">
      <button type="button" title="Account Information">
        <a href="./account.html">
          <img id="account" class="account-alert-icon" src="assets/icons/account_alert.svg">
        </a>
      </button>
      <button id="search" type="button" title="Search" onclick="alert('button clicked')">
        <img class="search-icon" src="assets/icons/search.svg">
      </button>
      <button id="favorite" type="button" title="Favorited Products" onclick="alert('button clicked')">
        <img class="heart-icon" src="assets/icons/heart.svg">
      </button>
      <button id="cart-btn" type="button" title="Cart" onclick="toggleCart()">
        <img class="shopping-cart-icon" src="assets/icons/shopping_cart.svg">
        <div class="" id="shop-count"></div>
      </button>
    </div>
  </header>
`

class Header extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
    shadowRoot.appendChild(header_template.content);
  }
}

customElements.define('header-component', Header)

const cart_ctn = document.createElement('div');
cart_ctn.innerHTML = `
<style>
.overlay {
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1001;
  transition: 0.15s ease-in-out;
}

.cart {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: fixed;
  background-color: white;
  width: 417px;
  height: 746px;
  top:0;
  right: 0;
  z-index: 1002;
}

.hide {
  display: none;
}

.cart-title {
  display: flex;
  margin-top: 28px;
  margin-left: 23px;
  margin-right: 40px;
  margin-bottom: 23px;
}

.cart-title p {
  box-sizing: border-box;
  font-size: 24px;
  font-weight: 600;
  /* Shopping Cart */
  padding-bottom: 26px;
  border-bottom: 1px solid #D9D9D9;
  flex: 1;
}

.cart-toggler {
  display: flex;
  align-items: center;
  box-sizing: border-box;
  cursor: pointer;
  position: relative;
  padding-left: 42px;
  padding-bottom: 36px;
}

.cart-body-wrapper {
  position: relative;
  overflow-y: scroll;
  flex: 1;
}

.cart-body {
  display: flex;
  position: absolute;
  flex-direction: column;
  // justify-content: flex-start;
  overflow-y: scroll;
  row-gap: 15px;
  padding-top: 3px;
  padding-left: 23px;
  padding-right: 40px;
  padding-bottom: 3px;
}

.cart-items {
  box-sizing: border-box;
  display: flex;
  flex: 1;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
  min-height: 121px;
}

.cart-item-detail {
  flex: 1;
  flex-shrink: 0;
  overflow-x: scroll;
}

*::-webkit-scrollbar {
  display: none;
}

.cart-item-img {
  display: flex;
  width: 105px;
  height: 105px;
  justify-content: center;
  // align-items: center;
  margin-right: 14px;
}

.cart-item-img img {
  width: 105px;
}

.discard-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 121px;
  padding: 0 16px;
  cursor: pointer;
  opacity: 0.5;
}

.currency {
  font-size: 12px;
  font-weight: 500;
  color: #B88E2F;
}

.cart-subtotal {
  margin-left: 24px;
  margin-right: 40px;
  margin-bottom: 23px;
  margin-top: 23px;
  display: flex;
  justify-content: space-between;
}

.item-price-quantity {
  display: flex;
  align-items: center;
  column-gap: 8px;
  margin-top: 4px;
}

.multiply {
  font-size: 12px;
  font-weight: 300;
}

.cart-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 131px; 
  height: 31px; 
  box-sizing: border-box;
  border-radius: 16px;
  border: 1px solid black;
  font-size: 12px;
  cursor: pointer;
  margin-top: 
}

.cart-btn:hover#view-cart {
  background-color: black;
  color: white;
  transition: 0.15s ease-in;
}

.cart-btn:hover#checkout {
  background-color: #B88E2F;
  color: white;
  transition: 0.15s ease-in;
  border-color: #B88E2F;
}

.cart-action {
  padding-left: 23px;
  padding-top: 26px;
  padding-bottom: 26px;
  width: 100%;
  border-top: 1px solid #D9D9D9;
}

.cart-action .cart-btn:not(:last-child) {
  margin-right: 27px;
}

// .discard-btn:hover {
//   background-color: lightpink;
// }

</style>
<div class="overlay hide" id="overlay"></div>
<div class="cart hide" id="cart">
  <div>
    <div class="cart-title">
      <p>Shopping Cart</p>
      <div class="cart-toggler">
        <img src="assets/icons/shopping_cart_cancel.svg" alt="">
      </div>
    </div>
  </div>
  <div class="cart-body-wrapper" style="flex:1">
    <div class="cart-body" id="cart-body"></div>
  </div>
  <div>
    <div class="cart-subtotal">
      <span class="flex-center">Subtotal</span>
      <span class="price-medium js-cart-subtotal"></span>
    </div>
    <div class="cart-action">
      <a class="cart-btn" id="view-cart" href="./cart.html">View Cart</a>
      <a class="cart-btn" id="checkout" href="./checkout.html">Checkout</a>
    </div>
  </div>
</div>
`

function toggleCart() {
  let cart = document.getElementById('cart');
  let overlay = document.getElementById('overlay');
  if (cart && overlay) {
    overlay.classList.toggle('hide');
    cart.classList.toggle('hide');
  }
  // Re-render the cart
  const cartBody = document.querySelector('.cart-body');
  g_cart.renderItems(cartBody);
}

window.toggleCart = toggleCart;
document.body.appendChild(cart_ctn)

window.addEventListener("DOMContentLoaded", function(event) {
  console.log("Cart Info: ", g_cart.get_cart())

  const subtotal = document.querySelectorAll('.js-cart-subtotal');
  if (subtotal) {
    subtotal.forEach(s => {
      s.innerText = money_to_string(g_cart.get_cart_subtotal(), 'Rs.');
      g_cart.register_cart_subtotal(s);
    })
  }

  const cartToggler = document.querySelector('.cart-toggler');
  if (cartToggler) {
    cartToggler.addEventListener("click", toggleCart);
  }
})

