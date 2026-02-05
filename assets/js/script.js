(function () {
  "use strict";

  const SUPPORTED_LANGUAGES = ["fr", "en"];
  const DEFAULT_LANGUAGE = "fr";

  const TRANSLATIONS = {
    fr: {
      name: "BEDENES Guillaume",
      email: "guillaume.bedenes@epitech.eu",
      bio: "Ingenieur logiciel\nDeveloppement de logiciels, de jeux et de systemes complexes.",
      "cv-button": "CV",
      "tab-skills": "Competences",
      "tab-timeline": "Game Dev Timeline",
      "skills-command": "$ cat competences.txt",
      "timeline-command": "$ cat timeline.txt",
      "timeline-tech-label": "Technologies :",
      "gallery-empty": "Aucune image"
    },
    en: {
      name: "BEDENES Guillaume",
      email: "guillaume.bedenes@epitech.eu",
      bio: "Software Engineer\nDevelopment of software, games and complex systems.",
      "cv-button": "CV",
      "tab-skills": "Skills",
      "tab-timeline": "Game Dev Timeline",
      "skills-command": "$ cat skills.txt",
      "timeline-command": "$ cat timeline.txt",
      "timeline-tech-label": "Technologies:",
      "gallery-empty": "No images"
    }
  };

  const LEVEL_TOOLTIPS = {
    "level-1": {
      fr: "Base acquise - Je connais les concepts, je peux reprendre du code.",
      en: "Basic level - I know the concepts and can take over code."
    },
    "level-2": {
      fr: "Bon niveau - Utilise regulierement, autonome sur sujets non triviaux.",
      en: "Good level - Used regularly, autonomous on non-trivial topics."
    },
    "level-3": {
      fr: "Maitrise professionnelle - Utilise en production sur projets reels.",
      en: "Professional mastery - Used in production on real projects."
    }
  };

  const SKILLS_DATA = {
    fr: [
      {
        title: "Programming",
        sections: [
          {
            title: "Langages",
            items: [
              { name: "C#", level: "level-3" },
              { name: "C", level: "level-2" },
              { name: "C++", level: "level-2" },
              { name: "Python", level: "level-2" },
              { name: "SQL", level: "level-2" },
              { name: "JavaScript", level: "level-1" }
            ]
          },
          {
            title: "Frameworks & technologies",
            items: [
              { name: "Unity", level: "level-3" },
              { name: "WPF", level: "level-3" },
              { name: "UWP", level: "level-3" },
              { name: "WinDev", level: "level-2" },
              { name: "SFML", level: "level-2" },
              { name: "Monogame", level: "level-2" }
            ]
          }
        ]
      },
      {
        title: "Environnements & outils",
        sections: [
          {
            title: "Systemes",
            items: [
              { name: "Windows", level: "level-3" },
              { name: "Linux (Arch Linux, i3wm)", level: "level-2" }
            ]
          },
          {
            title: "Outils de gestion de projet",
            items: [
              { name: "Obsidian", level: "level-2" },
              { name: "Git", level: "level-2" },
              { name: "GitLab", level: "level-1" },
              { name: "Azure DevOps", level: "level-1" }
            ]
          },
          {
            title: "Outils d'edition",
            items: [
              { name: "Cursor", level: "level-3" },
              { name: "Visual Studio", level: "level-3" },
              { name: "Emacs", level: "level-2" },
              { name: "Vim", level: "level-1" },
              { name: "Nano", level: "level-1" }
            ]
          }
        ]
      }
    ],
    en: [
      {
        title: "Programming",
        sections: [
          {
            title: "Languages",
            items: [
              { name: "C#", level: "level-3" },
              { name: "C", level: "level-2" },
              { name: "C++", level: "level-2" },
              { name: "Python", level: "level-2" },
              { name: "SQL", level: "level-2" },
              { name: "JavaScript", level: "level-1" }
            ]
          },
          {
            title: "Frameworks & technologies",
            items: [
              { name: "Unity", level: "level-3" },
              { name: "WPF", level: "level-3" },
              { name: "UWP", level: "level-3" },
              { name: "WinDev", level: "level-2" },
              { name: "SFML", level: "level-2" },
              { name: "Monogame", level: "level-2" }
            ]
          }
        ]
      },
      {
        title: "Environments & tools",
        sections: [
          {
            title: "Systems",
            items: [
              { name: "Windows", level: "level-3" },
              { name: "Linux (Arch Linux, i3wm)", level: "level-2" }
            ]
          },
          {
            title: "Project management tools",
            items: [
              { name: "Obsidian", level: "level-2" },
              { name: "Git", level: "level-2" },
              { name: "GitLab", level: "level-1" },
              { name: "Azure DevOps", level: "level-1" }
            ]
          },
          {
            title: "Editing tools",
            items: [
              { name: "Cursor", level: "level-3" },
              { name: "Visual Studio", level: "level-3" },
              { name: "Emacs", level: "level-2" },
              { name: "Vim", level: "level-1" },
              { name: "Nano", level: "level-1" }
            ]
          }
        ]
      }
    ]
  };

  const TIMELINE_DATA = {
    fr: [
      { year: "2008", title: "Decouverte de la creation de jeux", description: ["Decouverte precoce du game design et du level design avec des outils accessibles.", "Premieres experimentations autour de la conception de niveaux et des mecaniques de jeu."], tech: ["FPS Creator", "RPG Maker"] },
      { year: "2015", title: "Premiers pas en programmation", description: ["Modding Minecraft en Java et developpement web (HTML, CSS).", "Premiers systemes de jeu codes: deplacements, interactions, combat, points de vie et score."], tech: ["GameMaker", "Construct 2", "Java", "HTML", "CSS"] },
      { year: "2016-2017", title: "Developpement de jeux sans moteur", description: ["Developpements de jeux complets en C (CSFML), C++ (Irrlicht) et JavaScript (Phaser).", "Generation procedurale avec le projet Rebirth et gestion de mondes 2D par chunks."], tech: ["SFML", "Phaser", "C++", "SDL", "CSFML", "C", "Irrlicht"] },
      { year: "2018-2021", title: "Apprentissage et maitrise d'Unity", description: ["Prototypes axes generation procedurale: bruit de Perlin, Voronoi, mondes et biomes.", "Jeux complets en equipe en game jam et en studio, specialise en scripting C#, VFX et level design."], tech: ["Unity", "C#"] },
      { year: "2022-2023", title: "Professionnalisation avec Unity", description: ["Developpement d'un simulateur 3D Airbus autour des MFD et du KCCU de l'A350.", "Travail en contexte pro sur architecture logicielle, design patterns avances et structuration de projets."], tech: ["Unity", "C#"] },
      { year: "2023-2024", title: "Ouverture a d'autres moteurs de jeu", description: ["Transfert de competences Unity vers des projets de generation procedurale 3D.", "Exploration de Godot, GameMaker et Heaps.io avec focus sur generation procedurale."], tech: ["Unity", "Godot", "GameMaker", "Heaps.io", "C#"] },
      { year: "2025-2026", title: "Developpement d'un moteur de jeu", description: ["Conception d'un moteur maison oriente innovation et generation de contenu assistee par IA.", "Architecture sur mesure d'abord basee sur MonoGame puis entierement en C# avec Avalonia pour le rendu."], tech: ["MonoGame", "C#", "Avalonia"] }
    ],
    en: [
      { year: "2008", title: "Discovery of game creation", description: ["Early discovery of game and level design with accessible tools.", "First experiments around level design and core game mechanics."], tech: ["FPS Creator", "RPG Maker"] },
      { year: "2015", title: "First steps in programming", description: ["Minecraft modding in Java and web development (HTML, CSS).", "Started coding basic game systems: movement, interactions, combat, health and score."], tech: ["GameMaker", "Construct 2", "Java", "HTML", "CSS"] },
      { year: "2016-2017", title: "Game development without an engine", description: ["First complete game projects in C (CSFML), C++ (Irrlicht) and JavaScript (Phaser).", "Procedural generation with Rebirth and early 2D chunk world systems."], tech: ["SFML", "Phaser", "C++", "SDL", "CSFML", "C", "Irrlicht"] },
      { year: "2018-2021", title: "Learning and mastery of Unity", description: ["Unity prototypes focused on procedural generation: Perlin noise, Voronoi, worlds and biomes.", "Full game projects in teams, game jams and studio work with focus on C# scripting, VFX and level design."], tech: ["Unity", "C#"] },
      { year: "2022-2023", title: "Professionalization with Unity", description: ["Team development of a 3D Airbus simulator around A350 MFD and KCCU systems.", "Professional Unity work around architecture, advanced design patterns and project structure."], tech: ["Unity", "C#"] },
      { year: "2023-2024", title: "Opening up to other game engines", description: ["Applied Unity skills to 3D procedural generation projects.", "Explored Godot, GameMaker and Heaps.io while keeping procedural generation as core focus."], tech: ["Unity", "Godot", "GameMaker", "Heaps.io", "C#"] },
      { year: "2025-2026", title: "Development of a game engine", description: ["Designing a custom game engine focused on innovation and AI-assisted content generation.", "Architecture evolved from MonoGame to a fully C# stack with Avalonia for rendering."], tech: ["MonoGame", "C#", "Avalonia"] }
    ]
  };

  const GALLERY_CONFIG = {
    "2008": ["1.png", "2.jpg", "3.png"],
    "2015": ["1.png", "2.png"],
    "2016-2017": ["1.png", "2.png", "3.png", "4.png"],
    "2018-2021": ["https://www.youtube.com/watch?v=Imfw4LeQNlE", "https://www.youtube.com/watch?v=9RxU5nMuasY", "1.png", "2.png"],
    "2022-2023": ["1.png", "2.png", "3.png"],
    "2025-2026": ["1.png"]
  };

  function clearElement(element) { element.replaceChildren(); }
  function makeElement(tagName, className, text) {
    const el = document.createElement(tagName);
    if (className) el.className = className;
    if (typeof text === "string") el.textContent = text;
    return el;
  }
  function setTextWithLineBreaks(element, text) {
    clearElement(element);
    const lines = String(text).split("\n");
    lines.forEach((line, i) => {
      element.appendChild(document.createTextNode(line));
      if (i < lines.length - 1) element.appendChild(document.createElement("br"));
    });
  }

  function getValidatedLanguage(rawValue) {
    return SUPPORTED_LANGUAGES.indexOf(rawValue) !== -1 ? rawValue : DEFAULT_LANGUAGE;
  }
  function getInitialLanguage() {
    try { return getValidatedLanguage(localStorage.getItem("language")); }
    catch (_e) { return DEFAULT_LANGUAGE; }
  }
  function persistLanguage(lang) {
    try { localStorage.setItem("language", lang); } catch (_e) {}
  }
  function updateLanguageButtons(lang) {
    document.querySelectorAll(".lang-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
  }

  function translatePage(lang) {
    const safeLang = getValidatedLanguage(lang);
    document.documentElement.lang = safeLang;
    const dict = TRANSLATIONS[safeLang] || TRANSLATIONS[DEFAULT_LANGUAGE];
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = dict[key];
      if (!value) return;
      if (element.classList.contains("bio")) {
        setTextWithLineBreaks(element, value);
      } else {
        element.textContent = value;
      }
    });
  }

  function renderSkills(container, lang) {
    const categories = SKILLS_DATA[lang] || SKILLS_DATA.fr;
    clearElement(container);
    categories.forEach((category) => {
      const categoryElement = makeElement("div", "skill-category");
      categoryElement.appendChild(makeElement("h3", "category-title", category.title));
      category.sections.forEach((section) => {
        const sectionEl = makeElement("div", "skill-section");
        sectionEl.appendChild(makeElement("h4", "section-title", section.title));
        section.items.forEach((item) => {
          const itemEl = makeElement("div", "skill-item");
          itemEl.appendChild(makeElement("span", "skill-name", item.name));
          const levelEl = makeElement("span", "skill-level " + item.level);
          levelEl.title = LEVEL_TOOLTIPS[item.level][lang];
          levelEl.setAttribute("aria-label", item.level);
          itemEl.appendChild(levelEl);
          sectionEl.appendChild(itemEl);
        });
        categoryElement.appendChild(sectionEl);
      });
      container.appendChild(categoryElement);
    });
  }

  function initTabs() {
    const tabs = document.querySelectorAll(".tab");
    const panes = document.querySelectorAll(".tab-pane");
    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        const targetId = tab.getAttribute("data-tab");
        tabs.forEach((t) => t.classList.remove("active"));
        panes.forEach((p) => p.classList.remove("active"));
        tab.classList.add("active");
        const pane = document.getElementById(targetId);
        if (pane) pane.classList.add("active");
      });
    });
  }

  function isYouTubeUrl(value) { return typeof value === "string" && /youtube\.com\/watch\?v=|youtu\.be\//i.test(value.trim()); }
  function getYouTubeVideoId(url) {
    const match = String(url).match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/i);
    return match ? match[1] : null;
  }
  function getYouTubeThumbUrl(url) {
    const id = getYouTubeVideoId(url);
    return id ? "https://img.youtube.com/vi/" + id + "/mqdefault.jpg" : null;
  }
  function buildGalleryItems(year) {
    const files = GALLERY_CONFIG[year];
    if (!files || files.length === 0) return [];
    const folder = "./assets/images/gamedev/" + year;
    return files.map((entry) => {
      const value = String(entry).trim();
      if (isYouTubeUrl(value)) {
        const id = getYouTubeVideoId(value);
        if (!id) return null;
        return { type: "youtube", videoId: id, thumbUrl: getYouTubeThumbUrl(value) };
      }
      return { type: "image", url: folder + "/" + value, thumbUrl: folder + "/" + value, alt: "Media " + year };
    }).filter(Boolean);
  }
  function setMainMedia(container, item) {
    clearElement(container);
    if (!item) return;
    if (item.type === "youtube") {
      const wrapper = makeElement("div", "gallery-main-video-wrapper");
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube.com/embed/" + item.videoId + "?rel=0&modestbranding=1";
      iframe.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
      iframe.setAttribute("allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
      iframe.setAttribute("allowfullscreen", "");
      iframe.title = "YouTube video";
      wrapper.appendChild(iframe);
      container.appendChild(wrapper);
      return;
    }
    const img = makeElement("img", "gallery-main-img");
    img.src = item.url;
    img.alt = item.alt;
    container.appendChild(img);
  }

  function createTimelineController(elements) {
    let currentLang = "fr";
    let currentItems = [];
    let activeIndex = -1;

    function renderDescription(container, paragraphs) {
      clearElement(container);
      paragraphs.forEach((paragraph) => {
        container.appendChild(makeElement("p", "", paragraph));
      });
    }
    function renderTech(container, tags, lang) {
      clearElement(container);
      if (!tags.length) return;
      const label = (TRANSLATIONS[lang] || TRANSLATIONS.fr)["timeline-tech-label"] || "Technologies:";
      container.appendChild(makeElement("div", "timeline-tech-label", label));
      const wrap = makeElement("div", "timeline-tech-tags");
      tags.forEach((tag) => wrap.appendChild(makeElement("span", "timeline-tech-tag", tag)));
      container.appendChild(wrap);
    }
    function adjustCardHeight(card) {
      const content = card.querySelector(".timeline-details-content");
      if (!content) return;
      const requiredHeight = Math.max(content.scrollHeight + 40, 400);
      const wrapper = card.closest(".timeline-wrapper");
      if (wrapper) wrapper.style.minHeight = (requiredHeight + 100) + "px";
      card.style.minHeight = requiredHeight + "px";
    }
    function renderGallery(year) {
      const items = buildGalleryItems(year);
      const galleryMainMedia = elements.galleryMainMedia;
      const galleryPlaceholder = elements.galleryPlaceholder;
      const galleryThumbnails = elements.galleryThumbnails;
      clearElement(galleryThumbnails);
      if (!items.length) {
        galleryPlaceholder.classList.remove("is-hidden");
        galleryMainMedia.classList.add("is-hidden");
        clearElement(galleryMainMedia);
        return;
      }
      galleryPlaceholder.classList.add("is-hidden");
      galleryMainMedia.classList.remove("is-hidden");
      setMainMedia(galleryMainMedia, items[0]);

      items.forEach((item, index) => {
        const thumb = makeElement("button", "gallery-thumbnail" + (index === 0 ? " active" : "") + (item.type === "youtube" ? " gallery-thumbnail-video" : ""));
        thumb.type = "button";
        const image = document.createElement("img");
        image.src = item.thumbUrl;
        image.alt = item.type === "youtube" ? "Video" : "Thumbnail " + (index + 1);
        image.loading = "lazy";
        thumb.appendChild(image);
        thumb.addEventListener("click", () => {
          galleryThumbnails.querySelectorAll(".gallery-thumbnail").forEach((el) => el.classList.remove("active"));
          thumb.classList.add("active");
          galleryMainMedia.style.opacity = "0";
          setTimeout(() => {
            setMainMedia(galleryMainMedia, items[index]);
            galleryMainMedia.style.opacity = "1";
          }, 120);
        });
        galleryThumbnails.appendChild(thumb);
      });
    }
    function showDetails(item) {
      elements.detailsYear.textContent = item.year;
      elements.detailsTitle.textContent = item.title;
      renderDescription(elements.detailsDesc, item.description);
      renderTech(elements.detailsTech, item.tech, currentLang);
      renderGallery(item.year);
      elements.detailsCard.classList.add("active");
      setTimeout(() => adjustCardHeight(elements.detailsCard), 80);
    }

    function clearActive() {
      activeIndex = -1;
      elements.timelineContainer.querySelectorAll(".timeline-item").forEach((el) => {
        el.classList.remove("active");
      });
      elements.detailsCard.classList.remove("active");
      elements.detailsYear.textContent = "";
      elements.detailsTitle.textContent = "";
      clearElement(elements.detailsDesc);
      clearElement(elements.detailsTech);
      clearElement(elements.galleryThumbnails);
      clearElement(elements.galleryMainMedia);
      elements.galleryMainMedia.classList.add("is-hidden");
      elements.galleryPlaceholder.classList.remove("is-hidden");

      const wrapper = elements.detailsCard.closest(".timeline-wrapper");
      if (wrapper) {
        wrapper.style.minHeight = "";
      }
      elements.detailsCard.style.minHeight = "";
    }

    function setActive(index) {
      activeIndex = index;
      elements.timelineContainer.querySelectorAll(".timeline-item").forEach((el, idx) => {
        el.classList.toggle("active", idx === index);
      });
      showDetails(currentItems[index]);
    }

    return {
      render: function (lang) {
        currentLang = lang;
        currentItems = TIMELINE_DATA[lang] || TIMELINE_DATA.fr;
        clearElement(elements.timelineContainer);
        currentItems.forEach((item, index) => {
          const timelineItem = makeElement("button", "timeline-item");
          timelineItem.type = "button";
          timelineItem.setAttribute("aria-label", item.year + " " + item.title);
          timelineItem.appendChild(makeElement("div", "timeline-point"));
          timelineItem.appendChild(makeElement("div", "timeline-label", item.year));
          timelineItem.addEventListener("click", () => {
            if (activeIndex === index) {
              clearActive();
              return;
            }
            setActive(index);
          });
          elements.timelineContainer.appendChild(timelineItem);
        });
        clearActive();
      }
    };
  }

  function initParticles(canvas) {
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function getParticleCount(width, height, reducedMotion) {
      if (reducedMotion) return 0;
      const areaBased = Math.floor((width * height) / 18000);
      const bounded = Math.max(32, Math.min(140, areaBased));
      return width < 768 ? Math.floor(bounded * 0.55) : bounded;
    }

    function Particle(canvasRef) {
      this.canvas = canvasRef;
      this.reset = function () {
        this.x = Math.random() * this.canvas.width;
        this.y = Math.random() * this.canvas.height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 3 + 1;
        this.opacity = Math.random() * 0.5 + 0.3;
      };
      this.update = function () {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > this.canvas.width) {
          this.vx = -this.vx;
          this.x = Math.max(0, Math.min(this.canvas.width, this.x));
        }
        if (this.y < 0 || this.y > this.canvas.height) {
          this.vy = -this.vy;
          this.y = Math.max(0, Math.min(this.canvas.height, this.y));
        }
        if (Math.random() < 0.001) this.reset();
      };
      this.draw = function (ctxRef) {
        ctxRef.globalAlpha = this.opacity;
        ctxRef.fillStyle = "#ffffff";
        ctxRef.fillRect(this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
      };
      this.reset();
      this.y = Math.random() * this.canvas.height;
    }

    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reducedMotion = reducedMotionQuery.matches;
    let particles = [];
    let running = !document.hidden;
    let rafId = null;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const targetCount = getParticleCount(canvas.width, canvas.height, reducedMotion);
      if (targetCount === 0) {
        particles = [];
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        return;
      }
      if (particles.length > targetCount) {
        particles = particles.slice(0, targetCount);
        return;
      }
      while (particles.length < targetCount) {
        particles.push(new Particle(canvas));
      }
    }

    function drawFrame() {
      if (!running) {
        rafId = null;
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((particle) => {
        particle.update();
        particle.draw(ctx);
      });
      rafId = requestAnimationFrame(drawFrame);
    }

    function ensureAnimation() {
      if (!rafId && running) rafId = requestAnimationFrame(drawFrame);
    }

    function onVisibilityChange() {
      running = !document.hidden;
      if (!running && rafId) {
        cancelAnimationFrame(rafId);
        rafId = null;
        return;
      }
      ensureAnimation();
    }

    function onReducedMotionChange(event) {
      reducedMotion = event.matches;
      resizeCanvas();
      ensureAnimation();
    }

    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", onVisibilityChange);
    if (typeof reducedMotionQuery.addEventListener === "function") {
      reducedMotionQuery.addEventListener("change", onReducedMotionChange);
    } else if (typeof reducedMotionQuery.addListener === "function") {
      reducedMotionQuery.addListener(onReducedMotionChange);
    }

    resizeCanvas();
    ensureAnimation();
  }

  document.addEventListener("DOMContentLoaded", function () {
    const skillsContainer = document.getElementById("skills-container");
    const timelineContainer = document.getElementById("timeline-container");
    const detailsCard = document.getElementById("timeline-details");
    const detailsYear = document.getElementById("details-year");
    const detailsTitle = document.getElementById("details-title");
    const detailsDesc = document.getElementById("details-desc");
    const detailsTech = document.getElementById("details-tech");
    const galleryMainMedia = document.getElementById("gallery-main-media");
    const galleryPlaceholder = document.getElementById("gallery-placeholder");
    const galleryThumbnails = document.getElementById("gallery-thumbnails");
    const particlesCanvas = document.getElementById("particles-canvas");

    const required = [skillsContainer, timelineContainer, detailsCard, detailsYear, detailsTitle, detailsDesc, detailsTech, galleryMainMedia, galleryPlaceholder, galleryThumbnails];
    if (required.some((el) => !el)) return;

    const timeline = createTimelineController({
      timelineContainer,
      detailsCard,
      detailsYear,
      detailsTitle,
      detailsDesc,
      detailsTech,
      galleryMainMedia,
      galleryPlaceholder,
      galleryThumbnails
    });

    function applyLanguage(language) {
      const safeLang = getValidatedLanguage(language);
      persistLanguage(safeLang);
      translatePage(safeLang);
      updateLanguageButtons(safeLang);
      renderSkills(skillsContainer, safeLang);
      timeline.render(safeLang);
    }

    const initialLanguage = getInitialLanguage();
    applyLanguage(initialLanguage);

    document.querySelectorAll(".lang-btn").forEach((button) => {
      button.addEventListener("click", function () {
        applyLanguage(button.getAttribute("data-lang"));
      });
    });

    initTabs();
    initParticles(particlesCanvas);
  });
})();
