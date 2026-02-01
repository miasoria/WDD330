
import CheckoutProcess from "/js/CheckoutProcess.mjs";
import ExternalServices from "/js/ExternalServices.mjs";


const checkout = new CheckoutProcess("so-cart", ".order-summary");
checkout.init();


document.getElementById("zip").addEventListener("blur", () => {
  checkout.calculateOrderTotal();
});


function formDataToJSON(formElement) {
  const formData = new FormData(formElement);
  const convertedJSON = {};
  formData.forEach((value, key) => {
    convertedJSON[key] = value;
  });
  return convertedJSON;
}


function packageItems(cartItems) {
  return cartItems.map((item) => ({
    id: item.Id,
    name: item.NameWithoutBrand,
    price: item.FinalPrice,
    quantity: item.quantity
  }));
}


document.getElementById("checkout-form").addEventListener("submit", async (e) => {
  e.preventDefault();

  
  const form = e.target;
  const formData = formDataToJSON(form);

  const orderData = {
    orderDate: new Date().toISOString(),
    fname: formData.fname,
    lname: formData.lname,
    street: formData.street,
    city: formData.city,
    state: formData.state,
    zip: formData.zip,
    cardNumber: formData.cardNumber,
    expiration: formData.expiration,
    code: formData.code,
    items: packageItems(checkout.list),
    orderTotal: checkout.orderTotal.toFixed(2),
    shipping: checkout.shipping,
    tax: checkout.tax.toFixed(2)
  };

  try {
    const response = await ExternalServices.checkout(orderData);
    console.log("Server response:", response);

    alert("Order placed successfully! 🎉");
    localStorage.removeItem("so-cart");
    window.location.href = "/index.html";
  } catch (err) {
    console.error("Checkout failed:", err);
    alert("Failed to place order. Please try again.");
  }
});
