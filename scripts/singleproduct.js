import { get_singleproduct } from './product.js'
import { money_to_string } from './utils/money.js'
import * as Cart from './cart.js'

function convert_rating_to_star(rating) {
  let html = ""
  if (rating < 0.0 || rating > 5.0) {
    return html;
  }

  let frac = rating - Math.floor(rating);
  for (let i = 0; i < Math.floor(rating); ++i) {
    html += `<img class="star" src="../assets/icons/star-full.svg">\n`;
  }
  if (frac > 0.75) {
    html += `<img class="star" src="../assets/icons/star-full.svg">`;
  } else if (frac > 0.25) {
    html += `<img class="star" src="../assets/icons/star-half.svg">\n`;
  }
  return html;
}

function getQueryVariable(variable) {
  let query = window.location.search.substring(1);
  let vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}

const product = get_singleproduct(getQueryVariable('id'))

let quantity = document.querySelector('.quantity');
const querySelectorCallback = {
  '.main-img-ctn img': (element) => { element.src = product.image },
  '.product-price': (element) => { element.innerText = money_to_string(product.price, product.currency)},
  '.product-description-brief': (element) => { element.innerText = product.description },
  '.star-rating': (element) => { element.innerHTML = convert_rating_to_star(product.rating.value) },
  '.rating-count': (element) => { element.innerHTML = product.rating.count + ' Customer Review'; },
  '.increment': (element) => { element.addEventListener("click", () => quantity.value = parseInt(quantity.value) + 1) },
  '.decrement': (element) => { 
    element.addEventListener("click", () => {
        if (quantity.value <= 1) return;
        quantity.value = parseInt(quantity.value) - 1;
      }
    )
  },
  'form': (element) => {
    element.addEventListener("submit", (event) => {
      event.preventDefault();
      let data = new FormData(form);
      const quantity = data.get('quantity');
      // Cart.add()
    })
  },
}

const querySelectorAllCallback = {
  '.gallery-img': (element) => { element.forEach((img) => {img.src = product.image}) },
  '.product-name': (element) => { element.forEach((productName) => { productName.innerText = product.name}) },
}

for (const [k, v] of Object.entries(querySelectorCallback)) {
  v(document.querySelector(k))
}

for (const [k, v] of Object.entries(querySelectorAllCallback)) {
  v(document.querySelectorAll(k))
}
