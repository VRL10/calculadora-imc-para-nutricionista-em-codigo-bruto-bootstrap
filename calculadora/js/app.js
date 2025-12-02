// ----- INICIALIZAÇÃo ----
document.addEventListener('DOMContentLoaded', function () {
    // Configurar data atual no modal de salvament
    document.getElementById('data-salvamento').valueAsDate = new Date();

    // Adicionar evento de clique ao botão de calcular
    document.getElementById('botao-calcular').addEventListener('click', calcularIMC);

    // Configurar seletores de idade
    document.querySelectorAll('.opcao-idade').forEach(opcao => {
        opcao.addEventListener('click', function () {
            document.querySelectorAll('.opcao-idade').forEach(opt => opt.classList.remove('ativo'));
            this.classList.add('ativo');
            grupoIdadeAtual = this.getAttribute('dados-grupo-idade');
        });
    });

    // Configurar seletores de genero
    document.querySelectorAll('.opcao-genero').forEach(opcao => {
        opcao.addEventListener('click', function () {
            document.querySelectorAll('.opcao-genero').forEach(opt => opt.classList.remove('ativo'));
            this.classList.add('ativo');
            generoAtual = this.getAttribute('dados-genero');
        });
    });

    // Configurar botões de ordenação
    document.querySelectorAll('.botao-ordenar').forEach(botao => {
        botao.addEventListener('click', function () {
            document.querySelectorAll('.botao-ordenar').forEach(b => b.classList.remove('ativo'));
            this.classList.add('ativo');
            ordenacaoAtual = this.getAttribute('dados-ordenacao');
            carregarPacientes();
        });
    });

    // Configurar seleção de idioma
    document.querySelectorAll('.opcao-idioma').forEach(opcao => {
        opcao.addEventListener('click', function () {
            document.querySelectorAll('.opcao-idioma').forEach(opt => opt.classList.remove('ativo'));
            this.classList.add('ativo');
            idiomaAtual = this.getAttribute('dados-idioma');
            aplicarTraducoes(idiomaAtual);
        });
    });

    // Verificar se há usuário logado
    const usuarioSalvo = localStorage.getItem('usuarioIMC');
    if (usuarioSalvo) {
        usuarioAtual = JSON.parse(usuarioSalvo);
        atualizarPerfilUsuario();
    }

    // Configurar eventos de navegação
    document.getElementById('navegacao-inicio').addEventListener('click', () => mostrarPagina('pagina-inicial'));
    document.getElementById('navegacao-calcular').addEventListener('click', () => {
        pacienteAtualParaNovoRegistro = null; // Limpar para novo paciente
        mostrarPagina('pagina-calculo');
    });
    document.getElementById('navegacao-resultado').addEventListener('click', () => mostrarPagina('pagina-resultado'));
    document.getElementById('navegacao-pacientes').addEventListener('click', () => mostrarPagina('pagina-pacientes'));

    // Configurar botões da página inicial
    document.getElementById('botao-ir-calcular').addEventListener('click', () => {
        pacienteAtualParaNovoRegistro = null; // Limpar para novo paciente
        mostrarPagina('pagina-calculo');
    });
    document.getElementById('botao-ir-pacientes').addEventListener('click', () => mostrarPagina('pagina-pacientes'));

    // Configurar botões de autenticação
    document.getElementById('botao-login-google').addEventListener('click', loginComGoogle);
    document.getElementById('botao-login-microsoft').addEventListener('click', loginComMicrosoft);
    document.getElementById('botao-logout').addEventListener('click', logout);

    // Configurar botões da página de resultados
    document.getElementById('botao-salvar-resultado').addEventListener('click', abrirModalSalvamento);
    document.getElementById('botao-calcular-novamente').addEventListener('click', () => {
        // Manter o paciente atual se estiver adicionando novo registro
        mostrarPagina('pagina-calculo');
    });

    // Configurar botões do modal de salvamento
    document.getElementById('botao-confirmar-salvamento').addEventListener('click', salvarResultado);
    document.getElementById('botao-cancelar-salvamento').addEventListener('click', fecharModalSalvamento);

    // Configurar botão de pesquisa
    document.getElementById('botao-pesquisar').addEventListener('click', pesquisarPacientes);
    
    // Configurar pesquisa com Enter
    document.getElementById('campo-pesquisa').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            pesquisarPacientes();
        }
    });

    // Configurar botão de voltar para pacientes
    document.getElementById('botao-voltar-pacientes').addEventListener('click', () => mostrarPagina('pagina-pacientes'));

    // Configurar botão de adicionar novo registro
    document.getElementById('botao-adicionar-registro').addEventListener('click', adicionarNovoRegistroParaPaciente);

    // Carregar pacientes se existir
    carregarPacientes();
});

// Perfil e Dropdown Functionality
document.addEventListener('DOMContentLoaded', function() {
    const profileContainer = document.getElementById('profile-container');
    const profileIcon = document.getElementById('profile-icon');
    const profileDropdown = document.getElementById('profile-dropdown');
    const profileViewBtn = document.getElementById('profile-view');
    const profileLogoutBtn = document.getElementById('profile-logout');
    
    // Toggle dropdown
    profileIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
    });
    
    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!profileContainer.contains(e.target)) {
            profileDropdown.classList.remove('show');
        }
    });
    
    // Navegar para página de perfil
    profileViewBtn.addEventListener('click', function(e) {
        e.preventDefault();
        profileDropdown.classList.remove('show');
        navigateToPage('perfil');
        updateNavigation('perfil');
    });
    
    // Logout
    profileLogoutBtn.addEventListener('click', function(e) {
        e.preventDefault();
        profileDropdown.classList.remove('show');
        // Sua função de logout aqui
        logoutUser();
    });
    
    // Atualizar informações do usuário no dropdown
    function updateUserProfile(user) {
        if (user) {
            document.getElementById('dropdown-username').textContent = user.name || 'Usuário';
            document.getElementById('dropdown-useremail').textContent = user.email || 'user@exemplo.com';
            document.getElementById('profile-username').textContent = user.name || 'Usuário';
            document.getElementById('profile-useremail').textContent = user.email || 'user@exemplo.com';
        }
    }
    
    // Função de logout
    function logoutUser() {
        // Sua lógica de logout aqui
        console.log('Usuário deslogado');
        // Redirecionar para login ou atualizar UI
    }
    
    // Página de Perfil
    function initializeProfilePage() {
        // Carregar dados do usuário
        loadUserData();
        // Carregar estatísticas
        loadProfileStats();
    }
    
    function loadUserData() {
        // Carregar dados do usuário do localStorage ou API
        const userData = JSON.parse(localStorage.getItem('userData')) || {
            name: 'Usuário',
            email: 'user@exemplo.com',
            joinDate: '2024-01-01',
            lastLogin: new Date().toLocaleDateString()
        };
        
        document.getElementById('profile-username').textContent = userData.name;
        document.getElementById('profile-useremail').textContent = userData.email;
        document.getElementById('profile-joindate').textContent = userData.joinDate;
        document.getElementById('profile-lastlogin').textContent = userData.lastLogin;
    }
    
    function loadProfileStats() {
        // Carregar estatísticas do usuário
        const pacientes = JSON.parse(localStorage.getItem('pacientes')) || [];
        const totalCalculos = pacientes.reduce((acc, paciente) => acc + (paciente.registros?.length || 1), 0);
        
        document.getElementById('stat-pacientes').textContent = pacientes.length;
        document.getElementById('stat-calculations').textContent = totalCalculos;
        
        // Calcular IMC médio
        let totalIMC = 0;
        let count = 0;
        pacientes.forEach(paciente => {
            if (paciente.registros) {
                paciente.registros.forEach(registro => {
                    totalIMC += registro.imc;
                    count++;
                });
            }
        });
        
        const avgIMC = count > 0 ? (totalIMC / count).toFixed(1) : '0.0';
        document.getElementById('stat-avgimc').textContent = avgIMC;
    }
    
    // Adicionar ao objeto de navegação existente
    window.navigation.pages['perfil'] = {
        element: document.getElementById('pagina-perfil'),
        initialize: initializeProfilePage
    };
    
    // Adicionar indicador para página de perfil (protege existência do elemento)
    const perfilIndicator = document.createElement('div');
    perfilIndicator.className = 'indicator-dot';
    perfilIndicator.setAttribute('data-page', 'perfil');
    const headerIndicator = document.querySelector('.header-indicator');
    if (headerIndicator) headerIndicator.appendChild(perfilIndicator);

    // Garantir que window.navigation e pages existam para evitar exceção
    if (!window.navigation) window.navigation = { pages: {} };
    if (!window.navigation.pages) window.navigation.pages = {};
});