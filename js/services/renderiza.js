
import { pegaValorDaApi } from "./getData.js"


async function renderizarProdutosIniciais(entrada, campoOfertas, campoProdutos) {

    if (entrada[1].price >= 50) {

        campoProdutos.innerHTML += `<div class="produto">
    
     <img class="imagem-do-produto" src=${entrada[1].image} alt="imagem do produto ${entrada[1].title}">

     <div class="descricao-produto">
        <h3>${entrada[1].title}</h3>
        <p class="preco-produto">$${entrada[1].price}</p>
     </div>
     </div>`

    } else {

        campoOfertas.innerHTML += `<div class="oferta">
    
    <img class="imagem-do-produto" src=${entrada[1].image}  alt="imagem do produto ${entrada[1].title}">

    <div class="descricao-oferta">
       <h3>${entrada[1].title}</h3>
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
    
         <img class="imagem-do-produto" src=${objProduto[1].image}  alt="imagem do produto ${objProduto[1].title}">
    
         <div class="descricao-oferta">
            <h3>${objProduto[1].title}</h3>
            <p class="preco-oferta">$${objProduto[1].price}</p>
         </div>
         </div>`

            } else {

                campoProdutos.innerHTML += `<div class="produto">
    
          <img class="imagem-do-produto" src=${objProduto[1].image} alt="imagem do produto ${objProduto[1].title}">
     
          <div class="descricao-produto">
             <h3>${objProduto[1].title}</h3>
             <p class="preco-produto">$${objProduto[1].price}</p>
          </div>
          </div>`
            }

        } else {

            return
        }

    })

}



export { renderizarProdutosIniciais, renderizaCategoria }