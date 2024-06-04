import { Cart } from './cart.js'
import { ProductsLoader } from './product.js'
import { money_to_string } from './utils/money.js'

let g_cart = new Cart()
let loader = new ProductsLoader()


document.addEventListener("DOMContentLoaded", function() {
  if (g_cart.count() == 0) {
    console.log("Cart is empty");
  }
  const item_table_ctn = document.querySelector('.cart-item-table')
  if (item_table_ctn) {
    renderItems(item_table_ctn);
  }
  const cart_subtotal = document.querySelectorAll('.js-cart-subtotal')
  if (cart_subtotal) {
    cart_subtotal.forEach(s => {
      s.innerText = money_to_string(g_cart.get_cart_subtotal(), 'Rs.')
      g_cart.register_cart_subtotal(s)
    });
  }
})

function renderItems(container) {
  if (!container) return;

  let rows = ""
  for (let [k, v] of Object.entries(g_cart.get_cart())) {
    let row = document.createElement('tr')
    row.innerHTML = product_data(k, g_cart)
    rows += row.outerHTML;
  }

  const cart_item_table = `
  <table class="product-table">
    <tr class="table-header">
      <th class="col item-img-col"></th>
      <th class="col item-name-col">Product</th>
      <th class="col item-price-col">Price</th>
      <th class="col item-quantity-col">Quantity</th>
      <th class="col item-subtotal-col">Subtotal</th>
      <th class="col discard-item-col"></th>
    </tr>
    ${rows}
  </table>
  `

  container.innerHTML = cart_item_table;

  document.querySelectorAll('.item-discard')
    .forEach((btn) => {
      btn.addEventListener("click", function() {
        g_cart.remove(btn.getAttribute('data-id'))
        renderItems(container);
      });
    })

  const quantities = document.querySelectorAll('.item-quantity input')
  if (quantities) {
    quantities.forEach(q => {
      q.addEventListener("change", _ => {
        g_cart.updateQuantity(q.getAttribute('data-id'), parseInt(q.value))
      })
    })
  }

  const items_subtotal = document.querySelectorAll('.js-item-subtotal')
  if (items_subtotal) {
    console.log(items_subtotal)
    items_subtotal.forEach(item => {
      let id = item.getAttribute('data-id');
      item.innerText = money_to_string(g_cart.get_item_subtotal(id), 'Rs.')
      g_cart.register_item_subtotal(id, item)
    });
  }
}

function product_data(id, cart) {
  let product = loader.getSingleproduct(id + '')
  return `
    <td class="item-img-col">
      <div class="cell item-img flex-center" data-id="${id}"><img src="${product.image}" alt=""></div>
    </td>
    <td>
      <div class="cell item-name" data-id="${id}">${product.name}</div>
    </td>
    <td class="item-price-col">
      <div class="cell item-price" data-id=${id}>${money_to_string(product.price, product.currency)}</div>
    </td>
    <td class="item-quantity-col">
      <div class="cell item-quantity">
        <input data-id="${id}" type="number" value="${cart.get_item_quantity(id)}">
      </div>
    </td>
    <td class="">
      <div class="cell js-item-subtotal" data-id="${id}">
        ${money_to_string(product.price * g_cart.get_item_quantity(id), product.currency)}
      </div>
    </td>
    <td class="discard-item-col">
      <div class="cell item-discard" data-id="${id}">
        <img src="assets/icons/trashcan.svg">
      </div>
    </td>
  `
}

