
import { pegaValorDaApi, pesquisaValorDaApi } from "./services/getData.js";
import { renderizaCardProduto, renderizaCategoria, renderizarProdutosIniciais, renderizarCarrinho } from "./services/renderiza.js";
import { avancarSlide, retornarSlide, trocarSlide } from "./carrossel.js";
import { postMeusProdutos } from "./services/postItem.js";

const barradebusca = document.querySelector('.barradebusca');
const mostrador = document.querySelector('.mostrador');

const setaavancar = document.querySelector('.setaavancar');
const setavoltar = document.querySelector('.setavoltar');

const btDoCarrinho = document.querySelector('.btCarrinho');
const botaoAdicionarCArrinho = document.querySelectorAll('.botaoAdicionarCArrinho');

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
  const pressionado = e.which || e.keyCode;
  const chave = pressionado === 13;

  if (chave && pegarValorEvento) {

    mostrador.innerHTML = ``
    let conteudoPesquisa = barradebusca.value
    conteudoPesquisa = conteudoPesquisa.charAt(0).toUpperCase() + conteudoPesquisa.slice(1)
    let valorDaPesquisa = await pesquisaValorDaApi(conteudoPesquisa);
    let EntradasObj = Object.entries(valorDaPesquisa)

    EntradasObj.forEach((itemPesquisado) => renderizaCardProduto(itemPesquisado, conteudoPesquisa, mostrador))
  }

})

const pegaTodosProdutos = await pegaValorDaApi();
const entradasTodosProdutos = Object.entries(pegaTodosProdutos);
entradasTodosProdutos.forEach(async (entrada) => await renderizarProdutosIniciais(entrada, campoOfertas, campoProdutos))


botcatg.forEach((botao) => {

  botao.addEventListener('click', async () => await renderizaCategoria(campoOfertas, campoProdutos, botao))

})

btDoCarrinho.addEventListener('click', renderizarCarrinho)


botaoAdicionarCArrinho.forEach((botao, index) => {

  botao.addEventListener('click', () => adicionarItemAoCarrinho(index))

})



// fazer titulos grandes serem meio ocultos e no hover continua-los