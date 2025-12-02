// Finções de paginas 
function mostrarPagina(idPagina) {
    document.querySelectorAll('.pagina').forEach(pagina => pagina.classList.remove('ativo'));
    document.getElementById(idPagina).classList.add('ativo');

    // Atualizar navegação
    document.querySelectorAll('.item-navegacao').forEach(nav => nav.classList.remove('ativo'));

    if (idPagina === 'pagina-inicial') {
        document.querySelector('.item-navegacao:nth-child(1)').classList.add('ativo');
        // Limpar paciente atual quando voltar para inicio
        pacienteAtualParaNovoRegistro = null;
    } else if (idPagina === 'pagina-calculo') {
        document.querySelector('.item-navegacao:nth-child(2)').classList.add('ativo');
        
        // Se estamos vindo de um paciente específico, temos que preencher os dados
        if (pacienteAtualParaNovoRegistro) {
            // Selecionar grupo de idade e genero
            const opcaoIdade = document.querySelector(`.opcao-idade[dados-grupo-idade="${pacienteAtualParaNovoRegistro.grupoIdade}"]`);
            const opcaoGenero = document.querySelector(`.opcao-genero[dados-genero="${pacienteAtualParaNovoRegistro.genero}"]`);
            
            if (opcaoIdade) opcaoIdade.click();
            if (opcaoGenero) opcaoGenero.click();
            
            // Pré-preencher peso e altura com os últimos valores
            if (pacienteAtualParaNovoRegistro.ultimoPeso) {
                document.getElementById('peso').value = pacienteAtualParaNovoRegistro.ultimoPeso;
            }
            if (pacienteAtualParaNovoRegistro.ultimaAltura) {
                document.getElementById('altura').value = pacienteAtualParaNovoRegistro.ultimaAltura;
            }
        } else {
            // Limpar campos se for um novo calculo para novo paciente
            document.getElementById('peso').value = '';
            document.getElementById('altura').value = '';
            
            // Resetar para valores padrao
            document.querySelector('.opcao-idade[dados-grupo-idade="adulto"]').click();
            document.querySelector('.opcao-genero[dados-genero="masculino"]').click();
        }
    } else if (idPagina === 'pagina-resultado') {
        document.querySelector('.item-navegacao:nth-child(3)').classList.add('ativo');
    } else if (idPagina === 'pagina-pacientes') {
        document.querySelector('.item-navegacao:nth-child(4)').classList.add('ativo');
        carregarPacientes();
    }
    // Para a página de histórico do paciente, não destaca-se nenhum item do menu inferior
}


function atualizarIndicadorHeader(idPagina) {
    const dots = document.querySelectorAll('.indicator-dot');
    if (!dots.length) return; // Se não encontrar os dots, sai da função
    
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Mapeia as páginas para os dots
    const paginaParaDot = {
        'pagina-inicial': 'inicio',
        'pagina-calculo': 'calcular', 
        'pagina-resultado': 'resultado',
        'pagina-pacientes': 'pacientes'
    };
    
    const dotAtivo = paginaParaDot[idPagina];
    if (dotAtivo) {
        const dotElement = document.querySelector(`.indicator-dot[data-page="${dotAtivo}"]`);
        if (dotElement) {
            dotElement.classList.add('active');
        }
    }
}
// ---- CARREGAR PÁGINAS DO PERFIL ----
async function carregarPaginaPerfil(arquivo) {
    try {
        // 1. Esconder todas as páginas atuais
        document.querySelectorAll('.pagina').forEach(pagina => {
            pagina.classList.remove('ativo');
        });
        
        // 2. Esconder navegação inferior
        document.querySelector('.navegacao-inferior').style.display = 'none';
        
        // 3. Carregar arquivo HTML externo
        const resposta = await fetch(arquivo);
        const html = await resposta.text();
        
        // 4. Criar div temporária para extrair conteúdo
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = html;
        
        // 5. Encontrar a div principal do conteúdo
        const conteudo = tempDiv.querySelector('.pagina');
        if (!conteudo) return;
        
        // 6. Adicionar ID único
        const idUnico = 'pagina-carregada-' + Date.now();
        conteudo.id = idUnico;
        
        // 7. Adicionar ao corpo
        document.body.appendChild(conteudo);
        
        // 8. Mostrar a página
        conteudo.classList.add('ativo');
        
        // 9. Fechar dropdown
        document.getElementById('profile-dropdown').classList.remove('show');
        
        // 10. Inicializar a página do perfil
        if (typeof inicializarPaginaPerfil === 'function') {
            setTimeout(() => {
                inicializarPaginaPerfil();
            }, 100);
        }
        
    } catch (erro) {
        console.error('Erro ao carregar página:', erro);
        alert('Erro ao carregar página. Verifique se o arquivo existe.');
    }
}

function removerPaginaCarregada(id) {
    // Remover página carregada
    const pagina = document.getElementById(id);
    if (pagina) pagina.remove();
    
    // Mostrar navegação inferior
    document.querySelector('.navegacao-inferior').style.display = 'flex';
    
    // Voltar para página inicial
    mostrarPagina('pagina-inicial');
}

// Adicionar eventos aos itens do menu
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('profile-view').addEventListener('click', (e) => {
        e.preventDefault();
        carregarPaginaPerfil('perfil.html');
    });
    
    document.getElementById('profile-settings').addEventListener('click', (e) => {
        e.preventDefault();
        carregarPaginaPerfil('configuracoes.html');
    });
    
    document.getElementById('profile-history').addEventListener('click', (e) => {
        e.preventDefault();
        carregarPaginaPerfil('historico.html');
    });
});