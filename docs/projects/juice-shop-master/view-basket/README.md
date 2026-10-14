# View Another User's Basket

This challenge is about viewing the shopping basket of a **different user**. It is a classic Insecure Direct
Object Reference (IDOR): the server trusts a basket id coming from the client without checking ownership.

:::warning[Educational purpose only]

This documentation is for **educational purposes only**. The attack was performed against a local,
intentionally vulnerable Juice Shop instance. Never use these techniques against systems you do not own or are
not explicitly authorized to test.

:::

| | |
| --- | --- |
| **Category** | Broken Access Control (IDOR) |
| **Difficulty** | ⭐⭐ |
| **OWASP Top 10** | A01:2021 – Broken Access Control |
| **Tools** | Burp Suite (Proxy, Repeater) |
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
- A logged-in account and Burp Suite with the browser proxy configured (see Quickstart)

### Steps

_Document your own steps here. Add screenshots to `./img/`._

1. Log in, open your own basket, and let Burp capture the request. Send the `GET /rest/basket/{id}` request
   to **Repeater** (`Ctrl+R`).

   _Screenshot placeholder — add your own image here, e.g._ `![Own basket request in Burp Repeater](./img/01-own-basket.png)`

2. In Repeater, change the basket id in the request path to another id, then send the request.

   _Screenshot placeholder — add your own image here, e.g._ `![Basket id changed in the request](./img/02-changed-id.png)`

3. The response returns another user's basket and Juice Shop shows the solved-challenge notification.

   _Screenshot placeholder — add your own image here, e.g._ `![Another user's basket returned](./img/03-solved.png)`

## Mitigation

> **Note:** This challenge has no built-in Juice Shop coding challenge (no `</>` icon in the Score Board),
> so the fix is documented from the source code only.

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

### Additional Measures

- Enforce access control on the server for every object, never trust client-supplied ids.
- Prefer deriving the id from the session/token instead of from the request where possible.
- Use indirect references or UUIDs to make enumeration harder (defense in depth, not a replacement for checks).
- Log and monitor access-denied events.

## Verification

_Show the Juice Shop success notification for the solved challenge. Because there is no coding challenge,
verify the fix by re-running the Repeater request and confirming the server now denies access._

## References

- [OWASP: Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
- [OWASP Cheat Sheet: Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [Burp Suite: Repeater](https://portswigger.net/burp/documentation/desktop/tools/repeater)
- [Pwning OWASP Juice Shop](https://pwning.owasp-juice.shop/)
