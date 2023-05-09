"use strict";
import * as model from "./model.js";
import productView from "./views/productView.js";

let basket = JSON.parse(localStorage.getItem("data")) || [];

const controlAddRemoveItem = (id, action) => {
  const index = model.getIndexByID(id);
  action === "add" ? model.addToCart(id) : model.removeFromCart(id);
  productView.updateCartAmount(model.cart.totalItems);
  productView.updateItemAmount(id, model.cart.items[index].numItems);
};

const controlCategoriesItem = function (category) {
  productView.generateShop(model.filterByCategory(category));
};

const init = function () {
  productView.generateShop(model.cart.items);
  productView.generateCategories(model.cart.items);
  productView.updateCartAmount(model.cart.totalItems);

  //   Handlers
  productView.addHandlerCategoriesItem(controlCategoriesItem);
  productView.addHandlerAddRemoveItem(controlAddRemoveItem);
};

init();
