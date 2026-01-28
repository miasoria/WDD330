import { getLocalStorage, renderListWithTemplate } from "./utils.mjs";

// Template function for each cart item
function cartItemTemplate(item) {
  return `
    <li class="cart-card divider">
      <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
        <img src="${item.Image}" alt="${item.Name}" />
      </a>
      <a href="/product_pages/index.html?product=${item.Id}">
        <h2 class="card__name">${item.Name}</h2>
      </a>
      <p class="cart-card__color">${item.Colors[0]?.ColorName || "N/A"}</p>
      <p class="cart-card__quantity">qty: ${item.quantity}</p>
      <p class="cart-card__price">$${item.FinalPrice}</p>
    </li>
  `;
}

export default class ShoppingCart {
  constructor(listElement) {
    this.listElement = listElement;
    this.cartItems = [];
  }

  init() {
    // Load cart items from localStorage
    this.cartItems = getLocalStorage("so-cart") || [];
    this.renderCart(this.cartItems);
  }

  renderCart(cartItems) {
    if (!cartItems || cartItems.length === 0) {
      this.listElement.innerHTML = "<p>Your cart is empty.</p>";
      return;
    }

    renderListWithTemplate(
      cartItemTemplate,
      this.listElement,
      cartItems,
      "afterbegin",
      true
    );
  }
}
