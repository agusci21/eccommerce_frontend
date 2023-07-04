
const productContainer = document.getElementById('product_container');
const orderButton = document.getElementById('order_button')
let productsInCartList = []

window.addEventListener('load', async () => {
  productsInCartList = getProductsFromSessionStorage();
  renderProducts();
  disableBuyButtonIfNecesary()
});

const disableBuyButtonIfNecesary = () => {
  if(productsInCartList.length == 0){
    orderButton.style.backgroundColor = 'grey'
    orderButton.style.pointerEvents = 'none'
  }
}

orderButton.addEventListener('click', () => {
  productsInCartList = getProductsFromSessionStorage();
  let orderString = 'Hola, requiero estos productos:\n'
  for(const product of productsInCartList){
    if(product.itemsInCart == 0){
      continue
    }
    orderString += product.toOrder()
  }
  orderString += 'Por un total de: $'+ calculateTotalPrice()
  openWpp('2612717693', orderString)
})

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
    const unitPriceElement = createElementWith('p', 'data_item unit_price_single');
    unitPriceElement.textContent = `$${product.price}`;
    const totalPriceElement = createElementWith('p', 'data_item total_price_single');
    totalPriceElement.textContent = `$${product.price * product.itemsInCart}`;
    const productNameElement = createElementWith('p', 'data_item product_name_single');
    productNameElement.textContent = product.name;
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
      productsInCartList = productsInCartList.filter(e => e.itemsInCart > 0)
      saveProductsToSessionStorage()
      totalPriceElement.textContent = `$${product.price * product.itemsInCart}`;
      if (product.itemsInCart == 0) {
        dataRow.style.display = 'none'
      }
      disableBuyButtonIfNecesary()
    })

    plusButton.addEventListener('click', () => {

      product.addOneProductToCard()
      amountElement.textContent = product.itemsInCart.toString();
      saveProductsToSessionStorage()
      totalPriceElement.textContent = `$${product.price * product.itemsInCart}`;
    })
    amountModifier.appendChild(minusButton);

    amountModifier.appendChild(amountElement);

    amountModifier.appendChild(plusButton);


    dataRow.appendChild(amountModifier);

    
    dataRow.appendChild(productNameElement);

    
    dataRow.appendChild(unitPriceElement);

    
    dataRow.appendChild(totalPriceElement);

    productContainer.appendChild(dataRow);
  }
};

const saveProductsToSessionStorage = () => {
  sessionStorage.setItem('products_in_cart', JSON.stringify(productsInCartList));
};

const openWpp = (phoneNumber, message) => {
  const url = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(message)}`;
  window.open(url);
}

const calculateTotalPrice = () => {
  let totalPrice = 0;
  for(const product of productsInCartList){
    totalPrice += (product.itemsInCart * product.price)
  }
  return totalPrice
}