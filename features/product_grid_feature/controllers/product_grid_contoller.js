const productGrid = document.getElementById('product_grid')
const productsInCartList = []
const productCounter = document.getElementById('cart_counter')
const cartButton = document.getElementById('cart_button')
const searchBar = document.getElementById('search_bar')
const searchButton = document.getElementById('search_button')

window.addEventListener('load', async () => getProducts())

searchBar.addEventListener('input', async () => {
  if (searchBar.value.trim().length === 0) {
    searchButton.innerHTML = '<i class="material-icons">search</i>'
  } else {
    searchButton.innerHTML = '<i class="material-icons">delete</i>'
  }
  await getProducts(searchBar.value);
});

searchButton.addEventListener('click', () => {
  searchButton.innerHTML = '<i class="material-icons">search</i>'
  searchBar.value = ''
  getProducts();
})

const createElementWith = (elementType, className, textContent) => {
  const newElement = document.createElement(elementType)
  newElement.className = className;
  if (textContent != null) {
    newElement.textContent = textContent
  }
  return newElement
}

const addProductToCart = (product) => {
  const productsIds = productsInCartList.map(e => e.id)

  if (!productsIds.includes(product.id)) {
    const productEntity = Product.fromJson(product)
    productEntity.addOneProductToCard()
    productsInCartList.push(productEntity)
  } else {
    productsInCartList.filter(e => e.id === product.id)[0].addOneProductToCard()
  }
  console.table(productsInCartList)
  productCounter.textContent = getTotalProducts()
}

const getTotalProducts = () => {
  let counter = 0
  for (const product of productsInCartList) {
    counter += product.itemsInCart
  }
  return counter
}

const getProducts = async (searchField) => {
  let url = 'http://localhost:8000/api/products'
  if (searchField) {
    url += `?filterQuery=${searchField}`
  }
  const response = await axios.get(url);
  productGrid.innerHTML = '';
  const productList = response.data['products']


  for (const product of productList) {
    const newElement = createElementWith('div', 'product_card')

    const imageElement = createElementWith('img', 'product_image')
    imageElement.src = product["image_url"] ?? 'https://picsum.photos/200';
    const textElement = createElementWith('h2', null, product['name'])
    const addButton = document.createElement('button', 'add_button');
    addButton.style.borderRadius = '100%'
    addButton.style.backgroundColor = 'black'
    const addIcon = createElementWith('i', 'material-icons', 'add',)
    addButton.style.color = 'white'


    addButton.appendChild(addIcon);
    newElement.appendChild(imageElement);
    newElement.appendChild(textElement);
    newElement.appendChild(addButton);

    productGrid.appendChild(newElement);
    addButton.addEventListener('click', () => {
      addProductToCart(product)
    })
  }
} 