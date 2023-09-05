

function SomarTotal(precoProdutoEscolhido) {

    const TotalTodasCompras = document.querySelector('.Total-todas-compras')
    const todosOsPrecos = [];
    let somaTotal = 0;

    precoProdutoEscolhido.forEach((preco) => {

        const conteudoDoHtml = preco.textContent.replace('$', '')

        todosOsPrecos.push(parseFloat(conteudoDoHtml))
    })

    for (let i = 0; i < todosOsPrecos.length; i++) {

        somaTotal += todosOsPrecos[i]
    }

    TotalTodasCompras.innerHTML = `$${somaTotal}`
}

function SubtrairTotal(precoProdutoEscolhido, index, conteudoCarrinhoArea) {

    const TotalTodasCompras = document.querySelector('.Total-todas-compras')
    const oPrecoTotal = TotalTodasCompras.textContent.replace('$', '');
    let valor = parseFloat(oPrecoTotal)
    let somaTotal = 0;

    const oPrecoDoprodutoEscolhido = precoProdutoEscolhido[index].textContent.replace('$', '');
    let precoDoprodutoEscolhidoNumero = parseFloat(oPrecoDoprodutoEscolhido)
    if (conteudoCarrinhoArea.childElementCount > 1) {

        somaTotal = valor - precoDoprodutoEscolhidoNumero

        TotalTodasCompras.innerHTML = `$${somaTotal}`
    }else{

        TotalTodasCompras.innerHTML = `$0`
    }

}



export { SomarTotal, SubtrairTotal }