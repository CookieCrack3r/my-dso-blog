---
title: "DOM XSS"
sidebar_label: "2. DOM XSS"
---

# DOM XSS

:::note For educational purposes only. Performed on a local Juice Shop instance.
:::

| | |
|---|---|
| **Category** | Cross-Site Scripting (XSS) |
| **OWASP Top 10** | [A03:2021 – Injection](https://owasp.org/Top10/A03_2021-Injection/) |
| **Difficulty** | ⭐ |
| **Goal** | Perform a DOM-based XSS attack. |
| **Video** | _TODO: add link_ |

[⬅️ Back to overview](../README.md)

## Table of Contents

- [Vulnerability Explained](#vulnerability-explained)
- [Risks and Consequences](#risks-and-consequences)
- [Exploitation](#exploitation)
- [Mitigation](#mitigation)
- [References](#references)

## Vulnerability Explained

_TODO (2–4 sentences): Which input is written into the DOM without sanitization, and why does the browser execute it as code?_

## Risks and Consequences

- Session hijacking; theft of cookies or tokens
- Actions performed in the victim's name
- Phishing via manipulated page content and malware distribution

## Exploitation

_TODO: Document your own steps. Add screenshots to `./images/`._

1. _Which field / URL parameter is vulnerable?_
2. _What input did you use?_
3. _How did you confirm code execution?_

{/* TODO: add screenshot, then uncomment:
![Step 1](./images/step-1.png)
*/}

## Mitigation

- Contextual output encoding when writing untrusted data into the DOM
- Avoid dangerous sinks (`innerHTML`, `bypassSecurityTrust*`); prefer safe APIs
- Content Security Policy (CSP) as a defense in depth

## References

- [OWASP: DOM Based XSS](https://owasp.org/www-community/attacks/DOM_Based_XSS)
- [OWASP: XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
