// ===== FUNÇÕES DE PÁGINAS =====
function mostrarPagina(idPagina) {
    document.querySelectorAll('.pagina').forEach(pagina => pagina.classList.remove('ativo'));
    document.getElementById(idPagina).classList.add('ativo');

    // Atualizar navegação
    document.querySelectorAll('.item-navegacao').forEach(nav => nav.classList.remove('ativo'));

    if (idPagina === 'pagina-inicial') {
        document.querySelector('.item-navegacao:nth-child(1)').classList.add('ativo');
    } else if (idPagina === 'pagina-calculo') {
        document.querySelector('.item-navegacao:nth-child(2)').classList.add('ativo');
        // Se estamos vindo de um paciente específico, preencher os dados
        if (pacienteAtualParaNovoRegistro) {
            document.querySelector(`.opcao-idade[dados-grupo-idade="${pacienteAtualParaNovoRegistro.grupoIdade}"]`).click();
            document.querySelector(`.opcao-genero[dados-genero="${pacienteAtualParaNovoRegistro.genero}"]`).click();
        }
    } else if (idPagina === 'pagina-resultado') {
        document.querySelector('.item-navegacao:nth-child(3)').classList.add('ativo');
    } else if (idPagina === 'pagina-pacientes') {
        document.querySelector('.item-navegacao:nth-child(4)').classList.add('ativo');
        carregarPacientes();
    }
    // Para a página de histórico do paciente, não destacamos nenhum item do menu inferior
}