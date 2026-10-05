# View Another User's Basket

This challenge is about viewing the shopping basket of a **different user**. It is a classic Insecure Direct
Object Reference (IDOR): the server trusts an identifier coming from the client without checking ownership.

| | |
| --- | --- |
| **Category** | Broken Access Control (IDOR) |
| **Difficulty** | ⭐⭐ |
| **OWASP Top 10** | A01:2021 – Broken Access Control |
| **Video** | _Link to the video (max. 5 minutes)_ |

## Table of Contents

- [Vulnerability](#vulnerability)
- [Risks and Consequences](#risks-and-consequences)
- [Exploitation](#exploitation)
- [Mitigation](#mitigation)
- [Verification](#verification)
- [References](#references)

## Vulnerability

The basket is requested by an id that the client controls. The server returns the basket for that id without
checking whether it belongs to the logged-in user. By changing the id, a user can access baskets that are
not theirs.

## Risks and Consequences

- An attacker can read other customers' basket contents.
- The same pattern often extends to orders, invoices and profile data.
- It allows large-scale scraping of customer data by simply iterating over ids.
- For a real company this is a data-protection violation (GDPR) with fines and reputational damage.

## Exploitation

### Prerequisites

- Juice Shop running locally (see Quickstart in the main README)
- A logged-in account and the browser network tab (or an intercepting proxy)

### Steps

_Document your own steps here. Add screenshots to `./img/`._

1. _Log in and open your own basket while watching the network request._

   _Screenshot placeholder — add your own image here, e.g._ `![short description](./img/screenshot.png)`

2. _Describe how you change the basket id in the request._

3. _Show that another user's basket is returned._

## Mitigation

### Vulnerable Code

_Link the basket route in the [Juice Shop source](https://github.com/juice-shop/juice-shop) and show that
it returns the basket by id without an ownership check._

```ts
// vulnerable code from the Juice Shop repository
```

### Fixed Code

_Show an ownership/authorization check that compares the basket's owner with the authenticated user before
returning it._

```ts
// fixed code with an authorization check
```

### Juice Shop Coding Challenge

- **Find It:** _Mark the lines that return the basket without checking ownership._

  _Screenshot placeholder — add your own image here, e.g._ `![short description](./img/screenshot.png)`

- **Fix It:** _Choose the fix that enforces the ownership check and explain why the others fail._

  _Screenshot placeholder — add your own image here, e.g._ `![short description](./img/screenshot.png)`

### Additional Measures

- Enforce access control on the server for every object, never trust client-supplied ids.
- Prefer deriving the id from the session/token instead of from the request where possible.
- Use indirect references or UUIDs to make enumeration harder (defense in depth, not a replacement for checks).
- Log and monitor access-denied events.

## Verification

_Show the Juice Shop success notification and how the accepted "Fix It" solution confirms the fix._

## References

- [OWASP: Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
- [OWASP Cheat Sheet: Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [Pwning OWASP Juice Shop](https://pwning.owasp-juice.shop/)
