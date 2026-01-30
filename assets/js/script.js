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
        'timeline-2025-desc': 'Moteur maison : MonoGame puis C# pur',
        'timeline-tech-label': 'Technologies :'
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
        'timeline-2025-desc': 'Home engine: MonoGame then pure C#',
        'timeline-tech-label': 'Technologies:'
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
            // Mettre à jour le libellé "Technologies" dans la carte timeline visible
            const visibleDetails = document.querySelector('.timeline-details-card.active');
            if (visibleDetails) {
                const techLabelEl = visibleDetails.querySelector('.timeline-tech-label');
                if (techLabelEl && translations[lang] && translations[lang]['timeline-tech-label']) {
                    techLabelEl.textContent = translations[lang]['timeline-tech-label'];
                }
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

// Config galerie par année : images (1.png, 2.jpeg, 3.gif...) et/ou liens YouTube
// Exemple : '2008': ['1.png', '2.jpeg', 'https://www.youtube.com/watch?v=xxxxx', '3.gif']
const GALLERY_CONFIG = {
    '2008': ['1.png', '2.jpg', '3.png'],
    '2015': ['1.png', '2.png'],
    '2016-2017': ['1.png', '2.png', '3.png', '4.png'],
    '2018-2021': ['https://www.youtube.com/watch?v=Imfw4LeQNlE', 'https://www.youtube.com/watch?v=9RxU5nMuasY', '1.png', '2.png'],
    '2022-2023': ['1.png', '2.png', '3.png'],
    '2025-2026': ['1.png']
};

function isYouTubeUrl(str) {
    if (typeof str !== 'string') return false;
    return /youtube\.com\/watch\?v=|youtu\.be\//i.test(str.trim());
}

function getYouTubeVideoId(url) {
    const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
    return m ? m[1] : null;
}

function getYouTubeEmbedUrl(url) {
    const id = getYouTubeVideoId(url);
    if (!id) return null;
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const isLocal = !origin || /^file:\/\//i.test(origin) || /localhost|127\.0\.0\.1/i.test(origin);
    if (isLocal) {
        return `https://www.youtube.com/embed/${id}`;
    }
    const params = new URLSearchParams();
    params.set('origin', origin);
    return `https://www.youtube-nocookie.com/embed/${id}?${params.toString()}`;
}

function getYouTubeThumbUrl(url) {
    const id = getYouTubeVideoId(url);
    return id ? `https://img.youtube.com/vi/${id}/mqdefault.jpg` : null;
}

// Dernière requête galerie (pour ignorer les réponses en retard)
let lastGalleryRequestId = 0;

// Construit la liste des médias (images locales ou YouTube) pour une année
function buildGalleryItems(year) {
    const folderPath = `./assets/images/gamedev/${year}`;
    const fileList = GALLERY_CONFIG[year];
    if (!fileList || fileList.length === 0) return [];

    return fileList.map(entry => {
        const s = String(entry).trim();
        if (isYouTubeUrl(s)) {
            const videoId = getYouTubeVideoId(s);
            const thumbUrl = getYouTubeThumbUrl(s);
            return { type: 'youtube', videoId, thumbUrl, alt: 'Vidéo YouTube' };
        }
        return { type: 'image', url: `${folderPath}/${s}`, thumbUrl: `${folderPath}/${s}`, alt: `Média ${year}` };
    }).filter(item => item.type === 'youtube' ? item.videoId : item.url);
}

// Iframe YouTube (referrerpolicy = fix erreur 153) : attendre que l’API soit prête puis créer le lecteur
function createYouTubeEmbed(containerEl, videoId) {
    const wrapper = document.createElement('div');
    wrapper.className = 'gallery-main-video-wrapper';
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
    iframe.setAttribute('referrerpolicy', 'strict-origin-when-cross-origin');
    iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture');
    iframe.setAttribute('allowfullscreen', '');
    iframe.title = 'Vidéo YouTube';
    wrapper.appendChild(iframe);
    containerEl.appendChild(wrapper);
}

// Affiche un média (image ou lecteur YouTube via l’API) dans la zone principale
function setMainMedia(mediaEl, item) {
    mediaEl.innerHTML = '';
    if (!item) return;
    if (item.type === 'youtube') {
        createYouTubeEmbed(mediaEl, item.videoId);
    } else {
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.alt;
        img.className = 'gallery-main-img';
        mediaEl.appendChild(img);
    }
}

// Fonction pour charger la galerie (images + liens YouTube) d'une période
function loadGalleryImages(year, isFr) {
    const requestId = ++lastGalleryRequestId;
    const galleryMedia = document.getElementById(isFr ? 'gallery-main-media-fr' : 'gallery-main-media-en');
    const galleryPlaceholder = document.getElementById(isFr ? 'gallery-placeholder-fr' : 'gallery-placeholder-en');
    const galleryThumbnails = document.getElementById(isFr ? 'gallery-thumbnails-fr' : 'gallery-thumbnails-en');

    const items = buildGalleryItems(year);

    if (items.length > 0) {
        galleryPlaceholder.style.display = 'none';
        galleryMedia.style.display = 'block';
        galleryMedia.style.opacity = '1';
        setMainMedia(galleryMedia, items[0]);

        galleryThumbnails.innerHTML = '';
        items.forEach((item, index) => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'gallery-thumbnail' + (index === 0 ? ' active' : '') + (item.type === 'youtube' ? ' gallery-thumbnail-video' : '');
            thumbnail.dataset.index = index;
            thumbnail.addEventListener('click', function() {
                galleryThumbnails.querySelectorAll('.gallery-thumbnail').forEach(t => t.classList.remove('active'));
                this.classList.add('active');
                const idx = parseInt(this.dataset.index, 10);
                galleryMedia.style.opacity = '0';
                setTimeout(() => {
                    setMainMedia(galleryMedia, items[idx]);
                    galleryMedia.style.opacity = '1';
                }, 150);
                this.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            });

            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = item.thumbUrl;
            thumbnailImg.alt = item.type === 'youtube' ? 'Vidéo' : `Miniature ${index + 1}`;
            thumbnailImg.loading = 'lazy';
            thumbnail.appendChild(thumbnailImg);
            galleryThumbnails.appendChild(thumbnail);
        });

        const firstMedia = galleryMedia.querySelector('.gallery-main-img');
        return new Promise((resolve) => {
            if (!firstMedia || firstMedia.complete) {
                resolve();
            } else {
                firstMedia.onload = () => { if (requestId === lastGalleryRequestId) resolve(); };
                firstMedia.onerror = () => resolve();
            }
        });
    } else {
        galleryPlaceholder.style.display = 'flex';
        galleryMedia.style.display = 'none';
        galleryMedia.innerHTML = '';
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
                detailsDesc.innerHTML = desc;
                
                // Afficher les technologies
                if (detailsTech && tech) {
                    const lang = localStorage.getItem('language') || 'fr';
                    const techLabel = (translations[lang] && translations[lang]['timeline-tech-label']) ? translations[lang]['timeline-tech-label'] : 'Technologies :';
                    const techArray = tech.split(',').map(t => t.trim());
                    detailsTech.innerHTML = '<div class="timeline-tech-label">' + techLabel + '</div><div class="timeline-tech-tags">' + 
                        techArray.map(t => `<span class="timeline-tech-tag">${t}</span>`).join('') + 
                        '</div>';
                } else if (detailsTech) {
                    detailsTech.innerHTML = '';
                }
                
                // Charger la galerie d'images pour cette période
                loadGalleryImages(year, isFr).then(() => {
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
