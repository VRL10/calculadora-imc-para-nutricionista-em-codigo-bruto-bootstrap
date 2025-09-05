// ===== VARIÁVEIS GLOBAIS =====
let currentImc = 0;
let currentWeight = 0;
let currentHeight = 0;
let currentAgeGroup = 'child1';
let currentGender = 'male';
let currentEditId = null;
let currentSort = 'name';
let currentLanguage = 'pt';
let currentUser = null;
let imcChart = null;
let weightChart = null;
let currentPatientId = null;
let currentPatientForNewRecord = null;

// ===== FUNÇÕES UTILITÁRIAS =====
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString(currentLanguage);
}

function showNotification(message, type = 'info') {
    // Implementar um sistema de notificações se necessário
    alert(message);
}