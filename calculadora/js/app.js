// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function () {
    // Configurar data atual no modal de salvamento
    document.getElementById('save-date').valueAsDate = new Date();

    // Adicionar evento de clique ao botão de calcular
    document.getElementById('calculate-btn').addEventListener('click', calculateIMC);

    // Configurar seletores de idade
    document.querySelectorAll('.age-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.age-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            currentAgeGroup = this.getAttribute('data-age-group');
        });
    });

    // Configurar seletores de gênero
    document.querySelectorAll('.gender-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.gender-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            currentGender = this.getAttribute('data-gender');
        });
    });

    // Configurar botões de ordenação
    document.querySelectorAll('.sort-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('.sort-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentSort = this.getAttribute('data-sort');
            loadPatients();
        });
    });

    // Configurar seleção de idioma
    document.querySelectorAll('.language-option').forEach(option => {
        option.addEventListener('click', function () {
            document.querySelectorAll('.language-option').forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            currentLanguage = this.getAttribute('data-lang');
            applyTranslations(currentLanguage);
        });
    });

    // Verificar se há usuário logado
    const savedUser = localStorage.getItem('imcUser');
    if (savedUser) {
        currentUser = JSON.parse(savedUser);
        updateUserProfile();
    }

    // Configurar eventos de navegação
    document.getElementById('nav-home').addEventListener('click', () => showPage('home-page'));
    document.getElementById('nav-calculate').addEventListener('click', () => showPage('calculate-page'));
    document.getElementById('nav-result').addEventListener('click', () => showPage('result-page'));
    document.getElementById('nav-patients').addEventListener('click', () => showPage('patients-page'));

    // Configurar botões da página inicial
    document.getElementById('calculate-page-btn').addEventListener('click', () => showPage('calculate-page'));
    document.getElementById('patients-page-btn').addEventListener('click', () => showPage('patients-page'));

    // Configurar botões de autenticação
    document.getElementById('google-login-btn').addEventListener('click', loginWithGoogle);
    document.getElementById('microsoft-login-btn').addEventListener('click', loginWithMicrosoft);
    document.getElementById('logout-btn').addEventListener('click', logout);

    // Configurar botões da página de resultados
    document.getElementById('save-result-btn').addEventListener('click', openSaveModal);
    document.getElementById('calculate-again-btn').addEventListener('click', () => showPage('calculate-page'));

    // Configurar botões do modal de salvamento
    document.getElementById('save-confirm-btn').addEventListener('click', saveResult);
    document.getElementById('save-cancel-btn').addEventListener('click', closeSaveModal);

    // Configurar botão de pesquisa
    document.getElementById('search-btn').addEventListener('click', searchPatients);

    // Configurar botão de voltar para pacientes
    document.getElementById('back-to-patients-btn').addEventListener('click', () => showPage('patients-page'));

    // Configurar botão de adicionar novo registro
    document.getElementById('add-record-btn').addEventListener('click', addNewRecordForPatient);

    // Carregar pacientes se existir
    loadPatients();
});