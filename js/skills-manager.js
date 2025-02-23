// Skills data
const skills = {
    technical: [
        { name: 'Python', clickable: true },
        { name: 'SQL', clickable: true },
        { name: 'Data Analysis', clickable: true },
        { name: 'R', clickable: true },
        { name: 'Lua', clickable: true },
        { name: 'Database', clickable: true }
    ],
    soft: [
        { name: 'problemSolving', i18n: true },
        { name: 'criticalThinking', i18n: true },
        { name: 'teamLeadership', i18n: true },
        { name: 'communication', i18n: true },
        { name: 'adaptability', i18n: true },
        { name: 'timeManagement', i18n: true }
    ],
    professional: [
        { name: 'projectManagement', i18n: true },
        { name: 'agileMethodologies', i18n: true },
        { name: 'dataVisualization', i18n: true },
        { name: 'businessAnalysis', i18n: true },
        { name: 'strategicPlanning', i18n: true }
    ],
    languages: [
        { name: 'portuguese', i18n: true },
        { name: 'english', i18n: true }
    ]
};

function createSkillBadge(skill) {
    const badge = document.createElement('div');
    badge.className = `skill-badge${skill.clickable ? ' clickable' : ''}`;
    
    if (skill.i18n) {
        badge.setAttribute('data-i18n', skill.name);
        badge.textContent = translations[currentLanguage][skill.name];
    } else {
        badge.textContent = skill.name;
    }
    
    return badge;
}

function populateSkillsSection() {
    // Populate technical skills
    const technicalSkillsContainer = document.getElementById('technicalSkills');
    skills.technical.forEach(skill => {
        technicalSkillsContainer.appendChild(createSkillBadge(skill));
    });

    // Populate soft skills
    const softSkillsContainer = document.getElementById('softSkills');
    skills.soft.forEach(skill => {
        softSkillsContainer.appendChild(createSkillBadge(skill));
    });

    // Populate professional skills
    const professionalSkillsContainer = document.getElementById('professionalSkills');
    skills.professional.forEach(skill => {
        professionalSkillsContainer.appendChild(createSkillBadge(skill));
    });

    // Populate languages
    const languagesContainer = document.getElementById('languages');
    skills.languages.forEach(skill => {
        languagesContainer.appendChild(createSkillBadge(skill));
    });
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', populateSkillsSection);
