'use strict';

const getBasketTotalEl = document.querySelector('.basket span');
const basketTotalEl = document.querySelector('.basket__total');
const basketTotalPriceEl = document.querySelector('.basket__total_value');


document.querySelector('.basket').addEventListener('click', () => {
  document.querySelector('.basket__product').classList.toggle('basket__product_hidden');
});

const basket = {};

document.querySelector('cards__list').addEventListener('click', event => {
  if (!event.target.classList.contains('cards__add__link')) {
    return;
  }

  const cartItemEl = event.target.closest('.cards__item');
  const id = +cartItemEl.dataset.id;
  const name = cartItemEl.dataset.name;
  const price = +cartItemEl.dataset.price;
  addToBasket(id, name, price);
});

function addToBasket(id, name, price) {

  if (!(id in basket)) {
    basket[id] = {
      id: id,
      name: name,
      price: price,
      count: 0
    };
  }

  basket[id].count++;
  getBasketTotalEl.textContent = getBasketTotal().toString();
  basketTotalPriceEl.textContent = getBasketTotalPrice().toFixed(2);
  renderProductBasket(id);
}

function getBasketTotal() {
  return Object.values(basket).reduce((sum, product) => sum + product.count, 0);
}

function getBasketTotalPrice() {
  return Object
    .values(basket)
    .reduce((sum, product) => sum + product.price * product.count, 0);
}

function renderProductBasket(productId) {
  const basketNameEl = document.querySelector(`.basket__name[data-productId="${productId}"]`);
  if (!basketNameEl) {
    renderNewProductBasket(productId);
    return;
  }

  const product = basket[productId];
  basketNameEl.querySelector('.product__basket_count').textContent = product.count;
  basketNameEl
    .querySelector('.product__basket_total')
    .textContent = (product.price * product.count).toFixed(2);
}

function renderNewProductBasket(productId) {
  const productName = `
    <div class="basket__name" data-productId="${productId}">
      <div>${basket[productId].name}</div>
      <div>
        <span class = "product__basket_count"> $ {basket[productId].count} </span> шт.
      </div>
      <div>$${basket[productId].price}</div>
      <div>
        $<span class="product__basket_total">${(basket[productId].price * basket[productId].count).toFixed(2)}</span>
      </div>
    </div>
    `;
  basketTotalEl.insertAdjacentHTML("beforebegin", productName);
}