// ===== SALVAMENTO E HISTÓRICO =====
function salvarResultado() {
    const nomeInput = document.getElementById('nome-salvamento');
    const dataInput = document.getElementById('data-salvamento');
    
    const nome = nomeInput.value.trim();
    const data = dataInput.value;

    if (!nome) {
        alert('Por favor, informe o nome do paciente.');
        return;
    }

    // Obter dados atuais do armazenamento
    let pacientes = JSON.parse(localStorage.getItem('pacientesIMC')) || {};
    
    // Obter dados do cálculo atual
    const imcAtual = parseFloat(document.getElementById('valor-imc').textContent);
    const categoriaAtual = document.getElementById('categoria-imc').textContent;
    
    // Se estamos adicionando a um paciente existente, usar seus dados de idade/gênero
    let grupoIdadeSalvar = grupoIdadeAtual;
    let generoSalvar = generoAtual;
    
    // Se o paciente já existe, usar os dados salvos dele
    if (pacientes[nome] && pacienteAtualParaNovoRegistro && pacienteAtualParaNovoRegistro.nome === nome) {
        grupoIdadeSalvar = pacientes[nome].grupoIdade;
        generoSalvar = pacientes[nome].genero;
    }

    // Se o paciente já existe, adicionar um novo registro
    if (pacientes[nome]) {
        pacientes[nome].registros.push({
            data: data,
            imc: imcAtual,
            peso: pesoAtual,
            altura: alturaAtual, // Já está em cm
            categoria: categoriaAtual
        });
        
        // Atualizar dados gerais do paciente se necessário
        pacientes[nome].grupoIdade = grupoIdadeSalvar;
        pacientes[nome].genero = generoSalvar;
    } else {
        // Se é um novo paciente, criar uma nova entrada
        pacientes[nome] = {
            grupoIdade: grupoIdadeSalvar,
            genero: generoSalvar,
            registros: [{
                data: data,
                imc: imcAtual,
                peso: pesoAtual,
                altura: alturaAtual, // Já está em cm
                categoria: categoriaAtual
            }]
        };
    }

    // Salvar no localStorage
    localStorage.setItem('pacientesIMC', JSON.stringify(pacientes));

    // Fechar modal
    fecharModalSalvamento();

    // Recarregar lista de pacientes
    carregarPacientes();

    // Limpar paciente atual
    pacienteAtualParaNovoRegistro = null;

    // Mostrar mensagem de sucesso
    alert('Resultado salvo com sucesso!');

    // Limpar campo de nome
    nomeInput.value = '';
    nomeInput.disabled = false;

    // Voltar para a página de pacientes
    mostrarPagina('pagina-pacientes');
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
        // Ordenar registros por data e pegar o mais recente
        const registrosOrdenados = dados.registros.sort((a, b) => new Date(b.data) - new Date(a.data));
        const registroMaisRecente = registrosOrdenados[0];
        
        return {
            nome: nome,
            grupoIdade: dados.grupoIdade,
            genero: dados.genero,
            registros: dados.registros,
            registroMaisRecente: registroMaisRecente
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

    // Limpar lista
    if (listaPacientes) {
        listaPacientes.innerHTML = '';

        if (arrayPacientes.length === 0) {
            listaPacientes.innerHTML = `
                <div class="text-center py-4">
                    <i class="fas fa-users fa-3x text-muted mb-3"></i>
                    <p>${termoPesquisa ? 'Nenhum paciente encontrado' : 'Nenhum paciente salvo ainda'}</p>
                </div>
            `;
            return;
        }

        // Adicionar itens dos pacientes
        arrayPacientes.forEach((paciente) => {
            let classeCategoria = '';

            // Determinar a classe da categoria
            if (paciente.registroMaisRecente.categoria.includes('Abaixo do peso')) classeCategoria = 'categoria-abaixo-peso';
            else if (paciente.registroMaisRecente.categoria.includes('Peso normal')) classeCategoria = 'categoria-normal';
            else if (paciente.registroMaisRecente.categoria.includes('Sobrepeso')) classeCategoria = 'categoria-sobrepeso';
            else if (paciente.registroMaisRecente.categoria.includes('Obesidade Grau I')) classeCategoria = 'categoria-obesidade-1';
            else if (paciente.registroMaisRecente.categoria.includes('Obesidade Grau II')) classeCategoria = 'categoria-obesidade-2';
            else if (paciente.registroMaisRecente.categoria.includes('Obesidade Grau III')) classeCategoria = 'categoria-obesidade-3';

            // Obter label da faixa etária
            let labelGrupoIdade = '';
            if (paciente.grupoIdade === 'crianca1') labelGrupoIdade = '0-5 anos';
            else if (paciente.grupoIdade === 'crianca2') labelGrupoIdade = '5-10 anos';
            else if (paciente.grupoIdade === 'adolescente') labelGrupoIdade = '10-19 anos';
            else if (paciente.grupoIdade === 'adulto') labelGrupoIdade = '20-59 anos';
            else if (paciente.grupoIdade === 'idoso') labelGrupoIdade = '60+ anos';

            const labelGenero = paciente.genero === 'masculino' ? 'Masculino' : 'Feminino';

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
    
    // Ordenar registros por data (mais recente primeiro)
    paciente.registros.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    // Atualizar informações do paciente
    document.getElementById('nome-paciente').textContent = `Histórico de ${nome}`;
    
    // Obter label da faixa etária
    let labelGrupoIdade = '';
    if (paciente.grupoIdade === 'crianca1') labelGrupoIdade = '0-5 anos';
    else if (paciente.grupoIdade === 'crianca2') labelGrupoIdade = '5-10 anos';
    else if (paciente.grupoIdade === 'adolescente') labelGrupoIdade = '10-19 anos';
    else if (paciente.grupoIdade === 'adulto') labelGrupoIdade = '20-59 anos';
    else if (paciente.grupoIdade === 'idoso') labelGrupoIdade = '60+ anos';

    const labelGenero = paciente.genero === 'masculino' ? 'Masculino' : 'Feminino';
    
    document.getElementById('idade-paciente').textContent = labelGrupoIdade;
    document.getElementById('genero-paciente').textContent = labelGenero;
    
    // Último registro (mais recente)
    const ultimoRegistro = paciente.registros[0];
    document.getElementById('imc-mais-recente').textContent = ultimoRegistro.imc;
    document.getElementById('peso-mais-recente').textContent = `${ultimoRegistro.peso} kg`;
    
    // Salvar informações do paciente para adicionar novo registro
    pacienteAtualParaNovoRegistro = {
        nome: nome,
        grupoIdade: paciente.grupoIdade,
        genero: paciente.genero,
        ultimoPeso: ultimoRegistro.peso,
        ultimaAltura: ultimoRegistro.altura
    };
    
    // Preparar dados para os gráficos (ordenar por data crescente para gráfico)
    const registrosOrdenados = [...paciente.registros].sort((a, b) => new Date(a.data) - new Date(b.data));
    const datas = registrosOrdenados.map(registro => formatarData(registro.data));
    const imcs = registrosOrdenados.map(registro => parseFloat(registro.imc));
    const pesos = registrosOrdenados.map(registro => parseFloat(registro.peso));
    
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
        // Pré-preencher os dados do paciente na página de cálculo
        mostrarPagina('pagina-calculo');
        
        // Aguardar um pouco para garantir que a página foi carregada
        setTimeout(() => {
            if (pacienteAtualParaNovoRegistro.ultimoPeso) {
                document.getElementById('peso').value = pacienteAtualParaNovoRegistro.ultimoPeso;
            }
            if (pacienteAtualParaNovoRegistro.ultimaAltura) {
                document.getElementById('altura').value = pacienteAtualParaNovoRegistro.ultimaAltura;
            }
        }, 100);
    }
}