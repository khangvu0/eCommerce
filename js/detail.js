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
            const result = products.find((element) => element.id == id);

            if (result) {
                const productElement = createProductPage(result);
                main.appendChild(productElement);
            }
        });
});

// Helper function that takes product object as input and returns div element styled as a product page
function createProductPage(product) {
    const container = document.createElement('div');
    container.className = 'product-detail';

    // Update the <title> tag
    document.title = 'KHNG | ' + product.name;

    container.innerHTML = `
        <img src="../${product.image}" alt="${
        product.name
    }" class="product-image" />
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

function addToCart(product) {}

// Footer Form Validation
function validate(event) {
    event.preventDefault();
    document
        .querySelectorAll('.footer--error')
        .forEach((div) => (div.textContent = ''));

    const form = document.getElementById('footer-form');
    const phone = document.getElementById('phone');
    const phoneRegex =
        /^(?:\(\d{3}\)[\s\-\.]?|\d{3}[\s\-\.]?)\d{3}[\s\-\.]?\d{4}$/;

    let valid = true;

    if (!phoneRegex.test(phone.value)) {
        valid = false;
        showError('phone', 'Please enter a valid phone number.');
        phone.classList.remove('input-valid');
        phone.classList.add('input-invalid');
    } else {
        phone.classList.remove('input-invalid');
        phone.classList.add('input-valid');
    }

    if (valid) {
        alert('Form submitted successfully');
        document.getElementById('form').reset();
        phone.classList.remove('input-valid');

        const errorDiv = document.getElementById('phone-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }
}

// Error function - passes in id from validate function and spits out corresponding message
function showError(id, message) {
    const errorDiv = document.getElementById('phone-error');
    if (errorDiv) {
        errorDiv.textContent = message;
    }
}
