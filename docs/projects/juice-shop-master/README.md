# Juice Shop Master

This project documents how I identified, exploited and mitigated selected security vulnerabilities in the
[OWASP Juice Shop](https://owasp.org/www-project-juice-shop/), an intentionally insecure web application built for
security training. For each challenge I explain the vulnerability, the steps needed to exploit it, the risks it poses
for a real application and how to fix it. Every challenge comes with a short video (max. 5 minutes) that walks through
the attack step by step.

:::warning[Educational purpose only]

The content of this documentation is for **educational purposes only**. All attacks were performed against a local,
intentionally vulnerable Juice Shop instance. Never use these techniques against systems you do not own or are not
explicitly authorized to test.

:::

## Table of Contents

- [Quickstart](#quickstart)
- [Challenges](#challenges)
- [Project Structure](#project-structure)
- [Tools and Resources](#tools-and-resources)
- [Security Notes](#security-notes)

## Quickstart

**Prerequisites:** [Docker](https://www.docker.com/products/docker-desktop) and a browser with developer tools.

1. Pull and start OWASP Juice Shop:

   ```bash
   docker pull bkimminich/juice-shop
   docker run --rm -p 127.0.0.1:3000:3000 bkimminich/juice-shop
   ```

   The port is bound to the loopback interface only, so the vulnerable application is not reachable from the network.

2. Open [http://localhost:3000](http://localhost:3000) in your browser.

3. Pick a challenge from the [overview below](#challenges) and follow its documentation and video.

4. Stop the container with `Ctrl+C`. Because of `--rm` the container is removed and all progress is reset.

## Challenges

| # | Challenge | Category | Difficulty | Video |
|---|-----------|----------|------------|-------|
| 1 | _tbd_ | _tbd_ | _tbd_ | _tbd_ |
| 2 | _tbd_ | _tbd_ | _tbd_ | _tbd_ |

### 1. Challenge Name

- **Category:** _tbd_
- **Documentation:** _tbd_
- **Video:** _tbd_

**Risks and consequences:** _Short explanation of what an attacker can do with this vulnerability and what the
consequences for a real company or its users could be._

### 2. Challenge Name

- **Category:** _tbd_
- **Documentation:** _tbd_
- **Video:** _tbd_

**Risks and consequences:** _tbd_

## Project Structure

```text
juice-shop-master/
├── README.md               # Project overview (this page)
├── _challenge-template.md  # Template for new challenge docs (not rendered by Docusaurus)
└── <challenge-name>/       # One folder per challenge (kebab-case)
    ├── README.md           # Challenge documentation
    └── img/                # Screenshots and diagrams
```

## Tools and Resources

- [OWASP Juice Shop](https://github.com/juice-shop/juice-shop) – the vulnerable target application
- [Pwning OWASP Juice Shop](https://pwning.owasp-juice.shop/) – official companion guide
- [OWASP Top 10](https://owasp.org/Top10/) – classification of the most critical web application risks
- Browser developer tools (network tab, console, storage)

## Security Notes

- All attacks were performed against a local instance only.
- No real personal data was used. All accounts and inputs are fictional.
- This repository contains no SSH keys, passwords, tokens or IP addresses.
