# DevSecOps Portfolio and Learning Journal

This repository contains my DevSecOps portfolio and learning journal, built with [Docusaurus](https://docusaurus.io/) (React and TypeScript). The start page is a personal portfolio implemented from the Developer Akademie Figma design, with the sections Header, Hero, My Skills, My Project Highlights, Contact and Footer. Every project on the portfolio links to its documentation in the Docusaurus docs of this site, next to guides and a knowledge base about Linux, Git, containers and DevOps. The site is deployed automatically to GitHub Pages: <https://cookiecrack3r.github.io/my-dso-blog/>.

## Table of Contents

- [Quickstart](#quickstart)
  - [Prerequisites](#prerequisites)
  - [How to start](#how-to-start)
- [Usage](#usage)
  - [Configuration](#configuration)
  - [Start the development server](#start-the-development-server)
  - [Type check and build](#type-check-and-build)
  - [Portfolio](#portfolio)
  - [Change the portfolio content](#change-the-portfolio-content)
  - [Add a project](#add-a-project)
  - [Documentation and blog](#documentation-and-blog)
  - [Deployment](#deployment)
- [Repository Structure](#repository-structure)
- [Security Notes](#security-notes)

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer and npm
- [Git](https://git-scm.com/)
- [Docker](https://www.docker.com/products/docker-desktop) (only required for [deploying with NGINX](#nginx-with-docker))

### How to start

```bash
git clone https://github.com/CookieCrack3r/my-dso-blog.git
cd my-dso-blog
npm ci
cp example.env .env
npm start
```

The development server opens <http://localhost:3000/my-dso-blog/> (the path comes from `BASE_URL` in `.env`). Most changes are reloaded without restarting the server.

## Usage

### Configuration

`docusaurus.config.ts` reads its settings from environment variables. Locally they are loaded from `.env` (created from `example.env`); the GitHub Actions workflow copies `example.env` to `.env` before the build.

| Variable | Used for | Example |
| --- | --- | --- |
| `DEPLOYMENT_URL` | Public URL of the site without path (`url`) | `https://cookiecrack3r.github.io` |
| `BASE_URL` | Path the site is served from (`baseUrl`). Use `/` when the site runs at the root of a domain. | `/my-dso-blog/` |
| `GITHUB_ORG` / `GITHUB_PROJECT` | GitHub user and repository name (`organizationName`, `projectName`) | `CookieCrack3r` / `my-dso-blog` |
| `DEPLOYMENT_BRANCH` | Branch used by `docusaurus deploy` | `main` |
| `GIT_REPOSITORY_URL` | GitHub links in navbar and footer, "Edit this page" links | `https://github.com/CookieCrack3r/my-dso-blog` |
| `BLOG_ENABLED` | Set to `true` to enable the blog in `blog/` and add "Blog" links to navbar and footer. Defaults to `false`. | `true` |

### Start the development server

```bash
npm start
```

Use `npm start -- --port 4000` to choose another port.

### Type check and build

```bash
npm run typecheck   # TypeScript check of all components, no "any" types are used
npm run build       # static build in the build/ folder
npm run serve       # preview the build on http://localhost:3000/my-dso-blog/
```

The build fails on broken links, for example when a project points to a documentation page that does not exist.

### Portfolio

The portfolio is the start page of the site. `src/pages/index.tsx` composes the sections, each implemented as React component in its own kebab-case folder in `src/components` (component in `index.tsx`, styles in a CSS module named after the component):

| Section | Components |
| --- | --- |
| Header | `header` (menu bar that hides while scrolling down), `mobile-menu` (burger menu below 1024 px) |
| Hero | `hero`, `button` |
| My Skills | `my-skills`, `skill-card` (desktop grid), `skill-carousel` (mobile carousel) |
| My Project Highlights | `my-project-highlights`, `project-card`, `tech-tag`, `more-projects-link` |
| Contact | `contact` |
| Footer | `footer` (scroll-to-top button, copyright, legal notice link) |

Further files of the portfolio:

- `src/pages/index.module.css` contains the design tokens (colors, content width, spacing). They are scoped to the start page, so docs and blog keep the default Docusaurus theme.
- `src/theme/Navbar/index.tsx` wraps the Docusaurus navbar and hides it on the start page, because the portfolio renders its own header. On all other pages the navbar is shown, and its title leads back to the portfolio.
- `src/css/custom.css` loads the self-hosted font Quicksand from `src/css/fonts/quicksand`.
- The layout switches between the desktop and the mobile design at a viewport width of 1024 px (`@media (max-width: 1023px)` in the CSS modules).

### Change the portfolio content

All texts, links and images of the portfolio are kept in `src/data`, so no component has to be changed:

| File | Content |
| --- | --- |
| `src/data/profile.ts` | Name, greeting, job title, "about me" text, portrait, e-mail address, LinkedIn and GitHub links, contact texts. `\n` in a text starts a new line. |
| `src/data/navigation.ts` | Menu entries of the header. Each `href` points to the `id` of a section, e.g. `/#my-skills`. |
| `src/data/skills.ts` | Skills with label, icon and the bullet points of the mobile carousel. |
| `src/data/projects.ts` | Projects with description, image, technology tags, documentation link and GitHub link. `INITIAL_PROJECT_INDEX` selects the project shown first on desktop. |
| `src/data/technologies.ts` | Technology tags that can be assigned to a project. |
| `src/pages/legal-notice.md` | Legal notice ("Impressum"), linked in the footer. |

Images of the portfolio are stored in `static/img/portfolio` and referenced by their path relative to `static`, e.g. `/img/portfolio/projects/minecraft.webp`. Projects without an image show a placeholder tile.

### Add a project

1. Create the documentation page in `docs/projects/`, e.g. `docs/projects/my-project.md`.
2. Add an entry to `src/data/projects.ts` with `documentationUrl: '/docs/projects/my-project'` and the link to the GitHub repository.
3. Optionally add an image to `static/img/portfolio/projects/` and set `image`.
4. Run `npm run build` to verify that all links resolve.

### Documentation and blog

- `docs/projects/` contains the documentation of my projects, which the portfolio links to.
- `docs/guides/` and `docs/knowledge-base/` contain guides and notes. The sidebar is generated from the folder structure (`sidebars.ts`).
- `blog/` contains blog posts. They are only published when `BLOG_ENABLED=true`.

### Deployment

#### GitHub Pages

The site is deployed automatically by GitHub Actions:

- `.github/workflows/main.yml` runs on every push and pull request to `main` and calls `deploy.yaml`.
- `.github/workflows/deploy.yaml` installs the dependencies, copies `example.env` to `.env`, builds the site and uploads the `build` folder as Pages artifact. The deploy job only runs on `main` and publishes the artifact to GitHub Pages.
- `.github/workflows/create-pr.yaml` opens a pull request for every pushed feature branch, `check-open-pr.yaml` fails if a feature branch has no open pull request.

One-time setup: in the repository settings under **Settings → Pages → Build and deployment**, set the source to **GitHub Actions**.

#### NGINX with Docker

The `Dockerfile` builds the site with Node.js and serves the `build` folder with NGINX:

```bash
docker build -t my-dso-blog .
docker run -d --name my-dso-blog -p 8080:80 my-dso-blog
```

The site is then available at <http://localhost:8080>. Because `.env` is excluded from the build context (`.dockerignore`), `BASE_URL` falls back to `/`. Enable the blog with `--build-arg BLOG_ENABLED=true`. A step-by-step explanation is in the guide [Deploy Docusaurus with Docker and NGINX](./docs/guides/deploy-docusaurus-with-docker-and-nginx.md).

## Repository Structure

| Path | Description |
| --- | --- |
| `.github/workflows/` | GitHub Actions workflows: build and deploy to GitHub Pages, create and check pull requests for feature branches. |
| `blog/` | Blog posts and their metadata (`authors.yml`, `tags.yml`). |
| `docs/` | Documentation: `projects/` (project documentation linked from the portfolio), `guides/`, `knowledge-base/`. |
| `src/components/` | React components of the portfolio and `github-link-admonition`, an admonition with a GitHub link used in the docs. |
| `src/css/custom.css` | Global styles: Infima color overrides and the `@font-face` rules for Quicksand. |
| `src/css/fonts/quicksand/` | Self-hosted Quicksand font files and their license (`OFL.txt`). |
| `src/data/` | Content of the portfolio (profile, navigation, skills, projects, technologies). |
| `src/pages/` | `index.tsx` (portfolio start page) with `index.module.css`, `legal-notice.md` and `markdown-page.mdx` (example of a Markdown page). |
| `src/theme/Navbar/` | Wrapper around the Docusaurus navbar that hides it on the start page. |
| `static/` | Static assets served as they are: `img/portfolio/` (portfolio images and icons), logo, favicon, social card and images used in the docs. `.nojekyll` disables Jekyll on GitHub Pages. |
| `.dockerignore` | Files excluded from the Docker build context, including `.env` and `build/`. |
| `.gitignore` | Files excluded from Git, including `node_modules/`, `build/` and `.env`. |
| `babel.config.js` | Babel configuration used by Docusaurus. |
| `Dockerfile` | Builds the site and serves it with NGINX (see [NGINX with Docker](#nginx-with-docker)). |
| `Docusaurus-Blog-Checkliste.md` | Submission checklist of the previous course project (Docusaurus blog, German). |
| `docusaurus.config.ts` | Docusaurus configuration, reads the environment variables described in [Configuration](#configuration). |
| `example.env` | Template for `.env` with the public configuration values. |
| `LICENSE` | License of this project. |
| `package.json`, `package-lock.json` | Dependencies and npm scripts, locked versions used by the CI pipeline. |
| `pnpm-lock.yaml` | Lockfile for installing the dependencies with pnpm instead of npm. |
| `sidebars.ts` | Sidebar configuration of the docs. |
| `tsconfig.json` | TypeScript configuration for the editor and `npm run typecheck`. |

`build/`, `.docusaurus/`, `node_modules/` and `.env` are generated locally and not part of the repository.

## Security Notes

- No passwords, tokens, SSH keys or IP addresses are stored in this repository. `example.env` contains only public values; the real `.env` is ignored by Git and excluded from the Docker build context.
- Deployment to GitHub Pages uses the short-lived `GITHUB_TOKEN` of the workflow, no additional secret is required.
- External links of the portfolio open in a new tab with `rel="noopener noreferrer"`.
