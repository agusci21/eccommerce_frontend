
const productContainer = document.getElementById('product_container');
let productsInCartList = []

window.addEventListener('load', async () => {
  productsInCartList = getProductsFromSessionStorage();
  renderProducts();
});

const createElementWith = (elementType, className, textContent) => {
  const newElement = document.createElement(elementType);
  newElement.className = className;
  if (textContent != null) {
    newElement.textContent = textContent;
  }
  return newElement;
};

const getProductsFromSessionStorage = () => {
  const decodedProductsInCart = JSON.parse(sessionStorage.getItem('products_in_cart'));
  if (Array.isArray(decodedProductsInCart)) {
    return decodedProductsInCart.map((productData) => Product.fromJson(productData));
  }
  return [];
}

const renderProducts = () => {
  productContainer.innerHTML = '';
  for (const product of productsInCartList) {

    if (product.itemsInCart == 0) {
      continue;
    }

    const dataRow = createElementWith('div', 'data_row');

    const amountModifier = createElementWith('div', 'data_item amount_modifier');
    const amountElement = createElementWith('p', 'data_item amount_single');
    amountElement.textContent = product.itemsInCart.toString();

    const minusButton = createElementWith('p', 'minus_button');
    minusButton.textContent = '-';
    const plusButton = createElementWith('p', 'plus_button');
    plusButton.textContent = '+';

    minusButton.addEventListener('click', () => {

      product.removeOneProductToCard()
      amountElement.textContent = product.itemsInCart.toString();
      saveProductsToSessionStorage()

      if (product.itemsInCart == 0) {
        dataRow.style.display = 'none'
      }

    })
    plusButton.addEventListener('click', () => {

      product.addOneProductToCard()
      amountElement.textContent = product.itemsInCart.toString();
      saveProductsToSessionStorage()

    })
    amountModifier.appendChild(minusButton);

    amountModifier.appendChild(amountElement);

    amountModifier.appendChild(plusButton);


    dataRow.appendChild(amountModifier);

    const productNameElement = createElementWith('p', 'data_item product_name_single');
    productNameElement.textContent = product.name;
    dataRow.appendChild(productNameElement);

    const unitPriceElement = createElementWith('p', 'data_item unit_price_single');
    unitPriceElement.textContent = `$${product.price}`;
    dataRow.appendChild(unitPriceElement);

    const totalPriceElement = createElementWith('p', 'data_item total_price_single');
    totalPriceElement.textContent = `$${product.price * product.itemsInCart}`;
    dataRow.appendChild(totalPriceElement);

    productContainer.appendChild(dataRow);
  }
};

const saveProductsToSessionStorage = () => {
  sessionStorage.setItem('products_in_cart', JSON.stringify(productsInCartList));
};
