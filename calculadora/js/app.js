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