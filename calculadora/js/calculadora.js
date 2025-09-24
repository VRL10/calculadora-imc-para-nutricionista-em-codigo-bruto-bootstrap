// ===== CÁLCULO DE IMC PROFISSIONAL =====
function calcularIMC() {
    // Obter e validar valores
    const peso = parseFloat(document.getElementById('peso').value.replace(',', '.'));
    const altura = parseFloat(document.getElementById('altura').value.replace(',', '.'));

    // Validações robustas
    if (isNaN(peso) || isNaN(altura)) {
        alert('Por favor, insira valores numéricos válidos para peso e altura.');
        return;
    }

    if (peso <= 0 || altura <= 0) {
        alert('Peso e altura devem ser valores positivos maiores que zero.');
        return;
    }

    if (peso > 300) {
        alert('Por favor, insira um peso válido (até 300 kg).');
        return;
    }

    if (altura > 300 || altura <= 30) {
        alert('Por favor, insira altura em centímetros (ex: 175). Evite utilizar alturas inexistentes');
        return;
    }

    // Salvar valores atuais para uso posterior (em centímetros)
    pesoAtual = peso;
    alturaAtual = altura; // Já está em cm

    // Converter altura se for em centímetros para metros (para cálculo)
    const alturaMetros = altura > 3 ? altura / 100 : altura;

    // Calcular IMC
    const imc = peso / (alturaMetros * alturaMetros);
    const imcArredondado = imc.toFixed(1);
    imcAtual = imc;

    // Classificação do IMC
    let categoria, classeCategoria;

    switch (true) {
        case (imc < 18.5):
            categoria = 'Abaixo do peso';
            classeCategoria = 'categoria-abaixo-peso';
            break;

        case (imc < 25):
            categoria = 'Peso normal';
            classeCategoria = 'categoria-normal';
            break;

        case (imc < 30):
            categoria = 'Sobrepeso';
            classeCategoria = 'categoria-sobrepeso';
            break;

        case (imc < 35):
            categoria = 'Obesidade Grau I';
            classeCategoria = 'categoria-obesidade-1';
            break;

        case (imc < 40):
            categoria = 'Obesidade Grau II';
            classeCategoria = 'categoria-obesidade-2';
            break;

        default:
            categoria = 'Obesidade Grau III';
            classeCategoria = 'categoria-obesidade-3';
    }

    // ATUALIZAR A INTERFACE
    document.getElementById('valor-imc').textContent = imcArredondado;
    document.getElementById('categoria-imc').textContent = categoria;
    document.getElementById('categoria-imc').className = 'categoria-imc ' + classeCategoria;

    // Calcular peso ideal
    const pesoMinimo = (18.5 * alturaMetros * alturaMetros).toFixed(1);
    const pesoMaximo = (24.9 * alturaMetros * alturaMetros).toFixed(1);
    document.getElementById('peso-ideal').textContent = `${pesoMinimo}kg - ${pesoMaximo}kg`;

    // Mostrar resultados
    mostrarPagina('pagina-resultado');
}