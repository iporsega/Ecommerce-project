
let total = 0;
window.addEventListener('load', () => {
	
	// display the products in cart
	const cart = JSON.parse(localStorage.getItem('cart'));
	
	// calculate total price
	if(cart) {
		cart.forEach(product => {
			total = total + Number(product.price) * product.noOfProd;
		});
		
		// recode the products in cart and display it
		const productCards = cart.map((product) =>
		`<div class="row main">
		<div class="row align-items-center">
		<div class="col-2"><img class="img-fluid" src="${product.imageURL}.png"></div>
		<div class="col">
		<small>Product ID: ${product.id}</small>
		<p class="prod-name">${product.name}</p>
		<p class="prod-price">${product.price} RON</p>
		</div>
		<div class="col">
		<p class="prod-qty">
		<button data-product-id=${product.id} class="decrement btn"> - </button>
		<span class="no-of-products">${product.noOfProd}</span>
		<button data-product-id=${product.id} class="increment btn"> + </button>
		</p>
		</div>
		<div class="col">
		<button data-product-id=${product.id} class="delete btn"> X </button>
		</div>
		</div>
		</div>`
		).join('');
		
		let totalPrice = `
		<div class="total-section">
		<p class="total-price">Total price is: <strong>${total} RON</strong></p>
		<a href="index.html" class="button grey">More shopping</a> 
		<a href="#" class="button">Continue to checkout</a>
		</div>`;
		document.querySelector('.cart-container').innerHTML = productCards;
		document.querySelector('.total-price-container').innerHTML = totalPrice;
	}
});

const cartContainer = document.querySelector('.cart-container');
cartContainer.addEventListener('click', handleCartActions);

function handleCartActions(event) {
	const targetButton = event.target;
	let cart = JSON.parse(localStorage.getItem('cart'));
	const productInCart = cart.find(productFromCart => productFromCart.id == targetButton.getAttribute('data-product-id'));
	let quantityParagraph = targetButton.parentNode;
	
	
	if (targetButton.classList.contains('increment')) {
		productInCart.noOfProd++;
	} else if (targetButton.classList.contains('decrement')) {
		if (productInCart.noOfProd > 1) productInCart.noOfProd--;
	} else if (targetButton.classList.contains('delete')) {
		total -= productInCart.noOfProd * productInCart.price;
		let totalPrice = `
		<div class="total-section">
		<p class="total-price">Total price is: <strong>${total} RON</strong></p>
		<a href="index.html" class="button grey">More shopping</a> 
		<a href="#" class="button">Continue to checkout</a>
		</div>`;
		document.querySelector('.total-price-container').innerHTML = totalPrice;
		productInCart.noOfProd = 0;
		cart = cart.filter((product) => product.id != productInCart.id);
		targetButton.parentNode.parentNode.remove();
		if(cart.length == 0) {
			document.querySelector(".total-price-container").style.display = "none";
			document.querySelector(".cart-container").innerHTML = `<h2>The cart is empty...</h2> <a href="index.html" class="button grey">Return to shopping</a>`;
		}
	}
	
	localStorage.setItem('cart', JSON.stringify(cart));
	
	if (productInCart) {
		quantityParagraph.querySelector('.no-of-products').innerHTML = productInCart.noOfProd;
		
		let total = 0;
		cart.forEach((product) => {
			total = total + Number(product.price) * product.noOfProd;
		});
		
		let totalPriceCard = `
		<div class="total-section">
		<p class="total-price">Total price is: <strong>${total} RON</strong></p>
		<a href="index.html" class="button grey">More shopping</a>
		<a href="#" class="button">Continue to checkout</a>
		</div>`;
		document.querySelector('.total-price-container').innerHTML = totalPriceCard;
	} 	
}












