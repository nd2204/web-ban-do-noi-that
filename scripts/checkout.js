import { Cart } from './cart.js'
import { ProductsLoader } from './product.js'
import { money_to_string } from './utils/money.js';
import * as validator from './utils/validate.js'

let loader = new ProductsLoader();
let g_cart = new Cart();

function alertEntries(data) {
  let content = ""
  data.entries().forEach((pair) => {
    content += `${pair[0]}: ${pair[1]}\n`
  });
  alert(content)
}

document.addEventListener("DOMContentLoaded", function(event) {
  let container = document.querySelector(".cart-table");

  let email = document.querySelector('#email');
  let phone = document.querySelector('#phone');

  email.onkeyup = function() {
    let original_style = email.style;
    if (!validator.is_valid_email(email.value)) {
      validator.mark_invalid_input(email)
    }
    else {
      email.style = original_style;
    }
  }

  phone.onkeyup = function() {
    let original_style = phone.style;
    if (!validator.is_valid_phone(phone.value)) {
      validator.mark_invalid_input(phone)
    }
    else {
      phone.style = original_style;
    }
  }

  let form = document.getElementById('checkout-form')
  if (form) {
    form.addEventListener("submit", function(event) {
      event.preventDefault();

      if (!validator.is_valid_phone(phone.value)) {
        phone.focus();
        return
      }
      if (!validator.is_valid_email(email.value)) {
        email.focus()
        return
      }

      let data = new FormData(form)
      data.append("cart", JSON.stringify(g_cart.get_cart()));
      g_cart.clear();
      alertEntries(data)
    })
  }

  if (container) container.innerHTML = generateItem();
})

function generateItem() {
  console.log("generateItem called")
  let html = "";
  for (let [id, variation] of g_cart.get_iter()) {
    let product = loader.getSingleproduct(id+'');
    html += `
      <tr>
        <td class="flex-middle">
          <span class="txt-caption" data-id="${id}">${product.name}</span>
          <span class="txt-s-12"> &nbsp&nbsp X &nbsp&nbsp ${variation.quantity}</span>
        </td>
        <td>${money_to_string(
          g_cart.get_item_subtotal(id),
          product.currency
          )}</td>
      </tr>
    `
  }
  return `
    <tr class="table-header">
      <th class="txt-w-500 txt-s-24">Product</th>
      <th class="txt-w-500 txt-s-24">Subtotal</th>
    </tr>
    ${html}
    <tr>
      <td>Subtotal</td>
      <td class="js-cart-subtotal">Rs. 0.00</td>
    </tr>
    <tr>
      <td>Total</td>
      <td class="js-cart-subtotal price-large">Rs. 0.00</td>
    </tr>
  `
}
