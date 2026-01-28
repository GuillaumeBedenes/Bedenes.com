// Traductions
const translations = {
    fr: {
        'name': 'BEDENES Guillaume',
        'email': 'guillaume.bedenes@epitech.eu',
        'bio': 'Ingénieur logiciel\nDéveloppement de logiciels, de jeux et de systèmes complexes.',
        'cv-button': 'CV',
        'tab-skills': 'Compétences',
        'tab-timeline': 'Game Dev Timeline',
        'skills-command': '$ cat competences.txt',
        'timeline-command': '$ cat timeline.txt',
        'timeline-2008-title': 'Premiers pas en game design',
        'timeline-2008-desc': 'FPS Creator, RPG Maker',
        'timeline-2015-title': 'Premiers pas en programmation',
        'timeline-2015-desc': 'HTML, CSS, GameMaker, Construct 2, Java (mods Minecraft)',
        'timeline-2016-title': 'Premiers jeux sans moteur complet',
        'timeline-2016-desc': 'SFML, Phaser — prototype de roguelike (Rebirth)',
        'timeline-2018-title': 'Apprentissage et montée en compétence sur Unity',
        'timeline-2018-desc': 'Génération procédurale (terrains, biomes, mondes), prototypes Unity, Devastation in Eden, VFX et effets visuels',
        'timeline-2022-title': 'Professionnalisation sur Unity (cadre professionnel)',
        'timeline-2022-desc': 'Simulation sous Unity pour Airbus (Sopra Steria), conception d\'outils, design patterns avancés, architecture complexe',
        'timeline-2023-title': 'Prototypes sur temps libre (multi-engines)',
        'timeline-2023-desc': 'Prototypes de génération procédurale 2D/3D sous Unity, exploration de Godot et GameMaker',
        'timeline-2025-title': 'Développement de moteur maison',
        'timeline-2025-desc': 'Moteur maison : MonoGame puis C# pur'
    },
    en: {
        'name': 'BEDENES Guillaume',
        'email': 'guillaume.bedenes@epitech.eu',
        'bio': 'Software Engineer\nDevelopment of software, games and complex systems.',
        'cv-button': 'CV',
        'tab-skills': 'Skills',
        'tab-timeline': 'Game Dev Timeline',
        'skills-command': '$ cat skills.txt',
        'timeline-command': '$ cat timeline.txt',
        'timeline-2008-title': 'First steps in game design',
        'timeline-2008-desc': 'FPS Creator, RPG Maker',
        'timeline-2015-title': 'First steps in programming',
        'timeline-2015-desc': 'HTML, CSS, GameMaker, Construct 2, Java (Minecraft mods)',
        'timeline-2016-title': 'First games without full engine',
        'timeline-2016-desc': 'SFML, Phaser — roguelike prototype (Rebirth)',
        'timeline-2018-title': 'Learning and skill development on Unity',
        'timeline-2018-desc': 'Procedural generation (terrains, biomes, worlds), Unity prototypes, Devastation in Eden, VFX and visual effects',
        'timeline-2022-title': 'Professionalization on Unity (professional context)',
        'timeline-2022-desc': 'Unity simulation for Airbus (Sopra Steria), tool design, advanced design patterns, complex architecture',
        'timeline-2023-title': 'Prototypes in free time (multi-engines)',
        'timeline-2023-desc': '2D/3D procedural generation prototypes on Unity, exploration of Godot and GameMaker',
        'timeline-2025-title': 'Home engine development',
        'timeline-2025-desc': 'Home engine: MonoGame then pure C#'
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
            } else if (element.closest('.timeline-container')) {
                // Pour la timeline, on gère l'affichage via les containers
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
            
            // Gérer l'affichage de la timeline selon la langue
            const timelineFr = document.getElementById('timeline-container-fr');
            const timelineEn = document.getElementById('timeline-container-en');
            if (timelineFr && timelineEn) {
                if (lang === 'fr') {
                    timelineFr.style.display = 'flex';
                    timelineEn.style.display = 'none';
                } else {
                    timelineEn.style.display = 'flex';
                    timelineFr.style.display = 'none';
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
    
    // Initialiser la timeline
    initTimeline();
});

// Fonction pour charger les images d'une période
async function loadGalleryImages(year, isFr) {
    const galleryMainImg = document.getElementById(isFr ? 'gallery-main-img-fr' : 'gallery-main-img-en');
    const galleryPlaceholder = document.getElementById(isFr ? 'gallery-placeholder-fr' : 'gallery-placeholder-en');
    const galleryThumbnails = document.getElementById(isFr ? 'gallery-thumbnails-fr' : 'gallery-thumbnails-en');
    
    // Construire le chemin du dossier
    const folderPath = `./assets/images/gamedev/${year}`;
    
    // Liste des extensions d'images supportées
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
    
    // Fonction pour tester si une image existe
    function testImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }
    
    // Essayer de charger des images avec différents noms possibles
    const images = [];
    const maxAttempts = 50; // Augmenté pour permettre plus d'images
    
    // Essayer des noms numérotés (image1.jpg, image2.jpg, etc.)
    for (let i = 1; i <= maxAttempts; i++) {
        for (const ext of imageExtensions) {
            const imagePath = `${folderPath}/image${i}.${ext}`;
            const exists = await testImageExists(imagePath);
            if (exists) {
                images.push(imagePath);
                break; // Passer au numéro suivant une fois qu'une extension fonctionne
            }
        }
    }
    
    // Si aucune image trouvée avec "imageX", essayer des noms numériques simples
    if (images.length === 0) {
        for (let i = 1; i <= maxAttempts; i++) {
            for (const ext of imageExtensions) {
                const imagePath = `${folderPath}/${i}.${ext}`;
                const exists = await testImageExists(imagePath);
                if (exists) {
                    images.push(imagePath);
                    break;
                }
            }
        }
    }
    
    // Essayer aussi des noms avec zéro padding (01.jpg, 02.jpg, etc.)
    if (images.length === 0) {
        for (let i = 1; i <= maxAttempts; i++) {
            const paddedNum = String(i).padStart(2, '0');
            for (const ext of imageExtensions) {
                const imagePath = `${folderPath}/${paddedNum}.${ext}`;
                const exists = await testImageExists(imagePath);
                if (exists) {
                    images.push(imagePath);
                    break;
                }
            }
        }
    }
    
    // Afficher la galerie
    if (images.length > 0) {
        galleryPlaceholder.style.display = 'none';
        galleryMainImg.style.display = 'block';
        galleryMainImg.src = images[0];
        galleryMainImg.alt = `Image ${year}`;
        
        // Créer les miniatures avec défilement horizontal
        galleryThumbnails.innerHTML = '';
        images.forEach((imgPath, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'gallery-thumbnail' + (index === 0 ? ' active' : '');
            thumbnail.addEventListener('click', function() {
                // Retirer la classe active de toutes les miniatures
                galleryThumbnails.querySelectorAll('.gallery-thumbnail').forEach(t => t.classList.remove('active'));
                // Ajouter la classe active à la miniature cliquée
                this.classList.add('active');
                // Changer l'image principale avec une transition
                galleryMainImg.style.opacity = '0';
                setTimeout(() => {
                    galleryMainImg.src = imgPath;
                    galleryMainImg.style.opacity = '1';
                }, 150);
                
                // Faire défiler la miniature dans la vue si nécessaire
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });
            
            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = imgPath;
            thumbnailImg.alt = `Miniature ${index + 1}`;
            thumbnailImg.loading = 'lazy';
            thumbnail.appendChild(thumbnailImg);
            galleryThumbnails.appendChild(thumbnail);
        });
        
        // Réinitialiser l'opacité de l'image principale
        galleryMainImg.style.opacity = '1';
        
        // Attendre que l'image principale soit chargée
        return new Promise((resolve) => {
            if (galleryMainImg.complete) {
                resolve();
            } else {
                galleryMainImg.onload = () => resolve();
                galleryMainImg.onerror = () => resolve(); // Résoudre même en cas d'erreur
            }
        });
    } else {
        // Aucune image trouvée, afficher le placeholder
        galleryPlaceholder.style.display = 'flex';
        galleryMainImg.style.display = 'none';
        galleryThumbnails.innerHTML = '';
        return Promise.resolve();
    }
}

// Fonction pour initialiser la timeline
function initTimeline() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('click', function() {
            // Retirer la classe active de tous les items du même container
            const activeContainer = this.closest('.timeline-container');
            const allItems = activeContainer.querySelectorAll('.timeline-item');
            allItems.forEach(i => i.classList.remove('active'));
            
            // Ajouter la classe active à l'item cliqué
            this.classList.add('active');
            
            const year = this.getAttribute('data-year');
            const title = this.getAttribute('data-title');
            const desc = this.getAttribute('data-desc');
            const tech = this.getAttribute('data-tech');
            
            const isFr = activeContainer.id === 'timeline-container-fr';
            
            const detailsCard = isFr ? document.getElementById('timeline-details-fr') : document.getElementById('timeline-details-en');
            const detailsYear = isFr ? document.getElementById('details-year-fr') : document.getElementById('details-year-en');
            const detailsTitle = isFr ? document.getElementById('details-title-fr') : document.getElementById('details-title-en');
            const detailsDesc = isFr ? document.getElementById('details-desc-fr') : document.getElementById('details-desc-en');
            const detailsTech = isFr ? document.getElementById('details-tech-fr') : document.getElementById('details-tech-en');
            
            if (detailsCard && detailsYear && detailsTitle && detailsDesc) {
                detailsYear.textContent = year;
                detailsTitle.textContent = title;
                detailsDesc.textContent = desc;
                
                // Afficher les technologies
                if (detailsTech && tech) {
                    const techArray = tech.split(',').map(t => t.trim());
                    detailsTech.innerHTML = '<div class="timeline-tech-label">Technologies :</div><div class="timeline-tech-tags">' + 
                        techArray.map(t => `<span class="timeline-tech-tag">${t}</span>`).join('') + 
                        '</div>';
                } else if (detailsTech) {
                    detailsTech.innerHTML = '';
                }
                
                // Charger la galerie d'images pour cette période
                loadGalleryImages(year, isFr).then(() => {
                    // Ajuster la hauteur de la carte après le chargement des images
                    adjustCardHeight(detailsCard);
                });
                
                detailsCard.classList.add('active');
                
                // Ajuster la hauteur initiale
                setTimeout(() => {
                    adjustCardHeight(detailsCard);
                }, 100);
            }
        });
    });
}

// Fonction pour ajuster la hauteur de la carte en fonction du contenu
function adjustCardHeight(card) {
    if (!card) return;
    
    const content = card.querySelector('.timeline-details-content');
    if (!content) return;
    
    // Calculer la hauteur nécessaire
    const contentHeight = content.scrollHeight;
    const padding = 40; // padding top + bottom
    const minHeight = 400;
    const requiredHeight = Math.max(contentHeight + padding, minHeight);
    
    // Ajuster la hauteur du wrapper parent
    const wrapper = card.closest('.timeline-wrapper');
    if (wrapper) {
        wrapper.style.minHeight = `${requiredHeight + 100}px`;
    }
    
    // Ajuster la hauteur de la carte
    card.style.height = 'auto';
    card.style.minHeight = `${requiredHeight}px`;
}

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
