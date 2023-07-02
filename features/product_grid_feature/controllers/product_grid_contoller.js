const productGrid = document.getElementById('product_grid');
const productCounter = document.getElementById('cart_counter');
const cartButton = document.getElementById('cart_button');
const searchBar = document.getElementById('search_bar');
const searchButton = document.getElementById('search_button');
const filtersButton = document.getElementById('filters_button');
const dropdownContent = document.getElementById('dropdown_content');
let productsInCartList = []

window.addEventListener('load', async () => {
  getProducts();
  productsInCartList = getProductsFromSessionStorage();
  productCounter.textContent = getTotalProducts()
});

searchBar.addEventListener('input', async () => {
  if (searchBar.value.trim().length === 0) {
    searchButton.innerHTML = '<i class="material-icons">search</i>';
  } else {
    searchButton.innerHTML = '<i class="material-icons">delete</i>';
  }
  await getProducts(searchBar.value);
});

filtersButton.addEventListener('click', function() {
  dropdownContent.classList.add('show');
});

searchButton.addEventListener('click', () => {
  searchButton.innerHTML = '<i class="material-icons">search</i>';
  searchBar.value = '';
  getProducts();
});

const createElementWith = (elementType, className, textContent) => {
  const newElement = document.createElement(elementType);
  newElement.className = className;
  if (textContent != null) {
    newElement.textContent = textContent;
  }
  return newElement;
};

const addProductToCart = (product) => {
  const productsIds = productsInCartList.map((e) => e.id);

  if (!productsIds.includes(product.id)) {
    const productEntity = Product.fromJson(product);
    productEntity.addOneProductToCard();
    productsInCartList.push(productEntity);
  } else {
    productsInCartList.find((e) => e.id === product.id).addOneProductToCard();
  }
  productCounter.textContent = getTotalProducts();

  saveProductsToSessionStorage(productsInCartList);
};

const getTotalProducts = () => {
  let counter = 0;
  for (const product of productsInCartList) {
    counter += product.itemsInCart;
  }
  return counter;
};

const getProducts = async (searchField) => {
  let url = 'http://localhost:8000/api/products';
  if (searchField) {
    url += `?filterQuery=${searchField}`;
  }
  const response = await axios.get(url);
  productGrid.innerHTML = '';
  const productList = response.data['products'];

  for (const product of productList) {
    const newElement = createElementWith('div', 'product_card');
    const imageElement = createElementWith('img', 'product_image');
    imageElement.src = product["image_url"] ?? 'https://picsum.photos/200';
    const textElement = createElementWith('h2', null, product['name']);

    const addButton = document.createElement('button');
    addButton.className = 'add_button';
    addButton.style.backgroundColor = '#78222B';
    addButton.style.color = 'white';
    addButton.style.borderRadius = '10px';
    addButton.style.border = 'none';
    addButton.style.padding = '8px 24px';
    addButton.style.width = '8rem';
    addButton.style.display = 'flex';
    addButton.style.justifyContent = 'center';
    addButton.style.alignItems = 'center';
    addButton.textContent = 'Agregar';

    newElement.appendChild(imageElement);
    newElement.appendChild(textElement);
    newElement.appendChild(addButton);

    productGrid.appendChild(newElement);

    addButton.addEventListener('click', () => {
      addProductToCart(product);
    });
  }
};
const getProductsFromSessionStorage = () => {
  const decodedProductsInCart = JSON.parse(sessionStorage.getItem('products_in_cart'));
  if (Array.isArray(decodedProductsInCart)) {
    return decodedProductsInCart.map((productData) => Product.fromJson(productData));
  }
  return [];
}

const saveProductsToSessionStorage = (productsList) => {
  sessionStorage.setItem('products_in_cart', JSON.stringify(productsList));
};