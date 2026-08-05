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
      title: "Proyectos destacados",
      subtitle: "Una muestra de mis últimos desarrollos en Inteligencia Artificial",
      items: [
        {
          title: "Chatbot Inteligente de Asesoría Estudiantil",
          description:
            "Automatizó asesorías estudiantiles, reduciendo 80% del personal y tiempos, gestionando solicitudes, respuestas y registros personalizados.",
          tags: ["Python", "LangChain", "ChromaDB", "Api de Whatsapp"],
        },
        {
          title: "Agente Autónomo de Automatización",
          description:
            "Despliegue de agentes inteligentes que optimizan flujos de trabajo en entornos académicos.",
          tags: ["LangGraph", "Gemini", "Docker"],
        },
        {
          title: "Sistema de alerta temprana basado en IA para promover la permanencia estudiantil",
          description:
            "Implementación de modelos de aprendizaje automático para predecir riesgo de deserción estudiantil en la universidad ITM",
          tags: ["Python", "Machine y Deep Learning", "LLM", "Power BI"],
        },
        {
          title: "Chatbot inteligente para portafolio personal",
          description:
            "Chatbot basado en RAG que responde preguntas sobre mi experiencia, formación, proyectos, habilidades y trayectoria profesional.",
          tags: ["Docker", "RAG", "LLM", "Api de Gemini", "Next.js", "Google Cloud Run"],
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
        inputPlaceholder: "Escribe tu pregunta..."
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
          "title": "Intelligent Student Advising Chatbot",
          "description": "Automated student advising by managing requests, responses, and personalized records, reducing staffing needs and response times by 80%.",
          "tags": ["Python", "LangChain", "ChromaDB", "WhatsApp API"]
        },
        {
          title: "Autonomous Automation Agent",
          description:
            "Deployment of intelligent agents that optimize workflows in academic environments.",
          tags: ["LangGraph", "Gemini", "Docker"],
        },
        {
          "title": "AI-Based early warning system to promote student retention",
          "description": "Implementation of machine learning models to predict the risk of student dropout at ITM University.",
          "tags": ["Python", "Machine Learning & Deep Learning", "LLM", "Power BI"]
        },
        {
          "title": "Intelligent Chatbot for Personal Portfolio",
          "description": "RAG-based chatbot that answers questions about my experience, education, projects, skills, and professional background.",
          "tags": ["Docker", "RAG", "LLM", "Gemini API", "Next.js", "Google Cloud Run"]
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
        inputPlaceholder: "Type your question..."
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
          "title": "Chatbot Inteligente para Assessoria Estudantil",
          "description": "Automatizou a assessoria estudantil, gerenciando solicitações, respostas e registros personalizados, reduzindo em 80% a necessidade de pessoal e o tempo de atendimento.",
          "tags": ["Python", "LangChain", "ChromaDB", "API do WhatsApp"]
        },
        {
          title: "Agente Autónomo de Automação",
          description:
            "Implantação de agentes inteligentes que otimizam fluxos de trabalho em ambientes acadêmicos.",
          tags: ["LangGraph", "Gemini", "Docker"],
        },
        {
          "title": "Sistema de Alerta Precoce Baseado em IA para Promover a Permanência Estudantil",
          "description": "Implementação de modelos de aprendizado de máquina para prever o risco de evasão estudantil na universidade ITM.",
          "tags": ["Python", "Machine Learning e Deep Learning", "LLM", "Power BI"]
        },
        {
          "title": "Chatbot inteligente para portfólio pessoal",
          "description": "Chatbot baseado em RAG que responde a perguntas sobre minha experiência, formação, projetos, habilidades e trajetória profissional.",
          "tags": ["Docker", "RAG", "LLM", "API do Gemini", "Next.js", "Google Cloud Run"]
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
        inputPlaceholder: "Digite sua pergunta..."
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


const faqData = {
  mainTitle: "Preguntas Frecuentes",
  mainSubtitle: "Resolvemos tus dudas principales sobre mis servicios, proyectos y trayectoria profesional.",
  rows: [
    {
      id: "row-1",
      speed: "35s",
      direction: "left", // Desplazamiento hacia la izquierda
      faqItems: [
        {
          id: 1,
          question: "¿En qué tecnologías te especializas?",
          answer: "Principalmente en Python, Data Science, desarrollo de Chatbots RAG y automatizaciones con Google Workspace.",
        },
        {
          id: 2,
          question: "¿Cómo podemos iniciar un proyecto juntos?",
          answer: "Puedes contactarme a través de LinkedIn o enviarme un mensaje directo para coordinar una reunión inicial.",
        },
        {
          id: 3,
          question: "¿Ofreces asesorías o tutorías?",
          answer: "Sí, cuento con más de 3 años de experiencia dictando clases y capacitando en desarrollo y ciencia de datos.",
        },
      ],
    },
    {
      id: "row-2",
      speed: "45s",
      direction: "right", // Desplazamiento en sentido contrario
      faqItems: [
        {
          id: 4,
          question: "¿Integras modelos de IA en aplicaciones web?",
          answer: "Sí, construyo soluciones punta a punta utilizando LangChain, APIs de LLMs y despliegues en la nube.",
        },
        {
          id: 5,
          question: "¿Qué tipo de automatizaciones desarrollas?",
          answer: "Flujos de trabajo con Google Apps Script, KNIME y herramientas sin/con bajo código para optimizar procesos.",
        },
        {
          id: 6,
          question: "¿Dónde puedo ver tu CV actualizado?",
          answer: "Puedes descargarlo directamente desde el botón ubicado en la sección principal de este portafolio.",
        },
      ],
    },
  ],
};