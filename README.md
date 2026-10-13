# My Developer Blog

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Repository Description

This repository hosts a developer blog built with Docusaurus. It includes tools and scripts for creating, managing, and deploying static web content. The software supports rapid local development, customizable theming, and seamless deployment to platforms like GitHub Pages or NGINX.

## Table of Contents

- [My Developer Blog](#my-developer-blog)
  - [Repository Description](#repository-description)
  - [Table of Contents](#table-of-contents)
  - [Quickstart](#quickstart)
    - [Prerequisites](#prerequisites)
  - [Repository Structure](#repository-structure)
  - [Deployment](#deployment)
    - [Deploy to Github Pages](#deploy-to-github-pages)
    - [Deploying using NGINX](#deploying-using-nginx)

## Quickstart

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later recommended)
- [pnpm](https://pnpm.io/) (package manager for faster and more efficient dependency handling)
- [Docker](https://www.docker.com/products/docker-desktop) (only required if [deploying using NGINX](#deploying-using-nginx))

1. Installation

   ```
   $ pnpm install
   ```

2. Local Development

   ```
   $ pnpm start
   ```

   This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

3. Build

   ```
   $ pnpm build
   ```

   This command generates static content into the `build` directory and can be served using any static contents hosting service.

4. Deployment

   The website is deployed automatically to GitHub Pages. See the [Deployment](#deployment) section below.

## Repository Structure

The repository is organized as follows:

- `blog/`: Contains markdown files for blog posts. Blog-related metadata is automatically picked up by the Docusaurus configuration.
- `docs/`: Contains markdown files for documentation. These files are referenced in `sidebars.ts` to define the sidebar structure.
- `src/`: Contains custom React components, CSS, and JavaScript for additional functionality or theming.
- `static/`: Stores static assets (e.g., images, icons) served directly without processing.
- `sidebars.ts`: Configures the structure of sidebars in the documentation section.
- `docusaurus.config.ts`: Main configuration file for customizing and managing Docusaurus behavior.
- `build/`: Generated after running the `pnpm build` command. Contains the static website files ready for deployment.
- `.github/workflows/`: GitHub Actions workflows that build the site, deploy it to GitHub Pages and create/check pull requests for feature branches.
- `example.env`: Template for the environment variables used by `docusaurus.config.ts` (deployment URL, base URL, GitHub org/project and `GIT_REPOSITORY_URL`). Copy it to `.env` for local development. Never commit your `.env` file.
- `Dockerfile` / `.dockerignore`: Build the site and serve it with NGINX in a container (see [Deploying using NGINX](#deploying-using-nginx)).
- `package.json`, `package-lock.json`, `pnpm-lock.yaml`: Project dependencies and scripts (npm and pnpm lockfiles).
- `babel.config.js`, `tsconfig.json`: Babel and TypeScript configuration used by Docusaurus.
- `LICENSE`: License of this project.

New content can be added as follows:

- Add new documentation files to the `docs/` folder.
- Add new blog posts to the `blog/` folder. No additional configuration is required.

## Deployment

### Deploy to Github Pages

The website is deployed automatically to GitHub Pages by a prepared GitHub Actions workflow whenever a commit is pushed to the `main` branch. No manual deployment step is required.

### Deploying using NGINX

To deploy the site using NGINX and Docker, follow this [guide](./docs/guides/deploy-docusaurus-with-docker-and-nginx.md)
title
gitRepositoryUrl.

