import * as model from "./model.js";
import cartView from "./views/cartView.js";

let shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

const generatePage = function () {
  cartView.generateCartItems(model.cart.items);
  cartView.updateCartAmount(model.cart.totalItems);
  cartView.updateCartTotal(model.getCartTotal());
};

const controlAddRemoveItem = (id, action) => {
  const index = model.getIndexByID(id);
  action === "add" ? model.addToCart(id) : model.removeFromCart(id);
  cartView.updateCartAmount(model.cart.totalItems);
  cartView.updateItemAmount(id, model.cart.items[index].numItems);
  cartView.updateItemTotalPrice(id, model.calcItemTotalPrice(index));
  cartView.updateCartTotal(model.getCartTotal());
};

const controlDeleteFromCart = function (id) {
  model.deleteFromCart(id);
  generatePage();
};

const controlEmptyCart = function () {
  model.emptyCart();
  generatePage();
};

const init = function () {
  generatePage();

  cartView.addHandlerAddRemoveItem(controlAddRemoveItem);
  cartView.addHandlerDeleteFromCart(controlDeleteFromCart);
  cartView.addHandlerEmptyCart(controlEmptyCart);
};

init();
