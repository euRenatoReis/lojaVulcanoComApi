
import { pegaValorDaApi, pesquisaValorDaApi } from "./services/getData.js";
import { renderizaCategoria, renderizarProdutosIniciais } from "./services/renderiza.js";
import { avancarSlide, retornarSlide, trocarSlide } from "./carrossel.js";

const barradebusca = document.querySelector('.barradebusca');
const mostrador = document.querySelector('.mostrador');
const nomeproduto = document.querySelector('.nomeproduto');
const areaDoPreco = document.querySelector('.preco');
const imagemproduto = document.querySelector('.fotodoproduto');

const setaavancar = document.querySelector('.setaavancar');
const setavoltar = document.querySelector('.setavoltar');

// botoes categoria

const botcatg = document.querySelectorAll('.botcatg');

// campos da pagina 

const campoOfertas = document.querySelector('.ofertas');
const campoProdutos = document.querySelector('.produtos');


setaavancar.addEventListener('click', avancarSlide);

setavoltar.addEventListener('click', retornarSlide);

setInterval(trocarSlide, 10000);


barradebusca.addEventListener('keyup', async (e) => {
  const pegarValorEvento = e.target.value;
  const pressionado = e.which || e.keycode;
  const chave = pressionado === 13;

  const conteudoPesquisa = barradebusca.value

  await pesquisaValorDaApi(conteudoPesquisa);
})

const pegaTodosProdutos = await pegaValorDaApi();
const entradasTodosProdutos = Object.entries(pegaTodosProdutos);
entradasTodosProdutos.forEach(async (entrada) => await renderizarProdutosIniciais(entrada, campoOfertas, campoProdutos))


botcatg.forEach((botao) => {

  botao.addEventListener('click', async () => await renderizaCategoria(campoOfertas, campoProdutos, botao))

})
