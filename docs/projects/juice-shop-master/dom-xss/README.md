# DOM XSS

This challenge is about triggering a Cross-Site Scripting (XSS) payload through the search field. The input is
written into the page (the DOM) without proper encoding, so the browser executes it as code.

| | |
| --- | --- |
| **Category** | Cross-Site Scripting (DOM-based XSS) |
| **Difficulty** | ⭐ |
| **OWASP Top 10** | A03:2021 – Injection (Cross-Site Scripting) |
| **Video** | _Link to the video (max. 5 minutes)_ |

## Table of Contents

- [Vulnerability](#vulnerability)
- [Risks and Consequences](#risks-and-consequences)
- [Exploitation](#exploitation)
- [Mitigation](#mitigation)
- [Verification](#verification)
- [References](#references)

## Vulnerability

The search term from the URL / search field is inserted into the page without being treated as plain text.
Because the value is rendered as HTML instead of being encoded, a crafted input is parsed and executed by
the browser as part of the page.

## Risks and Consequences

- Attacker-controlled script runs in the victim's browser in the context of the site.
- It can read session tokens or cookies, perform actions as the victim, or deface the page.
- Delivered via a prepared link, it can target many users at once (phishing, account takeover).
- For a real company this means compromised user sessions, fraud and reputational damage.

## Exploitation

### Prerequisites

- Juice Shop running locally (see Quickstart in the main README)

### Steps

_Document your own steps and the exact input you used here. Add screenshots to `./img/`._

1. _Open the application and locate the search field._

   _Screenshot placeholder — add your own image here, e.g._ `![short description](./img/screenshot.png)`

2. _Describe the input you placed in the search field and why the browser renders it as code instead of text._

3. _Show the result that proves the script executed._

## Mitigation

### Vulnerable Code

_Link the component in the [Juice Shop source](https://github.com/juice-shop/juice-shop) that renders the
search value as HTML (e.g. a bypass of the framework's sanitisation)._

```ts
// vulnerable code from the Juice Shop repository
```

### Fixed Code

_Show how the value should be bound as text / go through proper sanitisation so it is encoded instead of
executed._

```ts
// fixed code: context-aware output encoding / safe binding
```

### Juice Shop Coding Challenge

- **Find It:** _Mark the line that renders the input without encoding._

  _Screenshot placeholder — add your own image here, e.g._ `![short description](./img/screenshot.png)`

- **Fix It:** _Choose the fix that encodes/sanitises the output and explain why the others fail._

  _Screenshot placeholder — add your own image here, e.g._ `![short description](./img/screenshot.png)`

### Additional Measures

- Use context-aware output encoding and the framework's safe binding; avoid bypassing built-in sanitisation.
- Add a Content Security Policy (CSP) as a second layer of defense.
- Validate input and set the `HttpOnly` flag on session cookies so scripts cannot read them.

## Verification

_Show the Juice Shop success notification and how the accepted "Fix It" solution confirms the fix._

## References

- [OWASP: Cross Site Scripting (XSS)](https://owasp.org/www-community/attacks/xss/)
- [OWASP Cheat Sheet: XSS Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [Pwning OWASP Juice Shop](https://pwning.owasp-juice.shop/)
