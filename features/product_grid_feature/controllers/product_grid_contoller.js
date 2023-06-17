const leftList = document.getElementById('left_column');
const rightList = document.getElementById('right_column');

botonAux.addEventListener('click', () => {
  const newElement = document.createElement('li')
  newElement.textContent = 'Funciona'
  newElement.className = 'product_card'
  leftList.append(newElement)
});
