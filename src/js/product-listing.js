import ProductList from "../js/productList.mjs";
import ProductData from "./ProductData.mjs";
import { getParam } from "./utils.mjs";

window.addEventListener("DOMContentLoaded", async () => {
  const category = getParam("category");
  if (!category) {
    console.error("No category provided in URL");
    return;
  }

  const listElement = document.querySelector(".product-list");
  const titleElement = document.getElementById("category-title");

  if (!listElement || !titleElement) {
    console.error("Cannot find required elements on page");
    return;
  }

  const dataSource = new ProductData(category);
  const productList = new ProductList(category, dataSource, listElement, titleElement);

  await productList.init();
});


