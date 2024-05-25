import { get_singleproduct } from './product.js'

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

const selectors = {
  productName: '.product-name',
  mainImage: '.main-img-ctn img',
}

const product = get_singleproduct(getQueryVariable('id'))

document.querySelectorAll(selectors.productName).forEach(
  (productName) => { productName.innerText = product.name}
)
document.querySelector('.product-price').innerText
  = product.currency + ' ' + (product.price).toFixed(2)

const spotlight_img = document.querySelector(selectors.mainImage)
spotlight_img.src = product.image;
console.log(spotlight_img)
// console.log(product)

document.querySelectorAll('.gallery-img')
  .forEach((img) => {
    img.src = product.image
  })

document.querySelector('.product-description-brief').innerHTML
  = product.description;

document.querySelector('.star-rating').innerHTML
  = convert_rating_to_star(product.rating.value);

let quantity = document.querySelector('.quantity');
document.querySelector('.increment').addEventListener("click",(event) => {
  quantity.value = parseInt(quantity.value) + 1;
})
document.querySelector('.decrement').addEventListener("click",(event) => {
  if (quantity.value <= 1) return;
  quantity.value = parseInt(quantity.value) - 1;
})

document.querySelector('.rating-count').innerHTML
  = product.rating.count + ' Customer Review';


let form = document.querySelector('form')
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let data = new FormData(this);
  console.log(data)
})
