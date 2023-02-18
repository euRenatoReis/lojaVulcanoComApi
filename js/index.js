
const barradebusca = document.querySelector('.barradebusca');
const mostrador = document.querySelector('.mostrador');
const nomeproduto = document.querySelector('.nomeproduto');
const areaDoPreco = document.querySelector('.preco');
const imagemproduto = document.querySelector('.fotodoproduto');

const setavoltar = document.querySelector('.setavoltar');
const setaavancar = document.querySelector('.setaavancar');
const carrossel = document.querySelectorAll('.carrossel');

barradebusca.addEventListener('input', async () => {
  try {
    const searchQuery = barradebusca.value;
    const response = await fetch(`https://fakestoreapi.com/products?title=${searchQuery}`);
    const products = await response.json();
    mostrarResultados(products);
  } catch (error) {
    console.log('Ocorreu um erro ao buscar produtos', error);
  }
});

function mostrarResultados(products) {
  if (products.length === 0) {
    mostrador.classList.add('oculto');
    return;
  }
  const primeiroProduto = products[0];
  areaDoPreco.innerHTML = primeiroProduto.price;
  nomeproduto.innerHTML = primeiroProduto.title;
  mostrador.classList.remove('oculto');
}


setaavancar.addEventListener('click', () => {

  const indeceAtual = 0;

  for (var i = 0; i < carrossel.length; i++) {

    indeceAtual++;
    carrossel[indeceAtual];

  }

  
  console.log(carrossel);

})

setavoltar.addEventListener('click', () => {


})