

async function pegaValorDaApi() {
    try {

        const response = await fetch(`https://fakestoreapi.com/products`);
        const products = await response.json();

        return await products

    } catch (error) {
        console.log('Ocorreu um erro ao buscar produtos', error);
    }
}


export { pegaValorDaApi }