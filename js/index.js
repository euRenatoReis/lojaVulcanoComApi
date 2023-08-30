
import { pegaValorDaApi } from "./services/getData";
import { renderizaCategoria, renderizarProdutosIniciais } from "./services/renderiza";
import { avancarSlide, retornarSlide, trocarSlide } from "./carrossel";

const barradebusca = document.querySelector('.barradebusca');
const mostrador = document.querySelector('.mostrador');
const nomeproduto = document.querySelector('.nomeproduto');
const areaDoPreco = document.querySelector('.preco');
const imagemproduto = document.querySelector('.fotodoproduto');

const carrossel = document.querySelectorAll('.carrossel');
const setaavancar = document.querySelector('.setaavancar');
const setavoltar = document.querySelector('.setavoltar');


// botoes categoria

const botcatg = document.querySelectorAll('.botcatg');

// campos da pagina 

const campoOfertas = document.querySelector('.ofertas');
const campoProdutos = document.querySelector('.produtos');



setaavancar.addEventListener('click', avancarSlide());

setavoltar.addEventListener('click', retornarSlide());

setInterval(trocarSlide, 10000);


// api

barradebusca.addEventListener('keyup', async (e) => {
  const pegarValorEvento = e.target.value;
  const pressionado = e.which || e.keycode;
  const chave = pressionado === 13;

  // chamar a função pegaValorDaApi sem os parênteses
  await pegaValorDaApi();
})


const pegaTodosProdutos = await pegaValorDaApi()

const entradasTodosProdutos = Object.entries(pegaTodosProdutos)

entradasTodosProdutos.forEach((entrada) => renderizarProdutosIniciais(entrada, campoOfertas, campoProdutos))


botcatg.forEach((botao) => {

  botao.addEventListener('click', renderizaCategoria(campoOfertas, campoProdutos))

})
