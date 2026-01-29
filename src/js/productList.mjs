
import { renderListWithTemplate } from "./utils.mjs";



function productCardTemplate(product) {

  

  let discountBadge = "";

  if (product.FinalPrice < product.SuggestedRetailPrice) {
    const discountPercent = Math.round(
      ((product.SuggestedRetailPrice - product.FinalPrice) /
        product.SuggestedRetailPrice) * 100
    );

    discountBadge = `<span class="discount-badge">${discountPercent}% OFF</span>`;
  }

  

  return `
    <li class="product-card">
      <a href="/product_pages/index.html?product=${product.Id}">
        <div class="product-card__image">
            ${discountBadge}
            <img src="${product.Image}" alt="${product.Name}">
        </div>

        <!-- <img src="/images/tents/${product.Image.split("/").pop()}" 
             alt="${product.NameWithoutBrand}" /> -->
        <h3 class="card__brand">${product.Brand?.Name || "Unknown"}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.FinalPrice}</p>
      </a>
    </li>
  `;
}




export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.products = [];
  }

  async init() {
    this.products = await this.dataSource.getData();
    this.renderList(this.products);
  

  }

  renderList(productList) {
    const validProducts = productList.filter(product =>
        product.Name && product.Image && product.FinalPrice != null
    );

    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      validProducts,
      "afterbegin",
      true
    );
  }
 

}

