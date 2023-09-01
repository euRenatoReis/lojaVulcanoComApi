
import { pegaValorDaApi } from "./getData.js"


async function renderizarProdutosIniciais(entrada, campoOfertas, campoProdutos) {

    if (entrada[1].price >= 50) {

        const entradaReduzida = entrada[1].title.substring(0,40)

        campoProdutos.innerHTML += `<div class="produto">
     <picture>
       <source  srcset=${entrada[1].image} media="(min-width: 250px)" />
       <img class="imagem-do-produto" src=${entrada[1].image}  alt="imagem do produto ${entradaReduzida}">
     </picture>

     <div class="descricao-produto">
        <h3>${entradaReduzida}</h3>
        <p class="preco-produto">$${entrada[1].price}</p>
     </div>
     </div>`

    } else {

        const entradaReduzida = entrada[1].title.substring(0,40)

        campoOfertas.innerHTML += `<div class="oferta">
    <picture>
      <source  srcset=${entrada[1].image} media="(min-width: 250px)" />
      <img class="imagem-do-produto" src=${entrada[1].image}  alt="imagem do produto ${entradaReduzida}">
    </picture>
    <div class="descricao-oferta">
       <h3>${entradaReduzida}</h3>
       <p class="preco-oferta">$${entrada[1].price}</p>
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

                campoOfertas.innerHTML += `<div class="oferta">
    
         <picture>
            <source  srcset=${entrada[1].image} media="(min-width: 250px)" />
            <img class="imagem-do-produto" src=${entrada[1].image}  alt="imagem do produto ${entrada[1].title}">
         </picture>
    
         <div class="descricao-oferta">
            <h3>${entradaReduzida}</h3>
            <p class="preco-oferta">$${objProduto[1].price}</p>
         </div>
         </div>`

            } else {

                campoProdutos.innerHTML += `<div class="produto">
    
          <picture>
            <source  srcset=${entrada[1].image} media="(min-width: 250px)" />
            <img class="imagem-do-produto" src=${entrada[1].image}  alt="imagem do produto ${entrada[1].title}">
          </picture>
     
          <div class="descricao-produto">
             <h3>${entradaReduzida}</h3>
             <p class="preco-produto">$${objProduto[1].price}</p>
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
            <div class="nomeproduto">${itemPesquisado[1].title}</div>
            <div class="preco">${itemPesquisado[1].price}</div>
        </div>
      </div>
      `
    } else {
        return
    }
}


export { renderizarProdutosIniciais, renderizaCategoria, renderizaCardProduto }