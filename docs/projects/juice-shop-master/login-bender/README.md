# Login Bender

This challenge is about logging in to **Bender's user account** without knowing his password, by abusing an
SQL injection in the login form. Unlike a generic authentication bypass (which logs you in as the first user,
the administrator), this challenge requires targeting Bender's account specifically.

:::warning[Educational purpose only]

This documentation is for **educational purposes only**. The attack was performed against a local,
intentionally vulnerable Juice Shop instance. Never use these techniques against systems you do not own or are
not explicitly authorized to test.

:::

| | |
| --- | --- |
| **Category** | Injection (SQL Injection) |
| **Difficulty** | ⭐⭐⭐ |
| **OWASP Top 10** | A03:2021 – Injection |
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

The login endpoint builds its SQL query by concatenating the user input directly into the query string instead
of using parameters. Because the input is treated as part of the query and not as data, an attacker can change
the meaning of the query, comment out the password check and authenticate as a chosen account.

## Risks and Consequences

- An attacker can log in as a specific user without their password.
- With a targeted login an attacker takes over exactly the account they want, including its orders and data.
- The same flaw can be extended to read entire database tables (user records, password hashes).
- For a real company this means targeted account takeover, a data breach, GDPR fines and loss of customer trust.

## Exploitation

### Prerequisites

- Juice Shop running locally (see Quickstart in the main README)
- Burp Suite with the browser proxy configured (see Quickstart)

### Steps

_Document your own steps and the exact input you used here. Add screenshots to `./img/`._

1. In Burp, turn **Proxy → Intercept** on, then submit the login form with any values so the request is captured.

   _Screenshot placeholder — add your own image here, e.g._ `![Login request captured in Burp Proxy](./img/01-proxy-intercept.png)`

2. Send the captured `POST /rest/user/login` request to **Repeater** (`Ctrl+R`).

   _Screenshot placeholder — add your own image here, e.g._ `![Request in Burp Repeater](./img/02-repeater.png)`

3. In Repeater, modify the `email` field in the JSON body with an SQL injection that targets **Bender's**
   account and comments out the password check, then send the request. _Document the exact payload you used._

   _Screenshot placeholder — add your own image here, e.g._ `![Modified email field with injection](./img/03-injection.png)`

4. The response returns an authentication token for Bender. Use it in the browser (or show it in the response)
   and Juice Shop displays the solved-challenge notification.

   _Screenshot placeholder — add your own image here, e.g._ `![Challenge solved notification](./img/04-solved.png)`

## Mitigation

### Vulnerable Code

_Link the login handler in the [Juice Shop source](https://github.com/juice-shop/juice-shop) and show the
string-concatenated query._

```ts
// vulnerable code from the Juice Shop repository
```

### Fixed Code

_Show a parameterised query / prepared statement and explain why it removes the root cause: input is sent
separately from the query and can no longer change its structure._

```ts
// fixed code using parameterised queries
```

### Juice Shop Coding Challenge

- **Find It:** _Mark the vulnerable lines in the login handler._

  _Screenshot placeholder — add your own image here, e.g._ `![Find It: vulnerable lines selected](./img/find-it.png)`

- **Fix It:** _Choose the parameterised-query fix and explain why the other options are not sufficient._

  _Screenshot placeholder — add your own image here, e.g._ `![Fix It: correct fix accepted](./img/fix-it.png)`

### Additional Measures

- Use an ORM or parameterised queries everywhere, never string concatenation.
- Validate and normalise input (e.g. a strict email format).
- Apply least privilege to the database account.
- Add rate limiting and monitoring on the login endpoint to detect injection and brute-force attempts.

## Verification

_Show the Juice Shop success notification for the solved challenge and how the accepted "Fix It" solution
confirms the fix._

## References

- [OWASP: SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [OWASP Cheat Sheet: SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [Burp Suite: Repeater](https://portswigger.net/burp/documentation/desktop/tools/repeater)
- [Pwning OWASP Juice Shop](https://pwning.owasp-juice.shop/)
