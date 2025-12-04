🩺 IMC Saúde - Calculadora de IMC

Aplicação web para cálculo e acompanhamento do Índice de Massa Corporal (IMC), desenvolvida para auxiliar nutricionistas e profissionais de saúde no monitoramento de pacientes.
✨ Funcionalidades

    Cálculo de IMC: Cálculo automático com classificação segundo padrões da OMS

    Gestão de Pacientes: Cadastro e histórico completo de pacientes

    Acompanhamento Temporal: Gráficos de evolução do IMC e peso

    Perfil Personalizado: Configurações de idioma, tema e notificações

    Autenticação Social: Login com Google e Microsoft (simulado)

    Multi-idioma: Suporte para Português, Inglês, Espanhol e Francês

🛠️ Tecnologias

    Frontend: HTML5, CSS3, JavaScript (ES6+)

    Bibliotecas: Bootstrap 5, Font Awesome, Chart.js

    Gerenciamento de Estado: LocalStorage

    Controle de Versão: Git/GitHub

    Metodologia: Scrum Adaptado

🚀 Como Executar

    Clone o repositório


git clone https://github.com/seu-usuario/imc-saude.git

    Abra o arquivo principal


Navegue até a pasta e abra index.html em seu navegador

    Ou use um servidor local (opcional)


# Com Python
python -m http.server 8000

# Com Node.js
npx serve .

📁 Estrutura do Projeto
projeto-imc/
│
├── 📁 html/                     # Páginas HTML principais
│   ├── 📄 index.html            # Página principal (raiz da aplicação)
│   ├── 📄 perfil.html           # Página de perfil do usuário
│   ├── 📄 configuracoes.html    # Página de configurações
│   └── 📄 historico.html        # Página de histórico geral
│
├── 📁 css/                      # Arquivos de estilo organizados
│   ├── 📄 variaveis.css         # Variáveis CSS (cores, fontes, espaçamentos)
│   ├── 📄 base.css              # Reset CSS e estilos base globais
│   ├── 📄 estrutura.css         # Layout, grids e estrutura geral
│   ├── 📄 componentes-e-animacoes.css  # Botões, cards, inputs, animações
│   ├── 📄 paginas.css           # Estilos específicos de cada página
│   ├── 📄 paginas-icone-perfil.css     # Header, dropdown do perfil
│   ├── 📄 modais.css            # Estilos para modais e overlays
│   ├── 📄 historico-graficos.css       # Gráficos, tabelas, histórico
│   └── 📄 responsivo.css        # Media queries para responsividade
│
├── 📁 js/                       # Lógica JavaScript modular
│   ├── 📄 utilidades.js         # Variáveis globais e funções utilitárias
│   ├── 📄 traducao.js           # Sistema de multi-idioma
│   ├── 📄 autenticacao.js       # Login social (Google/Microsoft)
│   ├── 📄 calculadora.js        # Cálculo do IMC e validações
│   ├── 📄 historico.js          # CRUD de pacientes e histórico
│   ├── 📄 graficos.js           # Configuração de gráficos com Chart.js
│   ├── 📄 modais.js             # Controle de modais
│   ├── 📄 navegacao.js          # Navegação entre páginas
│   ├── 📄 app.js                # Ponto de entrada e inicialização
│   └── 📄 paginas-perfil.js     # Gerenciamento das páginas do perfil
│
├── 📄 README.md                 # Documentação do projeto (este arquivo)
├── 📄 Documentacao.pdf          # Documentação de gerência de projetos
│
└── 📁 assets/                   # Recursos estáticos (opcional)
    ├── 📁 icons/                # Ícones personalizados
    ├── 📁 images/               # Imagens e backgrounds
    └── 📁 fonts/                # Fontes personalizadas

👥 Autores

    Jordann Jeferson da Silva - Gerente de Projeto

    Ivonildo Florencio de Brito - Tester

    Patrick do Nascimento Santos - Analista de Requisitos

    Victor Rodrigues Luz - Desenvolvedor
