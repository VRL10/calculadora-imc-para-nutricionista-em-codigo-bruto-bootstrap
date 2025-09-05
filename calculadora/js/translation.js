// ===== TRADUÇÕES =====
const translations = {
    pt: {
        app_title: "IMC Saúde",
        app_subtitle: "Calculadora de Índice de Massa Corporal",
        home_title: "Calculadora de IMC",
        home_description: "O Índice de Massa Corporal (IMC) é uma medida internacional usada para calcular se uma pessoa está no peso ideal.",
        calculate_imc: "Calcular IMC",
        view_history: "Ver Histórico",
        login_google: "Entrar com Google",
        login_microsoft: "Entrar con Microsoft",
        logout: "Sair",
        calculation_info: "Informações para Cálculo",
        age_group: "Faixa Etária",
        age_0_5: "0-5 anos",
        age_5_10: "5-10 anos",
        age_10_19: "10-19 anos",
        age_20_59: "20-59 anos",
        age_60_plus: "60+ anos",
        gender: "Gênero",
        male: "Masculino",
        female: "Feminino",
        weight: "Peso (kg)",
        height: "Altura (cm)",
        result_title: "Resultado do IMC",
        healthy: "Saudável",
        ideal_weight: "Peso ideal para sua altura",
        severe_thinness: "Magreza grave",
        moderate_thinness: "Magreza moderada",
        mild_thinness: "Magreza leve",
        overweight: "Sobrepeso",
        obesity_1: "Obesidade Grau I",
        obesity_2: "Obesidade Grau II",
        obesity_3: "Obesidade Grau III",
        save_result: "Salvar Resultado",
        calculate_again: "Calcular Novamente",
        history_title: "Histórico de Cálculos",
        search_placeholder: "Buscar por nome ou data...",
        sort_date: "Data",
        sort_name: "Nome",
        no_history: "Nenhum cálculo salvo ainda",
        save_name: "Nome (opcional)",
        save_date: "Date",
        save: "Salvar",
        cancel: "Cancelar",
        edit_result: "Editar Resultado",
        save_changes: "Salvar Alterações",
        home: "Início",
        calculate: "Calcular",
        result: "Resultado",
        history: "Histórico"
    },
    en: {
        // ... (conteúdo em inglês)
    },
    es: {
        // ... (conteúdo em espanhol)
    }
};

function applyTranslations(lang) {
    const elements = document.querySelectorAll('[data-translate]');
    elements.forEach(element => {
        const key = element.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
            
            // Para placeholders de input
            if (element.placeholder) {
                element.placeholder = translations[lang][key];
            }
        }
    });
}