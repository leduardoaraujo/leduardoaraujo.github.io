
const siteConfig = {

    sections: {
        about: {
            enabled: true,
            order: 1
        },
        technicalSkills: {
            enabled: true,
            order: 2
        },
        softSkills: {
            enabled: true,
            order: 3
        },
        professionalSkills: {
            enabled: true,
            order: 4
        },
        languages: {
            enabled: true,
            order: 5
        }
    },
    
    // Profile configuration
    profile: {
        showLocation: true,
        showBio: true,
        socialLinks: {
            github: {
                enabled: true,
                url: 'https://github.com/leduardoaraujo'
            },
            linkedin: {
                enabled: true,
                url: 'https://www.linkedin.com/in/luiz-edu-araujo/'
            },
            email: {
                enabled: true,
                url: 'mailto:contato@luizaraujo.tech'
            },
            resume: {
                enabled: true,
                url: '#'
            }
        }
    }
};

// Function to check if a section is enabled
function isSectionEnabled(sectionId) {
    return siteConfig.sections[sectionId]?.enabled ?? false;
}

// Function to get section order
function getSectionOrder(sectionId) {
    return siteConfig.sections[sectionId]?.order ?? 999;
}

// Function to check if a profile element is enabled
function isProfileElementEnabled(element) {
    return siteConfig.profile[element] ?? false;
}

// Function to check if a social link is enabled
function isSocialLinkEnabled(linkId) {
    return siteConfig.profile.socialLinks[linkId]?.enabled ?? false;
}

// Function to get social link URL
function getSocialLinkUrl(linkId) {
    return siteConfig.profile.socialLinks[linkId]?.url ?? '#';
}

// Export configuration
window.siteConfig = siteConfig;
window.isSectionEnabled = isSectionEnabled;
window.getSectionOrder = getSectionOrder;
window.isProfileElementEnabled = isProfileElementEnabled;
window.isSocialLinkEnabled = isSocialLinkEnabled;
window.getSocialLinkUrl = getSocialLinkUrl;
