// Function to initialize sections based on config
function initializeSections() {
    // Get all sections
    const sections = document.querySelectorAll('section[data-section-id]');
    
    sections.forEach(section => {
        const sectionId = section.getAttribute('data-section-id');
        
        // Check if section is enabled in config
        if (!siteConfig.sections[sectionId]?.enabled) {
            section.style.display = 'none';
        } else {
            section.style.display = ''; // Show the section
        }
    });

    // Get the main content container
    const mainContent = document.querySelector('.main-content');
    if (!mainContent) return;

    // Get all visible sections and sort them
    const visibleSections = Array.from(sections).filter(section => 
        section.style.display !== 'none'
    ).sort((a, b) => {
        const orderA = siteConfig.sections[a.getAttribute('data-section-id')]?.order || 999;
        const orderB = siteConfig.sections[b.getAttribute('data-section-id')]?.order || 999;
        return orderA - orderB;
    });

    // Reorder visible sections
    visibleSections.forEach(section => {
        mainContent.appendChild(section);
    });
}

// Function to initialize profile elements
function initializeProfile() {
    // Handle location
    const locationElement = document.querySelector('.location');
    if (locationElement) {
        locationElement.style.display = siteConfig.profile.showLocation ? '' : 'none';
    }

    // Handle bio
    const bioElement = document.querySelector('.bio');
    if (bioElement) {
        bioElement.style.display = siteConfig.profile.showBio ? '' : 'none';
    }

    // Handle social links
    const socialLinks = document.querySelectorAll('.social-link[data-social-id]');
    socialLinks.forEach(link => {
        const linkId = link.getAttribute('data-social-id');
        if (!linkId) return;

        const socialConfig = siteConfig.profile.socialLinks[linkId];
        if (!socialConfig?.enabled) {
            link.style.display = 'none';
        } else {
            link.style.display = '';
            link.href = socialConfig.url || '#';
        }
    });
}

// Initialize when DOM loads
document.addEventListener('DOMContentLoaded', () => {
    if (typeof siteConfig === 'undefined') {
        console.error('Site configuration not found! Make sure config.js is loaded before section-manager.js');
        return;
    }
    
    initializeSections();
    initializeProfile();
});
