const username = 'leduardoaraujo';

// Function to show projects popup
async function showProjectsPopup(skill) {
    const popup = document.createElement('div');
    popup.className = 'popup-overlay';
    
    const content = document.createElement('div');
    content.className = 'popup-content';
    
    // Add header
    const header = document.createElement('div');
    header.className = 'popup-header';
    header.innerHTML = `<h2>${skill} Projects</h2>`;
    
    const closeButton = document.createElement('button');
    closeButton.className = 'close-popup';
    closeButton.innerHTML = '×';
    closeButton.onclick = () => {
        popup.classList.remove('active');
        setTimeout(() => popup.remove(), 300);
    };
    
    content.appendChild(header);
    content.appendChild(closeButton);

    // Loading state
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'no-projects';
    loadingDiv.innerHTML = `<p>${translations[currentLanguage].loading}</p>`;
    content.appendChild(loadingDiv);
    
    popup.appendChild(content);
    document.body.appendChild(popup);
    
    // Add click handler to close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
            setTimeout(() => popup.remove(), 300);
        }
    });
    
    // Trigger animation
    requestAnimationFrame(() => {
        popup.classList.add('active');
    });
    
    try {
        // Get projects for the skill
        const projects = await getProjectsBySkill(skill);
        
        // Remove loading state
        loadingDiv.remove();
        
        if (projects.length === 0) {
            const noProjects = document.createElement('div');
            noProjects.className = 'no-projects';
            noProjects.innerHTML = `
                <pre>
　　　　　 　 ____
　　　　　／＞　　フ
　　　　　| 　_　 _ l
　 　　　／\` ミ＿xノ
　　 　 /　　　 　 |
　　　 /　 ヽ　　 ﾉ
　 　 │　　|　|　|
　／￣|　　 |　|　|
　| (￣ヽ＿ヽ)__) __)
　＼二つ
                </pre>
                <p>${translations[currentLanguage].noProjects}</p>
            `;
            content.appendChild(noProjects);
        } else {
            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'project-card';
                card.innerHTML = `
                    <h3>${project.name}</h3>
                    <p>${project.description || translations[currentLanguage].noDescription}</p>
                    <a href="${project.url}" target="_blank">
                        ${translations[currentLanguage].viewOnGithub}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                    </a>
                `;
                content.appendChild(card);
            });
        }
    } catch (error) {
        loadingDiv.innerHTML = `
            <pre>
　　　　　 　 ____
　　　　　／＞　　フ
　　　　　| 　_　 _ l
　 　　　／\` ミ＿xノ
　　 　 /　　　 　 |
　　　 /　 ヽ　　 ﾉ
　 　 │　　|　|　|
　／￣|　　 |　|　|
　| (￣ヽ＿ヽ)__) __)
　＼二つ
            </pre>
            <p>${translations[currentLanguage].errorLoading}</p>
            <p class="error-message">${error.message}</p>
        `;
    }
}

// Function to get projects by skill
async function getProjectsBySkill(skill) {
    try {
        const projects = await fetchGitHubProjects();
        
        // Filter projects that match the skill (case insensitive)
        return projects.filter(project => {
            if (!project) return false;
            
            const description = (project.description || '').toLowerCase();
            const name = project.name.toLowerCase();
            const language = (project.language || '').toLowerCase();
            const skillLower = skill.toLowerCase();
            
            return description.includes(skillLower) || 
                   name.includes(skillLower) ||
                   language === skillLower;
        });
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        throw error;
    }
}

async function fetchGitHubProjects() {
    try {
        // Adiciona rate limiting e timeout para prevenir DOS
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);

        const response = await fetch('https://api.github.com/users/leduardoaraujo/repos', {
            headers: {
                'Accept': 'application/vnd.github.v3+json'
            },
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Sanitiza os dados recebidos
        const projects = await response.json();
        return projects.map(project => ({
            name: DOMPurify.sanitize(project.name),
            description: project.description ? DOMPurify.sanitize(project.description) : null,
            url: DOMPurify.sanitize(project.html_url),
            language: project.language ? DOMPurify.sanitize(project.language) : null
        }));
    } catch (error) {
        console.error('Error fetching GitHub projects:', error);
        return [];
    }
}

// Initialize click handlers for skill badges
document.addEventListener('DOMContentLoaded', () => {
    // Add click event listeners to technical skill badges
    document.querySelectorAll('.skill-badge.clickable').forEach(badge => {
        badge.addEventListener('click', () => {
            const skill = badge.textContent.trim();
            showProjectsPopup(skill);
        });
    });
});
