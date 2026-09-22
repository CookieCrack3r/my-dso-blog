---
title: Juice Shop Master
sidebar_position: 1
---

# Juice Shop Master

This project documents the exploitation and mitigation of selected security vulnerabilities in the [OWASP Juice Shop](https://owasp.org/www-project-juice-shop/), an intentionally insecure web application. Each challenge covers a different vulnerability category, explains how the attack works, which risks it poses and how it can be prevented. Every challenge comes with a short video (max. 5 minutes) that demonstrates the attack step by step.

:::warning Disclaimer
The content of this documentation is intended **for educational purposes only**. All attacks were performed against a local, intentionally vulnerable Juice Shop instance. Never apply these techniques to systems you do not own or are not explicitly authorized to test.
:::

## Table of Contents

- [Quickstart](#quickstart)
- [Challenges](#challenges)
- [Tools Used](#tools-used)
- [Security Notes](#security-notes)

## Quickstart

1. Install [Docker](https://docs.docker.com/get-docker/).
2. Start a local Juice Shop instance:

   ```bash
   docker run --rm -p 3000:3000 bkimminich/juice-shop
   ```

3. Open `http://localhost:3000` in your browser.
4. Open the Score Board (`http://localhost:3000/#/score-board`) to track solved challenges.
5. Pick a challenge below, read the documentation and follow the video.

## Challenges

Each challenge comes from a different vulnerability category, as required by the assignment.

| # | Challenge | Category | Difficulty | Documentation |
|---|-----------|----------|------------|---------------|
| 1 | Login Admin | Injection (SQLi) | ⭐⭐ | [Docs](./login-admin/README.md) |
| 2 | DOM XSS | Cross-Site Scripting | ⭐ | [Docs](./dom-xss/README.md) |
| 3 | View Basket | Broken Access Control | ⭐⭐ | [Docs](./view-basket/README.md) |

Each challenge page contains: the vulnerability explained, risks & consequences, the exploitation steps, the mitigation, a link to the demonstration video and references.

## Tools Used

- [OWASP Juice Shop](https://github.com/juice-shop/juice-shop) (Docker)
- Browser Developer Tools
- _TODO: e.g. Burp Suite Community Edition / OWASP ZAP_

## Security Notes

- Only fictional test data was used — no real personal data.
- No passwords, tokens, SSH keys, IP addresses or other sensitive information are stored in this repository.
- All tests were performed on a local instance (`localhost`).
