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
        const id = getURLId();
        var result;
        result = products.find((element) => {
            return element.id == id;
        })
        console.log(result);
    }) 
});

// Helper function that takes product object as input and returns div element styled as a product card
function createProductCard(product) {
  const card = document.createElement("div");
  card.className = "product-card";

  // Use a template literal to inject the product's image, name, price, and description into the card
  card.innerHTML = `
    <a href="detail.html?id=${product.id}">
        <img src="../${product.image}" alt="${product.name}" />
        <h3>${product.name}</h3>
        <p class="price">$${product.price.toFixed(2)}</p>
        <p class="desc">${product.description}</p>
    </a>
  `;

  return card;
}

function getURLId() {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    const id = params.get("id");
    console.log(id);
    return id;
}

