
import { pegaValorDaApi } from "./getData.js"
import { SomarTotal, SubtrairTotal } from "./ContabilizarTotal.js"



async function renderizarProdutosIniciais(entrada, campoOfertas, campoProdutos) {

  if (entrada[1].price >= 50) {

    const entradaReduzida = entrada[1].title.substring(0, 40)

    campoProdutos.innerHTML += `<div class="produto item">
     <picture>
       <source  srcset=${entrada[1].image} media="(max-width: 200px)" />
       <img class="imagem-do-produto" src=${entrada[1].image}  alt="imagem do produto ${entradaReduzida}">
     </picture>

     <div class="descricao-produto">
        <h3 class="nomeproduto">${entradaReduzida}</h3>
        <div class="preco-Ebotao">
          <p class="preco-produto preco">$${entrada[1].price}</p>
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
      <source  srcset=${entrada[1].image} media="(max-width: 200px)" />
      <img class="imagem-do-produto" src=${entrada[1].image}  alt="imagem do produto ${entradaReduzida}">
    </picture>
    <div class="descricao-oferta">
         <h3 class="nomeproduto">${entradaReduzida}</h3>
      <div class="preco-Ebotao">
         <p class="preco-oferta preco">$${entrada[1].price}</p>
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
            <source  srcset=${objProduto[1].image} media="(max-width: 200px)" />
            <img class="imagem-do-produto" src=${objProduto[1].image}  alt="imagem do produto ${objProduto[1].title}">
         </picture>
    
         <div class="descricao-oferta">
            <h3 class="nomeproduto">${entradaReduzida}</h3>
            <div class="preco-Ebotao">
               <p class="preco-oferta preco">$${objProduto[1].price}</p>
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
            <source  srcset=${objProduto[1].image} media="(max-width: 200px)" />
            <img class="imagem-do-produto" src=${objProduto[1].image}  alt="imagem do produto ${objProduto[1].title}">
          </picture>
     
          <div class="descricao-produto">
             <h3 class="nomeproduto">${entradaReduzida}</h3>
             <div class="preco-Ebotao">
                <p class="preco-produto preco">$${objProduto[1].price}</p>
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
            <source srcset=${itemPesquisado[1].image} media="(max-width: 200px)">
            <img class="fotodoproduto" src=${itemPesquisado[1].image} alt="imagem do produto ${itemPesquisado[1].title}">
          </picture>
          
        <div class="informacoes">
            <h3 class="nomeproduto">${itemPesquisado[1].title}</h3>
            <div class="preco-Ebotao">
               <p class="preco">${itemPesquisado[1].price}</p>
               <p class="categoria">${itemPesquisado[1].category}</p>
            </div>
            <div class="descricao">
               <p>${itemPesquisado[1].description}</p>
            </div>
            <div class="rating-addcarrinho">
              <div class="rating">
                <h3 class="rating-rate">${itemPesquisado[1].rating.rate}<h3>
                <p class="rating-count">${itemPesquisado[1].rating.count}</p>
              </div>
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

  let conteudoCarrinhoArea = document.querySelector('.carrinho-menu .conteudo-carrinho');
  const imagemProduto = document.querySelectorAll('.item picture');
  const nomeProduto = document.querySelectorAll('.item .nomeproduto');
  const precoProduto = document.querySelectorAll('.item .preco');

  if (conteudoCarrinhoArea.childElementCount >= 1) {
    const avisoDoConteudo = document.querySelector('.carrinho-menu .aviso-conteudo-vazio')
    avisoDoConteudo.classList.add('close');
  }


  const imagemDaPicture = imagemProduto[index].querySelector('img');
  const img = imagemDaPicture.src

  conteudoCarrinhoArea.innerHTML += `
       <div class="bloco-menu">
         <picture>
            <source srcset=${img} media="(min-width: 100px)">
            <img src=${img} class="portraiter-pedido" alt="imagem do produto: ${nomeProduto[index].textContent}">
         </picture>
         <div class="nome-preco">
           <h3> ${nomeProduto[index].textContent} </h3>
           <p class="preco-produto-escolhido"> ${precoProduto[index].textContent} </p>
         </div>
         <div class="seletor-quantidade">
           <input class="aumentar-quantidade" type="button" value="+">
             <p class="quantidade-produto">1</p>
           <input class="diminuir-quantidade" type="button" value="-">
         </div>
         <button class="remover-item">
         <i class="fa-solid fa-trash fa-lg"></i>
         </button>
       </div>
    `

  const btAumentarQuantidade = document.querySelectorAll('.aumentar-quantidade');
  const btDiminuirQuantidade = document.querySelectorAll('.diminuir-quantidade');
  const quantidadeDeprodutos = document.querySelectorAll('.quantidade-produto');
  const precoProdutoEscolhido = document.querySelectorAll('.preco-produto-escolhido');
  var quantidadeDeitens = 1;
  var valorSemSinal = precoProduto[index].textContent.replace('$', '');
  var valor = parseFloat(valorSemSinal)
  var precoXquantidade = valor * quantidadeDeitens

  console.log('precoXquantidade: ', valor, 'valor que está no html: ', precoXquantidade)

  btAumentarQuantidade.forEach((botao, index) => {

    botao.addEventListener('click', () => {

      quantidadeDeitens++;

      precoXquantidade = valor * quantidadeDeitens

      quantidadeDeprodutos[index].innerHTML = `${quantidadeDeitens}`
      precoProdutoEscolhido[index].innerHTML = `${precoXquantidade}`

      SomarTotal(precoProdutoEscolhido)
    })

  })

  btDiminuirQuantidade.forEach((botao, index) => {

    botao.addEventListener('click', () => {

      if (quantidadeDeitens < 1) {

        return quantidadeDeitens = 1

      } else {
        quantidadeDeitens--

        precoXquantidade = valor * quantidadeDeitens

        quantidadeDeprodutos[index].innerHTML = `${quantidadeDeitens}`
        precoProdutoEscolhido[index].innerHTML = `${precoXquantidade}`

        SomarTotal(precoProdutoEscolhido)

      }
    })
  })


  const removerItem = document.querySelectorAll('.remover-item');
  const blocosCompra = document.querySelectorAll('.bloco-menu');

  removerItem.forEach((btRemover, index) => {

    btRemover.addEventListener('click', () => {
      blocosCompra[index].remove();
      if (conteudoCarrinhoArea.childElementCount === 0) {

        conteudoCarrinhoArea = `<p class="aviso-conteudo-vazio">seu carrinho está vazio</p>`

        console.log('O elemento pai não possui filhos.');

      } else {
        console.log('O elemento pai possui filhos.');

        SubtrairTotal(precoProdutoEscolhido, index, conteudoCarrinhoArea)
      }

    })
  })

  SomarTotal(precoProdutoEscolhido)

}


function renderizaProdutoPage(main, index, entradasTodosProdutos) {

  main.innerHTML += `
        
          <div class="page-produto">
           <button class="bt-fechar-page">
              <i class="fa-solid fa-xmark fa-2xl" style="color: rgb(226, 208, 47);"></i>
           </button>
           <div class="div-produto">
             <picture>
                <source srcset=${entradasTodosProdutos[index][1].image} media(max-width:20%;)>
                <img  src=${entradasTodosProdutos[index][1].image} alt="imagem do produto ">
             </picture>
          
             <div class="conteudo-page-information">
                 <div class="nome-categoria">
                    <h1>${entradasTodosProdutos[index][1].title}</h1>
                    <p>${entradasTodosProdutos[index][1].category}</p>
                 </div>
                 <p class="preco">$${entradasTodosProdutos[index][1].price}</p>
                 <div class="descricao">
                    <p>${entradasTodosProdutos[index][1].description}</p>   
                 </div>
                 <div class="rating">
                    <p class="rate">${entradasTodosProdutos[index][1].rating.rate}</p>
                    <p class="count">${entradasTodosProdutos[index][1].rating.count}</p> 
                 </div>
                 <div class="sessao-comentarios">
                     <div class="balao-comentario">
                         <input class="balao-comentar">
                         <input class="botao-enviar-coment" type="button" value="ENVIAR">
                     </div>
                 </div>
              </div>
            </div>
          </div>
     `

  const botaoFechar = document.querySelector('.bt-fechar-page');

  botaoFechar.addEventListener('click', () => {

     const pageProduto = document.querySelector('.page-produto')

     pageProduto.parentNode.removeChild(pageProduto)
  })

}


export { renderizaProdutoPage, renderizarProdutosIniciais, renderizaCategoria, renderizaCardProduto, renderizarCarrinho, adicionarItemAoCarrinho }