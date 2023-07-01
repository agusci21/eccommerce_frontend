
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
const createProductElement = (product) => {
  const productElement = document.createElement('div', 'data_row');
  return productElement;
};
const renderProducts = () => {
  productContainer.innerHTML = '';
  for (const product of productsInCartList) {
    const dataRow = createElementWith('div', 'data_row');

    const amountElement = createElementWith('p', 'data_item amount_single', product.itemsInCart.toString());
    const productNameElement = createElementWith('p', 'data_item product_name_single', product.name);
    const unitPriceElement = createElementWith('p', 'data_item unit_price_single', `$${product.price}`);
    const totalPriceElement = createElementWith('p', 'data_item total_price_single', `$${product.price * product.itemsInCart}`);

    dataRow.appendChild(amountElement);
    dataRow.appendChild(productNameElement);
    dataRow.appendChild(unitPriceElement);
    dataRow.appendChild(totalPriceElement);

    productContainer.appendChild(dataRow);
  }
};

const getFakeProducts = () => [
  new Product(
    '1',
    'Horquilla',
    'Horquillas de renault 12',
    20,
    1300,
    1,
  ),
  new Product(
    '2',
    'Arandelas',
    'Arandelas metalicas',
    300,
    200,
    20,
  ),
  new Product(
    '3',
    'Bugias',
    '987 1x',
    12,
    50,
    2,
  ),

]

