// ===== SALVAMENTO E HISTÓRICO =====
function salvarResultado() {
    const nome = document.getElementById('nome-salvamento').value;
    const data = document.getElementById('data-salvamento').value;

    if (!nome) {
        alert('Por favor, informe o nome do paciente.');
        return;
    }

    // Obter dados atuais do armazenamento
    let pacientes = JSON.parse(localStorage.getItem('pacientesIMC')) || {};
    
    // Se o paciente já existe, adicionar um novo registro
    if (pacientes[nome]) {
        pacientes[nome].registros.push({
            data: data,
            imc: imcAtual.toFixed(1),
            peso: pesoAtual,
            altura: alturaAtual * 100, // Converter para cm
            categoria: document.getElementById('categoria-imc').textContent
        });
    } else {
        // Se é um novo paciente, criar uma nova entrada
        pacientes[nome] = {
            grupoIdade: grupoIdadeAtual,
            genero: generoAtual,
            registros: [{
                data: data,
                imc: imcAtual.toFixed(1),
                peso: pesoAtual,
                altura: alturaAtual * 100, // Converter para cm
                categoria: document.getElementById('categoria-imc').textContent
            }]
        };
    }

    // Salvar no localStorage
    localStorage.setItem('pacientesIMC', JSON.stringify(pacientes));

    // Fechar modal
    fecharModalSalvamento();

    // Limpar paciente atual se estivermos adicionando um novo registro
    pacienteAtualParaNovoRegistro = null;

    // Mostrar mensagem de sucesso
    alert(traducoes[idiomaAtual].salvar_resultado + '!');

    // Limpar campo de nome
    document.getElementById('nome-salvamento').value = '';
    document.getElementById('nome-salvamento').disabled = false;
}

function pesquisarPacientes() {
    const termoPesquisa = document.getElementById('campo-pesquisa').value.toLowerCase();
    carregarPacientes(termoPesquisa);
}

function carregarPacientes(termoPesquisa = '') {
    const pacientes = JSON.parse(localStorage.getItem('pacientesIMC')) || {};
    const listaPacientes = document.getElementById('lista-pacientes');

    // Converter objeto em array para facilitar a manipulação
    let arrayPacientes = Object.entries(pacientes).map(([nome, dados]) => {
        return {
            nome: nome,
            ...dados,
            // Ordenar registros por data e pegar o mais recente
            registroMaisRecente: dados.registros.sort((a, b) => new Date(b.data) - new Date(a.data))[0]
        };
    });

    // Filtrar resultados se houver termo de pesquisa
    if (termoPesquisa) {
        arrayPacientes = arrayPacientes.filter(paciente =>
            paciente.nome.toLowerCase().includes(termoPesquisa)
        );
    }

    // Ordenar resultados
    if (ordenacaoAtual === 'data') {
        arrayPacientes.sort((a, b) => new Date(b.registroMaisRecente.data) - new Date(a.registroMaisRecente.data));
    } else if (ordenacaoAtual === 'nome') {
        arrayPacientes.sort((a, b) => a.nome.localeCompare(b.nome));
    }

    if (arrayPacientes.length === 0) {
        listaPacientes.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-users fa-3x text-muted mb-3"></i>
                <p>${termoPesquisa ? 'Nenhum paciente encontrado' : 'Nenhum paciente salvo ainda'}</p>
            </div>
        `;
        return;
    }

    // Limpar lista
    listaPacientes.innerHTML = '';

    // Adicionar itens dos pacientes
    arrayPacientes.forEach((paciente) => {
        let classeCategoria = '';

        if (paciente.registroMaisRecente.categoria === traducoes[idiomaAtual].magreza_grave) classeCategoria = 'categoria-magreza-grave';
        else if (paciente.registroMaisRecente.categoria === traducoes[idiomaAtual].magreza_moderada) classeCategoria = 'categoria-magreza-moderada';
        else if (paciente.registroMaisRecente.categoria === traducoes[idiomaAtual].magreza_leve) classeCategoria = 'categoria-magreza-leve';
        else if (paciente.registroMaisRecente.categoria === traducoes[idiomaAtual].saudavel) classeCategoria = 'categoria-saudavel';
        else if (paciente.registroMaisRecente.categoria === traducoes[idiomaAtual].sobrepeso) classeCategoria = 'categoria-sobrepeso';
        else if (paciente.registroMaisRecente.categoria === traducoes[idiomaAtual].obesidade_1) classeCategoria = 'categoria-obesidade-1';
        else if (paciente.registroMaisRecente.categoria === traducoes[idiomaAtual].obesidade_2) classeCategoria = 'categoria-obesidade-2';
        else if (paciente.registroMaisRecente.categoria === traducoes[idiomaAtual].obesidade_3) classeCategoria = 'categoria-obesidade-3';

        // Obter label da faixa etária
        let labelGrupoIdade = '';
        if (paciente.grupoIdade === 'crianca1') labelGrupoIdade = traducoes[idiomaAtual].idade_0_5;
        else if (paciente.grupoIdade === 'crianca2') labelGrupoIdade = traducoes[idiomaAtual].idade_5_10;
        else if (paciente.grupoIdade === 'adolescente') labelGrupoIdade = traducoes[idiomaAtual].idade_10_19;
        else if (paciente.grupoIdade === 'adulto') labelGrupoIdade = traducoes[idiomaAtual].idade_20_59;
        else if (paciente.grupoIdade === 'idoso') labelGrupoIdade = traducoes[idiomaAtual].idade_60_plus;

        const labelGenero = paciente.genero === 'masculino' ? traducoes[idiomaAtual].masculino : traducoes[idiomaAtual].feminino;

        const itemPaciente = document.createElement('div');
        itemPaciente.className = 'item-historico';
        itemPaciente.innerHTML = `
            <div class="detalhes-historico">
                <div class="nome-historico" onclick="verHistoricoPaciente('${paciente.nome}')">${paciente.nome}</div>
                <div class="info-historico">${labelGrupoIdade}, ${labelGenero}</div>
                <div class="info-historico">${paciente.registroMaisRecente.peso}kg, ${paciente.registroMaisRecente.altura}cm</div>
                <div class="data-historico">${formatarData(paciente.registroMaisRecente.data)}</div>
            </div>
            <div class="d-flex align-items-center">
                <div class="imc-historico">${paciente.registroMaisRecente.imc}</div>
                <div class="categoria-historico ${classeCategoria}">${paciente.registroMaisRecente.categoria}</div>
            </div>
            <div class="acoes-historico">
                <button class="botao-acao-historico" onclick="excluirPaciente('${paciente.nome}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;

        listaPacientes.appendChild(itemPaciente);
    });
}

function excluirPaciente(nome) {
    if (!confirm('Tem certeza que deseja excluir este paciente e todos os seus registros?')) {
        return;
    }

    // Obter dados atuais dos pacientes
    let pacientes = JSON.parse(localStorage.getItem('pacientesIMC')) || {};
    
    // Remover paciente
    delete pacientes[nome];

    // Salvar no localStorage
    localStorage.setItem('pacientesIMC', JSON.stringify(pacientes));

    // Recarregar pacientes
    carregarPacientes();

    // Mostrar mensagem de sucesso
    alert('Paciente excluído com sucesso!');
}

// ===== HISTÓRICO DO PACIENTE =====
function verHistoricoPaciente(nome) {
    idPacienteAtual = nome;
    mostrarPagina('pagina-historico-paciente');
    carregarHistoricoPaciente(nome);
}

function carregarHistoricoPaciente(nome) {
    const pacientes = JSON.parse(localStorage.getItem('pacientesIMC')) || {};
    const paciente = pacientes[nome];
    
    if (!paciente) {
        alert('Paciente não encontrado!');
        mostrarPagina('pagina-pacientes');
        return;
    }
    
    // Ordenar registros por data
    paciente.registros.sort((a, b) => new Date(a.data) - new Date(b.data));
    
    // Atualizar informações do paciente
    document.getElementById('nome-paciente').textContent = `Histórico de ${nome}`;
    
    // Obter label da faixa etária
    let labelGrupoIdade = '';
    if (paciente.grupoIdade === 'crianca1') labelGrupoIdade = traducoes[idiomaAtual].idade_0_5;
    else if (paciente.grupoIdade === 'crianca2') labelGrupoIdade = traducoes[idiomaAtual].idade_5_10;
    else if (paciente.grupoIdade === 'adolescente') labelGrupoIdade = traducoes[idiomaAtual].idade_10_19;
    else if (paciente.grupoIdade === 'adulto') labelGrupoIdade = traducoes[idiomaAtual].idade_20_59;
    else if (paciente.grupoIdade === 'idoso') labelGrupoIdade = traducoes[idiomaAtual].idade_60_plus;

    const labelGenero = paciente.genero === 'masculino' ? traducoes[idiomaAtual].masculino : traducoes[idiomaAtual].feminino;
    
    document.getElementById('idade-paciente').textContent = labelGrupoIdade;
    document.getElementById('genero-paciente').textContent = labelGenero;
    
    // Último registro
    const ultimoRegistro = paciente.registros[paciente.registros.length - 1];
    document.getElementById('imc-mais-recente').textContent = ultimoRegistro.imc;
    document.getElementById('peso-mais-recente').textContent = `${ultimoRegistro.peso} kg`;
    
    // Salvar informações do paciente para adicionar novo registro
    pacienteAtualParaNovoRegistro = {
        nome: nome,
        grupoIdade: paciente.grupoIdade,
        genero: paciente.genero
    };
    
    // Preparar dados para os gráficos
    const datas = paciente.registros.map(registro => formatarData(registro.data));
    const imcs = paciente.registros.map(registro => parseFloat(registro.imc));
    const pesos = paciente.registros.map(registro => parseFloat(registro.peso));
    
    // Destruir gráficos existentes
    if (graficoIMC) {
        graficoIMC.destroy();
    }
    if (graficoPeso) {
        graficoPeso.destroy();
    }
    
    // Criar gráfico do IMC
    const contextoIMC = document.getElementById('grafico-imc').getContext('2d');
    graficoIMC = new Chart(contextoIMC, {
        type: 'line',
        data: {
            labels: datas,
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
    const contextoPeso = document.getElementById('grafico-peso').getContext('2d');
    graficoPeso = new Chart(contextoPeso, {
        type: 'line',
        data: {
            labels: datas,
            datasets: [{
                label: 'Peso (kg)',
                data: pesos,
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

function adicionarNovoRegistroParaPaciente() {
    if (pacienteAtualParaNovoRegistro) {
        mostrarPagina('pagina-calculo');
    }
}