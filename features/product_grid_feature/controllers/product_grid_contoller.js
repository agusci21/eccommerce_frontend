const productGrid = document.getElementById('product_grid')

window.addEventListener('load', async () => {
  console.log(productGrid)
  const response = await axios.get('http://localhost:8000/api/products');
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
  }
})

const createElementWith = (elementType, className, textContent) => {
  const newElement = document.createElement(elementType)
  newElement.className = className;
  if (textContent != null) {
    newElement.textContent = textContent
  }
  return newElement
}

