window.addEventListener('load', () => {
	const products = JSON.parse(localStorage.getItem('cart'));
	console.log(products);
	const productCards = products.map((product) =>
	`<div class="row main">
	<div class="row align-items-center">
	<div class="col-2"><img class="img-fluid" src="${product.imageURL}.png"></div>
	<div class="col">
	<small>Product ID: ${product.id}</small>
	<p class="prod-name">${product.name}</p>
	</div>
	<div class="col qty-section"><button class="minus"><i class="fas fa-minus"></i></button><input class="qty" type="text" value = 1><button class="plus"><i class="fas fa-plus"></i></button></div>
	<div class="col prod-price">${product.price} RON<span class="remove-from-cart">&#10005;</span></div>
	</div>
	</div>`
	).join('');
	document.querySelector('.cart-container').innerHTML = productCards;
	
	// change quatity of one product
	
	document.querySelector(".plus").addEventListener("click", () => {
		document.querySelector(".qty").value = parseInt(document.querySelector(".qty").value) + 1;
		if (document.querySelector(".qty").value >= parseInt(10)) {
			document.querySelector(".qty").value = 10;
		}
	});
	
	document.querySelector(".minus").addEventListener("click", () => {
		document.querySelector(".qty").value = document.querySelector(".qty").value - 1;
		if (document.querySelector(".qty").value <= parseInt(1)) {
			document.querySelector(".qty").value = 1;
		}
	});	
});











