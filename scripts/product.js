document.addEventListener("DOMContentLoaded", () => {
  const product_css = "/css/product.css"
  if (!document.querySelector("link[href='${product_css}']")) {
    let link = document.createElement("link");
    link.href = product_css;
    link.rel = 'stylesheet';
    document.head.appendChild(link)
  }
  load_products();
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

function product_is_in_container(product, className) {
  return document.querySelector(`${className} .product-ctn[data-id='${product.id}']`);
}

function load_products(className, numListing) {
  let xhttp = new XMLHttpRequest();
  let count = 0;

  xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
      const data = JSON.parse(this.response)
      const products = data['products']
      let html = ""
      console.log(products)
      let containerClass = (className) ? className : 'products-view';
      let container = document.querySelector('.' + containerClass)
      numListing = numListing
        | products.length
      for (let i = 0; i < numListing; ++i) {
        if (products[i] && !product_is_in_container(products[i], container.className)) {
          html += product_to_html(products[i]);
          count++;
        }
      }
      console.log(container)
      container.innerHTML = new String(html);
    }
  }

  xhttp.open("GET", "/scripts/products.json", true);
  xhttp.send();

  return count
}

