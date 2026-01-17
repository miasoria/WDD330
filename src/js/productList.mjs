import { renderListWithTemplate } from "./utils.mjs";



function productCardTemplate(product) {
    return `
        <li class="product-card">
            <h3>${product.Name}</h3>
            <img src="${product.Image}" alt="${product.Name}"/>
            <p class="price">$${product.FinalPrice}</p>
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

