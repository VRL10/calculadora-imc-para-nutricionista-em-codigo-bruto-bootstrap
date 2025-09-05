// ===== FUNÇÕES DE PÁGINAS =====
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    // Atualizar navegação
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));

    if (pageId === 'home-page') {
        document.querySelector('.nav-item:nth-child(1)').classList.add('active');
    } else if (pageId === 'calculate-page') {
        document.querySelector('.nav-item:nth-child(2)').classList.add('active');
        // Se estamos vindo de um paciente específico, preencher os dados
        if (currentPatientForNewRecord) {
            document.querySelector(`.age-option[data-age-group="${currentPatientForNewRecord.ageGroup}"]`).click();
            document.querySelector(`.gender-option[data-gender="${currentPatientForNewRecord.gender}"]`).click();
        }
    } else if (pageId === 'result-page') {
        document.querySelector('.nav-item:nth-child(3)').classList.add('active');
    } else if (pageId === 'patients-page') {
        document.querySelector('.nav-item:nth-child(4)').classList.add('active');
        loadPatients();
    }
    // Para a página de histórico do paciente, não destacamos nenhum item do menu inferior
}