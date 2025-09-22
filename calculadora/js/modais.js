// ===== MODAIS =====
function abrirModalSalvamento() {
    // Se estamos adicionando um novo registro para um paciente existente
    if (pacienteAtualParaNovoRegistro) {
        document.getElementById('nome-salvamento').value = pacienteAtualParaNovoRegistro.nome;
        document.getElementById('nome-salvamento').disabled = true;
    } else {
        document.getElementById('nome-salvamento').disabled = false;
    }
    document.getElementById('modal-salvamento').style.display = 'flex';
}

function fecharModalSalvamento() {
    document.getElementById('modal-salvamento').style.display = 'none';
}