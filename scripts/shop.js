import { get_all_products } from './product.js'

let products = get_all_products();


let filter_result_count = parseInt(document.getElementById('show-count-input').value);
document.querySelector('#filter-result').innerText = `Showing 1-${filter_result_count}`

document.querySelectorAll('.icon')
    .forEach((img) => {
        img.addEventListener('click', (event) => {
            
        })
    })
