import { ProductsLoader } from './product.js'

let loader = new ProductsLoader('.products-view');


function getAllQueryVariable() {
  let result = {};
  let query = window.location.search.substring(1);
  let vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    const key = decodeURIComponent(pair[0])
    let value = decodeURIComponent(pair[1])
    if (!isNaN(value)) {
      result[key] = parseInt(decodeURIComponent(value));
    } else {
      result[key] = decodeURIComponent(value);
    }
  }
  return result
}

let queries = getAllQueryVariable();
if (!queries) {
  queries = {}
  queries.sort = 'default',
  queries.limit = 16,
  queries.layout = 'grid'
  queries.page = 1
}

console.log(queries)

document.addEventListener("DOMContentLoaded", () => {
  display_product(get_options('#options'))
  document.querySelectorAll('form input, form select')
    .forEach((input) => {
      input.addEventListener('change', () => {
        display_product(get_options('#options'))
      })
    })

  let prev_btn = document.querySelector('#paginate-prev')
  let next_btn = document.querySelector('#paginate-next')

  document.querySelectorAll('.paginate-index')
    .forEach((index) => {
      index.addEventListener("click", () => {
      alert("clicked")
      console.log(getAllQueryVariable())
    })
  })
})

function get_options(form_selector) {
  if (!form_selector) {
    throw Error("Invalid use of get_options: missing argument")
  }

  const form = document.querySelector(form_selector);
  let data = new FormData(form);

  return {
    layout: data.get('layout'),
    limit: parseInt(data.get('limit')),
    sort: data.get('sort')
  }
}

function display_product(options) {
  let loaded = loader.load(options.limit, options.layout)
  console.log(loader)

  let result_string = ""
  if (loaded <= 0) {
    result_string += "No result found"
  }
  else {
    result_string += `Showing 1-${loaded} of ${loader.entries()}`;
    result_string += (loader.entries() > 1) ? ' results' : ' result'
  }
  document.querySelector('#filter-result').innerText = result_string
}

function get_product_page(pageNumber, limit) {
  
}
