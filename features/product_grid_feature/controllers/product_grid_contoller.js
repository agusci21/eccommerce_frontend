const productGrid = document.getElementById('product_grid')

window.addEventListener('load', async () => {
  console.log(productGrid)
  const response = await axios.get('http://localhost:8000/api/products');
  const productList = response.data['products']


  for (const product of productList) {
    const newElement = document.createElement('div');
    newElement.className = 'product_card';
    const imageElement = document.createElement('img');
    imageElement.className = 'product_image'
    imageElement.src = product["image_url"] ?? 'https://picsum.photos/200';
    const textElement = document.createElement('h2')
    textElement.textContent = product["name"]


    newElement.appendChild(imageElement);
    productGrid.appendChild(newElement);
    newElement.appendChild(textElement)
  }

})

