// Professional color palettes inspired by Pantone colors
const colorPalettes = {
    technical: [
        { start: '#3498db', end: '#2980b9' }, // Blue
        { start: '#e74c3c', end: '#c0392b' }, // Red
        { start: '#2ecc71', end: '#27ae60' }, // Green
        { start: '#9b59b6', end: '#8e44ad' }, // Purple
        { start: '#f1c40f', end: '#f39c12' }, // Yellow
        { start: '#1abc9c', end: '#16a085' }, // Turquoise
        { start: '#e67e22', end: '#d35400' }, // Orange
        { start: '#34495e', end: '#2c3e50' }  // Navy
    ],
    soft: [
        { start: '#00bcd4', end: '#0097a7' }, // Cyan
        { start: '#4caf50', end: '#388e3c' }, // Green
        { start: '#ff5722', end: '#d84315' }, // Deep Orange
        { start: '#673ab7', end: '#512da8' }, // Deep Purple
        { start: '#009688', end: '#00796b' }  // Teal
    ],
    professional: [
        { start: '#607d8b', end: '#455a64' }, // Blue Grey
        { start: '#795548', end: '#5d4037' }, // Brown
        { start: '#9c27b0', end: '#7b1fa2' }, // Purple
        { start: '#ff9800', end: '#f57c00' }, // Orange
        { start: '#03a9f4', end: '#0288d1' }  // Light Blue
    ],
    languages: [
        { start: '#8bc34a', end: '#689f38' }, // Light Green
        { start: '#ffc107', end: '#ffa000' }, // Amber
        { start: '#3f51b5', end: '#303f9f' }, // Indigo
        { start: '#ff4081', end: '#f50057' }  // Pink
    ]
};

const usedColors = {
    technical: new Set(),
    soft: new Set(),
    professional: new Set(),
    languages: new Set()
};

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getRandomGradient(category) {
    const palette = colorPalettes[category];
    const usedSet = usedColors[category];

    if (usedSet.size >= palette.length) {
        usedSet.clear();
    }
    

    const availableColors = palette.filter(color => 
        !usedSet.has(`${color.start}-${color.end}`)
    );

    const shuffledColors = shuffleArray([...availableColors]);

    const color = shuffledColors[0];
    usedSet.add(`${color.start}-${color.end}`);
    
    return `linear-gradient(135deg, ${color.start}, ${color.end})`;
}

function applyRandomColors() {

    Object.values(usedColors).forEach(set => set.clear());

    document.querySelectorAll('#technicalSkills .skill-badge').forEach(badge => {
        badge.style.background = getRandomGradient('technical');
    });


    document.querySelectorAll('#softSkills .skill-badge').forEach(badge => {
        badge.style.background = getRandomGradient('soft');
    });

    document.querySelectorAll('#professionalSkills .skill-badge').forEach(badge => {
        badge.style.background = getRandomGradient('professional');
    });

    document.querySelectorAll('#languages .skill-badge').forEach(badge => {
        badge.style.background = getRandomGradient('languages');
    });
}

document.addEventListener('DOMContentLoaded', () => {

    setTimeout(applyRandomColors, 100);
});
