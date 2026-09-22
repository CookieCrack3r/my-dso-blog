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
| **Video** | _TODO: add unlisted link_ |

[⬅️ Back to overview](../README.md)

## Table of Contents

- [Vulnerability Explained](#vulnerability-explained)
- [Risks and Consequences](#risks-and-consequences)
- [Exploitation](#exploitation)
- [Mitigation](#mitigation)
- [References](#references)

## Vulnerability Explained

DOM-based XSS happens entirely in the browser: JavaScript reads attacker-controlled
input (here the search term) and writes it into the page's DOM without sanitizing
it. In Juice Shop the search result is rendered as **trusted HTML**, so any markup
in the search term becomes part of the page. By supplying an HTML tag that triggers
JavaScript, we get code execution in the victim's browser.

The unsafe pattern is binding untrusted input into HTML and explicitly marking it as
safe (e.g. Angular's `bypassSecurityTrustHtml`), which disables the framework's
built-in escaping.

## Risks and Consequences

- **Session hijacking:** theft of cookies or authentication tokens.
- **Actions in the victim's name:** the script runs with the victim's session.
- **Phishing / defacement:** injecting fake forms or manipulated page content.
- **Malware distribution:** redirecting users or loading malicious resources.

## Exploitation

**Precondition:** Juice Shop running at `http://localhost:3000`.

1. Click the search icon (🔍) in the top navigation bar.
2. Enter the following payload into the search field and confirm with Enter:

   ```html
   <iframe src="javascript:alert(`xss`)">
   ```

3. The payload is written into the DOM as an `<iframe>`. Its `javascript:` source
   executes and an alert box with `xss` appears.

**Result:** the JavaScript executes in the page context, an alert pops up, and the
Score Board marks the *DOM XSS* challenge as solved.

{/* TODO: add screenshot, then uncomment:
![Alert box triggered by the payload](./images/step-1.png)
*/}

## Mitigation

The root cause is writing untrusted input into the DOM as HTML. Fixes:

1. **Never mark user input as trusted HTML.** Avoid dangerous sinks like
   `innerHTML` or `bypassSecurityTrustHtml`; let the framework escape output by
   default (Angular interpolation `{{ value }}` escapes automatically).
2. **Contextual output encoding:** encode data for the exact context (HTML, attribute, URL, JS).
3. **Content Security Policy (CSP):** block inline scripts and `javascript:` URLs as defense in depth.
4. **Input validation:** reject or strip unexpected markup from search terms.

## References

- [OWASP: DOM Based XSS](https://owasp.org/www-community/attacks/DOM_Based_XSS)
- [OWASP: XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP: DOM based XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html)

## new Section