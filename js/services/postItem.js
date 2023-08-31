
async function postMeusProdutos() {

    let valorDaPesquisa = await pesquisaValorDaApi(conteudoPesquisa);
    let EntradasObj = Object.entries(valorDaPesquisa)

    const bolaDeFutebol = {

        "id": `${EntradasObj.length + 1}`,
        "title": "Bola de futebol juvenil n.5",
        "price": 599,
        "description": "Bola tradicional com tamanho e peso oficiais do futebol. Possui design gráfico e revestida em couro sintético em uma camada brilhante, tornandoa mais macia no momento do chute. Costurada à máquina. Câmara de Butíl. Pesos e medidas oficiais. Bola tradicional nº 5 com 32 gomo"
        , "category": "sports",
        "image": "../../imagens/mycollection/png/bola_de_futebol",
        "rating": {
            "rate": 2.9,
            "count": 250
        }
    }

    fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(bolaDeFutebol)

    }).then(response => response.json())
        .then(data => {
            console.log("Novo produto adicionado:", data);

        }).catch(error => {
            console.error("Erro ao adicionar novo produto:", error);
        });

}

export {postMeusProdutos}