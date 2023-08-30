
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

barradebusca.addEventListener('keyup', async (e) => {
  const pegarValorEvento = e.target.value;
  const pressionado = e.which || e.keycode;
  const chave = pressionado === 13;

  // chamar a função pegaValorDaApi sem os parênteses
  await pegaValorDaApi();
})

async function pegaValorDaApi() {
  try {

    const response = await fetch(`https://fakestoreapi.com/products`);
    const products = await response.json();

    return await products

  } catch (error) {
    console.log('Ocorreu um erro ao buscar produtos', error);
  }
}

const pegaTodosProdutos = await pegaValorDaApi()

const entradasTodosProdutos = Object.entries(pegaTodosProdutos)

entradasTodosProdutos.forEach((entrada) => {

  if (entrada[1].price >= 50) {

     campoProdutos.innerHTML += `<div class="produto">
    
     <img class="imagem-do-produto" src=${entrada[1].image} alt="imagem do produto ${entrada[1].title}">

     <div class="descricao-produto">
        <h3>${entrada[1].title}</h3>
        <p>${entrada[1].price}</p>
     </div>
     </div>`

  } else {

    campoOfertas.innerHTML += `<div class="oferta">]
    
    <img class="imagem-do-produto" src=${entrada[1].image}  alt="imagem do produto ${entrada[1].title}">

    <div class="descricao-oferta">
       <h3>${entrada[1].title}</h3>
       <p>${entrada[1].price}</p>
    </div>
    </div>`
  }


})





botcatg.forEach((botao) => {


  botao.addEventListener('click', async () => {

    campoOfertas.innerHTML = ``
    campoProdutos.innerHTML = ``

    const resposta = await pegaValorDaApi()
    const categoriaDobotao = botao.id

    const entradasRespostas = Object.entries(resposta)

    console.log('resposta é:', resposta, 'entradasResposta: ', entradasRespostas, 'um exemplo de entrada:', entradasRespostas[1][1].category)

    entradasRespostas.forEach((objProduto) => {

      if (objProduto[1].category === categoriaDobotao) {

        if (objProduto[1].price <= 50) {

          campoOfertas.innerHTML += `<div class="oferta">]
    
         <img class="imagem-do-produto" src=${objProduto[1].image}  alt="imagem do produto ${objProduto[1].title}">
    
         <div class="descricao-oferta">
            <h3>${objProduto[1].title}</h3>
            <p>${objProduto[1].price}</p>
         </div>
         </div>`

        } else {

          campoProdutos.innerHTML += `<div class="produto">
    
          <img class="imagem-do-produto" src=${objProduto[1].image} alt="imagem do produto ${objProduto[1].title}">
     
          <div class="descricao-produto">
             <h3>${objProduto[1].title}</h3>
             <p>${objProduto[1].price}</p>
          </div>
          </div>`
        }

      } else {

        return
      }

    })

  })

})
