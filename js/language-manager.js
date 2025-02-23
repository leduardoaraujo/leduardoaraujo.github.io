// Language translations
const translations = {
    en: {
        about: "About Me",
        aboutText1: "I am a professional focused on transforming information into strategic solutions. With over two years of experience, I have developed skills in BI, People Analytics, Data Science, Data Engineering, Commercial Planning, and Software Development, always focused on generating insights that optimize processes and drive decisions.",
        aboutText2: "My journey involves everything from monitoring performance indicators to process automation and technological solution development, always seeking to deliver measurable and impactful results.",
        technicalSkills: "Technical Skills",
        softSkills: "Soft Skills",
        professionalSkills: "Professional Skills",
        languages: "Languages",
        location: "📍 Goiânia, Brazil",
        bio: "Solving problems with data-driven solutions.",
        noProjects: "No projects here :(",
        loading: "Loading projects...",
        errorLoading: "Error loading projects :(",
        viewOnGithub: "View on GitHub",
        noDescription: "No description available",
        curriculum: "Resume",
        portuguese: "Portuguese (Native)",
        english: "English (Professional)",
        problemSolving: "Problem Solving",
        criticalThinking: "Critical Thinking",
        teamLeadership: "Team Leadership",
        communication: "Communication",
        adaptability: "Adaptability",
        timeManagement: "Time Management",
        projectManagement: "Project Management",
        agileMethodologies: "Agile Methodologies",
        dataVisualization: "Data Visualization",
        businessAnalysis: "Business Analysis",
        strategicPlanning: "Strategic Planning"
    },
    pt: {
        about: "Sobre mim",
        aboutText1: "Sou um profissional focado em transformar informações em soluções estratégicas. Com mais de dois anos de experiência, desenvolvi habilidades em BI, People Analytics, Ciência de Dados, Engenharia de Dados, Planejamento Comercial e Desenvolvimento de Software, sempre focado em gerar insights que otimizam processos e impulsionam decisões.",
        aboutText2: "Minha trajetória envolve desde o monitoramento de indicadores de performance até a automação de processos e desenvolvimento de soluções tecnológicas, sempre buscando entregar resultados mensuráveis e impactantes.",
        technicalSkills: "Habilidades Técnicas",
        softSkills: "Soft Skills",
        professionalSkills: "Habilidades Profissionais",
        languages: "Idiomas",
        location: "📍 Goiânia, Brasil",
        bio: "Resolvendo problemas com soluções baseadas em dados.",
        noProjects: "Nenhum projeto aqui :(",
        loading: "Carregando projetos...",
        errorLoading: "Erro ao carregar projetos :(",
        viewOnGithub: "Ver no GitHub",
        noDescription: "Sem descrição disponível",
        curriculum: "Currículo",
        portuguese: "Português (Nativo)",
        english: "Inglês (Profissional)",
        problemSolving: "Resolução de Problemas",
        criticalThinking: "Pensamento Crítico",
        teamLeadership: "Liderança de Equipe",
        communication: "Comunicação",
        adaptability: "Adaptabilidade",
        timeManagement: "Gestão de Tempo",
        projectManagement: "Gestão de Projetos",
        agileMethodologies: "Metodologias Ágeis",
        dataVisualization: "Visualização de Dados",
        businessAnalysis: "Análise de Negócios",
        strategicPlanning: "Planejamento Estratégico"
    }
};

// Get user's browser language
function getBrowserLanguage() {
    const lang = navigator.language.toLowerCase().split('-')[0];
    return lang === 'pt' ? 'pt' : 'en'; // Default to English if not Portuguese
}

// Initialize language
let currentLanguage = getBrowserLanguage();

// Translate the page
function translatePage() {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[currentLanguage][key]) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translations[currentLanguage][key];
            } else {
                element.textContent = translations[currentLanguage][key];
            }
        }
    });
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    translatePage();
});
