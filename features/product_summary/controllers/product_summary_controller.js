
const productContainer = document.getElementById('product_container');
let productsInCartList = []

window.addEventListener('load', async () => {
  productsInCartList = getFakeProducts()//getProductsFromSessionStorage();
  console.log(productsInCartList)
});


const getProductsFromSessionStorage = () => {
    const decodedProductsInCart = JSON.parse(sessionStorage.getItem('products_in_cart'));
    if (Array.isArray(decodedProductsInCart)) {
      return decodedProductsInCart.map((productData) => Product.fromJson(productData));
    }
    return [];
  }

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

