'use strict';

// Waits until the entire HTML is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Loads JSON file using fetch() which sends a request to get that file, returns a promise/future response
    fetch("../products.json")

    // Once the file is fetched, this turns the raw response into JSON data we can use (JS Objects).
    // Gives us an array of product objects to work with
    .then((res) => res.json())

    // The products variable now holds the full array of product objects from JSON file
    .then((products) => {
      products.forEach((product) => {

        // Builds a string to match the id of the correct div container
        const sectionId = `${product.category}-grid`; // e.g. tops-grid
        const container = document.getElementById(sectionId);
        if (container) {
          const card = createProductCard(product);
          container.appendChild(card);
        }
      });
    })
    .catch((err) => console.error("Error loading products:", err));
});

// Helper function that takes product object as input and returns div element styled as a product card
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  // Use a template literal to inject the product's image, name, price, and description into the card
  card.innerHTML = `
    <a href="detail.html?id=${product.id}">
        <img src="../${product.image}" alt="${product.name}" />
        <h3 class="name">${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
    </a>
  `;

  return card;
}

// Footer Form Validation
function validate(event){
    event.preventDefault(); 
    document.querySelectorAll('.footer--error').forEach(div => div.textContent = '');

    const form = document.getElementById('footer-form');
    const phone = document.getElementById('phone');
    const phoneRegex = /^(?:\(\d{3}\)[\s\-\.]?|\d{3}[\s\-\.]?)\d{3}[\s\-\.]?\d{4}$/;

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