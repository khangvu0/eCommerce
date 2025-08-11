'use strict';

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
      <p class="price">$${product.price.toFixed(2)}</p>
    </a>
  `;
  return card;
}
