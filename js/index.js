'use strict';

// Best Seller Product Rendering
document.addEventListener("DOMContentLoaded", () => {
  fetch("products.json")
    .then(res => res.json())
    .then(products => {
      const bestSellerIds = [1, 3, 5, 6]; // Adjust to change product items displayed
      const bestSellers = products.filter(product => bestSellerIds.includes(product.id));

      const bestSellersDiv = document.querySelector(".best-sellers-div");

      bestSellers.forEach(product => {
        const card = createProductCard(product);
        bestSellersDiv.appendChild(card);
      });
    })
    .catch(err => console.error("Error loading products:", err));
});

function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  card.innerHTML = `
    <a href="pages/detail.html?id=${product.id}">
      <img src="${product.image}" alt="${product.name}" />
      <h3 class="name">${product.name}</h3>
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