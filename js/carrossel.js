
const indiceAtual = 0;

function avancarSlide() {

    carrossel[indiceAtual].classList.remove('aberto');
    indiceAtual = (indiceAtual + 1) % carrossel.length;
    carrossel[indiceAtual].classList.add('aberto');
}

function retornarSlide() {

    carrossel[indiceAtual].classList.remove('aberto');
    indiceAtual = (indiceAtual - 1 + carrossel.length) % carrossel.length;
    carrossel[indiceAtual].classList.add('aberto');
}

function trocarSlide() {

    carrossel[indiceAtual].classList.remove('aberto');
    indiceAtual = (indiceAtual + 1) % carrossel.length;
    carrossel[indiceAtual].classList.add('aberto');

}


export { avancarSlide, retornarSlide, trocarSlide }