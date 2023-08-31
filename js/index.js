
import { pegaValorDaApi, pesquisaValorDaApi } from "./services/getData.js";
import { renderizaCategoria, renderizarProdutosIniciais } from "./services/renderiza.js";
import { avancarSlide, retornarSlide, trocarSlide } from "./carrossel.js";
import { postMeusProdutos } from "./services/postItem.js";

const barradebusca = document.querySelector('.barradebusca');
const mostrador = document.querySelector('.mostrador');

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
  const pressionado = e.which || e.keyCode;
  const chave = pressionado === 13;

  mostrador.innerHTML = ``
  let conteudoPesquisa = barradebusca.value
  conteudoPesquisa = conteudoPesquisa.charAt(0).toUpperCase() + conteudoPesquisa.slice(1)
  let valorDaPesquisa = await pesquisaValorDaApi(conteudoPesquisa);
  let EntradasObj = Object.entries(valorDaPesquisa)

  EntradasObj.forEach((itemPesquisado) => {

    if (itemPesquisado[1].title.includes(conteudoPesquisa)) {

      console.log('valor de entradasObj é:', itemPesquisado)

      mostrador.classList.remove('oculto');

      mostrador.innerHTML += ` <div class="card-produto">
      
      <picture class="fotodoproduto">
         <source srcset=${itemPesquisado[1].image} media="(min-width: 250px)>
         <img src=${itemPesquisado[1].image} alt="imagem do produto ${itemPesquisado[1].title}">
      </picture>

        <div class="informacoes">

         <div class="nomeproduto">${itemPesquisado[1].title}</div>
         <div class="preco">${itemPesquisado[1].title}</div>

        </div>
      </div>
      `
    } else {
      return
    }

  })
})

const pegaTodosProdutos = await pegaValorDaApi();
const entradasTodosProdutos = Object.entries(pegaTodosProdutos);
entradasTodosProdutos.forEach(async (entrada) => await renderizarProdutosIniciais(entrada, campoOfertas, campoProdutos))


botcatg.forEach((botao) => {

  botao.addEventListener('click', async () => await renderizaCategoria(campoOfertas, campoProdutos, botao))

})

postMeusProdutos()
