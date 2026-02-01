import { renderListWithTemplate } from "./utils.mjs";

function productCardTemplate(product, category) {
  let discountBadge = "";
  if (product.FinalPrice < product.SuggestedRetailPrice) {
    const discountPercent = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) * 100
    );
    discountBadge = `<span class="discount-badge">${discountPercent}% OFF</span>`;
  }

  const imageSrc = product.PrimaryMedium || product.Image;

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?category=${category}&product=${product.Id}">
        <div class="product-card__image">
          ${discountBadge}
          <img src="${imageSrc}" alt="${product.NameWithoutBrand}">
        </div>
        <h3 class="card__brand">${product.Brand?.Name || "Unknown"}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}

export default class ProductList {
  constructor(category, dataSource, listElement, titleElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.titleElement = titleElement;
    this.products = [];
  }

  async init() {
    if (this.titleElement) {
      this.titleElement.textContent = `Category: ${this.category}`;
    }
    this.products = await this.dataSource.getData(this.category);
    this.renderList(this.products);
  }

  renderList(productList) {
    if (!this.listElement) {
      console.error("List element not found!");
      return;
    }

    const validProducts = productList.filter(
      (product) =>
        product.Name &&
        (product.PrimaryMedium || product.Image) &&
        product.FinalPrice != null
    );

    // render using template
    renderListWithTemplate(
      (product) => productCardTemplate(product, this.category),
      this.listElement,
      validProducts,
      "afterbegin",
      true
    );
  }
}
  

