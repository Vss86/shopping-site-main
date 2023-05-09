import { shopData } from "./data.js";

export let cart = {};

export const setLocalStorage = function () {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const getLocalStorage = function () {
  return _.cloneDeep(JSON.parse(localStorage.getItem("cart")));
};

export const filterByCategory = function (category) {
  return cart.items.filter((item) => item.category === category);
};

export const getIndexByID = function (id) {
  return cart.items.findIndex((item) => item.id === +id);
};

const getItemById = function (id) {
  return cart.items.find((item) => item.id === +id);
};

export const addToCart = function (id) {
  const item = getItemById(id);
  item.numItems++;
  cart.totalItems = calcCartTotalItems();
  setLocalStorage();
};

export const removeFromCart = function (id) {
  const item = getItemById(id);
  if (item.numItems === 0) return;
  item.numItems--;
  cart.totalItems = calcCartTotalItems();
  setLocalStorage();
};

export const deleteFromCart = function (id) {
  const item = getItemById(id);
  item.numItems = 0;
  cart.totalItems = calcCartTotalItems();
  setLocalStorage();
};

const calcCartTotalItems = function () {
  return cart.items
    .map((item) => item.numItems)
    .reduce((acc, cur) => acc + cur);
};

export const calcItemTotalPrice = function (index) {
  const item = cart.items[index];
  return (item.price * item.numItems).toFixed(2);
};

export const getCartTotal = function () {
  return cart.items
    .map((item) => item.price * item.numItems)
    .reduce((acc, cur) => acc + cur);
};

export const emptyCart = function () {
  cart.items.forEach((item) => (item.numItems = 0));
  cart.totalItems = 0;
  setLocalStorage();
};

// Initialization

const initCart = function () {
  cart.items = [...shopData];
  cart.items.forEach((item) => (item.numItems = 0));
  cart.totalItems = calcCartTotalItems();
};

const init = function () {
  const data = getLocalStorage();
  if (!data) {
    initCart();
    setLocalStorage();
  }
  if (data) cart = _.cloneDeep(data);
};

init();
