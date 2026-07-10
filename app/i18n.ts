export const languages = [
  { code: "es", label: "Español" },
  { code: "en", label: "English" },
  { code: "pt", label: "Português" },
] as const;

export type Language = (typeof languages)[number]["code"];

export const translations = {
  es: {
    languagelabel: "Puedes hablar conmigo en:",

    navigation: {
      home: "01 Home",
      publications: "02 Publicaciones",
      about: "03 Sobre mí",
      chatbot: "04 Chatbot",
    },
    hero: {
      badge: "🤖 Profesor e Investigador de IA",
      title: "Hola, soy",
      name: "Camilo",
      description:
        "Especialista en Ciencia de Datos, agentes inteligentes y automatización. Mi enfoque combina la rigurosidad de la investigación académica con el desarrollo de soluciones de IA prácticas y escalables.",
      ctaProjects: "Ver Proyectos",
      ctaCv: "Descargar CV (Hoja de Vida)",
      profileAlt: "Foto de Perfil",
    },
    projects: {
      title: "Proyectos Destacados",
      subtitle: "Una muestra de mis últimos desarrollos en Inteligencia Artificial",
      items: [
        {
          title: "Sistema RAG Universitario v1",
          description:
            "Arquitectura Retrieval-Augmented Generation con LangChain y bases de datos vectoriales.",
          tags: ["Python", "LangChain", "ChromaDB"],
        },
        {
          title: "Agente Autónomo de Automatización",
          description:
            "Despliegue de agentes inteligentes que optimizan flujos de trabajo en entornos académicos.",
          tags: ["LangGraph", "Gemini", "Docker"],
        },
      ],
    },
    placeholders: {
      publications: {
        title: "Publicaciones",
        description: "Próximamente compartiré artículos, ponencias y trabajos de investigación.",
      },
      about: {
        title: "Sobre mí",
        description: "Esta sección reunirá mi experiencia, formación y enfoque académico.",
      },
      chatbot: {
        title: "Chatbot",
        description: "Aquí conectaremos el asistente personal basado en IA con el portafolio.",
      },
    },
  },
  en: {
    languagelabel: "You can talk to me in:",
    navigation: {
      home: "01 Home",
      publications: "02 Publications",
      about: "03 About me",
      chatbot: "04 Chatbot",
    },
    hero: {
      badge: "🤖 Professor and AI Researcher",
      title: "Hello, I am",
      name: "Camilo",
      description:
        "Specialist in Data Science, intelligent agents, and automation. My work combines the rigor of academic research with practical and scalable AI solutions.",
      ctaProjects: "View Projects",
      ctaCv: "Download CV",
      profileAlt: "Profile Photo",
    },
    projects: {
      title: "Featured Projects",
      subtitle: "A sample of my latest developments in Artificial Intelligence",
      items: [
        {
          title: "University RAG System v1",
          description:
            "Retrieval-Augmented Generation architecture with LangChain and vector databases.",
          tags: ["Python", "LangChain", "ChromaDB"],
        },
        {
          title: "Autonomous Automation Agent",
          description:
            "Deployment of intelligent agents that optimize workflows in academic environments.",
          tags: ["LangGraph", "Gemini", "Docker"],
        },
      ],
    },
    placeholders: {
      publications: {
        title: "Publications",
        description: "I will soon share articles, talks, and research work.",
      },
      about: {
        title: "About me",
        description: "This section will gather my experience, training, and academic approach.",
      },
      chatbot: {
        title: "Chatbot",
        description: "This is where the personal AI assistant will be connected to the portfolio.",
      },
    },
  },
  pt: {
    languagelabel: "Você pode falar comigo em:",
    navigation: {
      home: "01 Início",
      publications: "02 Publicações",
      about: "03 Sobre mim",
      chatbot: "04 Chatbot",
    },
    hero: {
      badge: "🤖 Professor e Pesquisador de IA",
      title: "Olá, eu sou",
      name: "Camilo",
      description:
        "Especialista em Ciência de Dados, agentes inteligentes e automação. Minha abordagem combina a rigorosidade da pesquisa acadêmica com soluções de IA práticas e escaláveis.",
      ctaProjects: "Ver Projetos",
      ctaCv: "Baixar CV",
      profileAlt: "Foto de Perfil",
    },
    projects: {
      title: "Projetos em Destaque",
      subtitle: "Uma amostra dos meus últimos desenvolvimentos em Inteligência Artificial",
      items: [
        {
          title: "Sistema RAG Universitário v1",
          description:
            "Arquitetura Retrieval-Augmented Generation com LangChain e bancos de dados vetoriais.",
          tags: ["Python", "LangChain", "ChromaDB"],
        },
        {
          title: "Agente Autónomo de Automação",
          description:
            "Implantação de agentes inteligentes que otimizam fluxos de trabalho em ambientes acadêmicos.",
          tags: ["LangGraph", "Gemini", "Docker"],
        },
      ],
    },
    placeholders: {
      publications: {
        title: "Publicações",
        description: "Em breve compartilharei artigos, palestras e trabalhos de pesquisa.",
      },
      about: {
        title: "Sobre mim",
        description: "Esta seção reunirá minha experiência, formação e abordagem acadêmica.",
      },
      chatbot: {
        title: "Chatbot",
        description: "Aqui conectaremos o assistente pessoal baseado em IA ao portfólio.",
      },
    },
  },
} as const;

export function getCvHref(language: Language) {
  const cvFiles = {
    es: "/cv/Camilo_Perez_CV_Español.pdf",
    en: "/cv/Camilo_Perez_CV_Ingles.pdf",
    pt: "/cv/Camilo_Perez_CV_Portugues.pdf",
  } as const;

  return cvFiles[language];
}
