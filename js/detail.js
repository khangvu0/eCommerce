'use strict';

const main = document.querySelector('main');

// Waits until the entire HTML is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Loads JSON file using fetch() which sends a request to get that file, returns a promise/future response
    fetch('../products.json')
        // Once the file is fetched, this turns the raw response into JSON data we can use (JS Objects).
        // Gives us an array of product objects to work with
        .then((res) => res.json())

        // Grabbing the element that matches the id
        .then((products) => {
            const id = getURLId();
            //     var result;
            //     result = products.find((element) => {
            //         return element.id == id;
            //     })
            //     console.log(result);
            // })
            const result = products.find((element) => element.id == id);
            if (result) {
                const productElement = createProductPage(result);
                main.appendChild(productElement);
            }
        });
});

// Helper function that takes product object as input and returns div element styled as a product card
function createProductPage(product) {
    const container = document.createElement('div');
    container.className = 'product-detail';

    // Update the <title> tag
    document.title = 'KHNG | ' + product.name;

    container.innerHTML = `
        <img src="../${product.image}" alt="${product.name}" class="product-image" />
        <div class="product-info">
            <h1 class="product-name">${product.name}</h1>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <p class="product-description">${product.description}</p>
            <button id="add-to-cart" class="add-to-cart-btn">Add to Cart</button>
        </div>
    `;

    // Click event listener for add to cart button
    const addToCartBtn = container.querySelector('#add-to-cart');
    addToCartBtn.addEventListener('click', () => {
        addToCart(product);
    });

    return container;
}

function getURLId() {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    const id = params.get('id');
    console.log(id);
    return id;
}

function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if product already exists in cart
    const existing = cart.find((item) => item.id === product.id);
    if (existing) {
        existing.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
}
