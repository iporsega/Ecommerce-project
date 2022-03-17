// export function showDetails() {}

// display product details

window.addEventListener('load', async() => {
    let searchParamString = window.location.search;
    const searchParam = new URLSearchParams(searchParamString);
    const productId = searchParam.get('product-id');
    
    
    // Use this for fetch local json
    
    const result = await fetch("https://620c9a6db573632593921e1c.mockapi.io/products/products");
    const product = await result.json();
    const productFind = product.find(product_id => product_id.id === productId);
    
    for(let i = 0; i < product.length; i++) {
        if(productFind) {
            const output = 
            `<div class="container bootdey">
            <div class="col-md-12">
            <section class="panel">
            <div class="panel-body">
            <div class="col-md-6">
            <div class="pro-img-details">
            <img src="${productFind.imageURL}.png" alt="">
            </div>
            </div>                
            <div class="col-md-6">
            <h2>${productFind.name}</h2>
            <small>Product ID: ${productFind.id}</small>
            <p>${productFind.description}</p>
            <h3>${productFind.price} RON</h3>
            <div class="add-to-cart-section">
            <button class="button add-to-cart" data-product-id=${productFind.id} type="button"><i class="fa fa-shopping-cart"></i> Add to Cart</button>
            </div>
            </div>
            </div>
            </section>
            </div>
            </div>`;
            document.querySelector('.product-details').innerHTML = output;           
        }
    }
    
    document.querySelector('.product-details').addEventListener('click', addToCart);
    
    function addToCart(event) {
        console.log(event.target);
        const addToCartBtn = event.target;
        
        let succesMsg = document.createElement("div");
        succesMsg.classList.add("succes-msg");
        succesMsg.innerHTML = "✓ Produsul a fost adaugat in cos";
        console.log(succesMsg);
        
        let cart = [];
        if (localStorage.getItem('cart') == null) {
            cart.push({...productFind, noOfProd: 1});
            document.querySelector('.add-to-cart-section').appendChild(succesMsg);
            setTimeout( () => succesMsg.remove(), 1000);
        } else {
            cart = JSON.parse(localStorage.getItem('cart'));
            console.log(cart);
            const productSearch = cart.find((productFromCart) => productFromCart.id == productId);
            if(productSearch) {
                productSearch.noOfProd++;
                document.querySelector('.add-to-cart-section').appendChild(succesMsg);
                setTimeout( () => succesMsg.remove(), 1000);
            } else {
                const productAdd = {...productFind, noOfProd: 1};
                cart.push(productAdd);
                document.querySelector('.add-to-cart-section').appendChild(succesMsg);
                setTimeout( () => succesMsg.remove(), 1000);
            }
        }
        
        //     // display the products added in cart
        
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    }
    
    
});



