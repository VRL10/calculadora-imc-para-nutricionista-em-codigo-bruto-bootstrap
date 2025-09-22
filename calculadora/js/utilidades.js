// ===== VARIÁVEIS GLOBAIS =====
let imcAtual = 0;
let pesoAtual = 0;
let alturaAtual = 0;
let grupoIdadeAtual = 'crianca1';
let generoAtual = 'masculino';
let idEdicaoAtual = null;
let ordenacaoAtual = 'nome';
let idiomaAtual = 'pt';
let usuarioAtual = null;
let graficoIMC = null;
let graficoPeso = null;
let idPacienteAtual = null;
let pacienteAtualParaNovoRegistro = null;

// ===== FUNÇÕES UTILITÁRIAS =====
function formatarData(dataString) {
    const data = new Date(dataString);
    return data.toLocaleDateString(idiomaAtual);
}

function mostrarNotificacao(mensagem, tipo = 'info') {
    // Implementar um sistema de notificações se necessário
    alert(mensagem);
}