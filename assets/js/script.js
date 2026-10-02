(function () {
  "use strict";

  const SUPPORTED_LANGUAGES = ["fr", "en"];
  const DEFAULT_LANGUAGE = "en";
  const LANGUAGE_STORAGE_KEY = "language";
  const LANGUAGE_PREFERENCE_STORAGE_KEY = "language-preference-set";

  const TRANSLATIONS = {
    fr: {
      name: "Guillaume BEDENES",
      email: "guillaume.bedenes@epitech.eu",
      bio: "Ingénieur logiciel et IA\nConception de logiciels, de jeux et de systèmes complexes.",
      "tab-presentation": "Présentation",
      "tab-skills": "Compétences",
      "tab-timeline": "Parcours Game Dev",
      "tab-downloads": "Téléchargement",
      "presentation-command": "$ cat presentation.txt",
      "timeline-command": "$ cat timeline.txt",
      "downloads-command": "$ ls ./downloads",
      "downloads-nav-title": "Projets",
      "downloads-overview-title": "Présentation",
      "downloads-status-label": "Statut",
      "downloads-updated-label": "Dernière mise à jour",
      "timeline-tech-label": "Technologies :",
      "gallery-empty": "Aucune image",
      "downloads-empty": "Aucun jeu téléchargeable n'est encore publié ici.",
      "downloads-empty-note": "L'onglet est prêt: il servira à regrouper mes prototypes et jeux distribuables."
    },
    en: {
      name: "Guillaume BEDENES",
      email: "guillaume.bedenes@epitech.eu",
      bio: "Software & AI Engineer\nBuilding software, games and complex systems.",
      "tab-presentation": "Presentation",
      "tab-skills": "Skills",
      "tab-timeline": "Game Dev Timeline",
      "tab-downloads": "Downloads",
      "presentation-command": "$ cat presentation.txt",
      "timeline-command": "$ cat timeline.txt",
      "downloads-command": "$ ls ./downloads",
      "downloads-nav-title": "Projects",
      "downloads-overview-title": "Overview",
      "downloads-status-label": "Status",
      "downloads-updated-label": "Last update",
      "timeline-tech-label": "Technologies:",
      "gallery-empty": "No images",
      "downloads-empty": "No downloadable game is published here yet.",
      "downloads-empty-note": "This tab is ready to host playable prototypes and downloadable builds."
    }
  };

  const SKILLS_DATA = [
    {
      command: "$ cat ai.txt",
      type: "ai",
      sections: [
        {
          title: "AGENT ENGINEERING",
          items: ["AI Agents", "Multi-Agent Systems", "Agent Orchestration", "Agent Skills & Tools"]
        },
        {
          title: "CONTEXT & PROMPTS",
          items: ["Prompt Engineering", "Context Engineering", "Memory & Knowledge Bases", "MCP (Model Context Protocol)"]
        },
        {
          title: "RELIABILITY",
          items: ["RAG", "Evaluation (Evals)", "Guardrails", "Human-in-the-loop"]
        },
        {
          title: "AI-POWERED DEVELOPMENT",
          items: ["Coding Agents", "Parallel Agent Workflows", "Automated Code Review", "AI-assisted Software Development"]
        }
      ]
    },
    {
      command: "$ cat stack.txt",
      type: "stack",
      sections: [
        {
          title: "AI TOOLS",
          items: ["Hermes", "Claude Code", "OpenAI Codex", "OpenClaw", "GitHub Copilot", "Obsidian"]
        },
        {
          title: "Languages",
          items: ["C#", "C", "C++", "Python", "SQL", "JavaScript"]
        },
        {
          title: "Frameworks & technologies",
          items: ["Unity", "WPF", "UWP", "WinDev", "SFML", "MonoGame"]
        }
      ]
    }
  ];

  const PRESENTATION_DATA = {
    fr: {
      detailsTitle: "Je suis un ingénieur formé à {{edu|EPITECH}}, basé dans le sud de la {{edu|France}}",
      details: [
        "Je travaille aujourd’hui sur des logiciels métiers dans les secteurs {{pro|industriel}} et {{pro|logistique}}, avec une approche orientée qualité : code propre, architecture solide, solutions durables.",
        "À côté de ça, je développe des jeux vidéo depuis que j’ai appris à lire. C’est une passion centrale que je poursuis encore aujourd’hui à travers plusieurs projets. Mon parcours complet est disponible dans l’onglet {{game|Parcours Game Dev}}.",
        "Côté joueur, je suis passionné de {{game|RPG}} et de liberté d’action. J’ai platiné 4 fois {{game|The Elder Scrolls V: Skyrim}}, j’ai complété plusieurs modpacks expert sur {{game|Minecraft}}, et je n’ai manqué aucune extension de {{game|World of Warcraft}}.",
        "Je suis également un grand passionné de {{game|Star Citizen}} depuis son Kickstarter, et j’ai suivi chaque CitizenCon."
      ]
    },
    en: {
      detailsTitle: "I am an engineer trained at {{edu|EPITECH}}, based in the south of {{edu|France}}",
      details: [
        "I currently work on business software in the {{pro|industrial}} and {{pro|logistics}} sectors, with a quality-oriented approach: clean code, solid architecture, durable solutions.",
        "Alongside that, I have been developing video games since I learned how to read. It is a central passion that I still pursue today through several projects. My full journey is available in the {{game|Game Dev Timeline}} tab.",
        "As a player, I am passionate about {{game|RPGs}} and freedom of action. I have earned all achievements in {{game|The Elder Scrolls V: Skyrim}} four times, I have completed several expert modpacks on {{game|Minecraft}}, and I have not missed a single expansion of {{game|World of Warcraft}}.",
        "I am also a big {{game|Star Citizen}} enthusiast since its Kickstarter, and I have followed every CitizenCon."
      ]
    }
  };

  const TIMELINE_DATA = {
    fr: [
      { year: "2008", title: "Découverte de la création de jeux", description: ["Découverte précoce du game design et du level design avec des outils accessibles.", "Premières expérimentations autour de la conception de niveaux et des mécaniques de jeu."], tech: ["FPS Creator", "RPG Maker"] },
      { year: "2015", title: "Premiers pas en programmation", description: ["Modding Minecraft en Java et développement web (HTML, CSS).", "Premiers systèmes de jeu codés : déplacements, interactions, combat, points de vie et score."], tech: ["GameMaker", "Construct 2", "Java", "HTML", "CSS"] },
      { year: "2016-2017", title: "Développement de jeux sans moteur", description: ["Développements de jeux complets en C (CSFML), C++ (Irrlicht) et JavaScript (Phaser).", "Génération procédurale avec le projet Minux et gestion de mondes 2D par chunks."], tech: ["SFML", "Phaser", "C++", "SDL", "CSFML", "C", "Irrlicht"] },
      { year: "2018-2021", title: "Apprentissage et maîtrise d'Unity", description: ["Prototypes axés génération procédurale : bruit de Perlin, Voronoï, mondes et biomes.", "Jeux complets en équipe en game jam et en studio, spécialisé en scripting C#, VFX et level design."], tech: ["Unity", "C#"] },
      { year: "2022-2023", title: "Professionnalisation avec Unity", description: ["Développement d'un simulateur 3D Airbus autour des MFD et du KCCU de l'A350.", "Travail en contexte pro sur l'architecture logicielle, les design patterns avancés et la structuration de projets."], tech: ["Unity", "C#"] },
      { year: "2023-2024", title: "Ouverture à d'autres moteurs de jeu", description: ["Transfert de compétences Unity vers des projets de génération procédurale 3D.", "Exploration de Godot, GameMaker et Heaps.io avec un focus sur la génération procédurale."], tech: ["Unity", "Godot", "GameMaker", "Heaps.io", "C#"] },
      { year: "2025-2026", title: "Développement d'un moteur de jeu", description: ["Conception d'un moteur maison orienté innovation et génération de contenu assistée par IA.", "Architecture sur mesure d'abord basée sur MonoGame puis entièrement en C# avec Avalonia pour le rendu."], tech: ["MonoGame", "C#", "Avalonia"] }
    ],
    en: [
      { year: "2008", title: "Discovery of game creation", description: ["Early discovery of game and level design with accessible tools.", "First experiments around level design and core game mechanics."], tech: ["FPS Creator", "RPG Maker"] },
      { year: "2015", title: "First steps in programming", description: ["Minecraft modding in Java and web development (HTML, CSS).", "Started coding basic game systems: movement, interactions, combat, health and score."], tech: ["GameMaker", "Construct 2", "Java", "HTML", "CSS"] },
      { year: "2016-2017", title: "Game development without an engine", description: ["First complete game projects in C (CSFML), C++ (Irrlicht) and JavaScript (Phaser).", "Procedural generation with Minux and early 2D chunk world systems."], tech: ["SFML", "Phaser", "C++", "SDL", "CSFML", "C", "Irrlicht"] },
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

  const DOWNLOAD_GAMES_DATA = {
    fr: [
      {
        id: "minux",
        title: "Minux",
        subtitle: "Jeu infini",
        image: "./assets/images/Downloads/minux_preview.png",
        imageAlt: "Aperçu du projet Minux",
        description: [
          "Minux est un prototype de jeu vidéo dont l’objectif est de démontrer la faisabilité d’un jeu réellement infini.",
          "La génération procédurale a ses limites. Minux les dépasse en intégrant une IA locale (via Ollama) qui génère en continu le monde, les quêtes, les ennemis et les objets.",
          "L’objectif n’est pas de produire du contenu aléatoire, mais de maintenir une cohérence globale. Le game design fixe les règles, et l’architecture encadre la génération."
        ],
        warning: "Minux n'utilise et n'utilisera jamais de l'art ou de la musique générés par IA.",
        status: "En cours",
        lastUpdate: "Mars 2026",
        cta: "Téléchargement",
        ctaDisabled: true,
        availabilityNote: "PHASE 1 • 2027"
      }
    ],
    en: [
      {
        id: "minux",
        title: "Minux",
        subtitle: "Infinite video game",
        image: "./assets/images/Downloads/minux_preview.png",
        imageAlt: "Minux project preview",
        description: [
          "Minux is a video game prototype whose goal is to demonstrate the feasibility of a truly infinite game.",
          "Procedural generation has its limits. Minux goes beyond them by integrating local AI (via Ollama) that continuously generates the world, quests, enemies, and items.",
          "The goal is not to produce random content, but to maintain overall coherence. The game design defines the rules, and the architecture frames the generation."
        ],
        warning: "Minux does not use and will never use AI-generated art or music.",
        status: "In progress",
        lastUpdate: "March 2026",
        cta: "Download",
        ctaDisabled: true,
        availabilityNote: "PHASE 1 • 2027"
      }
    ]
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
    try {
      const storedLanguage = getValidatedLanguage(localStorage.getItem(LANGUAGE_STORAGE_KEY));
      const hasExplicitPreference = localStorage.getItem(LANGUAGE_PREFERENCE_STORAGE_KEY) === "true";
      if (hasExplicitPreference) return storedLanguage;
      return storedLanguage === "en" ? "en" : DEFAULT_LANGUAGE;
    }
    catch (_e) { return DEFAULT_LANGUAGE; }
  }
  function persistLanguage(lang) {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang);
      localStorage.setItem(LANGUAGE_PREFERENCE_STORAGE_KEY, "true");
    } catch (_e) {}
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

  function renderSkills(container) {
    clearElement(container);
    SKILLS_DATA.forEach((category, index) => {
      if (index > 0) {
        const divider = makeElement("div", "skills-divider");
        divider.setAttribute("aria-hidden", "true");
        divider.appendChild(makeElement("pre", "skills-divider-vertical", "|\n".repeat(256)));
        const horizontal = makeElement("div", "skills-divider-horizontal");
        horizontal.appendChild(makeElement("span", "", "+"));
        horizontal.appendChild(makeElement("span", "skills-divider-dashes", "-".repeat(256)));
        horizontal.appendChild(makeElement("span", "", "+"));
        divider.appendChild(horizontal);
        container.appendChild(divider);
      }
      const column = makeElement("div", "skill-column skill-column-" + category.type);
      column.appendChild(makeElement("h3", "skill-command", category.command));
      const categoryElement = makeElement("section", "skill-category skill-category-" + category.type);
      category.sections.forEach((section) => {
        const sectionEl = makeElement("section", "skill-section");
        sectionEl.appendChild(makeElement("h4", "section-title", section.title));
        section.items.forEach((item) => {
          const itemEl = makeElement("div", "skill-item");
          itemEl.appendChild(makeElement("span", "skill-prompt", ">"));
          itemEl.appendChild(makeElement("span", "skill-name", item));
          sectionEl.appendChild(itemEl);
        });
        categoryElement.appendChild(sectionEl);
      });
      column.appendChild(categoryElement);
      container.appendChild(column);
    });
  }

  function renderPresentation(container, lang) {
    const content = PRESENTATION_DATA[lang] || PRESENTATION_DATA.fr;
    clearElement(container);

    function appendHighlightedText(element, text) {
      const parts = String(text).split(/(\{\{(?:edu|pro|game)\|.*?\}\})/);
      parts.forEach((part) => {
        if (!part) return;
        const match = part.match(/^\{\{(edu|pro|game)\|(.*)\}\}$/);
        if (match) {
          element.appendChild(makeElement("span", "presentation-highlight presentation-highlight-" + match[1], match[2]));
        } else {
          element.appendChild(document.createTextNode(part));
        }
      });
    }

    function appendHighlightedParagraph(parent, text) {
      const paragraph = makeElement("p", "presentation-paragraph");
      appendHighlightedText(paragraph, text);
      parent.appendChild(paragraph);
    }

    const detailsBlock = makeElement("section", "presentation-block");
    const title = makeElement("h3", "presentation-title");
    appendHighlightedText(title, content.detailsTitle);
    detailsBlock.appendChild(title);
    content.details.forEach((paragraph) => {
      appendHighlightedParagraph(detailsBlock, paragraph);
    });

    container.appendChild(detailsBlock);
  }

  function renderDownloads(container, lang) {
    const items = DOWNLOAD_GAMES_DATA[lang] || DOWNLOAD_GAMES_DATA.fr;
    const dict = TRANSLATIONS[lang] || TRANSLATIONS.fr;
    clearElement(container);

    if (!items.length) {
      const emptyState = makeElement("div", "downloads-state");
      emptyState.appendChild(makeElement("p", "presentation-paragraph", dict["downloads-empty"]));
      emptyState.appendChild(makeElement("p", "presentation-paragraph", dict["downloads-empty-note"]));
      container.appendChild(emptyState);
      return;
    }

    const layout = makeElement("div", "downloads-layout");
    const sidebarCard = makeElement("aside", "downloads-sidebar-card");
    const sidebarHeader = makeElement("div", "downloads-sidebar-header", dict["downloads-nav-title"]);
    const sidebar = makeElement("div", "downloads-sidebar");
    const panel = makeElement("article", "download-card download-panel");

    function renderProject(item) {
      clearElement(panel);
      const media = makeElement("div", "download-media");
      const image = document.createElement("img");
      image.className = "download-image";
      image.src = item.image;
      image.alt = item.imageAlt || item.title;
      media.appendChild(image);

      const body = makeElement("div", "download-body");
      body.appendChild(makeElement("h3", "download-title", item.title));
      if (item.subtitle) body.appendChild(makeElement("div", "download-subtitle", item.subtitle));

      body.appendChild(makeElement("h4", "download-section-title", dict["downloads-overview-title"]));
      item.description.forEach((paragraph) => {
        body.appendChild(makeElement("p", "download-description", paragraph));
      });
      if (item.ctaDisabled) {
        const disabledButton = makeElement("button", "download-link download-link-disabled", item.cta || "Download");
        disabledButton.type = "button";
        disabledButton.disabled = true;
        body.appendChild(disabledButton);
        if (item.availabilityNote) {
          body.appendChild(makeElement("p", "download-availability", item.availabilityNote));
        }
      } else if (item.url) {
        const link = makeElement("a", "download-link", item.cta || "Download");
        link.href = item.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        body.appendChild(link);
      }
      if (item.warning) {
        body.appendChild(makeElement("p", "download-warning", item.warning));
      }
      panel.appendChild(media);
      panel.appendChild(body);
    }

    items.forEach((item, index) => {
      const button = makeElement("button", "download-nav-btn" + (index === 0 ? " active" : ""));
      button.type = "button";
      const buttonTitle = makeElement("span", "download-nav-title", item.title);
      const buttonSubtitle = makeElement("span", "download-nav-subtitle", item.subtitle);
      const buttonMeta = makeElement("span", "download-nav-meta", item.status);
      button.appendChild(buttonTitle);
      button.appendChild(buttonSubtitle);
      button.appendChild(buttonMeta);
      button.addEventListener("click", () => {
        sidebar.querySelectorAll(".download-nav-btn").forEach((el) => el.classList.remove("active"));
        button.classList.add("active");
        renderProject(item);
      });
      sidebar.appendChild(button);
    });

    renderProject(items[0]);
    sidebarCard.appendChild(sidebarHeader);
    sidebarCard.appendChild(sidebar);
    layout.appendChild(sidebarCard);
    layout.appendChild(panel);
    container.appendChild(layout);
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
    let currentLang = DEFAULT_LANGUAGE;
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
    const presentationContainer = document.getElementById("presentation-container");
    const skillsContainer = document.getElementById("skills-container");
    const timelineContainer = document.getElementById("timeline-container");
    const downloadsContainer = document.getElementById("downloads-container");
    const detailsCard = document.getElementById("timeline-details");
    const detailsYear = document.getElementById("details-year");
    const detailsTitle = document.getElementById("details-title");
    const detailsDesc = document.getElementById("details-desc");
    const detailsTech = document.getElementById("details-tech");
    const galleryMainMedia = document.getElementById("gallery-main-media");
    const galleryPlaceholder = document.getElementById("gallery-placeholder");
    const galleryThumbnails = document.getElementById("gallery-thumbnails");
    const particlesCanvas = document.getElementById("particles-canvas");

    const required = [presentationContainer, skillsContainer, timelineContainer, downloadsContainer, detailsCard, detailsYear, detailsTitle, detailsDesc, detailsTech, galleryMainMedia, galleryPlaceholder, galleryThumbnails];
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

    function applyLanguage(language, rememberPreference) {
      const safeLang = getValidatedLanguage(language);
      if (rememberPreference) persistLanguage(safeLang);
      translatePage(safeLang);
      updateLanguageButtons(safeLang);
      renderPresentation(presentationContainer, safeLang);
      renderSkills(skillsContainer);
      timeline.render(safeLang);
      renderDownloads(downloadsContainer, safeLang);
    }

    const initialLanguage = getInitialLanguage();
    applyLanguage(initialLanguage);

    document.querySelectorAll(".lang-btn").forEach((button) => {
      button.addEventListener("click", function () {
        applyLanguage(button.getAttribute("data-lang"), true);
      });
    });

    initTabs();
    initParticles(particlesCanvas);
  });
})();
