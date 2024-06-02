import { ProductsLoader } from './product.js'
import { money_to_string } from './utils/money.js'
import { Cart } from './cart.js'

let cart = new Cart()

function hex_to_alnum(hex_string) {
  return hex_string.replace('#', '')
}

function convert_rating_to_star(rating) {
  let html = ""
  if (rating < 0.0 || rating > 5.0) {
    return html;
  }

  let frac = rating - Math.floor(rating);
  for (let i = 0; i < Math.floor(rating); ++i) {
    html += `<img class="star" src="assets/icons/star-full.svg">\n`;
  }
  if (frac > 0.75) {
    html += `<img class="star" src="assets/icons/star-full.svg">`;
  } else if (frac > 0.25) {
    html += `<img class="star" src="assets/icons/star-half.svg">\n`;
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

const querySelectorCallback = {
  '.main-img-ctn img': (element) => { element.src = product.image },
  '.product-price': (element) => { element.innerText = money_to_string(product.price, product.currency)},
  '.product-description-brief': (element) => { element.innerText = product.description },
  '.star-rating': (element) => { element.innerHTML = convert_rating_to_star(product.rating.value) },
  '.rating-count': (element) => { element.innerHTML = product.rating.count + ' Customer Review'; },
  '.gallery-slide': (element) => { 
    let html = ""
    product.gallery.forEach((url) => {
      html += `<div class="gallery-item"><img class="gallery-img" src="${url}"></div>`
    })
    element.innerHTML = html
  },
  '.increment': (element) => { element.addEventListener("click",
    (event) => {
      let quantity = document.querySelector('.quantity');
      quantity.value = parseInt(quantity.value) + 1;
    })
  },
  '.decrement': (element) => { 
    element.addEventListener("click", () => {
      let quantity = document.querySelector('.quantity');
      if (quantity.value <= 1) return;
      quantity.value = parseInt(quantity.value) - 1;
    }
    )
  },
  '.product-variation': (element) => {
    if (!element || !product.variations) return;

    let html = ""

    const p_sizes = product.variations.size;
    const p_colors = product.variations.colors;

    if (p_sizes) {
      html += `
        <p class="txt-s-14 txt-caption" style="margin-bottom:12px">Size</p>
        <div class="variation-size">
      `
      product.variations.sizes.forEach((size) => {
        html += `
          <input type="radio" name="size" value="${size}" id="size-${size}" required>
          <label class="size" for="size-${size}">${size}</label>
        `
      })
      html += `</div>`
    }

    if (p_colors) {
      html += `
        <p class="txt-s-14 txt-caption" style="margin-bottom:12px">Color</p>
        <div class="variation-color">
      `
      product.variations.colors.forEach((color) => {
        let hexValue = hex_to_alnum(color)
        html += `
          <input type="radio" name="color" value="${hexValue}" id="${hexValue}" required>
          <label class="color" for="${hexValue}" style="background-color: ${color}"></label>
        `
      })
      html += `</div>`
    }

    element.innerHTML = html;
  },
  '.product-sku': (element) => {
    let html = (product.sku) ? product.sku : "N/A"
    element.innerHTML = html;
  },
  '.product-category': (element) => {
    let html = (product.category) ? product.category : "N/A"
    element.innerHTML = html;
  },
  '.product-tags': (element) => {
    let html = (product.tags) ? product.tags : "N/A"
    element.innerHTML = html;
  },
  'form': (form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      let data = new FormData(form);
      if (product.variations) {
        if (product.variations.colors && !data.get('color')) {
          alert("Please pick a color."); return;
        }
        if (product.variations.sizes && !data.get('size')) {
          alert("Please pick a size."); return;
        }
      }

      cart.add(product.id, {
        size: data.get('size'),
        color: data.get('color'),
        quantity: data.get('quantity')
      })

      cart.save();
    })
  },
}

const querySelectorAllCallback = {
  '.product-name': (element) => { element.forEach((productName) => { productName.innerText = product.name}) },
}

function slide_scroll(indexOffset, currentIndexWrapper, items, slide) {
  // First reset the previous background color
  items[currentIndexWrapper.value].style.backgroundColor = "#FFF9E5";

  let newIndex = currentIndexWrapper.value + indexOffset;
  currentIndexWrapper.value = (newIndex < 0) ? items.length - 1 : newIndex % items.length;

  slide.style.top = currentIndexWrapper.value * -110;
  // highlight the current background color
  items[currentIndexWrapper.value].style.backgroundColor = "#FBEBB5";
}

function update_main_img(currentIndexWrapper, items, mainImage) {
  mainImage.src = items[currentIndexWrapper.value].children[0].src
}

window.onload = function () {
  for (const [k, v] of Object.entries(querySelectorCallback)) {
    v(document.querySelector(k))
  }

  for (const [k, v] of Object.entries(querySelectorAllCallback)) {
    v(document.querySelectorAll(k))
  }

  let items = document.querySelectorAll('.gallery-item')
  let slide = document.querySelector('.gallery-slide')
  let main = document.querySelector('.main-img-ctn img')

  let currentIndexWrapper = { value: 0 };

  slide_scroll(0, currentIndexWrapper, items, slide)
  items[currentIndexWrapper.value].style.backgroundColor = "#FBEBB5"
  console.log(items[currentIndexWrapper.value])

  items.entries().forEach((item) => {
    item[1].addEventListener("click", () => {
      slide_scroll(item[0] - currentIndexWrapper.value, currentIndexWrapper, items, slide);
      update_main_img(currentIndexWrapper, items, main)
    })
  })

  document.querySelector('.gallery-prev')
    .addEventListener("click", (event) => {
      slide_scroll(-1, currentIndexWrapper, items, slide);
      update_main_img(currentIndexWrapper, items, main)
    })
  document.querySelector('.gallery-next')
    .addEventListener("click", (event) => {
      slide_scroll(1, currentIndexWrapper, items, slide);
      update_main_img(currentIndexWrapper, items, main)
    })
}

