import { ProductsLoader } from './product.js'

let loader = new ProductsLoader('.products-view');

function serialize(object) {
  let serialized = ""
  for (let [k, v] of Object.entries(object)) {
    serialized += `${k}=${v}&`
  }
  return serialized.replace(/&$/,'')
}

function getAllQueryVariable() {
  let result = {};
  let query = window.location.search.replace('?', '');
  let vars = query.split('&');
  for (let i = 0; i < vars.length; i++) {
    let pair = vars[i].split('=');
    const key = decodeURIComponent(pair[0])
    let value = decodeURIComponent(pair[1])
    if (key) {
      if (!isNaN(value)) {
        result[key] = parseInt(decodeURIComponent(value));
      } else {
        result[key] = decodeURIComponent(value);
      }
    }
  }
  return result
}

// redirect when default access
let queries = getAllQueryVariable();
if (Object.entries(queries).length == 0) {
  queries['sort'] = 'default'
  queries['limit'] = 16
  queries['layout'] = 'grid'
  queries['page'] = 1
  location.href = 'shop.html?' + serialize(queries)
}

window.addEventListener("DOMContentLoaded", () => {
  console.log("current queries: ", queries)

  document.querySelector('#options').addEventListener("submit", (event) => {
    event.preventDefault();
  })

  display_product(queries)
  let paginate = document.querySelector('.paginate-block')
  generatePageCount(queries, paginate);

  document.querySelectorAll('form input, form select')
    .forEach((input) => {
      input.addEventListener('change', () => {
        display_product(get_options())
        generatePageCount(get_options(), paginate);
        // updatelink(opts)
      })
    })
})

function get_options() {
  const form = document.querySelector('#options');
  let data = new FormData(form);
  return {
    layout: data.get('layout'),
    limit: parseInt(data.get('limit')),
    sort: data.get('sort'),
    page: queries.page,
  }
}

function calculatePageCount(opts) {
  return Math.ceil(loader.entries() / opts.limit);
}

function getLink(opts) {
  return location.href.replace(/\?.*$/, '?' + serialize(opts))
}

function generatePageCount(opts, container) {
  let html = ""
  console.log("generatePageCount called width opts: ", opts);
  let currentPage = "paginate-current"
  for (let i = 1; i <= calculatePageCount(opts); ++i) {
    let link = getLink(opts).replace(/page=[0-9]*/, `page=${i}`)
    html += `<a class="paginate-index paginate-btn ${(i == opts.page) ? currentPage : ''}" href="${link}">${i}</a>`
  }
  container.innerHTML = `
    <input type="button" id="paginate-prev" class="paginate-btn hide" value="prev">
    ${html}
    <input type="button" id="paginate-next" class="paginate-btn hide" value="next">
  `

  let prev_btn = document.querySelector('#paginate-prev')
  let next_btn = document.querySelector('#paginate-next')

  if (opts.page == 1) prev_btn.classList.add("hide");
  else prev_btn.classList.remove("hide")
  if (opts.page == calculatePageCount(opts)) next_btn.classList.add("hide");
  else next_btn.classList.remove("hide");
}

function display_product(opts) {
  console.log("current options: ", opts)
  opts.page = (isNaN(opts.page)) ? 1 : opts.page;

  console.log(calculatePageCount(opts))
  let offset = opts.limit * Math.abs(opts.page - 1)
  if (offset > loader.entries()) return;

  let loaded = loader.load(opts.limit, opts.layout, opts.limit * (opts.page - 1))
  if (loader.entries() > opts.page)
  console.log(loader)

  let result_string = ""
  if (loaded <= 0) {
    result_string += "No result found"
  }
  else {
    result_string += `Showing 1-${loaded} of ${loader.entries()}`;
    result_string += (loader.entries() > 1) ? ' results' : ' result'
  }

  document.querySelector('#limit').value = opts.limit
  document.querySelector('#filter-result').innerText = result_string
}


// function get_product_page(pageNumber, limit) {
  
// }
