// ===== FUNÇÕES DE PÁGINAS =====
function mostrarPagina(idPagina) {
    document.querySelectorAll('.pagina').forEach(pagina => pagina.classList.remove('ativo'));
    document.getElementById(idPagina).classList.add('ativo');

    // Atualizar navegação
    document.querySelectorAll('.item-navegacao').forEach(nav => nav.classList.remove('ativo'));

    if (idPagina === 'pagina-inicial') {
        document.querySelector('.item-navegacao:nth-child(1)').classList.add('ativo');
        // Limpar paciente atual quando voltar para início
        pacienteAtualParaNovoRegistro = null;
    } else if (idPagina === 'pagina-calculo') {
        document.querySelector('.item-navegacao:nth-child(2)').classList.add('ativo');
        
        // Se estamos vindo de um paciente específico, preencher os dados
        if (pacienteAtualParaNovoRegistro) {
            // Selecionar grupo de idade e gênero
            const opcaoIdade = document.querySelector(`.opcao-idade[dados-grupo-idade="${pacienteAtualParaNovoRegistro.grupoIdade}"]`);
            const opcaoGenero = document.querySelector(`.opcao-genero[dados-genero="${pacienteAtualParaNovoRegistro.genero}"]`);
            
            if (opcaoIdade) opcaoIdade.click();
            if (opcaoGenero) opcaoGenero.click();
            
            // Pré-preencher peso e altura com os últimos valores
            if (pacienteAtualParaNovoRegistro.ultimoPeso) {
                document.getElementById('peso').value = pacienteAtualParaNovoRegistro.ultimoPeso;
            }
            if (pacienteAtualParaNovoRegistro.ultimaAltura) {
                document.getElementById('altura').value = pacienteAtualParaNovoRegistro.ultimaAltura;
            }
        } else {
            // Limpar campos se for um novo cálculo para novo paciente
            document.getElementById('peso').value = '';
            document.getElementById('altura').value = '';
            
            // Resetar para valores padrão
            document.querySelector('.opcao-idade[dados-grupo-idade="adulto"]').click();
            document.querySelector('.opcao-genero[dados-genero="masculino"]').click();
        }
    } else if (idPagina === 'pagina-resultado') {
        document.querySelector('.item-navegacao:nth-child(3)').classList.add('ativo');
    } else if (idPagina === 'pagina-pacientes') {
        document.querySelector('.item-navegacao:nth-child(4)').classList.add('ativo');
        carregarPacientes();
    }
    // Para a página de histórico do paciente, não destacamos nenhum item do menu inferior
}