import type {TechnologyId} from './technologies';

export interface Project {
  name: string;
  /** Optional addition rendered in regular weight after the name, e.g. "(Container)". */
  nameSuffix?: string;
  /** "\n" forces a line break. */
  description: string;
  /** Image path relative to /static. Projects without an image show a placeholder. */
  image?: string;
  technologies: TechnologyId[];
  /** Project documentation in this Docusaurus site, e.g. "/docs/projects/baby-tools". */
  documentationUrl: string;
  githubUrl: string;
}

export const projects: Project[] = [
  {
    name: 'Baby Tools',
    description: [
      'A full stack shop application written in Python with Django.',
      'I containerized it so it can be built as an image and started with a single docker run command.',
      'All environment-specific settings are injected at runtime through an .env file.',
    ].join('\n'),
    technologies: ['python', 'container', 'ci-cd'],
    documentationUrl: '/docs/projects/baby-tools',
    githubUrl: 'https://github.com/CookieCrack3r/baby-tools-world',
  },
  {
    name: 'Truck Signs API',
    description: [
      'The Django REST Framework backend of an online store for truck vinyls.',
      'GitHub Actions builds the image and publishes it to the GitHub Container Registry.',
      'Docker Compose runs it together with a PostgreSQL database that is only reachable inside the Compose network.',
    ].join('\n'),
    technologies: ['python', 'container', 'ci-cd', 'yaml'],
    documentationUrl: '/docs/projects/truck-signs-api',
    githubUrl: 'https://github.com/CookieCrack3r/truck-sign',
  },
  {
    name: 'Juice Shop Master',
    description: [
      'Security challenges in the OWASP Juice Shop, an intentionally insecure web application.',
      'For each challenge I document the vulnerability, how to exploit it, the risk for a real application and how to fix it.',
    ].join('\n'),
    technologies: ['it-security', 'container'],
    documentationUrl: '/docs/projects/juice-shop-master',
    githubUrl: 'https://github.com/CookieCrack3r/my-dso-blog/tree/main/docs/projects/juice-shop-master',
  },
  {
    name: 'Minecraft',
    description: [
      'A self-built Docker image for a vanilla Minecraft Java Edition server.',
      'The server configuration is rendered from the .env file at every start.',
      'The world is stored in a named volume and the container restarts automatically after a crash.',
    ].join('\n'),
    image: '/img/portfolio/projects/minecraft.webp',
    technologies: ['container', 'shell-scripting', 'yaml'],
    documentationUrl: '/docs/projects/minecraft-server',
    githubUrl: 'https://github.com/CookieCrack3r/Minecraft_DA',
  },
  {
    name: 'WordPress Hosting',
    description: [
      'WordPress with a MySQL database, operated with Docker Compose.',
      'Configured through a local .env file, with persistent data in named volumes, a database healthcheck and automatic restarts.',
    ].join('\n'),
    image: '/img/portfolio/projects/wordpress.jpg',
    technologies: ['container', 'yaml'],
    documentationUrl: '/docs/projects/wordpress-hosting',
    githubUrl: 'https://github.com/CookieCrack3r/Wordpress_DA',
  },
];

/** Project that is selected initially in the desktop project list. */
export const INITIAL_PROJECT_INDEX = 3;
