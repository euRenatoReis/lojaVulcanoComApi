
import { pegaValorDaApi } from "./getData.js"



async function renderizarProdutosIniciais(entrada, campoOfertas, campoProdutos) {

  if (entrada[1].price >= 50) {

    const entradaReduzida = entrada[1].title.substring(0, 40)

    campoProdutos.innerHTML += `<div class="produto item">
     <picture>
       <source  srcset=${entrada[1].image} media="(min-width: 250px)" />
       <img class="imagem-do-produto" src=${entrada[1].image}  alt="imagem do produto ${entradaReduzida}">
     </picture>

     <div class="descricao-produto">
        <h3>${entradaReduzida}</h3>
        <div class="preco-Ebotao">
          <p class="preco-produto">$${entrada[1].price}</p>
          <button class="botaoAdicionarCArrinho">
          <i class="fa-solid fa-cart-plus fa-lg"></i>
          </button>
        </div>
     </div>
     </div>`

  } else {

    const entradaReduzida = entrada[1].title.substring(0, 40)

    campoOfertas.innerHTML += `<div class="oferta item">
    <picture>
      <source  srcset=${entrada[1].image} media="(min-width: 250px)" />
      <img class="imagem-do-produto" src=${entrada[1].image}  alt="imagem do produto ${entradaReduzida}">
    </picture>
    <div class="descricao-oferta">
         <h3>${entradaReduzida}</h3>
      <div class="preco-Ebotao">
         <p class="preco-oferta">$${entrada[1].price}</p>
         <button class="botaoAdicionarCArrinho">
         <i class="fa-solid fa-cart-plus fa-lg"></i>
         </button>
      </div>
    </div>
    </div>`
  }
}


async function renderizaCategoria(campoOfertas, campoProdutos, botao) {

  campoOfertas.innerHTML = ``
  campoProdutos.innerHTML = ``

  const resposta = await pegaValorDaApi()
  var categoriaDobotao = botao.id

  if (categoriaDobotao === "mens-clothing") {
    categoriaDobotao = "men's clothing"

  } else if (categoriaDobotao === "womens-clothing") {
    categoriaDobotao = "women's clothing"

  }


  const entradasRespostas = Object.entries(resposta);

  entradasRespostas.forEach((objProduto) => {

    if (objProduto[1].category === categoriaDobotao) {

      if (objProduto[1].price <= 50) {

        const entradaReduzida = objProduto[1].title.substring(0, 40)

        campoOfertas.innerHTML += `<div class="oferta item">
    
         <picture>
            <source  srcset=${objProduto[1].image} media="(min-width: 250px)" />
            <img class="imagem-do-produto" src=${objProduto[1].image}  alt="imagem do produto ${objProduto[1].title}">
         </picture>
    
         <div class="descricao-oferta">
            <h3>${entradaReduzida}</h3>
            <div class="preco-Ebotao">
               <p class="preco-oferta">$${objProduto[1].price}</p>
               <button class="botaoAdicionarCArrinho">
               <i class="fa-solid fa-cart-plus fa-lg"></i>
               </button>
            </div>
         </div>
         </div>`

      } else {

        const entradaReduzida = objProduto[1].title.substring(0, 40)

        campoProdutos.innerHTML += `<div class="produto item">
    
          <picture>
            <source  srcset=${objProduto[1].image} media="(min-width: 250px)" />
            <img class="imagem-do-produto" src=${objProduto[1].image}  alt="imagem do produto ${objProduto[1].title}">
          </picture>
     
          <div class="descricao-produto">
             <h3>${entradaReduzida}</h3>
             <div class="preco-Ebotao">
                <p class="preco-produto">$${objProduto[1].price}</p>
                <button class="botaoAdicionarCArrinho">
                   <i class="fa-solid fa-cart-plus fa-lg"></i>
                </button>
             </div>
          </div>
          </div>`
      }

    } else {

      return
    }

  })

}

async function renderizaCardProduto(itemPesquisado, conteudoPesquisa, mostrador) {

  if (itemPesquisado[1].title.includes(conteudoPesquisa)) {

    mostrador.classList.add('open');

    mostrador.innerHTML += ` 
        <div class="card-produto">
          <picture>
            <source srcset=${itemPesquisado[1].image} media="(min-width: 100%)>
            <img class="fotodoproduto" src=${itemPesquisado[1].image} alt="imagem do produto ${itemPesquisado[1].title}">
          </picture>
          
        <div class="informacoes">
            <h3 class="nomeproduto">${itemPesquisado[1].title}</h3>
            <div class="preco-Ebotao">
               <p class="preco">${itemPesquisado[1].price}</p>
               <button class="botaoAdicionarCArrinho">
               <i class="fa-solid fa-cart-plus fa-lg"></i>
               </button>
            </div>
        </div>
      </div>
      `
  } else {
    return
  }
}


function renderizarCarrinho() {

  const carrinhoMenu = document.querySelector('.carrinho-menu')

  if (carrinhoMenu.classList.contains('open')) {
    carrinhoMenu.classList.remove('open')
  }
  else {
    carrinhoMenu.classList.add('open')
  }

}

function adicionarItemAoCarrinho(index) {

  const ProdutosDaPagina = document.querySelectorAll('.item');
  const conteudoCarrinhoArea = document.querySelector('.conteudo-carrinho');

  const imagemProduto = ProdutosDaPagina[index].getElementsByClassName('.picture')

  conteudoCarrinhoArea.innerHTML = ``

  conteudoCarrinhoArea.innerHTML += `
       <div class="bloco-menu">
         <img src=${imagemProduto}>
         <div class="nome-preco">

         </div>
         <div>
           <input class="aumentar-quantidade" type="button" value="+">
             <p class="quantidade-produto">0</p>
           <input class="aumentar-quantidade" type="button" value="-">
         </div>
       </div>
    `


}


export { renderizarProdutosIniciais, renderizaCategoria, renderizaCardProduto, renderizarCarrinho }