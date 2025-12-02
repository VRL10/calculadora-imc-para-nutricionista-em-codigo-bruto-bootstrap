// Função principal para carregar dados reais
function carregarDadosReaisPaginaPerfil() {
    console.log(' carregarDadosReaisPaginaPerfil chamado');
    
    // Verifica qual página está ativa e carrega os dados apropriados
    const paginaAtiva = document.querySelector('.pagina.ativo');
    
    if (!paginaAtiva) {
        console.log(' Nenhuma página ativa encontrada');
        return;
    }
    
    console.log(' Página ativa:', paginaAtiva.id);
    
    // Se for a página de perfil
    if (paginaAtiva.id === 'pagina-perfil' || paginaAtiva.id.includes('pagina-carregada-')) {
        const card = paginaAtiva.querySelector('.card');
        if (card && card.querySelector('#estat-calculos-reais')) {
            console.log(' Atualizando estatísticas da página de perfil');
            atualizarEstatisticasReais();
        } else {
            console.log(' Card ou elemento de estatísticas não encontrado');
        }
    }
    
    // Se for a página de histórico
    if (paginaAtiva.id === 'pagina-historico' || paginaAtiva.id.includes('pagina-carregada-')) {
        const card = paginaAtiva.querySelector('.card');
        if (card && card.querySelector('#lista-historico-real')) {
            console.log(' Atualizando histórico da página de histórico');
            atualizarHistoricoReal();
            configurarBuscaHistorico();
        } else {
            console.log(' Card ou container de histórico não encontrado');
        }
    }
}

function atualizarEstatisticasReais() {
    console.log('📊 atualizarEstatisticasReais chamado');
    
    // Tenta encontrar os elementos em TODAS as páginas
    const estatCalculos = document.getElementById('estat-calculos-reais');
    const estatPacientes = document.getElementById('estat-pacientes-reais');
    const estatDias = document.getElementById('estat-dias-reais');
    
    console.log('🔍 Procurando elementos:', {
        estatCalculos: estatCalculos ? ' Encontrado' : ' Não encontrado',
        estatPacientes: estatPacientes ? ' Encontrado' : ' Não encontrado',
        estatDias: estatDias ? ' Encontrado' : ' Não encontrado'
    });
    
    // Se não encontrar, não faz nada
    if (!estatCalculos || !estatPacientes) {
        console.log(' Elementos de estatísticas não encontrados no DOM');
        return;
    }
    
    const pacientes = JSON.parse(localStorage.getItem('pacientesIMC')) || {};
    console.log(' Dados do localStorage (pacientesIMC):', pacientes);
    console.log(' Número de pacientes:', Object.keys(pacientes).length);
    
    // Total de cálculos (soma de todos os registros de todos os pacientes)
    let totalCalculos = 0;
    Object.values(pacientes).forEach(paciente => {
        if (paciente.registros && Array.isArray(paciente.registros)) {
            totalCalculos += paciente.registros.length;
        }
    });
    
    // Total de pacientes (número de entradas no objeto)
    const totalPacientes = Object.keys(pacientes).length;
    
    // Dias desde o primeiro registro (se houver)
    let dias = 0;
    let dataMaisAntiga = null;
    
    if (totalCalculos > 0) {
        Object.values(pacientes).forEach(paciente => {
            if (paciente.registros && Array.isArray(paciente.registros)) {
                paciente.registros.forEach(registro => {
                    if (registro.data) {
                        const dataRegistro = new Date(registro.data);
                        if (!dataMaisAntiga || dataRegistro < dataMaisAntiga) {
                            dataMaisAntiga = dataRegistro;
                        }
                    }
                });
            }
        });
        
        if (dataMaisAntiga) {
            const diffTempo = new Date() - dataMaisAntiga;
            dias = Math.floor(diffTempo / (1000 * 60 * 60 * 24));
        }
    }
    
    console.log(' Estatísticas calculadas:', {
        totalCalculos,
        totalPacientes,
        dias,
        dataMaisAntiga
    });
    
    // Atualizar na tela
    estatCalculos.textContent = totalCalculos;
    estatPacientes.textContent = totalPacientes;
    
    if (estatDias) {
        estatDias.textContent = dias > 0 ? dias : 'Hoje';
    }
    
    console.log(' Estatísticas atualizadas na tela');
}

// histórico real do localStorage
function atualizarHistoricoReal() {
    console.log(' atualizarHistoricoReal chamado');
    
    const container = document.getElementById('lista-historico-real');
    if (!container) {
        console.log(' Container de histórico não encontrado');
        return;
    }
    
    const pacientes = JSON.parse(localStorage.getItem('pacientesIMC')) || {};
    const busca = document.getElementById('busca-historico')?.value.toLowerCase() || '';
    
    console.log(' Dados para histórico:', {
        totalPacientes: Object.keys(pacientes).length,
        termoBusca: busca
    });
    
    // Verificar se há dados
    if (Object.keys(pacientes).length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-history fa-3x text-muted mb-3"></i>
                <p>Nenhum histórico salvo ainda</p>
                <p class="text-muted small">Os cálculos aparecerão aqui quando você salvar pacientes</p>
            </div>
        `;
        return;
    }
    
    // Coletar todos os registros
    let todosRegistros = [];
    Object.entries(pacientes).forEach(([nomePaciente, dadosPaciente]) => {
        if (dadosPaciente.registros && Array.isArray(dadosPaciente.registros)) {
            dadosPaciente.registros.forEach(registro => {
                todosRegistros.push({
                    nome: nomePaciente,
                    data: registro.data,
                    imc: registro.imc,
                    peso: registro.peso,
                    altura: registro.altura,
                    categoria: registro.categoria,
                    grupoIdade: dadosPaciente.grupoIdade,
                    genero: dadosPaciente.genero
                });
            });
        }
    });
    
    // Filtrar por busca
    if (busca) {
        todosRegistros = todosRegistros.filter(registro => 
            registro.nome.toLowerCase().includes(busca)
        );
    }
    
    // Ordenar por data
    todosRegistros.sort((a, b) => new Date(b.data) - new Date(a.data));
    
    // Limitar a 50 registros
    todosRegistros = todosRegistros.slice(0, 50);
    
    // Gerar HTML
    if (todosRegistros.length === 0) {
        container.innerHTML = `
            <div class="text-center py-4">
                <i class="fas fa-search fa-3x text-muted mb-3"></i>
                <p>Nenhum registro encontrado</p>
            </div>
        `;
        return;
    }
    
    let html = '';
    todosRegistros.forEach(registro => {
        // Formatar data
        const dataFormatada = registro.data ? new Date(registro.data).toLocaleDateString('pt-BR') : 'Data não informada';
        
        // Determinar cor da categoria
        let corCategoria = 'success';
        let iconeCategoria = 'fas fa-heart';
        if (registro.categoria && registro.categoria.includes('Magreza')) {
            corCategoria = 'info';
            iconeCategoria = 'fas fa-weight';
        } else if (registro.categoria && registro.categoria.includes('Sobrepeso')) {
            corCategoria = 'warning';
            iconeCategoria = 'fas fa-exclamation-triangle';
        } else if (registro.categoria && registro.categoria.includes('Obesidade')) {
            corCategoria = 'danger';
            iconeCategoria = 'fas fa-exclamation-circle';
        }
        
        // Determinar ícone do gênero
        const iconeGenero = registro.genero === 'masculino' ? '♂' : '♀';
        
        html += `
            <div class="item-historico mb-3 p-3 border rounded bg-white shadow-sm">
                <div class="d-flex justify-content-between align-items-center">
                    <div class="flex-grow-1">
                        <div class="d-flex align-items-center mb-1">
                            <i class="fas fa-user me-2 text-primary"></i>
                            <div class="fw-bold fs-6">${registro.nome}</div>
                        </div>
                        <div class="small text-muted">
                            <i class="far fa-calendar me-1"></i>${dataFormatada} 
                            <span class="mx-2">•</span>
                            <i class="fas ${iconeGenero === '♂' ? 'fa-mars' : 'fa-venus'} me-1"></i>${registro.genero === 'masculino' ? 'Masculino' : 'Feminino'}
                            <span class="mx-2">•</span>
                            <i class="fas fa-ruler-vertical me-1"></i>${registro.altura}cm
                        </div>
                    </div>
                    <div class="text-end ms-3">
                        <div class="fw-bold fs-4 text-primary">${registro.imc}</div>
                        <div class="d-flex align-items-center justify-content-end mt-1">
                            <i class="${iconeCategoria} me-1 text-${corCategoria}"></i>
                            <span class="badge bg-${corCategoria}">${registro.categoria || 'Não classificado'}</span>
                        </div>
                    </div>
                </div>
                <div class="mt-2 pt-2 border-top small">
                    <span class="badge bg-light text-dark me-2">
                        <i class="fas fa-weight me-1"></i>${registro.peso} kg
                    </span>
                    <span class="badge bg-light text-dark">
                        <i class="fas fa-birthday-cake me-1"></i>
                        ${registro.grupoIdade === 'crianca1' ? '0-5 anos' : 
                          registro.grupoIdade === 'crianca2' ? '5-10 anos' : 
                          registro.grupoIdade === 'adolescente' ? '10-19 anos' : 
                          registro.grupoIdade === 'adulto' ? '20-59 anos' : 
                          registro.grupoIdade === 'idoso' ? '60+ anos' : 'Não informado'}
                    </span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
    console.log(' Histórico atualizado com', todosRegistros.length, 'registros');
}

// Configura busca do histórico
function configurarBuscaHistorico() {
    const campoBusca = document.getElementById('busca-historico');
    if (campoBusca) {
        // Remove eventos antigos para evitar duplicação
        const novoCampo = campoBusca.cloneNode(true);
        campoBusca.parentNode.replaceChild(novoCampo, campoBusca);
        
        // Adiciona novo evento
        novoCampo.addEventListener('input', function() {
            atualizarHistoricoReal();
        });
    }
}

// Adiciona botão de voltar às páginas do perfil
function adicionarBotaoVoltar() {
    const paginaAtiva = document.querySelector('.pagina.ativo');
    if (!paginaAtiva) return;
    
    // Se já tem botão de voltar, não adiciona outro
    if (paginaAtiva.querySelector('.btn-voltar-perfil')) return;
    
    const card = paginaAtiva.querySelector('.card');
    if (!card) return;
    
    const btnVoltar = document.createElement('button');
    btnVoltar.className = 'btn btn-outline-secondary btn-sm btn-voltar-perfil';
    btnVoltar.innerHTML = '<i class="fas fa-arrow-left me-2"></i>Voltar';
    
    btnVoltar.addEventListener('click', function() {
        // Remove a página atual se for uma página carregada
        const paginaId = paginaAtiva.id;
        if (paginaId && paginaId.startsWith('pagina-carregada-')) {
            document.getElementById(paginaId).remove();
        }
        
        // Mostra navegação inferior
        const navInferior = document.querySelector('.navegacao-inferior');
        if (navInferior) {
            navInferior.style.display = 'flex';
        }
        
        // Volta para página inicial
        if (typeof mostrarPagina === 'function') {
            mostrarPagina('pagina-inicial');
        }
    });
    
    card.appendChild(btnVoltar);
}

// -- INICIALIZAÇÃO ---

// Função para inicializar quando uma página do perfil é carregada
function inicializarPaginaPerfil() {
    console.log(' inicializarPaginaPerfil chamado');
    // Aguarda um pouco para garantir que o DOM foi atualizado
    setTimeout(() => {
        carregarDadosReaisPaginaPerfil();
        adicionarBotaoVoltar();
    }, 100);
}

// Sistema de eventos para atualizar estatísticas automaticamente
document.addEventListener('pacienteSalvo', function() {
    console.log(' EVENTO: pacienteSalvo disparado');
    atualizarEstatisticasReais();
    atualizarHistoricoReal();
});

document.addEventListener('pacienteExcluido', function() {
    console.log(' EVENTO: pacienteExcluido disparado');
    atualizarEstatisticasReais();
    atualizarHistoricoReal();
});

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    console.log(' DOMContentLoaded - página carregada');
    
    // Se já houver uma página do perfil visível, inicializa
    const paginaPerfil = document.querySelector('#pagina-perfil.ativo, #pagina-historico.ativo, [id^="pagina-carregada-"].ativo');
    if (paginaPerfil) {
        console.log(' Página de perfil já está ativa, inicializando...');
        inicializarPaginaPerfil();
    } else {
        console.log('ℹ Nenhuma página de perfil ativa no momento');
    }
});

// Adiciona evento para quando a página de perfil for carregada via menu
document.addEventListener('paginaPerfilCarregada', function() {
    console.log(' EVENTO: paginaPerfilCarregada disparado');
    inicializarPaginaPerfil();
});

// Exporta funções para uso global
window.atualizarHistoricoReal = atualizarHistoricoReal;
window.atualizarEstatisticasReais = atualizarEstatisticasReais;
window.inicializarPaginaPerfil = inicializarPaginaPerfil;