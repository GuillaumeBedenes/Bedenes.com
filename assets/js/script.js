// Traductions
const translations = {
    fr: {
        'name': 'BEDENES Guillaume',
        'email': 'guillaume.bedenes@epitech.eu',
        'bio': 'Ingénieur logiciel\nDéveloppement de logiciels, de jeux et de systèmes complexes.',
        'cv-button': 'CV',
        'tab-skills': 'Compétences',
        'tab-timeline': 'Project timeline',
        'skills-command': '$ cat competences.txt',
        'timeline-content': '$ cat timeline.txt\nLoading...'
    },
    en: {
        'name': 'BEDENES Guillaume',
        'email': 'guillaume.bedenes@epitech.eu',
        'bio': 'Software Engineer\nDevelopment of software, games and complex systems.',
        'cv-button': 'CV',
        'tab-skills': 'Skills',
        'tab-timeline': 'Project timeline',
        'skills-command': '$ cat skills.txt',
        'timeline-content': '$ cat timeline.txt\nLoading...'
    }
};

// Fonction de traduction
function translatePage(lang) {
    document.documentElement.lang = lang;
    const elements = document.querySelectorAll('[data-i18n]');
    
    elements.forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            if (element.tagName === 'PRE') {
                element.textContent = translations[lang][key];
            } else if (element.classList.contains('bio')) {
                // Pour la bio, remplacer \n par <br>
                element.innerHTML = translations[lang][key].replace(/\n/g, '<br>');
            } else if (element.classList.contains('skills-content')) {
                // Ne pas remplacer le contenu HTML des compétences
                return;
            } else {
                element.textContent = translations[lang][key];
            }
        }
    });
}

// Système d'onglets et langue
document.addEventListener('DOMContentLoaded', function() {
    // Initialiser la langue (défaut: français)
    let currentLang = localStorage.getItem('language') || 'fr';
    translatePage(currentLang);
    
    // Gestion du sélecteur de langue
    const langButtons = document.querySelectorAll('.lang-btn');
    langButtons.forEach(btn => {
        if (btn.getAttribute('data-lang') === currentLang) {
            btn.classList.add('active');
        }
        
        btn.addEventListener('click', function() {
            const lang = this.getAttribute('data-lang');
            
            // Retirer la classe active de tous les boutons
            langButtons.forEach(b => b.classList.remove('active'));
            
            // Ajouter la classe active au bouton cliqué
            this.classList.add('active');
            
            // Changer la langue
            currentLang = lang;
            localStorage.setItem('language', lang);
            translatePage(lang);
            
            // Gérer l'affichage des compétences selon la langue
            const skillsFr = document.getElementById('skills-container-fr');
            const skillsEn = document.getElementById('skills-container-en');
            if (skillsFr && skillsEn) {
                if (lang === 'fr') {
                    skillsFr.style.display = 'flex';
                    skillsEn.style.display = 'none';
                } else {
                    skillsFr.style.display = 'none';
                    skillsEn.style.display = 'flex';
                }
            }
            
            // Mettre à jour les tooltips
            if (typeof addLevelTooltips === 'function') {
                addLevelTooltips(lang);
            }
        });
    });
    
    // Initialiser l'affichage des compétences selon la langue
    const skillsFr = document.getElementById('skills-container-fr');
    const skillsEn = document.getElementById('skills-container-en');
    if (skillsFr && skillsEn) {
        if (currentLang === 'fr') {
            skillsFr.style.display = 'flex';
            skillsEn.style.display = 'none';
        } else {
            skillsFr.style.display = 'none';
            skillsEn.style.display = 'flex';
        }
    }
    
    // Ajouter les tooltips pour les niveaux de compétences
    const levelTooltips = {
        'level-1': {
            fr: 'Base acquise - Je connais les concepts, je l\'ai pratiqué, je peux lire / reprendre du code, mais ce n\'est pas mon outil principal aujourd\'hui.',
            en: 'Basic level - I know the concepts, I have practiced it, I can read / take over code, but it is not my main tool today.'
        },
        'level-2': {
            fr: 'Bon niveau - Utilisé régulièrement, à l\'aise, autonome sur des sujets non triviaux.',
            en: 'Good level - Used regularly, comfortable, autonomous on non-trivial topics.'
        },
        'level-3': {
            fr: 'Maîtrise professionnelle - Utilisé en production, sur des projets réels, avec responsabilité technique et impact long terme.',
            en: 'Professional mastery - Used in production, on real projects, with technical responsibility and long-term impact.'
        }
    };
    
    function addLevelTooltips(lang) {
        const levelElements = document.querySelectorAll('.skill-level.level-1, .skill-level.level-2, .skill-level.level-3');
        levelElements.forEach(element => {
            const levelClass = element.classList.contains('level-1') ? 'level-1' : 
                             element.classList.contains('level-2') ? 'level-2' : 'level-3';
            element.setAttribute('title', levelTooltips[levelClass][lang]);
            element.style.cursor = 'help';
        });
    }
    
    // Ajouter les tooltips au chargement
    addLevelTooltips(currentLang);
    
    // Mettre à jour les tooltips lors du changement de langue
    const originalTranslatePage = translatePage;
    translatePage = function(lang) {
        originalTranslatePage(lang);
        addLevelTooltips(lang);
    };
    
    // Système d'onglets
    const tabs = document.querySelectorAll('.tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Retirer la classe active de tous les onglets
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Ajouter la classe active à l'onglet cliqué
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
    
    // Initialiser les particules
    initParticles();
});

// Système de particules Canvas
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    // Ajuster la taille du canvas
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Classe Particule
    class Particle {
        constructor() {
            this.reset();
            this.y = Math.random() * canvas.height;
        }
        
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 2; // Vitesse horizontale
            this.vy = (Math.random() - 0.5) * 2; // Vitesse verticale
            this.size = Math.random() * 3 + 1; // Taille entre 1 et 4
            this.opacity = Math.random() * 0.5 + 0.3; // Opacité entre 0.3 et 0.8
        }
        
        update() {
            // Mise à jour de la position
            this.x += this.vx;
            this.y += this.vy;
            
            // Rebond sur les bords
            if (this.x < 0 || this.x > canvas.width) {
                this.vx = -this.vx;
                this.x = Math.max(0, Math.min(canvas.width, this.x));
            }
            
            if (this.y < 0 || this.y > canvas.height) {
                this.vy = -this.vy;
                this.y = Math.max(0, Math.min(canvas.height, this.y));
            }
            
            // Réapparition aléatoire occasionnelle
            if (Math.random() < 0.001) {
                this.reset();
            }
        }
        
        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#ffffff';
            
            // Dessiner un carré simple sans rotation
            ctx.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
        }
    }
    
    // Créer les particules (30% de plus : 150 * 1.3 = 195)
    const particleCount = 195;
    const particles = [];
    
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }
    
    // Fonction d'animation
    function animate() {
        // Pas de traînée - effacement complet
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    // Démarrer l'animation
    animate();
}
