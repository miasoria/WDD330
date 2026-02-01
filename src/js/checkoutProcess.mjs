import { getLocalStorage } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs"; // renamed from ProductData

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  
  init() {
    this.list = getLocalStorage(this.key) || [];
    this.calculateItemSubTotal();
    this.calculateOrderTotal();
  }

  
  calculateItemSubTotal() {
    this.itemTotal = 0;

    this.list.forEach((item) => {
      this.itemTotal += item.FinalPrice * item.quantity;
    });

    const subtotalEl = document.querySelector(
      `${this.outputSelector} #subtotal`
    );
    if (subtotalEl) subtotalEl.textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  
  calculateOrderTotal() {
    this.tax = this.itemTotal * 0.06;

    const itemCount = this.list.reduce((sum, item) => sum + item.quantity, 0);
    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  
  displayOrderTotals() {
    const taxEl = document.querySelector(`${this.outputSelector} #tax`);
    if (taxEl) taxEl.textContent = `$${this.tax.toFixed(2)}`;

    const shippingEl = document.querySelector(`${this.outputSelector} #shipping`);
    if (shippingEl) shippingEl.textContent = `$${this.shipping.toFixed(2)}`;

    const totalEl = document.querySelector(`${this.outputSelector} #orderTotal`);
    if (totalEl) totalEl.textContent = `$${this.orderTotal.toFixed(2)}`;
  }

  
  formDataToJSON(formElement) {
    const formData = new FormData(formElement);
    const convertedJSON = {};
    formData.forEach((value, key) => {
      convertedJSON[key] = value;
    });
    return convertedJSON;
  }

 
  packageItems(items) {
    return items.map((item) => ({
      id: item.Id,
      name: item.NameWithoutBrand,
      price: item.FinalPrice,
      quantity: item.quantity,
    }));
  }

  
  checkout(formElement) {
    if (!formElement) return;

    formElement.addEventListener("submit", async (event) => {
      event.preventDefault();

      
      const orderData = this.formDataToJSON(formElement);
      orderData.orderDate = new Date().toISOString();
      orderData.items = this.packageItems(this.list);
      orderData.orderTotal = this.orderTotal.toFixed(2);
      orderData.tax = this.tax.toFixed(2);
      orderData.shipping = this.shipping;

      try {
       
        const response = await ExternalServices.checkout(orderData);
        console.log("Server response:", response);
        alert("Order submitted successfully!");
      } catch (err) {
        console.error("Checkout failed:", err);
        alert("Failed to submit order. See console for details.");
      }
    });
  }
}
