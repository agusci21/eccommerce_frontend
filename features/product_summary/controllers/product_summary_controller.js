
let productsInCartList = []

window.addEventListener('load', async () => {
  productsInCartList = getProductsFromSessionStorage();
  console.log(productsInCartList)
});

const getProductsFromSessionStorage = () => {
    const decodedProductsInCart = JSON.parse(sessionStorage.getItem('products_in_cart'));
    if (Array.isArray(decodedProductsInCart)) {
      return decodedProductsInCart.map((productData) => Product.fromJson(productData));
    }
    return [];
  }
  