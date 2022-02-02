// export function showDetails() {}

// display product details

window.addEventListener('load', async() => {
    let searchParamString = window.location.search;
    const searchParam = new URLSearchParams(searchParamString);
    const productId = searchParam.get('product-id');
    
    const result = await fetch(`https://61e06cec63f8fc001761875f.mockapi.io/products/${productId}`);
    const product = await result.json();
    
    const output = 
    `<div class="container bootdey">
    <div class="col-md-12">
    <section class="panel">
    <div class="panel-body">
    <div class="col-md-6">
    <div class="pro-img-details">
    <img src="${product.imageURL}.png" alt="">
    </div>
    </div>                
    <div class="col-md-6">
    <h2>${product.name}</h2>
    <small>Product ID: ${product.id}</small>
    <p>${product.description}</p>
    <h3>${product.price} RON</h3>
    <div class="form-group">
    Quantity<input type="quantiy" placeholder="1" class="form-control quantity">
    <button class="button add-to-cart" data-product-id=${product.id} type="button"><i class="fa fa-shopping-cart"></i> Add to Cart</button>
    </div>
    </div>
    </div>
    </section>
    </div>
    </div>`;
    
    document.querySelector('.product-details').innerHTML = output;  
});

document.querySelector('.product-details').addEventListener('click', addToCart);  

async function addToCart(event) {
    console.log(event.target);
    const addToCartBtn = event.target;
    let productId = addToCartBtn.getAttribute('data-product-id');
    
    const result = await fetch(`https://61e06cec63f8fc001761875f.mockapi.io/products/${productId}`);
    const product = await result.json();
    
    let cart;
    if (localStorage.getItem('cart') == null) {
        cart = [product];
    } else {
        cart = JSON.parse(localStorage.getItem('cart'));
        cart.push(product);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(cart);
}
