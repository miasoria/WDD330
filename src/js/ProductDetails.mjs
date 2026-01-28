

import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";

const category = getParam("category"); 
const productId = getParam("product"); 

if (!category || !productId) {
  console.error("Category or product ID missing in URL");
}


const dataSource = new ProductData(category);

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.dataSource = dataSource;
    this.product = null;
  }

  async init() {
    try {
      this.product = await this.dataSource.findProductById(this.productId);

      if (!this.product) {
        console.error(`Product "${this.productId}" not found in category "${category}"`);
        return;
      }

      this.renderProductDetails();
      this.setupCartButton();
    } catch (err) {
      console.error(`Failed to load product "${this.productId}" in category "${category}":`, err);
    }
  }

  setupCartButton() {
    const btn = document.getElementById("addToCart");
    if (btn) {
      btn.addEventListener("click", () => {
        const cart = JSON.parse(localStorage.getItem("so-cart")) || [];
        const existing = cart.find((item) => item.Id === this.product.Id);
        if (existing) existing.quantity += 1;
        else cart.push({ ...this.product, quantity: 1 });
        localStorage.setItem("so-cart", JSON.stringify(cart));
        alert(`${this.product.NameWithoutBrand} added to cart!`);
      });
    }
  }

  renderProductDetails() {
    if (!this.product) return;

    const p = this.product;

    const brandEl = document.getElementById("productBrand");
    if (brandEl) brandEl.textContent = p.Brand?.Name || "Unknown Brand";

    const nameEl = document.getElementById("productName");
    if (nameEl) nameEl.textContent = p.NameWithoutBrand;

    const imgEl = document.getElementById("productImage");
    if (imgEl) {
      imgEl.src = p.Images?.PrimaryLarge || p.Image || "";
      imgEl.alt = p.NameWithoutBrand;
    }

    const priceEl = document.getElementById("productPrice");
    if (priceEl) priceEl.textContent = `$${p.FinalPrice}`;

    const colorEl = document.getElementById("productColor");
    if (colorEl) colorEl.textContent = p.Colors?.[0]?.ColorName || "N/A";

    const descEl = document.getElementById("productDesc");
    if (descEl) descEl.innerHTML = p.DescriptionHtmlSimple || "";
  }
}

// Initialize
const productPage = new ProductDetails(productId, dataSource);
productPage.init();


