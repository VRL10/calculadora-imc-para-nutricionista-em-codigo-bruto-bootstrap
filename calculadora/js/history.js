// ===== SALVAMENTO E HISTÓRICO =====
function saveResult() {
    const name = document.getElementById('save-name').value;
    const date = document.getElementById('save-date').value;

    if (!name) {
        alert('Por favor, informe o nome do paciente.');
        return;
    }

    // Obter dados atuais do armazenamento
    let patients = JSON.parse(localStorage.getItem('imcPatients')) || {};
    
    // Se o paciente já existe, adicionar um novo registro
    if (patients[name]) {
        patients[name].records.push({
            date: date,
            imc: currentImc.toFixed(1),
            weight: currentWeight,
            height: currentHeight * 100, // Converter para cm
            category: document.getElementById('imc-category').textContent
        });
    } else {
        // Se é um novo paciente, criar uma nova entrada
        patients[name] = {
            ageGroup: currentAgeGroup,
            gender: currentGender,
            records: [{
                date: date,
                imc: currentImc.toFixed(1),
                weight: currentWeight,
                height: currentHeight * 100, // Converter para cm
                category: document.getElementById('imc-category').textContent
            }]
        };
    }

    // Salvar no localStorage
    localStorage.setItem('imcPatients', JSON.stringify(patients));

    // Fechar modal
    closeSaveModal();

    // Limpar paciente atual se estivermos adicionando um novo registro
    currentPatientForNewRecord = null;

    // Mostrar mensagem de sucesso
    alert(translations[currentLanguage].save_result + '!');

    // Limpar campo de nome
    document.getElementById('save-name').value = '';
    document.getElementById('save-name').disabled = false;
}

function searchPatients() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    loadPatients(searchTerm);
}

function loadPatients(searchTerm = '') {
    const patients = JSON.parse(localStorage.getItem('imcPatients')) || {};
    const patientsList = document.getElementById('patients-list');

    // Converter objeto em array para facilitar a manipulação
    let patientsArray = Object.entries(patients).map(([name, data]) => {
        return {
            name: name,
            ...data,
            // Ordenar registros por data e pegar o mais recente
            latestRecord: data.records.sort((a, b) => new Date(b.date) - new Date(a.date))[0]
        };
    });

    // Filtrar resultados se houver termo de busca
    if (searchTerm) {
        patientsArray = patientsArray.filter(patient =>
            patient.name.toLowerCase().includes(searchTerm)
        );
    }

    // Ordenar resultados
    if (currentSort === 'date') {
        patientsArray.sort((a, b) => new Date(b.latestRecord.date) - new Date(a.latestRecord.date));
    } else if (currentSort === 'name') {
        patientsArray.sort((a, b) => a.name.localeCompare(b.name));
    }

    if (patientsArray.length === 0) {
        patientsList.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-users fa-3x text-muted mb-3"></i>
                <p>${searchTerm ? 'Nenhum paciente encontrado' : 'Nenhum paciente salvo ainda'}</p>
            </div>
        `;
        return;
    }

    // Limpar lista
    patientsList.innerHTML = '';

    // Adicionar itens dos pacientes
    patientsArray.forEach((patient) => {
        let categoryClass = '';

        if (patient.latestRecord.category === translations[currentLanguage].severe_thinness) categoryClass = 'category-magreza-grave';
        else if (patient.latestRecord.category === translations[currentLanguage].moderate_thinness) categoryClass = 'category-magreza-moderada';
        else if (patient.latestRecord.category === translations[currentLanguage].mild_thinness) categoryClass = 'category-magreza-leve';
        else if (patient.latestRecord.category === translations[currentLanguage].healthy) categoryClass = 'category-saudavel';
        else if (patient.latestRecord.category === translations[currentLanguage].overweight) categoryClass = 'category-sobrepeso';
        else if (patient.latestRecord.category === translations[currentLanguage].obesity_1) categoryClass = 'category-obesidade-1';
        else if (patient.latestRecord.category === translations[currentLanguage].obesity_2) categoryClass = 'category-obesidade-2';
        else if (patient.latestRecord.category === translations[currentLanguage].obesity_3) categoryClass = 'category-obesidade-3';

        // Obter label da faixa etária
        let ageGroupLabel = '';
        if (patient.ageGroup === 'child1') ageGroupLabel = translations[currentLanguage].age_0_5;
        else if (patient.ageGroup === 'child2') ageGroupLabel = translations[currentLanguage].age_5_10;
        else if (patient.ageGroup === 'teen') ageGroupLabel = translations[currentLanguage].age_10_19;
        else if (patient.ageGroup === 'adult') ageGroupLabel = translations[currentLanguage].age_20_59;
        else if (patient.ageGroup === 'senior') ageGroupLabel = translations[currentLanguage].age_60_plus;

        const genderLabel = patient.gender === 'male' ? translations[currentLanguage].male : translations[currentLanguage].female;

        const patientItem = document.createElement('div');
        patientItem.className = 'history-item';
        patientItem.innerHTML = `
            <div class="history-details">
                <div class="history-name" onclick="viewPatientHistory('${patient.name}')">${patient.name}</div>
                <div class="history-info">${ageGroupLabel}, ${genderLabel}</div>
                <div class="history-info">${patient.latestRecord.weight}kg, ${patient.latestRecord.height}cm</div>
                <div class="history-date">${formatDate(patient.latestRecord.date)}</div>
            </div>
            <div class="d-flex align-items-center">
                <div class="history-imc">${patient.latestRecord.imc}</div>
                <div class="history-category ${categoryClass}">${patient.latestRecord.category}</div>
            </div>
            <div class="history-actions">
                <button class="history-action-btn" onclick="deletePatient('${patient.name}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        patientsList.appendChild(patientItem);
    });
}

function deletePatient(name) {
    if (!confirm('Tem certeza que deseja excluir este paciente e todos os seus registros?')) {
        return;
    }

    // Obter dados atuais dos pacientes
    let patients = JSON.parse(localStorage.getItem('imcPatients')) || {};
    
    // Remover paciente
    delete patients[name];

    // Salvar no localStorage
    localStorage.setItem('imcPatients', JSON.stringify(patients));

    // Recarregar pacientes
    loadPatients();

    // Mostrar mensagem de sucesso
    alert('Paciente excluído com sucesso!');
}

// ===== HISTÓRICO DO PACIENTE =====
function viewPatientHistory(name) {
    currentPatientId = name;
    showPage('patient-history-page');
    loadPatientHistory(name);
}

function loadPatientHistory(name) {
    const patients = JSON.parse(localStorage.getItem('imcPatients')) || {};
    const patient = patients[name];
    
    if (!patient) {
        alert('Paciente não encontrado!');
        showPage('patients-page');
        return;
    }
    
    // Ordenar registros por data
    patient.records.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    // Atualizar informações do paciente
    document.getElementById('patient-name').textContent = `Histórico de ${name}`;
    
    // Obter label da faixa etária
    let ageGroupLabel = '';
    if (patient.ageGroup === 'child1') ageGroupLabel = translations[currentLanguage].age_0_5;
    else if (patient.ageGroup === 'child2') ageGroupLabel = translations[currentLanguage].age_5_10;
    else if (patient.ageGroup === 'teen') ageGroupLabel = translations[currentLanguage].age_10_19;
    else if (patient.ageGroup === 'adult') ageGroupLabel = translations[currentLanguage].age_20_59;
    else if (patient.ageGroup === 'senior') ageGroupLabel = translations[currentLanguage].age_60_plus;

    const genderLabel = patient.gender === 'male' ? translations[currentLanguage].male : translations[currentLanguage].female;
    
    document.getElementById('patient-age').textContent = ageGroupLabel;
    document.getElementById('patient-gender').textContent = genderLabel;
    
    // Último registro
    const latestRecord = patient.records[patient.records.length - 1];
    document.getElementById('patient-latest-imc').textContent = latestRecord.imc;
    document.getElementById('patient-latest-weight').textContent = `${latestRecord.weight} kg`;
    
    // Salvar informações do paciente para adicionar novo registro
    currentPatientForNewRecord = {
        name: name,
        ageGroup: patient.ageGroup,
        gender: patient.gender
    };
    
    // Preparar dados para os gráficos
    const dates = patient.records.map(record => formatDate(record.date));
    const imcs = patient.records.map(record => parseFloat(record.imc));
    const weights = patient.records.map(record => parseFloat(record.weight));
    
    // Destruir gráficos existentes
    if (imcChart) {
        imcChart.destroy();
    }
    if (weightChart) {
        weightChart.destroy();
    }
    
    // Criar gráfico do IMC
    const imcCtx = document.getElementById('imc-chart').getContext('2d');
    imcChart = new Chart(imcCtx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'IMC',
                data: imcs,
                borderColor: '#4361ee',
                backgroundColor: 'rgba(67, 97, 238, 0.1)',
                fill: true,
                tension: 0.1,
                pointBackgroundColor: '#4361ee',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução do IMC'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `IMC: ${context.raw}`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'IMC'
                    }
                }
            }
        }
    });
    
    // Criar gráfico do Peso
    const weightCtx = document.getElementById('weight-chart').getContext('2d');
    weightChart = new Chart(weightCtx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{
                label: 'Peso (kg)',
                data: weights,
                borderColor: '#f72585',
                backgroundColor: 'rgba(247, 37, 133, 0.1)',
                fill: true,
                tension: 0.1,
                pointBackgroundColor: '#f72585',
                pointRadius: 5,
                pointHoverRadius: 7
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: true,
                    text: 'Evolução do Peso'
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `Peso: ${context.raw} kg`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: false,
                    title: {
                        display: true,
                        text: 'Peso (kg)'
                    }
                }
            }
        }
    });
}

function addNewRecordForPatient() {
    if (currentPatientForNewRecord) {
        showPage('calculate-page');
    }
}