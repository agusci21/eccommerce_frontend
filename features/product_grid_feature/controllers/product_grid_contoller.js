
const productGrid = document.getElementById('product_grid')

window.addEventListener('load', async () => {
  const productList = [
    {
      "product_name" : "Carbones",
      "image_url" : "https://picsum.photos/200"
    },
    {
      "product_name" : "Plaquetas",
      "image_url" : "https://picsum.photos/201"
    },
    {
      "product_name" : "Buges",
      "image_url" : "https://picsum.photos/202"
    },
    {
      "product_name" : "Cables",
      "image_url" : "https://picsum.photos/203"
    },
    {
      "product_name" : "Bobinas",
      "image_url" : "https://picsum.photos/204"
    },
    {
      "product_name" : "Horquillas",
      "image_url" : "https://picsum.photos/205"
    },
    {
      "product_name" : "Fusibles",
      "image_url" : "https://picsum.photos/206"
    },
  ]

  for (const product of productList) {
    const newElement = document.createElement('div');
    newElement.className = 'product_card';
    const imageElement = document.createElement('img');
    imageElement.className = 'product_image'
    imageElement.src = product["image_url"];
    const textElement = document.createElement('h2')
    textElement.textContent = product["product_name"]


    newElement.appendChild(imageElement);
    productGrid.appendChild(newElement);
    newElement.appendChild(textElement)
  }

})

