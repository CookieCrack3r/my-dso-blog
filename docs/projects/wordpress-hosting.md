# WordPress Hosting

In this project I host WordPress with a MySQL database using Docker Compose. The stack is configured through a local
`.env` file, keeps its data in named volumes and restarts automatically after a crash.

## TOC

- [Quickstart](#quickstart)
- [Description](#description)
  - [1. Services](#1-services)
  - [2. Configuration](#2-configuration)
  - [3. Applying changes](#3-applying-changes)
  - [4. Data and persistence](#4-data-and-persistence)
  - [5. Testing](#5-testing)
- [Further References](#further-references)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition
    link="https://github.com/CookieCrack3r/Wordpress_DA"
    title="Github Tip"
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

**Prerequisites:** Git and Docker Engine with the Compose plugin.

```bash
git clone https://github.com/CookieCrack3r/Wordpress_DA.git
cd Wordpress_DA
cp .env.example .env    # then set a real MYSQL_PASSWORD
docker compose up -d
```

Open [http://localhost:8080](http://localhost:8080) (or the `HOST_PORT` you configured) and run the WordPress install
wizard.

## Description

### 1. Services

`docker-compose.yaml` defines two services:

- `wordpress`: the pinned WordPress image, connected to the database and published on `HOST_PORT`
- `db`: MySQL with a healthcheck, so WordPress only starts once the database is ready

Both services use a restart policy, so they come back automatically after a crash.

### 2. Configuration

| Variable | Default | Description |
| --- | --- | --- |
| `HOST_PORT` | `8080` | Port published on the host. Apache always listens on `80` inside the container. |
| `MYSQL_DATABASE` | `wordpress` | Database name, created on the first start. |
| `MYSQL_USER` | `wordpress` | Database user, created on the first start. |
| `MYSQL_PASSWORD` | – | Database password. Set a real value before the first start. |

The MySQL root account gets a random throwaway password (`MYSQL_RANDOM_ROOT_PASSWORD`), WordPress never uses root.
The `MYSQL_*` values only take effect on the first start, when the database is initialized.

### 3. Applying changes

| Change | Command |
| --- | --- |
| `.env`, e.g. `HOST_PORT` | `docker compose up -d` |
| Image tag in `docker-compose.yaml` | `docker compose up -d` |
| Reset everything (deletes site and database) | `docker compose down -v` |

### 4. Data and persistence

WordPress files (themes, plugins, uploads) are stored in the named volume `wordpress`, the database in the named
volume `db`. `docker compose down` keeps both volumes, only `docker compose down -v` deletes them.

### 5. Testing

```bash
docker compose ps                  # both services "running", db "healthy"
docker compose logs -f wordpress   # Apache access and error log
curl -I http://localhost:8080      # HTTP 200 or a redirect to the install wizard
```

## Further References

- [WordPress Docker image](https://hub.docker.com/_/wordpress)
- [MySQL Docker image](https://hub.docker.com/_/mysql)
- [Docker Compose file reference](https://docs.docker.com/reference/compose-file/)
