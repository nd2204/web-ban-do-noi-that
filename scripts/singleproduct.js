import { ProductsLoader } from './product.js'
import { money_to_string } from './utils/money.js'
import { Cart } from './cart.js'

let cart = new Cart()

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

let loader = new ProductsLoader('.products-view');
const product = loader.getSingleproduct(getQueryVariable('id'))
loader.load(4);

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
  'form': (form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let data = new FormData(form);
      if (!data.get('color')) {
        alert("Please pick a color.");
      } else if (!data.get('size')) {
        alert("Please pick a size.");
      }

      cart.add(product.id, {
        size: data.get('size'),
        color: data.get('color'),
        quantity: data.get('quantity')
      })

      console.log(cart.get_cart())
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
