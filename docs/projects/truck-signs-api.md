# Truck Signs API

**Signs for Trucks** is an online store for pre-designed vinyls with custom letterings. The Truck Signs API is its
Django REST Framework backend and admin panel. In this project I made the backend run as a container: GitHub Actions
builds the image and publishes it to the GitHub Container Registry, and a Docker Compose stack pulls that image
together with a PostgreSQL database, so nothing is built on the deployment host.

## TOC

- [Quickstart](#quickstart)
- [Description](#description)
  - [1. Architecture](#1-architecture)
  - [2. Configuration](#2-configuration)
  - [3. Image](#3-image)
  - [4. Data persistence](#4-data-persistence)
  - [5. CI/CD pipeline](#5-cicd-pipeline)
  - [6. API and admin](#6-api-and-admin)
- [Further References](#further-references)

import GithubLinkAdmonition from '@site/src/components/github-link-admonition';

<GithubLinkAdmonition
    link="https://github.com/CookieCrack3r/truck-sign"
    title="Github Tip"
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

**Prerequisites:** Docker Engine with the Compose v2 plugin and Git.

```bash
git clone https://github.com/CookieCrack3r/truck-sign.git
cd truck-sign

cp example.env .env      # then fill in the placeholders
docker compose up -d
docker compose logs -f backend
```

`SECRET_KEY` and `DB_PASSWORD` are required, Compose refuses to start without them. A key can be generated with
`openssl rand -base64 48`. The admin panel is then available at `http://<host>:8020/admin/`.

## Description

### 1. Architecture

The Compose stack consists of two services in one network:

- `backend`: the Django/DRF application served by Gunicorn, pulled from GHCR
- `db`: PostgreSQL 17

Only the backend publishes a port (`8020`). PostgreSQL is reachable exclusively from inside the Compose network. On
start, `entrypoint.sh` waits for the database, runs the migrations, collects the static files, creates the admin
account if configured and starts Gunicorn.

### 2. Configuration

All configuration comes from environment variables in the `.env` file next to `docker-compose.yml`. Nothing sensitive
is stored in the repository. Required values use the form `${VAR:?message}`, so Compose aborts with a clear message
instead of silently starting with an insecure default. The most important variables:

| Variable | Default | Description |
| --- | --- | --- |
| `SECRET_KEY` | required | Django signing key, unique per deployment. |
| `DB_PASSWORD` | required | PostgreSQL password, used by both services. |
| `DEBUG_ENABLED` | `False` | Never `True` on a public host. |
| `ALLOWED_HOSTS` | `localhost,127.0.0.1` | Add your server address, otherwise Django answers `400`. |
| `BACKEND_PORT` | `8020` | Host port of the backend. |
| `IMAGE_TAG` | `v1.0.1` | Image tag to deploy. |

### 3. Image

The `Dockerfile` is based on `python:3.12-slim`. `requirements.txt` is installed before the application code so the
dependency layer is cached, and the container runs as an unprivileged user (`UID 10001`).

### 4. Data persistence

Three named volumes keep the data across container restarts and host reboots:

| Volume | Mounted at |
| --- | --- |
| `postgres_data` | `/var/lib/postgresql/data` |
| `static_files` | `/app/src/staticfiles` |
| `media_files` | `/app/src/mediafiles` |

Only `docker compose down -v` deletes them.

### 5. CI/CD pipeline

| Workflow | Trigger | What it does |
| --- | --- | --- |
| `build.yaml` | push to `main`, tags, manual | Builds the image and pushes it to GHCR. |
| `test.yaml` | push/PR on `main` touching Python files | Runs `flake8`, `black --check`, `isort --check-only` and the Django test suite. |
| `check-open-pr.yaml` | push to any branch except `main` | Fails if the branch has no open pull request. |

### 6. API and admin

All API routes live under `/truck-signs/`, the admin panel under `/admin/`.

| Endpoint | Description |
| --- | --- |
| `/truck-signs/products/` | List products |
| `/truck-signs/categories/` | List categories |
| `/truck-signs/product-detail/<id>/` | Single product |
| `/truck-signs/order/<id>/create/` | Create an order |

## Further References

- [Docker Compose file reference](https://docs.docker.com/reference/compose-file/)
- [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry)
- [Django deployment checklist](https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/)
- [Django REST Framework](https://www.django-rest-framework.org/)
