import CheckoutProcess from "/js/CheckoutProcess.mjs";



const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();

document.getElementById("zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});

document.getElementById("checkout-form").addEventListener("submit", (e) => {
  e.preventDefault();
  alert("Order placed successfully! 🎉");
});
