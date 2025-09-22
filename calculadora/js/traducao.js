// ===== TRADUÇÕES =====
const traducoes = {
    pt: {
        app_titulo: "IMC Saúde",
        app_subtitulo: "Calculadora de Índice de Massa Corporal",
        home_titulo: "Calculadora de IMC",
        home_descricao: "O Índice de Massa Corporal (IMC) é uma medida internacional usada para calcular se uma pessoa está no peso ideal.",
        calcular_imc: "Calcular IMC",
        ver_historico: "Ver Histórico",
        login_google: "Entrar com Google",
        login_microsoft: "Entrar com Microsoft",
        logout: "Sair",
        informacoes_calculo: "Informações para Cálculo",
        grupo_idade: "Faixa Etária",
        idade_0_5: "0-5 anos",
        idade_5_10: "5-10 anos",
        idade_10_19: "10-19 anos",
        idade_20_59: "20-59 anos",
        idade_60_plus: "60+ anos",
        genero: "Gênero",
        masculino: "Masculino",
        feminino: "Feminino",
        peso: "Peso (kg)",
        altura: "Altura (cm)",
        resultado_titulo: "Resultado do IMC",
        saudavel: "Saudável",
        peso_ideal: "Peso ideal para sua altura",
        magreza_grave: "Magreza grave",
        magreza_moderada: "Magreza moderada",
        magreza_leve: "Magreza leve",
        sobrepeso: "Sobrepeso",
        obesidade_1: "Obesidade Grau I",
        obesidade_2: "Obesidade Grau II",
        obesidade_3: "Obesidade Grau III",
        salvar_resultado: "Salvar Resultado",
        calcular_novamente: "Calcular Novamente",
        historico_titulo: "Histórico de Cálculos",
        pesquisa_placeholder: "Buscar por nome ou data...",
        ordenar_data: "Data",
        ordenar_nome: "Nome",
        nenhum_historico: "Nenhum cálculo salvo ainda",
        salvar_nome: "Nome (opcional)",
        salvar_data: "Data",
        salvar: "Salvar",
        cancelar: "Cancelar",
        editar_resultado: "Editar Resultado",
        salvar_alteracoes: "Salvar Alterações",
        inicio: "Início",
        calcular: "Calcular",
        resultado: "Resultado",
        historico: "Histórico"
    },
    en: {
        // ... (conteúdo em inglês) - manteremos o original em inglês para referência, mas você pode remover se não for usar
    },
    es: {
        // ... (conteúdo em espanhol) - mesmo caso acima
    }
};

function aplicarTraducoes(idioma) {
    const elementos = document.querySelectorAll('[dados-traducao]');
    elementos.forEach(elemento => {
        const chave = elemento.getAttribute('dados-traducao');
        if (traducoes[idioma] && traducoes[idioma][chave]) {
            elemento.textContent = traducoes[idioma][chave];
            
            // Para placeholders de input
            if (elemento.placeholder) {
                elemento.placeholder = traducoes[idioma][chave];
            }
        }
    });
}