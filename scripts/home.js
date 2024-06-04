import { ProductsLoader } from './product.js'
import {get_blogs} from './blog.js'

let products = new ProductsLoader('.products-view');
products.load(4);

function format_date(date) {
  let formated = ""
  if (date.day == 1) formated += date.day + "<sup>st</sup>"
  else if (date.day == 2) formated += date.day + "<sup>st</sup>"
  else formated += date.day + "<sup>th</sup>"
  return formated + ' ' + date.month + ' ' + date.year
}

let blogs = get_blogs(3);
let html = ""
const container = document.querySelector(".blogs-view")
for (let i = 0; i < blogs.length; ++i) {
  html += `
    <div class="blog-ctn">
      <div class="blog-img-ctn"><img src="${blogs[i].image}" alt="${blogs.title}"></div>
      <p class="blog-title">${blogs[i].title}</p>
      <div class="read-more-btn">
        <a href="#">Read More</a><hr>
      </div>
      <div class="blog-duration">
        <img class="clock-icon" src="./assets/icons/clock.svg">
        <span class="read-duration">${blogs[i].duration}</span>
      </div>
      <div class="blog-date">
        <img class="calendar-icon" src="./assets/icons/calendar.svg">
        <span class="blog-created-date">${format_date(blogs[i].date)}</span>
      </div>
    </div>
  `
}
container.innerHTML = html;
