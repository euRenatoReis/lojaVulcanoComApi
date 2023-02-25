
const barradebusca = document.querySelector('.barradebusca');
const mostrador = document.querySelector('.mostrador');
const nomeproduto = document.querySelector('.nomeproduto');
const areaDoPreco = document.querySelector('.preco');
const imagemproduto = document.querySelector('.fotodoproduto');

const carrossel = document.querySelectorAll('.carrossel');
const setaavancar = document.querySelector('.setaavancar');
const setavoltar = document.querySelector('.setavoltar');

let indiceAtual = 0;

setaavancar.addEventListener('click', () => {
  carrossel[indiceAtual].classList.remove('aberto');
  indiceAtual = (indiceAtual + 1) % carrossel.length;
  carrossel[indiceAtual].classList.add('aberto');
});

setavoltar.addEventListener('click', () => {
  carrossel[indiceAtual].classList.remove('aberto');
  indiceAtual = (indiceAtual - 1 + carrossel.length) % carrossel.length;
  carrossel[indiceAtual].classList.add('aberto');
});




// api

barradebusca.addEventListener('input', pegaValorDaApi())

barradebusca.addEventListener('keyup', async (e)=>{

  const pegarValorEvento = e.target.value; 
  const pressionado = e.which || e.keycode;
  const chave = pressionado === 13;

  pegaValorDaApi();
})


async function pegaValorDaApi(){

  try {
    const searchQuery = barradebusca.value;
    const response = await fetch(`https://fakestoreapi.com/products?title=${searchQuery}`);
    const products = await response.json();

    mostrarResultados(products);

  } catch (error) {
    console.log('Ocorreu um erro ao buscar produtos', error);
  }

  return true
}

function mostrarResultados(products) {

  if (products.length === 0) {
    mostrador.classList.add('oculto');
    return;
  }

  const procura = products.find(function(products){

      return products.value == searchQuery

  });

  areaDoPreco.innerHTML = procura.price;
  nomeproduto.innerHTML = procura.title;

  mostrador.classList.remove('oculto');
}
