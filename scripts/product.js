import { money_to_string } from './utils/money.js'

function product_to_html(product) {
  return `
    <a href="./singleproduct.html?id=${product.id}">
      <div class="product-ctn" data-id="${product.id}">
        <div class="product-img-ctn">
          <img src="${product.image}" alt="${product.name}">
        </div>
        <p class="product-title">${product.name}</p>
        <p class="product-price">${money_to_string(product.price, product.currency)}</p>
      </div>
    </a>
  `;
}

function product_is_in_container(product, sel) {
  const product_sel = `${sel} .product-ctn[data-id='${product.id}']`
  return document.querySelector(product_sel) != null;
}

const CONTAINER_CLASSNAME = '.product-view'

let g_products = []

if (g_products.length <= 0) {
  init_product();
}

function init_product() {
  let xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
      g_products = JSON.parse(this.response)
    }
  }

  xhttp.open("GET", "../data/products.json", false);
  xhttp.send();
}

export function load_products(sel, numListing, product_list) {
  product_list = product_list || g_products;
  // Only add style when loading product to a container
  document.addEventListener("DOMContentLoaded", () => {
    const product_css = "../css/product.css"
    if (!document.querySelector("link[href='${product_css}']")) {
      let link = document.createElement("link");
      link.href = product_css;
      link.rel = 'stylesheet';
      document.head.appendChild(link)
    }
  })

  let count = 0;

  // Initialize if any argument is null/empty
  sel = (sel) ? sel : CONTAINER_CLASSNAME;
  numListing = (numListing) ? numListing : product_list.length

  let html = ""
  let container = document.querySelector(sel)
  if (!(sel !== CONTAINER_CLASSNAME || container.classList.contain(CONTAINER_CLASSNAME))) {
    container.classList.add(CONTAINER_CLASSNAME)
  }

  if (container) {
    for (let i = 0; i < numListing; ++i) {
      if (product_list[i] && !product_is_in_container(product_list[i], sel)) {
        html += product_to_html(product_list[i]);
        count++;
      }
    }
    container.innerHTML = html;
  } else {
    throw Error("Cannot find matching selector");
  }

  return count
}

export function filter_product() {

}

export function get_all_products() {
  return g_products;
}

export function get_singleproduct(id) {
  for (let p of g_products) {
    if (p.id == id) return p;
  }
  return null;
}
