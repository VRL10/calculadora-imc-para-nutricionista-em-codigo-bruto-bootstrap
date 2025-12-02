// Função principal para carregar dados reais
function carregarDadosReaisPaginaPerfil() {
    // Verifica qual página está ativa e carrega os dados apropriados
    const paginaAtiva = document.querySelector('.pagina.ativo');
    
    if (!paginaAtiva) return;
    
    // Se for a página de perfil
    if (paginaAtiva.id === 'pagina-perfil' || paginaAtiva.id.includes('pagina-carregada-')) {
        const card = paginaAtiva.querySelector('.card');
        if (card && card.querySelector('#estat-calculos-reais')) {
            atualizarEstatisticasReais();
        }
    }
    
    // Se for a página de histórico
    if (paginaAtiva.id === 'pagina-historico' || paginaAtiva.id.includes('pagina-carregada-')) {
        const card = paginaAtiva.querySelector('.card');
        if (card && card.querySelector('#lista-historico-real')) {
            atualizarHistoricoReal();
            configurarBuscaHistorico();
        }
    }
}

// Atualiza estatisticas reais do localStorage
function atualizarEstatisticasReais() {
    const pacientes = JSON.parse(localStorage.getItem('pacientesIMC')) || {};
    
    const estatCalculos = document.getElementById('estat-calculos-reais');
    const estatPacientes = document.getElementById('estat-pacientes-reais');
    const estatDias = document.getElementById('estat-dias-reais');
    
    if (estatCalculos && estatPacientes) {
        // Total de cálculos
        let totalCalculos = 0;
        Object.values(pacientes).forEach(paciente => {
            totalCalculos += paciente.registros.length;
        });
        
        // Total de pacientes
        const totalPacientes = Object.keys(pacientes).length;
        
        // Dias desde o primeiro registro
        let dias = 0;
        if (totalCalculos > 0) {
            let dataMaisAntiga = new Date();
            Object.values(pacientes).forEach(paciente => {
                paciente.registros.forEach(registro => {
                    const dataRegistro = new Date(registro.data);
                    if (dataRegistro < dataMaisAntiga) {
                        dataMaisAntiga = dataRegistro;
                    }
                });
            });
            
            const diffTempo = new Date() - dataMaisAntiga;
            dias = Math.floor(diffTempo / (1000 * 60 * 60 * 24));
        }
        
        // Atualizar na tela
        estatCalculos.textContent = totalCalculos;
        estatPacientes.textContent = totalPacientes;
        
        if (estatDias) {
            estatDias.textContent = dias || 'Hoje';
        }
    }
}

// Atualiza histórico real do localStorage
function atualizarHistoricoReal() {
    const container = document.getElementById('lista-historico-real');
    if (!container) return;
    
    const pacientes = JSON.parse(localStorage.getItem('pacientesIMC')) || {};
    const busca = document.getElementById('busca-historico')?.value.toLowerCase() || '';
    
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
        const dataFormatada = new Date(registro.data).toLocaleDateString('pt-BR');
        
        // Determinar cor da categoria
        let corCategoria = 'success';
        let iconeCategoria = 'fas fa-heart';
        if (registro.categoria.includes('Magreza')) {
            corCategoria = 'info';
            iconeCategoria = 'fas fa-weight';
        } else if (registro.categoria.includes('Sobrepeso')) {
            corCategoria = 'warning';
            iconeCategoria = 'fas fa-exclamation-triangle';
        } else if (registro.categoria.includes('Obesidade')) {
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
                            <span class="badge bg-${corCategoria}">${registro.categoria}</span>
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
                          registro.grupoIdade === 'idoso' ? '60+ anos' : 'Adulto'}
                    </span>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
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
    
    // NÃO adicione estilos inline!
    
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
    // Aguarda um pouco para garantir que o DOM foi atualizado
    setTimeout(() => {
        carregarDadosReaisPaginaPerfil();
        adicionarBotaoVoltar();
    }, 50);
}

// Observa mudanças no localStorage para atualizar automaticamente
function observarMudancasLocalStorage() {
    // Sobrescrever o setItem original para detectar mudanças
    const originalSetItem = localStorage.setItem;
    
    localStorage.setItem = function(key, value) {
        originalSetItem.apply(this, arguments);
        
        // Disparar evento customizado quando pacientes são salvos
        if (key === 'pacientesIMC') {
            const evento = new CustomEvent('pacientesAtualizados');
            window.dispatchEvent(evento);
        }
    };
}

// Escuta o evento de pacientes atualizados
window.addEventListener('pacientesAtualizados', function() {
    // Atualiza as páginas do perfil se estiverem visíveis
    carregarDadosReaisPaginaPerfil();
});

// Inicializa quando o DOM estiver pronto
document.addEventListener('DOMContentLoaded', function() {
    observarMudancasLocalStorage();
    
    // Se já houver uma página do perfil visível, inicializa
    const paginaPerfil = document.querySelector('#pagina-perfil.ativo, #pagina-historico.ativo, [id^="pagina-carregada-"].ativo');
    if (paginaPerfil) {
        inicializarPaginaPerfil();
    }
});

// Exporta funções para uso global
window.atualizarHistoricoReal = atualizarHistoricoReal;
window.atualizarEstatisticasReais = atualizarEstatisticasReais;
window.inicializarPaginaPerfil = inicializarPaginaPerfil;