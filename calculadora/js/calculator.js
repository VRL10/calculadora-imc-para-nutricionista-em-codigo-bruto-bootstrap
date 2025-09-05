// ===== CÁLCULO DE IMC =====
function calculateIMC() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100; // Converter para metros

    if (isNaN(weight) || isNaN(height) || height <= 0) {
        alert('Por favor, insira valores válidos para peso e altura.');
        return;
    }

    currentWeight = weight;
    currentHeight = height;
    currentImc = weight / (height * height);
    const roundedImc = currentImc.toFixed(1);

    // Mostrar resultado
    document.getElementById('imc-value').textContent = roundedImc;

    // Determinar categoria
    let category = '';
    let categoryClass = '';
    let categoryKey = '';

    if (currentImc <= 15.9) {
        category = translations[currentLanguage].severe_thinness;
        categoryKey = 'severe_thinness';
        categoryClass = 'category-magreza-grave';
    } else if (currentImc <= 16.9) {
        category = translations[currentLanguage].moderate_thinness;
        categoryKey = 'moderate_thinness';
        categoryClass = 'category-magreza-moderada';
    } else if (currentImc <= 18.4) {
        category = translations[currentLanguage].mild_thinness;
        categoryKey = 'mild_thinness';
        categoryClass = 'category-magreza-leve';
    } else if (currentImc <= 24.9) {
        category = translations[currentLanguage].healthy;
        categoryKey = 'healthy';
        categoryClass = 'category-saudavel';
    } else if (currentImc <= 29.9) {
        category = translations[currentLanguage].overweight;
        categoryKey = 'overweight';
        categoryClass = 'category-sobrepeso';
    } else if (currentImc <= 34.9) {
        category = translations[currentLanguage].obesity_1;
        categoryKey = 'obesity_1';
        categoryClass = 'category-obesidade-1';
    } else if (currentImc <= 39.9) {
        category = translations[currentLanguage].obesity_2;
        categoryKey = 'obesity_2';
        categoryClass = 'category-obesidade-2';
    } else {
        category = translations[currentLanguage].obesity_3;
        categoryKey = 'obesity_3';
        categoryClass = 'category-obesidade-3';
    }

    document.getElementById('imc-category').textContent = category;
    document.getElementById('imc-category').className = 'imc-category ' + categoryClass;

    // Calcular peso ideal
    const minIdealWeight = (18.5 * (height * height)).toFixed(1);
    const maxIdealWeight = (24.9 * (height * height)).toFixed(1);
    document.getElementById('ideal-weight').textContent = `${minIdealWeight} - ${maxIdealWeight} kg`;

    // Destacar a escala correspondente
    document.querySelectorAll('.scale-item').forEach(item => item.classList.remove('active'));

    if (currentImc <= 15.9) {
        document.getElementById('scale-magreza-grave').classList.add('active');
    } else if (currentImc <= 16.9) {
        document.getElementById('scale-magreza-moderada').classList.add('active');
    } else if (currentImc <= 18.4) {
        document.getElementById('scale-magreza-leve').classList.add('active');
    } else if (currentImc <= 24.9) {
        document.getElementById('scale-saudavel').classList.add('active');
    } else if (currentImc <= 29.9) {
        document.getElementById('scale-sobrepeso').classList.add('active');
    } else if (currentImc <= 34.9) {
        document.getElementById('scale-obesidade-1').classList.add('active');
    } else if (currentImc <= 39.9) {
        document.getElementById('scale-obesidade-2').classList.add('active');
    } else {
        document.getElementById('scale-obesidade-3').classList.add('active');
    }

    // Mostrar página de resultados
    showPage('result-page');
}