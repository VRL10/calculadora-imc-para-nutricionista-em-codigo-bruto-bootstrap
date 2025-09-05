// ===== MODAIS =====
function openSaveModal() {
    // Se estamos adicionando um novo registro para um paciente existente
    if (currentPatientForNewRecord) {
        document.getElementById('save-name').value = currentPatientForNewRecord.name;
        document.getElementById('save-name').disabled = true;
    } else {
        document.getElementById('save-name').disabled = false;
    }
    document.getElementById('save-modal').style.display = 'flex';
}

function closeSaveModal() {
    document.getElementById('save-modal').style.display = 'none';
}