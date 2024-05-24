import { get_singleproduct } from './product.js'

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

const spotlight_img = document.querySelector('.spotlight-img')
spotlight_img.src = product.image;
console.log(spotlight_img)
// console.log(product)
