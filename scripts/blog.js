function blog_to_html(blog) {
  return `
    <div class="blog-ctn" data-id="${blog.id}">
      <div class="blog-img-ctn">
        <img src="${blog.image}" alt="${blog.title}">
      </div>
      <p class="blog-title">${blog.title}</p>
    </div>
  `;
}

function blog_is_in_container(blog, sel) {
  const blog_sel = `${sel} .blog-ctn[data-id='${blog.id}']`
  return document.querySelector(blog_sel) != null;
}

const CONTAINER_CLASSNAME = '.blog-view'

let g_blogs = []

if (g_blogs.length <= 0) {
  init_blogs();
}

function init_blogs() {
  let xhttp = new XMLHttpRequest();
  xhttp.onload = function() {
    if (this.readyState == 4 && this.status == 200) {
      g_blogs = JSON.parse(this.response)
    }
  }

  xhttp.open("GET", "../data/blogs.json", false);
  xhttp.send();
}

export function load_blogs(sel, numListing) {
  let count = 0;

  // Initialize if any argument is null/empty
  sel = (sel) ? sel : CONTAINER_CLASSNAME;
  numListing = (numListing) ? numListing : g_blogs.length

  let html = ""
  let container = document.querySelector(sel)
  if (!(sel !== CONTAINER_CLASSNAME || container.classList.contain(CONTAINER_CLASSNAME))) {
    container.classList.add(CONTAINER_CLASSNAME)
  }

  if (container) {
    for (let i = 0; i < numListing; ++i) {
      if (g_blogs[i] && !blog_is_in_container(g_blogs[i], sel)) {
        html += blog_to_html(g_blogs[i]);
        count++;
      }
    }
    container.innerHTML = html;
  } else {
    throw Error("Cannot find matching selector");
  }

  return count
}

export function get_blogs(count) {
  const valid_count = Math.min(count, g_blogs.length)
  let acc = [];
  for (let i = 0; i < valid_count; ++i) {
    acc.push(g_blogs[i]);
  }
  return acc;
}

export function get_all_blogs() {
  return g_blogs
}
