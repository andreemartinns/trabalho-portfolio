/**
 * =============================================================
 *  MODEL — Camada de Dados
 *  Responsável por armazenar e fornecer todos os dados da
 *  aplicação. Nenhuma lógica de DOM ou apresentação aqui.
 * =============================================================
 */

const Model = (() => {

  // ----- Dados pessoais -----
  const profile = {
    name:      'Alex Ferreira',
    role:      'Full-Stack Developer',
    initials:  'AF',
    greeting:  'Olá, eu sou',
    subtitle:  'Transformo ideias complexas em experiências digitais elegantes. Código limpo, design que comunica, resultados que impressionam.',
    availableStatus: 'Disponível para projetos',

    about: {
      lead: 'Desenvolvedor apaixonado por criar soluções digitais que combinam performance e estética. Acredito que código bem escrito é uma forma de arte.',
      body: 'Com mais de 5 anos de experiência no desenvolvimento web, já liderei projetos para startups em crescimento e grandes corporações. Minha abordagem une boas práticas de engenharia com sensibilidade de design — porque produto bom tem que ser bonito e rápido.',
      highlights: [
        '🚀 Foco em performance e escalabilidade',
        '🎨 UI/UX como prioridade, não afterthought',
        '♻️  Clean Code & SOLID principles',
        '🌐 Open-source contributor',
      ],
      info: [
        { icon: '📍', label: 'Localização', value: 'São Paulo, Brasil' },
        { icon: '🎓', label: 'Formação',    value: 'Ciência da Computação — USP' },
        { icon: '💼', label: 'Disponível',  value: 'Freelance & CLT' },
        { icon: '🌐', label: 'Idiomas',     value: 'PT-BR / EN / ES' },
      ],
    },

    stats: {
      projects: 40,
      years:    5,
      clients:  28,
    },
  };

  // ----- Projetos -----
  const projects = [
    {
      id:       'proj-1',
      title:    'NexBank Dashboard',
      category: 'Full-Stack',
      tags:     ['React', 'Node.js', 'PostgreSQL'],
      description: 'Plataforma financeira com dashboard analítico em tempo real, autenticação JWT e relatórios exportáveis.',
      emoji:    '🏦',
      accent:   '#00d4ff',
      live:     '#',
      repo:     '#',
      featured: true,
    },
    {
      id:       'proj-2',
      title:    'ShopFlow E-commerce',
      category: 'Frontend',
      tags:     ['Vue 3', 'Pinia', 'Stripe API'],
      description: 'Loja virtual com checkout integrado, carrinho persistente, filtros avançados e painel do lojista.',
      emoji:    '🛒',
      accent:   '#a855f7',
      live:     '#',
      repo:     '#',
      featured: true,
    },
    {
      id:       'proj-3',
      title:    'DevCollab API',
      category: 'Backend',
      tags:     ['Express', 'MongoDB', 'WebSocket'],
      description: 'API RESTful para gestão de projetos colaborativos com chat em tempo real via WebSocket.',
      emoji:    '🔌',
      accent:   '#10b981',
      live:     '#',
      repo:     '#',
      featured: false,
    },
    {
      id:       'proj-4',
      title:    'MindMap AI',
      category: 'IA & Web',
      tags:     ['Python', 'FastAPI', 'OpenAI'],
      description: 'Ferramenta de geração de mapas mentais via IA com exportação em SVG e PDF.',
      emoji:    '🧠',
      accent:   '#f59e0b',
      live:     '#',
      repo:     '#',
      featured: false,
    },
    {
      id:       'proj-5',
      title:    'HealthTrack Mobile',
      category: 'Mobile',
      tags:     ['React Native', 'Firebase', 'HealthKit'],
      description: 'App de monitoramento de saúde pessoal com gráficos de progresso e lembretes inteligentes.',
      emoji:    '💪',
      accent:   '#ef4444',
      live:     '#',
      repo:     '#',
      featured: false,
    },
    {
      id:       'proj-6',
      title:    'DesignSystem.io',
      category: 'Design System',
      tags:     ['Storybook', 'SCSS', 'Figma Tokens'],
      description: 'Design system corporativo com componentes documentados, tokens de design e guia de uso.',
      emoji:    '🎨',
      accent:   '#ec4899',
      live:     '#',
      repo:     '#',
      featured: false,
    },
  ];

  // ----- Habilidades -----
  const skills = [
    {
      category: 'Frontend',
      icon: '🖥️',
      items: [
        { name: 'HTML & CSS',    level: 95 },
        { name: 'JavaScript',    level: 92 },
        { name: 'React / Next',  level: 88 },
        { name: 'Vue 3',         level: 80 },
        { name: 'TypeScript',    level: 82 },
      ],
    },
    {
      category: 'Backend',
      icon: '⚙️',
      items: [
        { name: 'Node.js',       level: 88 },
        { name: 'Python / FastAPI', level: 78 },
        { name: 'PostgreSQL',    level: 82 },
        { name: 'MongoDB',       level: 75 },
        { name: 'REST & GraphQL',level: 85 },
      ],
    },
    {
      category: 'DevOps & Tools',
      icon: '🔧',
      items: [
        { name: 'Git & GitHub',  level: 92 },
        { name: 'Docker',        level: 72 },
        { name: 'AWS / Vercel',  level: 68 },
        { name: 'CI/CD',         level: 70 },
        { name: 'Linux / Bash',  level: 75 },
      ],
    },
    {
      category: 'Design & UX',
      icon: '🎨',
      items: [
        { name: 'Figma',         level: 80 },
        { name: 'UI/UX Principles', level: 85 },
        { name: 'Acessibilidade',level: 88 },
        { name: 'Design Systems',level: 78 },
        { name: 'Animações CSS', level: 84 },
      ],
    },
  ];

  // ----- Contato -----
  const contact = {
    intro: 'Tem um projeto incrível em mente? Estou pronto para transformá-lo em realidade. Me manda uma mensagem ou acessa minhas redes.',
    channels: [
      { icon: '📧', label: 'E-mail',    value: 'alex@dev.io',            href: 'mailto:alex@dev.io' },
      { icon: '💼', label: 'LinkedIn',  value: 'linkedin.com/in/alexdev', href: '#' },
      { icon: '🐙', label: 'GitHub',    value: 'github.com/alexdev',      href: '#' },
      { icon: '🐦', label: 'Twitter/X', value: '@alexdev',                href: '#' },
    ],
  };

  // ----- Footer -----
  const footer = {
    copy: `© ${new Date().getFullYear()} Alex Ferreira — Feito com 💙 e JavaScript puro`,
    socials: [
      { label: 'GitHub',    icon: '🐙', href: '#' },
      { label: 'LinkedIn',  icon: '💼', href: '#' },
      { label: 'Twitter/X', icon: '🐦', href: '#' },
      { label: 'Dribbble',  icon: '🏀', href: '#' },
    ],
  };

  // ----- API pública do Model -----
  return {
    getProfile:  () => ({ ...profile }),
    getProjects: () => [...projects],
    getSkills:   () => [...skills],
    getContact:  () => ({ ...contact }),
    getFooter:   () => ({ ...footer }),
  };

})();