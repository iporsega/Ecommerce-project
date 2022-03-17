// import { showDetails } from "./details.js";
// import { Product } from "./Product.js"

// display product cards in index.html

window.addEventListener('load', showCards);

async function showCards() {
    let result = await fetch("https://620c9a6db573632593921e1c.mockapi.io/products/products");
    console.log(result);
    let getProducts = await result.json();
    
    let output = getProducts.map((product) => `<div class="product-card">
       <img class="product-img" src="${product.imageURL}.png">
       <div class="short-desc">
          <h3>${product.name}</h3>
          <p class="price">${product.price} RON</p>
       </div>
       <div class="btn-set">
          <a href="details.html?product-id=${product.id}" class="button details">Details</a>
       </div>
    </div>`
    ).join('');

    document.querySelector(".products-grid").innerHTML = output;
}
