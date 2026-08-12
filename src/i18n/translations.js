export const LANGUAGES = [
  { code: 'en', label: 'EN' },
  { code: 'da', label: 'DA' },
  { code: 'fr', label: 'FR' },
  { code: 'de', label: 'DE' },
  { code: 'es', label: 'ES' },
]

export const translations = {
  en: {
    nav: {
      home: 'HOME',
      about: 'ABOUT',
      works: 'WORKS',
      contact: 'CONTACT',
      site: 'Site',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    lang: { label: 'Language', open: 'Choose language', close: 'Close language menu' },
    header: { name: 'O. Y. Caloca' },
    footer: {
      name: 'Omar Yahir Caloca',
      role: 'Artist and Designer',
      emailAria: 'Email Omar Caloca',
      linkedinAria: 'LinkedIn profile',
    },
    contact: {
      label: 'For inquiries contact:',
      copyEmail: 'email',
      copyPhone: 'phone number',
      copyLinkedin: 'LinkedIn link',
      copied: 'Copied',
      copy: 'Copy',
      emailAria: 'Email Omar Caloca',
      phoneAria: 'Call Omar Caloca',
      linkedinAria: 'LinkedIn profile',
      infoAria: 'Contact information',
    },
    about: {
      introAria: 'About introduction',
      bioAria: 'Biography and gallery',
      missionLabel: 'My mission:',
      checkWorks: 'CHECK MY WORK',
      worksAria: 'Works',
      educationTitle: 'Education',
      educationAria: 'Education',
      education: [
        {
          program: 'Multimedia and Design Program',
          school: 'Aarhus Business Academy',
          detail: 'Currently on 3rd semester',
        },
        {
          program: 'Global Makeup Co-Op Diploma Program',
          school: 'Blanche Macdonald Centre',
          detail: 'Completed 2016',
        },
        {
          program: 'Digital Painting Certificate Course',
          school: 'Synn Studio',
          detail: 'Completed 2016',
        },
      ],
      bioBefore: [
        'I am currently a student of the Multimedia and Design Program at Aarhus Business Academy in Denmark.',
        'Born and raised in Mexico, I hold a Global Makeup Co-Op Diploma from the Canadian institution Blanche Macdonald Centre and a Certificate of Digital Painting from Synn Studio.',
        'I have over 10 years of experience working on different creative fields such as art exhibitions, independent films, fashion shows and art commissions. I have also combined that work along with retail and tutoring. My most recent position before moving to Denmark was as an Art Instructor on board cruise ships, where I created and directed various artistic events, guiding a multicultural crowd in English, Spanish and French.',
      ],
      bioAfter: [
        'At a personal view I have a passion for arts, design and language. On my free time I like connecting with people and nature, read fiction, practice yoga and paint.',
        'I have travelled to 64 countries, reuniting cultural respect and inspiration but beyond that, the ability to listen, analyse, understand and adapt to different client and company needs in order to fabricate solutions that will impact and satisfy a large audience.',
        'I have the skills to negotiate and be persuasive while maintaining myself at all times true to my main values that are respect and working with transparency.',
      ],
      mission:
        'I am convinced that we can create a harmonious link with technology advance while maintaining balance with nature, in that sense I think of the art and design as another language, where Programming is the script, UX/ UI is the interpretation and Design is the deliverance.',
    },
    subheadline: [
      'Who am I?',
      'I am an artist',
      'I am a UX/ UI designer',
      'I am a programmer',
      'But beyond that',
      'I am a collection of...',
      'of where I was born',
      'of where I have travelled…',
      '64 countries and 4 continents to be exact',
      'I am the influence of people who I love',
      'I am the books I read',
      'I am the experience of 10 years of work',
      'I am who I am becoming',
      'Becoming a better person',
      'Becoming a better designer',
    ],
    subheadlineHome: [
      'I am an artist and designer',
      'I design for digital media',
      'I design for UX / UI',
      'I am a programmer',
      'I teach art',
      'I do Makeup FX',
      'I paint',
      'I tell stories through my work',
      'I create art',
    ],
    seeMyProjects: 'See my projects',
    makeupFx: {
      title: 'Design for\nMakeup Effects',
      body:
        'I have a professional background in Makeup Artistry and hold a Global Makeup Co-Op Diploma from Blanche Macdonald Centre. For last years I have worked on independent films and fashion shows, prosthetics exhibitions, photoshoots, retail and client makeup.',
      expertise:
        'Areas of expertise: Prosthetics, Airbrush, Beauty Makeup, Fashion Makeup, Special Effects for Film and Theatre, Photography Editing, Prop making, Basics on Editorial Photography and Hair-styling.',
      navCrumb: 'Design for Makeup FX',
      reel: 'REEL',
      portfolios: 'Portfolios',
      explore: 'Explore portfolio',
      mosaics: {
        sfx: 'Special Effects and Prosthetics',
        fashion: 'Fashion, Beauty and Fantasy',
      },
      magazineClose: 'Close portfolio',
      magazinePrev: 'Previous pages',
      magazineNext: 'Next pages',
      magazineLoading: 'Loading portfolio…',
      magazineError: 'Could not load this portfolio.',
      magazineCounter: 'Pages {current} of {total}',
    },
    uxUi: {
      title: 'UX / UI DESIGN PROJECTS',
      navCrumb: 'UX / UI',
      projectsAria: 'UX / UI design projects',
      mosaics: {
        projectOne: {
          title: 'Aarhus Botanical Garden',
          description: '"Discover fun facts about the plants"',
        },
        projectTwo: {
          title: 'Yoga',
          description: '"Hidden Outdoor Workout Spaces in Aarhus"',
        },
      },
    },
    botanical: {
      title: 'Aarhus Botanical Garden',
      description:
        'Info-Screens that connect people with nature, learning in a fun, interactive way',
      navCrumb: 'Garden',
      figmaCta: 'Click to see Figma prototype',
      videoLegend: 'Video synthesizes the project',
      videoFallback: 'Your browser does not support embedded video.',
      problemStatement: 'Problem Statement',
      problemDescription:
        'How may we inform and captivate the visitors of Aarhus Botanical Garden with the least amount of interruption of the green scenery',
      researchResults: 'Research Results',
      researchDescription:
        'Conducted Desk and Field research, 7 interviews on site and market research aimed for the Danish demographics crowd.',
      researchImageAlt:
        'Main research insights Venn diagram of explorers and learners, with goals for the experience',
      affinityTitle: 'Affinity Diagram',
      affinityDescription:
        'Concluded on a study of the types of visitors, their interests and needs for the Garden based on the data extracted from the research.',
      affinityImageAlt:
        'Affinity diagram with visitor research insights grouped into sticky-note categories',
      personaTitle: 'Persona',
      personaDescription:
        'Based on research we narrowed down our target audience to "The Learners" group. Contemplated families and a younger crowd 15-25 years old.',
      personaImageAlt:
        'Persona profile for Matthias Norsegade, representing The Learners target audience',
      topics: [
        {
          title: 'Storytelling',
          description: 'Developed a plan for an easy to follow, linear storytelling adjusted to four dimensions of tone of voice.',
          imageKey: 'storytelling',
          imageAlt:
            'Storytelling and tone of voice: linear storytelling notes and four dimensions of tone of voice',
        },
        {
          title: '4 Key Dimensions',
          description:
            'Employed the 4 key dimensions contemplating the user experience and the interaction with the solution',
          imageKey: '4-key-dimensions',
          imageAlt:
            'Four key dimensions of the visitor journey: Emotional, Physical, Intellectual, and Technology',
        },
        {
          title: 'OOUX Table',
          description:
            'Based on the 4 key dimensions, planned the data type, independent actions and interactions through ORCA OOUX Table',
          imageKey: 'ooux',
          imageAlt:
            'ORCA OOUX table mapping objects, properties, relationships, and call-to-actions',
        },
        {
          title: 'Design Principles',
          description:
            'The planning of content and interactions ought to adhere to design principles.',
          imageKey: 'principles',
          imageAlt:
            'Design principles based on Allen and Gutwill common pitfalls: no overload, no user interference, no disruption, clear focus, no distraction',
        },
        {
          title: 'Results',
          description:
            'After the elaboration and planning of the solution content and UI elements, the project is ready to be handed over to the Design development team. In this case our team developed the design. After some testing and feedback, we concluded the project. Although there are animations to be improved in the future I am positive that our solution creates an interactive experience that helps our target group learn in a fun way and engage without taking off from their nature escape.',
        },
      ],
      metaAria: 'Project details',
      metaLabels: {
        date: 'Project date',
        team: 'Team',
        role: 'Role',
        tools: 'Tools',
        methods: 'Methods',
        target: 'Target',
        client: 'Client',
      },
      meta: {
        date: 'April 2026',
        team: '5 students',
        role: 'UX / UI Designer',
        tools: 'Figjam, Figma',
        methods: 'UX/ UI Research, Design Principles',
        target: 'Danish people ages 15-25 / Families',
        client: 'Aarhus Botanical Garden',
      },
    },
    yoga: {
      title: 'Yoga',
      description: 'Project description to be added.',
      navCrumb: 'Yoga',
      figmaCta: 'Click to see Figma prototype',
      videoLegend: 'Video synthesizes the project',
      videoFallback: 'Your browser does not support embedded video.',
      problemStatement: 'Problem Statement',
      problemDescription:
        'How can I introduce the people living or visiting Aarhus with inexpensive areas to exercise and relax and help them prepare what they need to know in order to visit?',
      researchResults: 'Research Results',
      researchDescription: 'Research description to be set.',
      affinityTitle: 'Affinity Diagram',
      affinityDescription: 'Affinity diagram description to be set.',
      affinityImageAlt:
        'Affinity diagram with five columns: self discovery, habits, struggles, motivations, and interests',
      personaTitle: 'Persona',
      personaDescription: 'Persona description to be set.',
      personaImageAlt:
        'Persona profile of Solvej, advanced yogi with goals, behavior, and solution strategy',
      topics: [
        { title: 'UX Writing', description: 'Incorporated self-written descriptions of the hidden places, driving a sensorial, inviting experience for the user.' },
        {
          title: 'HMW Table',
          description:
            'The general problem found through the research were broken down to individual ones to gather a clearer understanding of each solution.',
          imageKey: 'hmw',
          imageAlt:
            'How Might We questions and answers table for the yoga outdoor places solution',
        },
        {
          title: 'List of Values',
          description:
            'Based on the Research and Persona, defined the values in relation to yoga traditions.',
          imageKey: 'values',
          imageAlt:
            'List of values table: Mindfulness, Alive, Natural, Symbolic, Connection, Balance, and Soothing with design implications',
        },
        { title: 'OOUX Table', description: 'Related the data type with interactions and content through the ORCA OOUX Table.' },
        { title: '4 Key Dimensions', description: 'Description to be set.' },
        {
          title: 'Conventions',
          description:
            'Contemplated the company, persona needs and conventions at all timesto create the solution.',
          imageKey: 'conventions',
          imageAlt:
            'Venn diagram of digital, company, and persona objectives and shared conventions',
        },
        { title: 'Results', description: 'Altough there is coding to be improved, the solution provides necessary information and content for the user to be self-sufficient in their exercise journey, while allowing them use the free sheltered areas that the city of Aarhus has to offer all year long..' },

      ],
      metaAria: 'Project details',
      metaLabels: {
        date: 'Project date',
        team: 'Team',
        tools: 'Tools',
        methods: 'Methods',
        target: 'Target',
        client: 'Client',
      },
      meta: {
        date: 'December 2015',
        team: 'Individual project',
        tools: 'Figjam, Figma, VS Code, Photoshop, Video Editing, Photography, Graphic Design',
        methods: 'UX/ UI Research and Mapping, Design Theory and Principles, HTML, CSS and Javascript',
        target: 'People visiting/living in Aarhus ages 25-35',
        client: 'City of Aarhus',
      },
    },
    projects: {
      1: {
        title: 'DESIGN FOR\nDIGITAL SOLUTIONS',
        description: 'Figma, Content Creation, Photoshop, Video Editing, Graphics',
      },
      2: {
        title: 'UX / UI DESIGN',
        description: 'Research, Analysis and Mapping',
      },
      4: {
        title: 'DESIGN FOR MAKEUP FX',
        description:
          'Character Design, Prosthetics, Fashion Makeup, Beauty Makeup, SFX Makeup, Airbrush and Bodypainting, Editorial Photography and Editing, 3D Modeling and Props Fabrication',
      },
      5: {
        title: 'ART',
        description:
          'Painting, Drawing, Digital Painting, Sculpture and Analog Photography',
      },
    },
  },

  da: {
    nav: {
      home: 'HJEM',
      about: 'OM',
      works: 'ARBEJDE',
      contact: 'KONTAKT',
      site: 'Side',
      openMenu: 'Åbn menu',
      closeMenu: 'Luk menu',
    },
    lang: { label: 'Sprog', open: 'Vælg sprog', close: 'Luk sprogmenu' },
    header: { name: 'O. Y. Caloca' },
    footer: {
      name: 'Omar Yahir Caloca',
      role: 'Kunstner og designer',
      emailAria: 'Email Omar Caloca',
      linkedinAria: 'LinkedIn-profil',
    },
    contact: {
      label: 'Ved forespørgsler kontakt:',
      copyEmail: 'email',
      copyPhone: 'telefonnummer',
      copyLinkedin: 'LinkedIn-link',
      copied: 'Kopieret',
      copy: 'Kopiér',
      emailAria: 'Email Omar Caloca',
      phoneAria: 'Ring til Omar Caloca',
      linkedinAria: 'LinkedIn-profil',
      infoAria: 'Kontaktoplysninger',
    },
    about: {
      introAria: 'Om-introduktion',
      bioAria: 'Biografi og galleri',
      missionLabel: 'Min mission:',
      checkWorks: 'TJEK MIT ARBEJDE',
      worksAria: 'Arbejde',
      educationTitle: 'Uddannelse',
      educationAria: 'Uddannelse',
      education: [
        {
          program: 'Multimedia and Design-programmet',
          school: 'Erhvervsakademi Aarhus',
          detail: 'På 3. semester i øjeblikket',
        },
        {
          program: 'Global Makeup Co-Op Diploma Program',
          school: 'Blanche Macdonald Centre',
          detail: 'Afsluttet 2016',
        },
        {
          program: 'Digital Painting Certificate Course',
          school: 'Synn Studio',
          detail: 'Afsluttet 2016',
        },
      ],
      bioBefore: [
        'Jeg er i øjeblikket studerende på Multimedia and Design-programmet på Erhvervsakademi Aarhus i Danmark.',
        'Født og opvokset i Mexico har jeg et Global Makeup Co-Op Diploma fra den canadiske institution Blanche Macdonald Centre og et Certificate of Digital Painting fra Synn Studio.',
        'Jeg har over 10 års erfaring inden for forskellige kreative felter som kunstudstillinger, uafhængige film, modeshows og kunstkommissioner. Jeg har også kombineret det arbejde med detailhandel og undervisning. Min seneste stilling før flytningen til Danmark var som kunstinstruktør ombord på krydstogtskibe, hvor jeg skabte og ledede forskellige kunstneriske events og vejledte et multikulturelt publikum på engelsk, spansk og fransk.',
      ],
      bioAfter: [
        'Personligt har jeg en passion for kunst, design og sprog. I min fritid kan jeg lide at forbinde mig med mennesker og naturen, læse fiktion, dyrke yoga og male.',
        'Jeg har rejst til 64 lande og samlet kulturel respekt og inspiration, men også evnen til at lytte, analysere, forstå og tilpasse mig forskellige kunde- og virksomhedsbehov for at skabe løsninger, der påvirker og tilfredsstiller et bredt publikum.',
        'Jeg har færdighederne til at forhandle og være overbevisende, mens jeg til enhver tid forbliver tro mod mine hovedværdier: respekt og at arbejde med gennemsigtighed.',
      ],
      mission:
        'Jeg er overbevist om, at vi kan skabe et harmonisk bånd til teknologiske fremskridt, samtidig med at vi bevarer balancen med naturen. I den forstand tænker jeg på kunst og design som endnu et sprog, hvor programmering er manuskriptet, UX/UI er fortolkningen, og design er formidlingen.',
    },
    subheadline: [
      'Hvem er jeg?',
      'Jeg er kunstner',
      'Jeg er UX/UI-designer',
      'Jeg er programmør',
      'Men ud over det',
      'Jeg er en samling af...',
      'af der, hvor jeg er født',
      'af der, hvor jeg har rejst…',
      'præcis 64 lande og 4 kontinenter',
      'Jeg er påvirkningen fra dem, jeg elsker',
      'Jeg er bøgerne, jeg læser',
      'Jeg er erfaringen fra 10 års arbejde',
      'Jeg er den, jeg er ved at blive',
      'At blive et bedre menneske',
      'At blive en bedre designer',
    ],
    subheadlineHome: [
      'Jeg er kunstner og designer',
      'Jeg designer til digitale medier',
      'Jeg designer til UX / UI',
      'Jeg er programmør',
      'Jeg har undervist i kunst',
      'Jeg har arbejdet med Makeup FX',
      'Jeg maler i olie og akvarel',
      'Jeg fortæller historier gennem mit arbejde',
      'Jeg skaber kunst',
    ],
    seeMyProjects: 'Se mine projekter',
    makeupFx: {
      title: 'Design til\nMakeup Effects',
      body:
        'Jeg har en professionel baggrund inden for makeup artistry og har et Global Makeup Co-Op Diploma fra Blanche Macdonald Centre. De seneste år har jeg arbejdet med uafhængige film og modeshows, protesudstillinger, fotoshoots, retail og klientmakeup.',
      expertise:
        'Ekspertiseområder: Proteser, airbrush, beauty makeup, fashion makeup, special effects til film og teater, fotoredigering, prop-fremstilling, grundlæggende editorial fotografi og frisering.',
      navCrumb: 'Design til Makeup FX',
      reel: 'REEL',
      portfolios: 'Porteføljer',
      explore: 'Udforsk portefølje',
      mosaics: {
        sfx: 'Special Effects og proteser',
        fashion: 'Fashion, beauty og fantasy',
      },
      magazineClose: 'Luk portefølje',
      magazinePrev: 'Forrige sider',
      magazineNext: 'Næste sider',
      magazineLoading: 'Indlæser portefølje…',
      magazineError: 'Kunne ikke indlæse denne portefølje.',
      magazineCounter: 'Side {current} af {total}',
    },
    uxUi: {
      title: 'UX / UI DESIGN PROJEKTER',
      navCrumb: 'UX / UI',
      projectsAria: 'UX / UI designprojekter',
      mosaics: {
        projectOne: {
          title: 'Aarhus Botaniske Have',
          description: '"Opdag sjove fakta om planterne"',
        },
        projectTwo: {
          title: 'Yoga',
          description: '"Skjulte udendørs træningssteder i Aarhus"',
        },
      },
    },
    botanical: {
      title: 'Aarhus Botaniske Have',
      description:
        'Infoskærme, der forbinder mennesker med naturen gennem sjov, interaktiv læring',
      navCrumb: 'Have',
      figmaCta: 'Klik for at se Figma-prototypen',
      videoLegend: 'Videoen opsummerer projektet',
      videoFallback: 'Din browser understøtter ikke indlejret video.',
      problemStatement: 'Problemformulering',
      problemDescription:
        'Hvordan kan vi informere og fascinere besøgende i Aarhus Botaniske Have med mindst mulig forstyrrelse af den grønne natur',
      researchResults: 'Forskningsresultater',
      researchDescription:
        'Desk- og field research, 7 interviews on site og markedsresearch rettet mod den danske demografi.',
      researchImageAlt:
        'Hovedindsirkter fra research: Venn-diagram over explorers og learners med mål for oplevelsen',
      affinityTitle: 'Affinity Diagram',
      affinityDescription:
        'Konkluderede en undersøgelse af besøgstyper, deres interesser og behov for Haven baseret på data udtrukket fra research.',
      affinityImageAlt:
        'Affinity diagram med research-indsigter om besøgende grupperet i sticky-note-kategorier',
      personaTitle: 'Persona',
      personaDescription:
        'Baseret på research indsnævrede vi vores målgruppe til “The Learners”-gruppen. Overvejede familier og en yngre målgruppe på 15–25 år.',
      personaImageAlt:
        'Personaprofil for Matthias Norsegade, der repræsenterer målgruppen The Learners',
      topics: [
        {
          title: 'Storytelling',
          description:
            'Udviklede en plan for en let at følge, lineær storytelling tilpasset fire dimensioner af tone of voice.',
          imageKey: 'storytelling',
          imageAlt:
            'Storytelling og tone of voice: lineær storytelling og fire dimensioner af tone of voice',
        },
        {
          title: '4 Key Dimensions',
          description:
            'Anvendte de 4 nøgle-dimensioner med fokus på brugeroplevelsen og interaktionen med løsningen',
          imageKey: '4-key-dimensions',
          imageAlt:
            'Fire nøgle-dimensioner af besøgsrejsen: Emotional, Physical, Intellectual og Technology',
        },
        {
          title: 'OOUX Table',
          description:
            'Baseret på de 4 nøgle-dimensioner planlagde vi datatype, uafhængige handlinger og interaktioner via ORCA OOUX Table',
          imageKey: 'ooux',
          imageAlt:
            'ORCA OOUX-tabel, der mapper objekter, egenskaber, relationer og call-to-actions',
        },
        {
          title: 'Design Principles',
          description:
            'Planlægningen af indhold og interaktioner bør følge designprincipper.',
          imageKey: 'principles',
          imageAlt:
            'Designprincipper baseret på Allen og Gutwills common pitfalls: no overload, no user interference, no disruption, clear focus, no distraction',
        },
        {
          title: 'Results',
          description:
            'Efter udarbejdelse og planlægning af løsningens indhold og UI-elementer er projektet klar til at blive overleveret til Design-udviklingsteamet. I dette tilfælde udviklede vores team også designet. Efter test og feedback afsluttede vi projektet. Selvom der er animationer, der kan forbedres i fremtiden, er jeg overbevist om, at vores løsning skaber en interaktiv oplevelse, der hjælper vores målgruppe med at lære på en sjov måde og engagere sig uden at forlade deres naturflugt.',
        },
      ],
      metaAria: 'Projektdetaljer',
      metaLabels: {
        date: 'Projektdato',
        team: 'Team',
        role: 'Rolle',
        tools: 'Værktøjer',
        methods: 'Metoder',
        target: 'Målgruppe',
        client: 'Klient',
      },
      meta: {
        date: 'April 2026',
        team: '5 studerende',
        role: 'UX / UI Designer',
        tools: 'Figjam, Figma',
        methods: 'UX/ UI Research, Design Principles',
        target: 'Danskere i alderen 15–25 / Familier',
        client: 'Aarhus Botaniske Have',
      },
    },
    yoga: {
      title: 'Yoga',
      description: 'Projektbeskrivelse tilføjes senere.',
      navCrumb: 'Yoga',
      figmaCta: 'Klik for at se Figma-prototypen',
      videoLegend: 'Videoen opsummerer projektet',
      videoFallback: 'Din browser understøtter ikke indlejret video.',
      problemStatement: 'Problemformulering',
      problemDescription:
        'Hvordan kan jeg præsentere folk, der bor i eller besøger Aarhus, for billige områder til motion og afslapning og hjælpe dem med at forberede det, de har brug for at vide, før de besøger?',
      researchResults: 'Forskningsresultater',
      researchDescription: 'Forskningsbeskrivelse sættes senere.',
      affinityTitle: 'Affinity Diagram',
      affinityDescription: 'Affinity diagram-beskrivelse sættes senere.',
      affinityImageAlt:
        'Affinity diagram med fem kolonner: self discovery, habits, struggles, motivations og interests',
      personaTitle: 'Persona',
      personaDescription: 'Personabeskrivelse sættes senere.',
      personaImageAlt:
        'Personaprofil af Solvej, avanceret yogi med mål, adfærd og løsningsstrategi',
      topics: [
        {
          title: 'UX Writing',
          description:
            'Inkorporerede egenforfattede beskrivelser af de skjulte steder for at skabe en sensorisk, indbydende oplevelse for brugeren.',
        },
        {
          title: 'HMW Table',
          description:
            'Det overordnede problem fra researchen blev brudt ned i enkelte problemer for at få en klarere forståelse af hver løsning.',
          imageKey: 'hmw',
          imageAlt:
            'How Might We spørgsmål-og-svar-tabel for yoga outdoor places-løsningen',
        },
        {
          title: 'List of Values',
          description:
            'Baseret på research og persona definerede værdierne i relation til yoga-traditioner.',
          imageKey: 'values',
          imageAlt:
            'Liste over værdier: Mindfulness, Alive, Natural, Symbolic, Connection, Balance og Soothing med designimplikationer',
        },
        {
          title: 'OOUX Table',
          description:
            'Relaterede datatyper med interaktioner og indhold gennem ORCA OOUX-tabellen.',
        },
        { title: '4 Key Dimensions', description: 'Beskrivelse sættes senere.' },
        {
          title: 'Conventions',
          description:
            'Tog højde for virksomhed, persona-behov og konventioner hele vejen for at skabe løsningen.',
          imageKey: 'conventions',
          imageAlt:
            'Venn-diagram over digitale, virksomheds- og persona-mål samt fælles konventioner',
        },
        {
          title: 'Results',
          description:
            'Selvom der er kode, der kan forbedres, giver løsningen nødvendig information og indhold, så brugeren kan være selvhjulpen i sin træningsrejse, samtidig med at de kan bruge byen Aarhus’ gratis overdækkede områder hele året.',
        },
      ],
      metaAria: 'Projektdetaljer',
      metaLabels: {
        date: 'Projektdato',
        team: 'Team',
        tools: 'Værktøjer',
        methods: 'Metoder',
        target: 'Målgruppe',
        client: 'Klient',
      },
      meta: {
        date: 'December 2015',
        team: 'Individuelt projekt',
        tools:
          'Figjam, Figma, VS Code, Photoshop, Video Editing, Photography, Graphic Design',
        methods:
          'UX/ UI Research and Mapping, Design Theory and Principles, HTML, CSS and Javascript',
        target: 'Folk der besøger/bor i Aarhus i alderen 25–35',
        client: 'Aarhus Kommune',
      },
    },
    projects: {
      1: {
        title: 'DESIGN TIL\nDIGITALE LØSNINGER',
        description: 'Figma, indholdsproduktion, Photoshop, videoredigering, grafik',
      },
      2: {
        title: 'UX / UI DESIGN',
        description: 'Research, analyse og mapping',
      },
      4: {
        title: 'DESIGN TIL MAKEUP FX',
        description:
          'Karakterdesign, proteser, fashion makeup, beauty makeup, SFX makeup, airbrush og bodypainting, editorial fotografi og redigering, 3D-modellering og prop-fremstilling',
      },
      5: {
        title: 'KUNST',
        description:
          'Maleri, tegning, digital painting, skulptur og analog fotografi',
      },
    },
  },

  fr: {
    nav: {
      home: 'ACCUEIL',
      about: 'À PROPOS',
      works: 'TRAVAUX',
      contact: 'CONTACT',
      site: 'Site',
      openMenu: 'Ouvrir le menu',
      closeMenu: 'Fermer le menu',
    },
    lang: { label: 'Langue', open: 'Choisir la langue', close: 'Fermer le menu des langues' },
    header: { name: 'O. Y. Caloca' },
    footer: {
      name: 'Omar Yahir Caloca',
      role: 'Artiste et designer',
      emailAria: 'Envoyer un email à Omar Caloca',
      linkedinAria: 'Profil LinkedIn',
    },
    contact: {
      label: 'Pour toute demande, contactez :',
      copyEmail: 'e-mail',
      copyPhone: 'numéro de téléphone',
      copyLinkedin: 'lien LinkedIn',
      copied: 'Copié',
      copy: 'Copier',
      emailAria: 'Envoyer un email à Omar Caloca',
      phoneAria: 'Appeler Omar Caloca',
      linkedinAria: 'Profil LinkedIn',
      infoAria: 'Coordonnées',
    },
    about: {
      introAria: 'Introduction À propos',
      bioAria: 'Biographie et galerie',
      missionLabel: 'Ma mission :',
      checkWorks: 'VOIR MON TRAVAIL',
      worksAria: 'Travaux',
      educationTitle: 'Formation',
      educationAria: 'Formation',
      education: [
        {
          program: 'Programme Multimedia and Design',
          school: 'Aarhus Business Academy',
          detail: 'Actuellement en 3ᵉ semestre',
        },
        {
          program: 'Global Makeup Co-Op Diploma Program',
          school: 'Blanche Macdonald Centre',
          detail: 'Obtenu en 2016',
        },
        {
          program: 'Digital Painting Certificate Course',
          school: 'Synn Studio',
          detail: 'Obtenu en 2016',
        },
      ],
      bioBefore: [
        'Je suis actuellement étudiant du programme Multimedia and Design à Aarhus Business Academy au Danemark.',
        'Né et élevé au Mexique, je détiens un Global Makeup Co-Op Diploma de l’institution canadienne Blanche Macdonald Centre ainsi qu’un Certificate of Digital Painting de Synn Studio.',
        'J’ai plus de 10 ans d’expérience dans différents domaines créatifs tels que les expositions d’art, les films indépendants, les défilés de mode et les commandes artistiques. J’ai aussi combiné ce travail avec le commerce de détail et le tutorat. Mon dernier poste avant de m’installer au Danemark était celui d’instructeur d’art à bord de navires de croisière, où j’ai créé et dirigé divers événements artistiques, guidant un public multiculturel en anglais, espagnol et français.',
      ],
      bioAfter: [
        'Sur le plan personnel, j’ai une passion pour les arts, le design et les langues. Pendant mon temps libre, j’aime me connecter aux gens et à la nature, lire de la fiction, pratiquer le yoga et peindre.',
        'J’ai voyagé dans 64 pays, réunissant respect culturel et inspiration, mais aussi la capacité d’écouter, d’analyser, de comprendre et de m’adapter aux besoins de différents clients et entreprises afin d’élaborer des solutions qui touchent et satisfont un large public.',
        'J’ai les compétences pour négocier et convaincre tout en restant à tout moment fidèle à mes valeurs principales : le respect et travailler avec transparence.',
      ],
      mission:
        'Je suis convaincu que nous pouvons créer un lien harmonieux avec les avancées technologiques tout en maintenant l’équilibre avec la nature ; en ce sens, je considère l’art et le design comme un autre langage, où la programmation est le script, l’UX/UI l’interprétation, et le design la restitution.',
    },
    subheadline: [
      'Qui suis-je ?',
      'Je suis un artiste',
      'Je suis un designer UX/UI',
      'Je suis un programmeur',
      'Mais au-delà de cela',
      'Je suis une collection de...',
      'de l’endroit où je suis né',
      'des endroits où j’ai voyagé…',
      '64 pays et 4 continents exactement',
      'Je suis l’influence des personnes que j’aime',
      'Je suis les livres que je lis',
      'Je suis l’expérience de 10 années de travail',
      'Je suis celui que je suis en train de devenir',
      'Devenir une meilleure personne',
      'Devenir un meilleur designer',
    ],
    subheadlineHome: [
      'Je suis artiste et designer',
      'Je conçois pour les médias numériques',
      'Je conçois pour l’UX / UI',
      'Je suis programmeur',
      'J’ai enseigné l’art',
      'J’ai fait du Makeup FX',
      'Je peins à l’huile et à l’aquarelle',
      'Je raconte des histoires à travers mon travail',
      'Je crée de l’art',
    ],
    seeMyProjects: 'Voir mes projets',
    makeupFx: {
      title: 'Design pour\nMakeup Effects',
      body:
        'J’ai une formation professionnelle en makeup artistry et je détiens un Global Makeup Co-Op Diploma du Blanche Macdonald Centre. Ces dernières années, j’ai travaillé sur des films indépendants et des défilés, des expositions de prothèses, des shootings, du retail et du makeup client.',
      expertise:
        'Domaines d’expertise : prothèses, aérographe, makeup beauté, makeup mode, effets spéciaux pour le cinéma et le théâtre, retouche photo, fabrication d’accessoires, bases de photographie éditoriale et coiffure.',
      navCrumb: 'Design pour Makeup FX',
      reel: 'REEL',
      portfolios: 'Portfolios',
      explore: 'Explorer le portfolio',
      mosaics: {
        sfx: 'Effets spéciaux et prothèses',
        fashion: 'Mode, beauté et fantasy',
      },
      magazineClose: 'Fermer le portfolio',
      magazinePrev: 'Pages précédentes',
      magazineNext: 'Pages suivantes',
      magazineLoading: 'Chargement du portfolio…',
      magazineError: 'Impossible de charger ce portfolio.',
      magazineCounter: 'Pages {current} sur {total}',
    },
    uxUi: {
      title: 'PROJETS UX / UI DESIGN',
      navCrumb: 'UX / UI',
      projectsAria: 'Projets UX / UI design',
      mosaics: {
        projectOne: {
          title: 'Jardin botanique d’Aarhus',
          description: '« Découvrez des faits amusants sur les plantes »',
        },
        projectTwo: {
          title: 'Yoga',
          description: '« Espaces d’entraînement en plein air cachés à Aarhus »',
        },
      },
    },
    botanical: {
      title: 'Jardin botanique d’Aarhus',
      description:
        'Des écrans d’information qui relient les gens à la nature, pour apprendre de façon ludique et interactive',
      navCrumb: 'Jardin',
      figmaCta: 'Cliquez pour voir le prototype Figma',
      videoLegend: 'La vidéo synthétise le projet',
      videoFallback: 'Votre navigateur ne prend pas en charge la vidéo intégrée.',
      problemStatement: 'Énoncé du problème',
      problemDescription:
        'Comment informer et captiver les visiteurs du Jardin botanique d’Aarhus en perturbant le moins possible le paysage vert',
      researchResults: 'Résultats de recherche',
      researchDescription:
        'Recherche documentaire et de terrain, 7 entretiens sur site et étude de marché visant le public démographique danois.',
      researchImageAlt:
        'Principales insights de recherche : diagramme de Venn explorers / learners et objectifs d’expérience',
      affinityTitle: 'Affinity Diagram',
      affinityDescription:
        'Conclusion d’une étude des types de visiteurs, de leurs intérêts et de leurs besoins pour le Jardin, à partir des données extraites de la recherche.',
      affinityImageAlt:
        'Diagramme d’affinité regroupant les insights visiteurs en catégories de sticky notes',
      personaTitle: 'Persona',
      personaDescription:
        'Sur la base de la recherche, nous avons ciblé notre audience vers le groupe « The Learners ». Envisagé les familles et un public plus jeune de 15 à 25 ans.',
      personaImageAlt:
        'Profil persona de Matthias Norsegade, représentant le public cible The Learners',
      topics: [
        {
          title: 'Storytelling',
          description:
            'Développement d’un plan de storytelling linéaire, facile à suivre, ajusté à quatre dimensions du tone of voice.',
          imageKey: 'storytelling',
          imageAlt:
            'Storytelling et tone of voice : narration linéaire et quatre dimensions du tone of voice',
        },
        {
          title: '4 Key Dimensions',
          description:
            'Emploi des 4 dimensions clés en envisageant l’expérience utilisateur et l’interaction avec la solution',
          imageKey: '4-key-dimensions',
          imageAlt:
            'Quatre dimensions clés du parcours visiteur : Emotional, Physical, Intellectual et Technology',
        },
        {
          title: 'OOUX Table',
          description:
            'À partir des 4 dimensions clés, planification des types de données, actions indépendantes et interactions via le tableau ORCA OOUX',
          imageKey: 'ooux',
          imageAlt:
            'Tableau ORCA OOUX reliant objets, propriétés, relations et call-to-actions',
        },
        {
          title: 'Design Principles',
          description:
            'La planification du contenu et des interactions doit respecter les principes de design.',
          imageKey: 'principles',
          imageAlt:
            'Principes de design basés sur les common pitfalls d’Allen et Gutwill : no overload, no user interference, no disruption, clear focus, no distraction',
        },
        {
          title: 'Results',
          description:
            'Après l’élaboration et la planification du contenu de la solution et des éléments d’interface, le projet est prêt à être remis à l’équipe de développement design. Dans ce cas, notre équipe a aussi développé le design. Après des tests et des retours, nous avons conclu le projet. Bien que certaines animations puissent être améliorées à l’avenir, je suis convaincu que notre solution crée une expérience interactive qui aide notre public cible à apprendre de façon ludique et à s’engager sans quitter leur échappée dans la nature.',
        },
      ],
      metaAria: 'Détails du projet',
      metaLabels: {
        date: 'Date du projet',
        team: 'Équipe',
        role: 'Rôle',
        tools: 'Outils',
        methods: 'Méthodes',
        target: 'Cible',
        client: 'Client',
      },
      meta: {
        date: 'Avril 2026',
        team: '5 étudiants',
        role: 'UX / UI Designer',
        tools: 'Figjam, Figma',
        methods: 'UX/ UI Research, Design Principles',
        target: 'Danois de 15 à 25 ans / Familles',
        client: 'Jardin botanique d’Aarhus',
      },
    },
    yoga: {
      title: 'Yoga',
      description: 'Description du projet à ajouter.',
      navCrumb: 'Yoga',
      figmaCta: 'Cliquez pour voir le prototype Figma',
      videoLegend: 'La vidéo synthétise le projet',
      videoFallback: 'Votre navigateur ne prend pas en charge la vidéo intégrée.',
      problemStatement: 'Énoncé du problème',
      problemDescription:
        'Comment puis-je présenter aux personnes qui vivent à Aarhus ou qui la visitent des espaces peu coûteux pour faire de l’exercice et se détendre, et les aider à préparer ce qu’ils doivent savoir avant de s’y rendre ?',
      researchResults: 'Résultats de recherche',
      researchDescription: 'Description de la recherche à définir.',
      affinityTitle: 'Affinity Diagram',
      affinityDescription: 'Description du diagramme d’affinité à définir.',
      affinityImageAlt:
        'Diagramme d’affinité en cinq colonnes : self discovery, habits, struggles, motivations et interests',
      personaTitle: 'Persona',
      personaDescription: 'Description de la persona à définir.',
      personaImageAlt:
        'Profil persona de Solvej, yogi avancée avec objectifs, comportement et stratégie de solution',
      topics: [
        {
          title: 'UX Writing',
          description:
            'Intégration de descriptions rédigées pour les lieux cachés, afin d’offrir une expérience sensorielle et accueillante à l’utilisateur.',
        },
        {
          title: 'HMW Table',
          description:
            'Le problème général identifié par la recherche a été décomposé en problèmes individuels pour mieux comprendre chaque solution.',
          imageKey: 'hmw',
          imageAlt:
            'Tableau questions-réponses How Might We pour la solution des lieux de yoga en extérieur',
        },
        {
          title: 'List of Values',
          description:
            'À partir de la recherche et de la persona, définition des valeurs en lien avec les traditions du yoga.',
          imageKey: 'values',
          imageAlt:
            'Liste de valeurs : Mindfulness, Alive, Natural, Symbolic, Connection, Balance et Soothing avec implications design',
        },
        {
          title: 'OOUX Table',
          description:
            'Mise en relation des types de données avec les interactions et le contenu via le tableau ORCA OOUX.',
        },
        { title: '4 Key Dimensions', description: 'Description à définir.' },
        {
          title: 'Conventions',
          description:
            'Prise en compte permanente de l’entreprise, des besoins de la persona et des conventions pour créer la solution.',
          imageKey: 'conventions',
          imageAlt:
            'Diagramme de Venn des objectifs digitaux, entreprise et persona, et conventions partagées',
        },
        {
          title: 'Results',
          description:
            'Bien que le code puisse encore être amélioré, la solution fournit l’information et le contenu nécessaires pour que l’utilisateur soit autonome dans son parcours d’exercice, tout en lui permettant d’utiliser les espaces abrités gratuits qu’Aarhus propose toute l’année.',
        },
      ],
      metaAria: 'Détails du projet',
      metaLabels: {
        date: 'Date du projet',
        team: 'Équipe',
        tools: 'Outils',
        methods: 'Méthodes',
        target: 'Cible',
        client: 'Client',
      },
      meta: {
        date: 'Décembre 2015',
        team: 'Projet individuel',
        tools:
          'Figjam, Figma, VS Code, Photoshop, Video Editing, Photography, Graphic Design',
        methods:
          'UX/ UI Research and Mapping, Design Theory and Principles, HTML, CSS and Javascript',
        target: 'Personnes visitant/vivant à Aarhus, 25–35 ans',
        client: 'Ville d’Aarhus',
      },
    },
    projects: {
      1: {
        title: 'DESIGN POUR\nSOLUTIONS NUMÉRIQUES',
        description: 'Figma, création de contenu, Photoshop, montage vidéo, graphisme',
      },
      2: {
        title: 'DESIGN UX / UI',
        description: 'Recherche, analyse et cartographie',
      },
      4: {
        title: 'DESIGN POUR MAKEUP FX',
        description:
          'Character design, prothèses, makeup mode, makeup beauté, makeup SFX, aérographe et bodypainting, photographie éditoriale et retouche, modélisation 3D et fabrication d’accessoires',
      },
      5: {
        title: 'ART',
        description:
          'Peinture, dessin, peinture numérique, sculpture et photographie analogique',
      },
    },
  },

  de: {
    nav: {
      home: 'START',
      about: 'ÜBER MICH',
      works: 'ARBEITEN',
      contact: 'KONTAKT',
      site: 'Seite',
      openMenu: 'Menü öffnen',
      closeMenu: 'Menü schließen',
    },
    lang: { label: 'Sprache', open: 'Sprache wählen', close: 'Sprachmenü schließen' },
    header: { name: 'O. Y. Caloca' },
    footer: {
      name: 'Omar Yahir Caloca',
      role: 'Künstler und Designer',
      emailAria: 'Omar Caloca per E-Mail kontaktieren',
      linkedinAria: 'LinkedIn-Profil',
    },
    contact: {
      label: 'Für Anfragen kontaktieren:',
      copyEmail: 'E-Mail',
      copyPhone: 'Telefonnummer',
      copyLinkedin: 'LinkedIn-Link',
      copied: 'Kopiert',
      copy: 'Kopieren',
      emailAria: 'Omar Caloca per E-Mail kontaktieren',
      phoneAria: 'Omar Caloca anrufen',
      linkedinAria: 'LinkedIn-Profil',
      infoAria: 'Kontaktinformationen',
    },
    about: {
      introAria: 'Über-mich-Einführung',
      bioAria: 'Biografie und Galerie',
      missionLabel: 'Meine Mission:',
      checkWorks: 'MEINE ARBEIT ANSEHEN',
      worksAria: 'Arbeiten',
      educationTitle: 'Ausbildung',
      educationAria: 'Ausbildung',
      education: [
        {
          program: 'Multimedia-and-Design-Programm',
          school: 'Aarhus Business Academy',
          detail: 'Derzeit im 3. Semester',
        },
        {
          program: 'Global Makeup Co-Op Diploma Program',
          school: 'Blanche Macdonald Centre',
          detail: 'Abgeschlossen 2016',
        },
        {
          program: 'Digital Painting Certificate Course',
          school: 'Synn Studio',
          detail: 'Abgeschlossen 2016',
        },
      ],
      bioBefore: [
        'Ich bin derzeit Student des Multimedia-and-Design-Programms an der Aarhus Business Academy in Dänemark.',
        'In Mexiko geboren und aufgewachsen, besitze ich ein Global Makeup Co-Op Diploma der kanadischen Institution Blanche Macdonald Centre sowie ein Certificate of Digital Painting von Synn Studio.',
        'Ich habe über 10 Jahre Erfahrung in verschiedenen kreativen Bereichen wie Kunstausstellungen, Independent-Filmen, Modeschauen und Kunstaufträgen. Ich habe diese Arbeit auch mit Einzelhandel und Nachhilfe kombiniert. Meine letzte Position vor dem Umzug nach Dänemark war die eines Kunstinstructors an Bord von Kreuzfahrtschiffen, wo ich verschiedene künstlerische Events konzipierte und leitete und ein multikulturelles Publikum auf Englisch, Spanisch und Französisch begleitete.',
      ],
      bioAfter: [
        'Persönlich habe ich eine Leidenschaft für Kunst, Design und Sprache. In meiner Freizeit verbinde ich mich gerne mit Menschen und der Natur, lese Belletristik, praktiziere Yoga und male.',
        'Ich bin in 64 Länder gereist und habe kulturellen Respekt und Inspiration gesammelt – und darüber hinaus die Fähigkeit zuzuhören, zu analysieren, zu verstehen und mich an unterschiedliche Kunden- und Unternehmensbedürfnisse anzupassen, um Lösungen zu entwickeln, die ein breites Publikum erreichen und zufriedenstellen.',
        'Ich habe die Fähigkeiten zu verhandeln und zu überzeugen und bleibe dabei stets meinen Hauptwerten treu: Respekt und transparente Zusammenarbeit.',
      ],
      mission:
        'Ich bin überzeugt, dass wir eine harmonische Verbindung zum technologischen Fortschritt schaffen können und zugleich das Gleichgewicht mit der Natur bewahren. In diesem Sinne denke ich Kunst und Design als eine weitere Sprache, in der Programmierung das Skript, UX/UI die Interpretation und Design die Vermittlung ist.',
    },
    subheadline: [
      'Wer bin ich?',
      'Ich bin Künstler',
      'Ich bin UX/UI-Designer',
      'Ich bin Programmierer',
      'Aber darüber hinaus',
      'Ich bin eine Sammlung von...',
      'des Ortes, an dem ich geboren wurde',
      'der Orte, an die ich gereist bin…',
      'genau 64 Länder und 4 Kontinente',
      'Ich bin der Einfluss der Menschen, die ich liebe',
      'Ich bin die Bücher, die ich lese',
      'Ich bin die Erfahrung aus 10 Jahren Arbeit',
      'Ich bin der, der ich werde',
      'Ein besserer Mensch werden',
      'Ein besserer Designer werden',
    ],
    subheadlineHome: [
      'Ich bin Künstler und Designer',
      'Ich gestalte für digitale Medien',
      'Ich gestalte für UX / UI',
      'Ich bin Programmierer',
      'Ich habe Kunst unterrichtet',
      'Ich habe Makeup FX gemacht',
      'Ich male in Öl und Aquarell',
      'Ich erzähle Geschichten durch meine Arbeit',
      'Ich schaffe Kunst',
    ],
    seeMyProjects: 'Meine Projekte ansehen',
    makeupFx: {
      title: 'Design für\nMakeup Effects',
      body:
        'Ich habe einen professionellen Hintergrund in Makeup Artistry und besitze ein Global Makeup Co-Op Diploma des Blanche Macdonald Centre. In den letzten Jahren habe ich an Independent-Filmen und Modeschauen, Prothetik-Ausstellungen, Fotoshootings, Retail sowie Client-Makeup gearbeitet.',
      expertise:
        'Expertise: Prothetik, Airbrush, Beauty Makeup, Fashion Makeup, Special Effects für Film und Theater, Fotobearbeitung, Props-Herstellung, Grundlagen der Editorial-Fotografie und Frisurengestaltung.',
      navCrumb: 'Design für Makeup FX',
      reel: 'REEL',
      portfolios: 'Portfolios',
      explore: 'Portfolio erkunden',
      mosaics: {
        sfx: 'Special Effects und Prothetik',
        fashion: 'Fashion, Beauty und Fantasy',
      },
      magazineClose: 'Portfolio schließen',
      magazinePrev: 'Vorherige Seiten',
      magazineNext: 'Nächste Seiten',
      magazineLoading: 'Portfolio wird geladen…',
      magazineError: 'Dieses Portfolio konnte nicht geladen werden.',
      magazineCounter: 'Seiten {current} von {total}',
    },
    uxUi: {
      title: 'UX / UI DESIGN PROJEKTE',
      navCrumb: 'UX / UI',
      projectsAria: 'UX / UI Design-Projekte',
      mosaics: {
        projectOne: {
          title: 'Botanischer Garten Aarhus',
          description: '„Entdecke spannende Fakten über die Pflanzen“',
        },
        projectTwo: {
          title: 'Yoga',
          description: '„Versteckte Outdoor-Workout-Orte in Aarhus“',
        },
      },
    },
    botanical: {
      title: 'Botanischer Garten Aarhus',
      description:
        'Info-Screens, die Menschen mit der Natur verbinden – Lernen auf spielerische, interaktive Weise',
      navCrumb: 'Garten',
      figmaCta: 'Figma-Prototyp ansehen',
      videoLegend: 'Das Video fasst das Projekt zusammen',
      videoFallback: 'Dein Browser unterstützt kein eingebettetes Video.',
      problemStatement: 'Problemstellung',
      problemDescription:
        'Wie können wir Besucher des Botanischen Gartens Aarhus informieren und fesseln und dabei die grüne Szenerie möglichst wenig stören',
      researchResults: 'Forschungsergebnisse',
      researchDescription:
        'Desk- und Field-Research, 7 Interviews vor Ort sowie Marktforschung mit Fokus auf die dänische Demografie.',
      researchImageAlt:
        'Zentrale Research-Insights: Venn-Diagramm von Explorers und Learners mit Erfahrungszielen',
      affinityTitle: 'Affinity Diagram',
      affinityDescription:
        'Abschluss einer Studie zu Besuchertypen, ihren Interessen und Bedürfnissen für den Garten auf Basis der aus der Research gewonnenen Daten.',
      affinityImageAlt:
        'Affinity Diagram mit Besuchenden-Insights in Sticky-Note-Kategorien',
      personaTitle: 'Persona',
      personaDescription:
        'Basierend auf der Research haben wir unsere Zielgruppe auf die Gruppe „The Learners“ eingegrenzt. Familien und ein jüngeres Publikum von 15–25 Jahren wurden berücksichtigt.',
      personaImageAlt:
        'Persona-Profil von Matthias Norsegade als Vertretung der Zielgruppe The Learners',
      topics: [
        {
          title: 'Storytelling',
          description:
            'Entwicklung eines Plans für ein leicht nachvollziehbares, lineares Storytelling, angepasst an vier Dimensionen des Tone of Voice.',
          imageKey: 'storytelling',
          imageAlt:
            'Storytelling und Tone of Voice: lineare Erzählung und vier Dimensionen des Tone of Voice',
        },
        {
          title: '4 Key Dimensions',
          description:
            'Anwendung der 4 Schlüsseldimensionen mit Blick auf die User Experience und die Interaktion mit der Lösung',
          imageKey: '4-key-dimensions',
          imageAlt:
            'Vier Schlüsseldimensionen der Besucher-Journey: Emotional, Physical, Intellectual und Technology',
        },
        {
          title: 'OOUX Table',
          description:
            'Auf Basis der 4 Schlüsseldimensionen Planung von Datentypen, unabhängigen Aktionen und Interaktionen über die ORCA OOUX Table',
          imageKey: 'ooux',
          imageAlt:
            'ORCA-OOUX-Tabelle mit Objekten, Eigenschaften, Beziehungen und Call-to-Actions',
        },
        {
          title: 'Design Principles',
          description:
            'Die Planung von Inhalten und Interaktionen sollte Designprinzipien folgen.',
          imageKey: 'principles',
          imageAlt:
            'Designprinzipien basierend auf Allen und Gutwills common pitfalls: no overload, no user interference, no disruption, clear focus, no distraction',
        },
        {
          title: 'Results',
          description:
            'Nach Ausarbeitung und Planung der Lösungsinhalte und UI-Elemente ist das Projekt bereit zur Übergabe an das Design-Entwicklungsteam. In diesem Fall hat unser Team auch das Design entwickelt. Nach Tests und Feedback haben wir das Projekt abgeschlossen. Auch wenn Animationen in Zukunft noch verbessert werden können, bin ich überzeugt, dass unsere Lösung ein interaktives Erlebnis schafft, das unserer Zielgruppe hilft, auf unterhaltsame Weise zu lernen und sich zu engagieren, ohne ihre Naturflucht zu verlassen.',
        },
      ],
      metaAria: 'Projektdetails',
      metaLabels: {
        date: 'Projektdatum',
        team: 'Team',
        role: 'Rolle',
        tools: 'Tools',
        methods: 'Methoden',
        target: 'Zielgruppe',
        client: 'Kunde',
      },
      meta: {
        date: 'April 2026',
        team: '5 Studierende',
        role: 'UX / UI Designer',
        tools: 'Figjam, Figma',
        methods: 'UX/ UI Research, Design Principles',
        target: 'Dänische Personen 15–25 Jahre / Familien',
        client: 'Botanischer Garten Aarhus',
      },
    },
    yoga: {
      title: 'Yoga',
      description: 'Projektbeschreibung folgt später.',
      navCrumb: 'Yoga',
      figmaCta: 'Figma-Prototyp ansehen',
      videoLegend: 'Das Video fasst das Projekt zusammen',
      videoFallback: 'Dein Browser unterstützt kein eingebettetes Video.',
      problemStatement: 'Problemstellung',
      problemDescription:
        'Wie kann ich Menschen, die in Aarhus leben oder die Stadt besuchen, kostengünstige Orte zum Sporttreiben und Entspannen vorstellen und ihnen helfen, sich auf das vorzubereiten, was sie für den Besuch wissen müssen?',
      researchResults: 'Forschungsergebnisse',
      researchDescription: 'Research-Beschreibung folgt später.',
      affinityTitle: 'Affinity Diagram',
      affinityDescription: 'Beschreibung des Affinity Diagrams folgt später.',
      affinityImageAlt:
        'Affinity Diagram mit fünf Spalten: self discovery, habits, struggles, motivations und interests',
      personaTitle: 'Persona',
      personaDescription: 'Persona-Beschreibung folgt später.',
      personaImageAlt:
        'Persona-Profil von Solvej, fortgeschrittene Yogi mit Zielen, Verhalten und Lösungsstrategie',
      topics: [
        {
          title: 'UX Writing',
          description:
            'Selbst verfasste Beschreibungen der versteckten Orte eingebunden, um eine sinnliche, einladende Erfahrung für die Nutzer:innen zu schaffen.',
        },
        {
          title: 'HMW Table',
          description:
            'Das aus der Research abgeleitete Gesamtproblem wurde in Einzelprobleme zerlegt, um jede Lösung klarer zu verstehen.',
          imageKey: 'hmw',
          imageAlt:
            'How-Might-We-Fragen-und-Antworten-Tabelle für die Outdoor-Yoga-Lösung',
        },
        {
          title: 'List of Values',
          description:
            'Basierend auf Research und Persona wurden die Werte im Bezug auf Yoga-Traditionen definiert.',
          imageKey: 'values',
          imageAlt:
            'Werte-Liste: Mindfulness, Alive, Natural, Symbolic, Connection, Balance und Soothing mit Design-Implikationen',
        },
        {
          title: 'OOUX Table',
          description:
            'Datentypen mit Interaktionen und Inhalten über die ORCA-OOUX-Tabelle verknüpft.',
        },
        { title: '4 Key Dimensions', description: 'Beschreibung folgt später.' },
        {
          title: 'Conventions',
          description:
            'Unternehmen, Persona-Bedürfnisse und Konventionen wurden durchgehend berücksichtigt, um die Lösung zu gestalten.',
          imageKey: 'conventions',
          imageAlt:
            'Venn-Diagramm der digitalen, Unternehmens- und Persona-Ziele sowie gemeinsamer Konventionen',
        },
        {
          title: 'Results',
          description:
            'Auch wenn der Code noch verbessert werden kann, liefert die Lösung die nötigen Informationen und Inhalte, damit Nutzer:innen auf ihrer Bewegungsreise selbstständig sind und die kostenlosen überdachten Flächen der Stadt Aarhus das ganze Jahr nutzen können.',
        },
      ],
      metaAria: 'Projektdetails',
      metaLabels: {
        date: 'Projektdatum',
        team: 'Team',
        tools: 'Tools',
        methods: 'Methoden',
        target: 'Zielgruppe',
        client: 'Kunde',
      },
      meta: {
        date: 'Dezember 2015',
        team: 'Einzelprojekt',
        tools:
          'Figjam, Figma, VS Code, Photoshop, Video Editing, Photography, Graphic Design',
        methods:
          'UX/ UI Research and Mapping, Design Theory and Principles, HTML, CSS and Javascript',
        target: 'Menschen, die Aarhus besuchen/dort leben, 25–35 Jahre',
        client: 'Stadt Aarhus',
      },
    },
    projects: {
      1: {
        title: 'DESIGN FÜR\nDIGITALE LÖSUNGEN',
        description: 'Figma, Content Creation, Photoshop, Videobearbeitung, Grafik',
      },
      2: {
        title: 'UX / UI DESIGN',
        description: 'Research, Analyse und Mapping',
      },
      4: {
        title: 'DESIGN FÜR MAKEUP FX',
        description:
          'Character Design, Prothetik, Fashion Makeup, Beauty Makeup, SFX Makeup, Airbrush und Bodypainting, Editorial-Fotografie und Retusche, 3D-Modellierung und Props-Herstellung',
      },
      5: {
        title: 'KUNST',
        description:
          'Malerei, Zeichnung, digitale Malerei, Skulptur und analoge Fotografie',
      },
    },
  },

  es: {
    nav: {
      home: 'INICIO',
      about: 'ACERCA',
      works: 'TRABAJOS',
      contact: 'CONTACTO',
      site: 'Sitio',
      openMenu: 'Abrir menú',
      closeMenu: 'Cerrar menú',
    },
    lang: { label: 'Idioma', open: 'Elegir idioma', close: 'Cerrar menú de idiomas' },
    header: { name: 'O. Y. Caloca' },
    footer: {
      name: 'Omar Yahir Caloca',
      role: 'Artista y diseñador',
      emailAria: 'Enviar correo a Omar Caloca',
      linkedinAria: 'Perfil de LinkedIn',
    },
    contact: {
      label: 'Para consultas contactar:',
      copyEmail: 'correo',
      copyPhone: 'número de teléfono',
      copyLinkedin: 'enlace de LinkedIn',
      copied: 'Copiado',
      copy: 'Copiar',
      emailAria: 'Enviar correo a Omar Caloca',
      phoneAria: 'Llamar a Omar Caloca',
      linkedinAria: 'Perfil de LinkedIn',
      infoAria: 'Información de contacto',
    },
    about: {
      introAria: 'Introducción Acerca de',
      bioAria: 'Biografía y galería',
      missionLabel: 'Mi misión:',
      checkWorks: 'VER MI TRABAJO',
      worksAria: 'Trabajos',
      educationTitle: 'Educación',
      educationAria: 'Educación',
      education: [
        {
          program: 'Programa Multimedia and Design',
          school: 'Aarhus Business Academy',
          detail: 'Actualmente en 3.º semestre',
        },
        {
          program: 'Global Makeup Co-Op Diploma Program',
          school: 'Blanche Macdonald Centre',
          detail: 'Completado en 2016',
        },
        {
          program: 'Digital Painting Certificate Course',
          school: 'Synn Studio',
          detail: 'Completado en 2016',
        },
      ],
      bioBefore: [
        'Actualmente soy estudiante del programa Multimedia and Design en Aarhus Business Academy en Dinamarca.',
        'Nacido y criado en México, cuento con un Global Makeup Co-Op Diploma de la institución canadiense Blanche Macdonald Centre y un Certificate of Digital Painting de Synn Studio.',
        'Tengo más de 10 años de experiencia en distintos campos creativos como exposiciones de arte, cine independiente, desfiles de moda y encargos artísticos. También he combinado ese trabajo con retail y tutoría. Mi puesto más reciente antes de mudarme a Dinamarca fue como instructor de arte a bordo de cruceros, donde creé y dirigí diversos eventos artísticos, guiando a un público multicultural en inglés, español y francés.',
      ],
      bioAfter: [
        'En lo personal, tengo pasión por las artes, el diseño y los idiomas. En mi tiempo libre me gusta conectar con la gente y la naturaleza, leer ficción, practicar yoga y pintar.',
        'He viajado a 64 países, reuniendo respeto cultural e inspiración, y más allá de eso, la capacidad de escuchar, analizar, comprender y adaptarme a las necesidades de distintos clientes y empresas para elaborar soluciones que impacten y satisfagan a un público amplio.',
        'Tengo las habilidades para negociar y ser persuasivo manteniéndome siempre fiel a mis valores principales: el respeto y trabajar con transparencia.',
      ],
      mission:
        'Estoy convencido de que podemos crear un vínculo armonioso con el avance tecnológico manteniendo el equilibrio con la naturaleza; en ese sentido pienso el arte y el diseño como otro lenguaje, donde la programación es el guion, la UX/UI es la interpretación y el diseño es la entrega.',
    },
    subheadline: [
      '¿Quién soy?',
      'Soy un artista',
      'Soy un diseñador UX/UI',
      'Soy un programador',
      'Pero más allá de eso',
      'Soy una colección de...',
      'de donde nací',
      'de donde he viajado…',
      '64 países y 4 continentes exactamente',
      'Soy la influencia de las personas que amo',
      'Soy los libros que leo',
      'Soy la experiencia de 10 años de trabajo',
      'Soy quien estoy llegando a ser',
      'Llegando a ser una mejor persona',
      'Llegando a ser un mejor diseñador',
    ],
    subheadlineHome: [
      'Soy artista y diseñador',
      'Diseño para medios digitales',
      'Diseño para UX / UI',
      'Soy programador',
      'He enseñado arte',
      'He hecho Makeup FX',
      'Pinto al óleo y a la acuarela',
      'Cuento historias a través de mi trabajo',
      'Creo arte',
    ],
    seeMyProjects: 'Ver mis proyectos',
    makeupFx: {
      title: 'Diseño para\nMakeup Effects',
      body:
        'Tengo una trayectoria profesional en Makeup Artistry y cuento con un Global Makeup Co-Op Diploma del Blanche Macdonald Centre. En los últimos años he trabajado en cine independiente y desfiles, exposiciones de prótesis, sesiones fotográficas, retail y makeup de cliente.',
      expertise:
        'Áreas de expertise: prótesis, aerógrafo, beauty makeup, makeup de moda, efectos especiales para cine y teatro, edición fotográfica, fabricación de props, bases de fotografía editorial y peinado.',
      navCrumb: 'Diseño para Makeup FX',
      reel: 'REEL',
      portfolios: 'Portafolios',
      explore: 'Explorar portafolio',
      mosaics: {
        sfx: 'Efectos especiales y prótesis',
        fashion: 'Moda, belleza y fantasy',
      },
      magazineClose: 'Cerrar portafolio',
      magazinePrev: 'Páginas anteriores',
      magazineNext: 'Páginas siguientes',
      magazineLoading: 'Cargando portafolio…',
      magazineError: 'No se pudo cargar este portafolio.',
      magazineCounter: 'Páginas {current} de {total}',
    },
    uxUi: {
      title: 'PROYECTOS UX / UI DESIGN',
      navCrumb: 'UX / UI',
      projectsAria: 'Proyectos de diseño UX / UI',
      mosaics: {
        projectOne: {
          title: 'Jardín Botánico de Aarhus',
          description: '"Descubre datos curiosos sobre las plantas"',
        },
        projectTwo: {
          title: 'Yoga',
          description: '"Espacios ocultos de entrenamiento al aire libre en Aarhus"',
        },
      },
    },
    botanical: {
      title: 'Jardín Botánico de Aarhus',
      description:
        'Pantallas informativas que conectan a las personas con la naturaleza, aprendiendo de forma divertida e interactiva',
      navCrumb: 'Jardín',
      figmaCta: 'Haz clic para ver el prototipo de Figma',
      videoLegend: 'El video sintetiza el proyecto',
      videoFallback: 'Tu navegador no admite video integrado.',
      problemStatement: 'Planteamiento del problema',
      problemDescription:
        'Cómo informar y cautivar a los visitantes del Jardín Botánico de Aarhus con la menor interrupción posible del paisaje verde',
      researchResults: 'Resultados de investigación',
      researchDescription:
        'Investigación de escritorio y de campo, 7 entrevistas en sitio e investigación de mercado orientada a la demografía danesa.',
      researchImageAlt:
        'Principales insights de investigación: diagrama de Venn de explorers y learners con objetivos de experiencia',
      affinityTitle: 'Affinity Diagram',
      affinityDescription:
        'Concluimos un estudio de los tipos de visitantes, sus intereses y necesidades para el Jardín a partir de los datos extraídos de la investigación.',
      affinityImageAlt:
        'Diagrama de afinidad con insights de visitantes agrupados en categorías de sticky notes',
      personaTitle: 'Persona',
      personaDescription:
        'Con base en la investigación, acotamos nuestra audiencia objetivo al grupo “The Learners”. Se contemplaron familias y un público más joven de 15 a 25 años.',
      personaImageAlt:
        'Perfil de persona de Matthias Norsegade, representando a la audiencia The Learners',
      topics: [
        {
          title: 'Storytelling',
          description:
            'Desarrollamos un plan de storytelling lineal, fácil de seguir, ajustado a cuatro dimensiones del tone of voice.',
          imageKey: 'storytelling',
          imageAlt:
            'Storytelling y tone of voice: narrativa lineal y cuatro dimensiones del tone of voice',
        },
        {
          title: '4 Key Dimensions',
          description:
            'Se emplearon las 4 dimensiones clave contemplando la experiencia de usuario y la interacción con la solución',
          imageKey: '4-key-dimensions',
          imageAlt:
            'Cuatro dimensiones clave del recorrido del visitante: Emotional, Physical, Intellectual y Technology',
        },
        {
          title: 'OOUX Table',
          description:
            'A partir de las 4 dimensiones clave, planificamos el tipo de datos, las acciones independientes y las interacciones mediante la tabla ORCA OOUX',
          imageKey: 'ooux',
          imageAlt:
            'Tabla ORCA OOUX con objetos, propiedades, relaciones y llamadas a la acción',
        },
        {
          title: 'Design Principles',
          description:
            'La planificación del contenido y las interacciones debe adherirse a los principios de diseño.',
          imageKey: 'principles',
          imageAlt:
            'Principios de diseño basados en los common pitfalls de Allen y Gutwill: no overload, no user interference, no disruption, clear focus, no distraction',
        },
        {
          title: 'Results',
          description:
            'Tras la elaboración y planificación del contenido de la solución y los elementos de UI, el proyecto está listo para entregarse al equipo de desarrollo de diseño. En este caso, nuestro equipo también desarrolló el diseño. Tras pruebas y feedback, concluimos el proyecto. Aunque hay animaciones por mejorar en el futuro, confío en que nuestra solución crea una experiencia interactiva que ayuda a nuestro público objetivo a aprender de forma divertida y a participar sin alejarse de su escapada a la naturaleza.',
        },
      ],
      metaAria: 'Detalles del proyecto',
      metaLabels: {
        date: 'Fecha del proyecto',
        team: 'Equipo',
        role: 'Rol',
        tools: 'Herramientas',
        methods: 'Métodos',
        target: 'Público objetivo',
        client: 'Cliente',
      },
      meta: {
        date: 'Abril 2026',
        team: '5 estudiantes',
        role: 'UX / UI Designer',
        tools: 'Figjam, Figma',
        methods: 'UX/ UI Research, Design Principles',
        target: 'Personas danesas de 15 a 25 años / Familias',
        client: 'Jardín Botánico de Aarhus',
      },
    },
    yoga: {
      title: 'Yoga',
      description: 'Descripción del proyecto por añadir.',
      navCrumb: 'Yoga',
      figmaCta: 'Haz clic para ver el prototipo de Figma',
      videoLegend: 'El video sintetiza el proyecto',
      videoFallback: 'Tu navegador no admite video integrado.',
      problemStatement: 'Planteamiento del problema',
      problemDescription:
        '¿Cómo puedo presentar a las personas que viven en Aarhus o la visitan zonas económicas para hacer ejercicio y relajarse, y ayudarles a preparar lo que necesitan saber para ir?',
      researchResults: 'Resultados de investigación',
      researchDescription: 'Descripción de la investigación por definir.',
      affinityTitle: 'Affinity Diagram',
      affinityDescription: 'Descripción del diagrama de afinidad por definir.',
      affinityImageAlt:
        'Diagrama de afinidad con cinco columnas: self discovery, habits, struggles, motivations e interests',
      personaTitle: 'Persona',
      personaDescription: 'Descripción de la persona por definir.',
      personaImageAlt:
        'Perfil de persona de Solvej, yogui avanzada con objetivos, comportamiento y estrategia de solución',
      topics: [
        {
          title: 'UX Writing',
          description:
            'Se incorporaron descripciones propias de los lugares ocultos para crear una experiencia sensorial e invitadora para el usuario.',
        },
        {
          title: 'HMW Table',
          description:
            'El problema general hallado en la investigación se desglosó en problemas individuales para comprender mejor cada solución.',
          imageKey: 'hmw',
          imageAlt:
            'Tabla de preguntas y respuestas How Might We para la solución de lugares de yoga al aire libre',
        },
        {
          title: 'List of Values',
          description:
            'A partir de la investigación y la persona, se definieron los valores en relación con las tradiciones del yoga.',
          imageKey: 'values',
          imageAlt:
            'Lista de valores: Mindfulness, Alive, Natural, Symbolic, Connection, Balance y Soothing con implicaciones de diseño',
        },
        {
          title: 'OOUX Table',
          description:
            'Se relacionaron los tipos de datos con las interacciones y el contenido mediante la tabla ORCA OOUX.',
        },
        { title: '4 Key Dimensions', description: 'Descripción por definir.' },
        {
          title: 'Conventions',
          description:
            'Se contemplaron en todo momento la empresa, las necesidades de la persona y las convenciones para crear la solución.',
          imageKey: 'conventions',
          imageAlt:
            'Diagrama de Venn de objetivos digitales, de empresa y de persona, y convenciones compartidas',
        },
        {
          title: 'Results',
          description:
            'Aunque hay código por mejorar, la solución ofrece la información y el contenido necesarios para que el usuario sea autosuficiente en su recorrido de ejercicio, y pueda usar las zonas cubiertas gratuitas que Aarhus ofrece durante todo el año.',
        },
      ],
      metaAria: 'Detalles del proyecto',
      metaLabels: {
        date: 'Fecha del proyecto',
        team: 'Equipo',
        tools: 'Herramientas',
        methods: 'Métodos',
        target: 'Público objetivo',
        client: 'Cliente',
      },
      meta: {
        date: 'Diciembre 2015',
        team: 'Proyecto individual',
        tools:
          'Figjam, Figma, VS Code, Photoshop, Video Editing, Photography, Graphic Design',
        methods:
          'UX/ UI Research and Mapping, Design Theory and Principles, HTML, CSS and Javascript',
        target: 'Personas que visitan/viven en Aarhus, de 25 a 35 años',
        client: 'Ciudad de Aarhus',
      },
    },
    projects: {
      1: {
        title: 'DISEÑO PARA\nSOLUCIONES DIGITALES',
        description: 'Figma, creación de contenido, Photoshop, edición de video, gráficos',
      },
      2: {
        title: 'DISEÑO UX / UI',
        description: 'Investigación, análisis y mapeo',
      },
      4: {
        title: 'DISEÑO PARA MAKEUP FX',
        description:
          'Diseño de personajes, prótesis, makeup de moda, makeup de belleza, makeup SFX, aerógrafo y bodypainting, fotografía editorial y edición, modelado 3D y fabricación de props',
      },
      5: {
        title: 'ARTE',
        description:
          'Pintura, dibujo, pintura digital, escultura y fotografía analógica',
      },
    },
  },
}
