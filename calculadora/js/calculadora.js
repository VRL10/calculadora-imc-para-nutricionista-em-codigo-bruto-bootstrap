// ===== CÁLCULO DE IMC =====
function calcularIMC() {
    const peso = parseFloat(document.getElementById('peso').value);
    const altura = parseFloat(document.getElementById('altura').value) / 100; // Converter para metros

    if (isNaN(peso) || isNaN(altura) || altura <= 0) {
        alert('Por favor, insira valores válidos para peso e altura.');
        return;
    }

    pesoAtual = peso;
    alturaAtual = altura;
    imcAtual = peso / (altura * altura);
    const imcArredondado = imcAtual.toFixed(1);

    // Mostrar resultado
    document.getElementById('valor-imc').textContent = imcArredondado;

    // Determinar categoria
    let categoria = '';
    let classeCategoria = '';
    let chaveCategoria = '';

    if (imcAtual <= 15.9) {
        categoria = traducoes[idiomaAtual].magreza_grave;
        chaveCategoria = 'magreza_grave';
        classeCategoria = 'categoria-magreza-grave';
    } else if (imcAtual <= 16.9) {
        categoria = traducoes[idiomaAtual].magreza_moderada;
        chaveCategoria = 'magreza_moderada';
        classeCategoria = 'categoria-magreza-moderada';
    } else if (imcAtual <= 18.4) {
        categoria = traducoes[idiomaAtual].magreza_leve;
        chaveCategoria = 'magreza_leve';
        classeCategoria = 'categoria-magreza-leve';
    } else if (imcAtual <= 24.9) {
        categoria = traducoes[idiomaAtual].saudavel;
        chaveCategoria = 'saudavel';
        classeCategoria = 'categoria-saudavel';
    } else if (imcAtual <= 29.9) {
        categoria = traducoes[idiomaAtual].sobrepeso;
        chaveCategoria = 'sobrepeso';
        classeCategoria = 'categoria-sobrepeso';
    } else if (imcAtual <= 34.9) {
        categoria = traducoes[idiomaAtual].obesidade_1;
        chaveCategoria = 'obesidade_1';
        classeCategoria = 'categoria-obesidade-1';
    } else if (imcAtual <= 39.9) {
        categoria = traducoes[idiomaAtual].obesidade_2;
        chaveCategoria = 'obesidade_2';
        classeCategoria = 'categoria-obesidade-2';
    } else {
        categoria = traducoes[idiomaAtual].obesidade_3;
        chaveCategoria = 'obesidade_3';
        classeCategoria = 'categoria-obesidade-3';
    }

    document.getElementById('categoria-imc').textContent = categoria;
    document.getElementById('categoria-imc').className = 'categoria-imc ' + classeCategoria;

    // Calcular peso ideal
    const pesoIdealMinimo = (18.5 * (altura * altura)).toFixed(1);
    const pesoIdealMaximo = (24.9 * (altura * altura)).toFixed(1);
    document.getElementById('peso-ideal').textContent = `${pesoIdealMinimo} - ${pesoIdealMaximo} kg`;

    // Destacar a escala correspondente
    document.querySelectorAll('.item-escala').forEach(item => item.classList.remove('ativo'));

    if (imcAtual <= 15.9) {
        document.getElementById('escala-magreza-grave').classList.add('ativo');
    } else if (imcAtual <= 16.9) {
        document.getElementById('escala-magreza-moderada').classList.add('ativo');
    } else if (imcAtual <= 18.4) {
        document.getElementById('escala-magreza-leve').classList.add('ativo');
    } else if (imcAtual <= 24.9) {
        document.getElementById('escala-saudavel').classList.add('ativo');
    } else if (imcAtual <= 29.9) {
        document.getElementById('escala-sobrepeso').classList.add('ativo');
    } else if (imcAtual <= 34.9) {
        document.getElementById('escala-obesidade-1').classList.add('ativo');
    } else if (imcAtual <= 39.9) {
        document.getElementById('escala-obesidade-2').classList.add('ativo');
    } else {
        document.getElementById('escala-obesidade-3').classList.add('ativo');
    }

    // Mostrar página de resultados
    mostrarPagina('pagina-resultado');
}