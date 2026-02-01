import { getLocalStorage } from "./utils.mjs";

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
  }

  calculateItemSubTotal() {
    this.itemTotal = 0;

    this.list.forEach((item) => {
      this.itemTotal += item.FinalPrice * item.quantity;
    });

    const subtotalEl = document.querySelector(
      `${this.outputSelector} #subtotal`
    );
    subtotalEl.textContent = `$${this.itemTotal.toFixed(2)}`;
  }

  calculateOrderTotal() {
   
    this.tax = this.itemTotal * 0.06;

   
    const itemCount = this.list.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    this.shipping = itemCount > 0 ? 10 + (itemCount - 1) * 2 : 0;

    this.orderTotal = this.itemTotal + this.tax + this.shipping;

    this.displayOrderTotals();
  }

  displayOrderTotals() {
    document.querySelector(
      `${this.outputSelector} #tax`
    ).textContent = `$${this.tax.toFixed(2)}`;

    document.querySelector(
      `${this.outputSelector} #shipping`
    ).textContent = `$${this.shipping.toFixed(2)}`;

    document.querySelector(
      `${this.outputSelector} #orderTotal`
    ).textContent = `$${this.orderTotal.toFixed(2)}`;
  }
}
