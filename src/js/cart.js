
import ShoppingCart from "./shoppingCart.mjs";

const cartListElement = document.querySelector(".product-list"); 
const myCart = new ShoppingCart(cartListElement);

myCart.init();




