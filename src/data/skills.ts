export interface Skill {
  /** Label on the desktop skill cards. "\n" forces a line break. */
  name: string;
  /** Shorter label used in the mobile carousel. */
  shortName: string;
  /** Icon path relative to /static. */
  icon: string;
  /** Icon size on the desktop cards in px. The mobile carousel scales icons to 45px height. */
  iconWidth: number;
  iconHeight: number;
  /** Bullet points shown in the mobile carousel. */
  highlights: string[];
}

export const skills: Skill[] = [
  {
    name: 'HTML',
    shortName: 'HTML',
    icon: '/img/portfolio/skills/html.svg',
    iconWidth: 70.57,
    iconHeight: 80,
    highlights: [
      'User-friendly navigation menus',
      'Responsive web design',
      'Contact forms and login pages',
      'Transitions, animations and hover effect',
    ],
  },
  {
    name: 'CSS',
    shortName: 'CSS',
    icon: '/img/portfolio/skills/css.svg',
    iconWidth: 70.57,
    iconHeight: 80,
    highlights: [
      'User-friendly navigation menus',
      'Responsive web design',
      'Contact forms and login pages',
      'Transitions, animations and hover effect',
    ],
  },
  {
    name: 'Static site\ngenerator',
    shortName: 'Static\nsite',
    icon: '/img/portfolio/skills/static-site-generator.svg',
    iconWidth: 80,
    iconHeight: 80,
    highlights: [
      'search functionality',
      'static website and customization',
      'tags, categories, and RSS feeds',
      'translation',
    ],
  },
  {
    name: 'Python',
    shortName: 'Python',
    icon: '/img/portfolio/skills/python.svg',
    iconWidth: 80.35,
    iconHeight: 80,
    highlights: [
      'Build APIs',
      'spam filtering, recommendation systems',
      'automate software testing',
      'using libraries: Tkinter, Kivy',
    ],
  },
  {
    name: 'Shell\nscripting',
    shortName: 'Shell\nscripting',
    icon: '/img/portfolio/skills/shell-scripting.svg',
    iconWidth: 80,
    iconHeight: 80,
    highlights: [
      'User-friendly navigation menus',
      'Responsive web design',
      'Contact forms and login pages',
      'Animations and hover effect',
    ],
  },
  {
    name: 'Yaml',
    shortName: 'Yaml',
    icon: '/img/portfolio/skills/yaml.svg',
    iconWidth: 87.03,
    iconHeight: 80,
    highlights: [
      'A Kubernetes deployment',
      'database connections',
      'environment-specific variables',
      'complex data structures represent lists and maps',
    ],
  },
  {
    name: 'Container',
    shortName: 'Container',
    icon: '/img/portfolio/skills/container.svg',
    iconWidth: 96,
    iconHeight: 74,
    highlights: [
      'CI/CD pipelines',
      'automate building, testing, deploying applications.',
      'use microservices',
    ],
  },
  {
    name: 'CI/CD with\nGitHub Actions',
    shortName: 'CI/CD',
    icon: '/img/portfolio/skills/ci-cd.svg',
    iconWidth: 80,
    iconHeight: 80,
    highlights: [
      'Automated builds and tests',
      'pre-built actions',
      'push, pull request, schedule',
      'Automated deployments',
    ],
  },
  {
    name: 'IT Security',
    shortName: 'IT\nSecurity',
    icon: '/img/portfolio/skills/it-security.png',
    iconWidth: 80,
    iconHeight: 80,
    highlights: [
      'simulate attacks and identify vulnerabilities',
      'Setting up multi-factor authentication',
      'login security',
      'Implement authentication & authorization mechanisms',
    ],
  },
];

/** Number of skills per page in the mobile carousel. */
export const SKILLS_PER_CAROUSEL_PAGE = 3;
