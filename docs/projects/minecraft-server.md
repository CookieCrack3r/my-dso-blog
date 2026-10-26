# Minecraft Server

In this project I built my own Docker image for a vanilla Minecraft Java Edition server and operate it with Docker
Compose. The image is built from scratch on top of a plain Java runtime, every setting comes from a local `.env` file,
the world is stored in a named volume and the container restarts automatically if the server crashes.

## TOC

- [Quickstart](#quickstart)
- [Description](#description)
  - [1. Image](#1-image)
  - [2. Configuration](#2-configuration)
  - [3. Applying changes](#3-applying-changes)
  - [4. Data and persistence](#4-data-and-persistence)
  - [5. Testing](#5-testing)
- [Further References](#further-references)

import GithubLinkAdmonition from '@site/src/components/GithubLinkAdmonition';

<GithubLinkAdmonition
    link="https://github.com/CookieCrack3r/Minecraft_DA"
    title="Github Tip"
    type="tip"
>
Checkout this repository to see the code/implementation
</GithubLinkAdmonition>

## Quickstart

**Prerequisites:** Git and Docker Engine with the Compose plugin.

```bash
git clone https://github.com/CookieCrack3r/Minecraft_DA.git
cd Minecraft_DA

cp .env.example .env      # set EULA=true to accept the Mojang EULA
docker compose up -d --build
docker compose logs -f
```

As soon as the log shows `Done (…s)! For help, type "help"`, connect with the Minecraft Java client to
`<your-server-ip>:8888` (or `localhost:8888` when running locally).

## Description

### 1. Image

No prefabricated Minecraft image is used. The `Dockerfile`:

- starts from a plain Java runtime (`eclipse-temurin`)
- downloads the official vanilla `server.jar` from Mojang at build time, pinned via the download URL so builds are
  reproducible
- adds `entrypoint.sh`, which accepts the EULA, renders `server.properties` and starts the server with the configured
  JVM memory settings

The image contains no secrets and no environment-specific values.

### 2. Configuration

The `.env` file is the single source of truth for all configuration. At every container start, the entrypoint renders
`/data/server.properties` from the template `server.properties.example` with `envsubst`:

```properties
motd=${MOTD}
difficulty=${DIFFICULTY}
gamemode=${GAMEMODE}
max-players=${MAX_PLAYERS}
```

| Variable | Default | Description |
| --- | --- | --- |
| `EULA` | `false` | Must be `true` to accept the Mojang EULA, otherwise the server does not start. |
| `INIT_MEMORY` / `MAX_MEMORY` | `1G` / `2G` | Initial and maximum JVM heap size. |
| `HOST_PORT` | `8888` | Port published on the host. Inside the container the server listens on `25565`. |
| `MOTD` | `A Minecraft Server` | Server name shown in the client's server browser. |
| `DIFFICULTY` / `GAMEMODE` | `easy` / `survival` | Gameplay settings. |
| `MAX_PLAYERS` | `20` | Maximum number of simultaneous players. |

Every placeholder has a default baked into the image, because `envsubst` would otherwise replace undefined variables
with an empty string and produce a broken configuration.

### 3. Applying changes

| What changed | Command |
| --- | --- |
| `.env` or `docker-compose.yaml` | `docker compose up -d` |
| `Dockerfile`, `entrypoint.sh` or `server.properties.example` | `docker compose up -d --build` |

### 4. Data and persistence

The world lives in the named volume `mc-data`, mounted at `/data`. It survives restarts, container re-creation and
image rebuilds. Only `docker compose down -v` deletes it.

### 5. Testing

1. **Reachability:** add the server in the Minecraft client or query it with the `mcstatus` Python module.
2. **Persistence:** `docker compose down && docker compose up -d`, the world must still exist.
3. **Crash recovery:** `docker exec mc-server kill 1`, the restart policy brings the container back up.

## Further References

- [Minecraft server download](https://www.minecraft.net/en-us/download/server)
- [Minecraft EULA](https://aka.ms/MinecraftEULA)
- [Docker Compose file reference](https://docs.docker.com/reference/compose-file/)
