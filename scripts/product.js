document.addEventListener("DOMContentLoaded", () => {
  const product_css = "/css/product.css"
  if (!document.querySelector("link[href='${product_css}']")) {
    let link = document.createElement("link");
    link.href = product_css;
    link.rel = 'stylesheet';
    document.head.appendChild(link)
  }
})

function product_to_html(product) {
  return `
    <div class="product-ctn" data-id="${product.id}">
      <div class="product-img-ctn">
        <img src="${product.image}" alt="${product.name}">
      </div>
      <p class="product-title">${product.name}</p>
      <p class="product-price">${product.currency} ${product.price.toFixed(2)}</p>
    </div>
  `;
}

function product_is_in_container(product, sel) {
  const product_sel = `${sel} .product-ctn[data-id='${product.id}']`
  return document.querySelector(product_sel) != null;
}

let products = []

export function load_products(sel, numListing) {
  let xhttp = new XMLHttpRequest();
  let count = 0;

  xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
      products = JSON.parse(this.response)['products']

      // Initialize if any argument is null/empty
      sel = (sel) ? sel : '.products-view';
      numListing = numListing | products.length

      let html = ""
      let container = document.querySelector(sel)
      if (container) {
        for (let i = 0; i < numListing; ++i) {
          if (products[i] && !product_is_in_container(products[i], sel)) {
            html += product_to_html(products[i]);
            count++;
          }
        }
        container.innerHTML = html;
      } else {
        throw Error("Cannot find matching selector");
      }
    }
  }

  xhttp.open("GET", "../scripts/products.json", true);
  xhttp.send();

  return count
}

export function get_products() {
  return products
}
