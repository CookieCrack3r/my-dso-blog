# Baby Tools

Baby Tools World is a simple full stack shop application written in Python with Django. In this project I
containerized the application so it can be built as an image and started with a single `docker run` command,
with all environment-specific configuration provided through an `.env` file.

## TOC

- [Quickstart](#quickstart)
- [Description](#description)
  - [1. Application](#1-application)
  - [2. Configuration](#2-configuration)
  - [3. Code quality and tests](#3-code-quality-and-tests)
  - [4. Containerization](#4-containerization)
- [Further References](#further-references)

import GithubLinkAdmonition from '@site/src/components/github-link-admonition';

<GithubLinkAdmonition
    link="https://github.com/CookieCrack3r/baby-tools-world"
    title="Github Tip"
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

**Prerequisites:** Python, an OCI-compliant container engine (e.g. Docker or Podman) and Git.

1. Clone the repository and create your local configuration:

   ```bash
   git clone https://github.com/CookieCrack3r/baby-tools-world.git
   cd baby-tools-world
   cp example.env .env
   ```

2. Build the image and start a container:

   ```bash
   docker build -t baby-tools-world:local .
   docker run --rm -it -p 8000:8000 --env-file .env baby-tools-world:local
   ```

3. Open [http://localhost:8000](http://localhost:8000).

## Description

### 1. Application

The Django project lives in `src` and is split into two apps:

- `products` manages product listings and categories
- `users` handles user authentication and registration

Each app encapsulates its own `models.py`, `views.py`, `urls.py` and `admin.py`. Initial categories and test products
can be created with the management command `python manage.py seed_db`.

### 2. Configuration

The application reads its configuration from environment variables. `example.env` is the template for the local
`.env` file, which is never committed:

| Variable | Default | Description |
| --- | --- | --- |
| `ALLOWED_HOSTS` | `localhost, 127.0.0.1, 0.0.0.0` | Comma-separated list of hosts the application answers to. |
| `DEBUG` | `True` | `True` for development, `False` for production. |

### 3. Code quality and tests

- `black .` formats the code and `isort .` sorts the imports. A CI workflow checks both on every push.
- The Django test runner discovers all files containing `test` in their name: `python manage.py test` (run in `src`).
- For production the application is served by a WSGI server such as Gunicorn (or Waitress on Windows).

### 4. Containerization

The `Dockerfile` builds an image that contains the application and its dependencies. The container publishes port
`8000`, and environment-specific values are injected at runtime with `--env-file`, so the same image can be used in
every environment without rebuilding it.

```bash
# build the image: "baby-tools-world" is the image name, "local" the tag
docker build -t baby-tools-world:local .

# start a container and overwrite the predefined configuration with your .env file
docker run --rm -it -p 8000:8000 --env-file .env baby-tools-world:local
```

## Further References

- [Django documentation](https://docs.djangoproject.com/)
- [Dockerfile reference](https://docs.docker.com/reference/dockerfile/)
- [Gunicorn](https://docs.gunicorn.org/)
