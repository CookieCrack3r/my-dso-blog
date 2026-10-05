# Docusaurus Blog

This project documents how I set up and personalized my DevSecOps learning journal. It is based on the
Developer Akademie Docusaurus starter template and is deployed automatically to GitHub Pages.

## TOC

- [Quickstart](#quickstart)
- [Description](#description)
  - [1. Feature branch](#1-feature-branch)
  - [2. Environment variables](#2-environment-variables)
  - [3. Site configuration](#3-site-configuration)
  - [4. Navbar and footer](#4-navbar-and-footer)
  - [5. README](#5-readme)
  - [6. GitHub Pages settings](#6-github-pages-settings)
- [Further References](#further-references)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition
    link="https://github.com/CookieCrack3r/my-dso-blog"
    title="Github Tip"
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

1. Clone the repository and install the dependencies:

   ```bash
   git clone git@github.com:CookieCrack3r/my-dso-blog.git
   cd my-dso-blog
   npm install
   ```

2. Create a local `.env` file from the example:

   ```bash
   cp example.env .env
   ```

3. Start the development server or create a production build:

   ```bash
   npm run start
   npm run build
   ```

## Description

### 1. Feature branch

All changes were made on the feature branch `setup-blog` and merged into `main` via a pull request.
A workflow in `.github/workflows/create-pr.yaml` automatically opens the pull request when the branch is pushed.

### 2. Environment variables

The configuration reads its values from environment variables (loaded with `dotenv`).
I added `GIT_REPOSITORY_URL` to `example.env`:

```bash
DEPLOYMENT_URL=https://cookiecrack3r.github.io
DEPLOYMENT_BRANCH=main
BASE_URL=/my-dso-blog/
GITHUB_ORG=CookieCrack3r
GITHUB_PROJECT=my-dso-blog
GIT_REPOSITORY_URL=https://github.com/CookieCrack3r/my-dso-blog
```

In `docusaurus.config.ts` a variable reads the value or falls back to a default, following the
existing `blogEnabled` variable:

```ts
const gitRepositoryUrl = process.env.GIT_REPOSITORY_URL ?? 'https://github.com/CookieCrack3r/my-dso-blog'
```

The `example.env` file only contains public values. The real `.env` file is ignored via `.gitignore`.

### 3. Site configuration

In `docusaurus.config.ts` I changed:

- `title` and `tagline` to describe my learning journal
- the default `url` to `https://cookiecrack3r.github.io`
- the `editUrl` of both the `docs` and the `blog` preset to use `gitRepositoryUrl`

### 4. Navbar and footer

- Navbar `title` and logo `alt` text were personalized, the GitHub item links to `gitRepositoryUrl`
- Footer:
  - the **Docs** column got a link to the projects page (`/docs/projects`)
  - the **Community** column was removed
  - the **More** column links to my repository and to the template repository (label `Template`)
  - the copyright message was personalized and extended with "extended from the developer-akademie-starter"
- Since the Community column was removed, the index used to append the optional blog link to the
  **More** column was changed from `links[2]` to `links[1]`.

### 5. README

- The deployment section now explains that the site is deployed automatically to GitHub Pages by a
  GitHub Actions workflow whenever a commit is pushed to `main`
- References to the old manual deployment were updated
- The contributing section was removed
- All files in the repository root are listed and described

### 6. GitHub Pages settings

In the repository settings under **Settings → Pages → Build and deployment** the source was set to
**GitHub Actions**. The workflow `.github/workflows/main.yml` calls `deploy.yaml`, which builds the site and
deploys it on every push to `main`.

## Further References

- [Docusaurus documentation](https://docusaurus.io/docs)
- [Deploying Docusaurus to GitHub Pages](https://docusaurus.io/docs/deployment#deploying-to-github-pages)
- [Template repository](https://github.com/Developer-Akademie-DevSecOpsKurs/dev-blog-template)
