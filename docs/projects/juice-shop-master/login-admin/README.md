# Login Admin

This challenge is about logging in to the administrator account **without knowing the password** by abusing an
SQL injection in the login form.

| | |
| --- | --- |
| **Category** | Injection (SQL Injection) |
| **Difficulty** | ⭐⭐ |
| **OWASP Top 10** | A03:2021 – Injection |
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
the meaning of the query and bypass the authentication check.

## Risks and Consequences

- An attacker can log in as any user, including the administrator, without credentials.
- From an admin account an attacker can read, change or delete other users' data.
- Depending on the query, injection can also be used to read entire database tables (user records,
  password hashes, orders).
- For a real company this means account takeover, a full data breach, GDPR fines and loss of customer trust.

## Exploitation

### Prerequisites

- Juice Shop running locally (see Quickstart in the main README)
- Browser developer tools

### Steps

_Document your own steps and the exact input you used here. Add screenshots to `./img/`._

1. _Open the login page._

   _Screenshot placeholder — add your own image here, e.g._ `![short description](./img/screenshot.png)`

2. _Describe the idea of the injection in the email field and what happens to the query._

3. _Show the result: you are logged in as administrator._

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

  _Screenshot placeholder — add your own image here, e.g._ `![short description](./img/screenshot.png)`

- **Fix It:** _Choose the parameterised-query fix and explain why the other options are not sufficient._

  _Screenshot placeholder — add your own image here, e.g._ `![short description](./img/screenshot.png)`

### Additional Measures

- Use an ORM or parameterised queries everywhere, never string concatenation.
- Validate and normalise input (e.g. a strict email format).
- Apply least privilege to the database account.
- Add rate limiting and monitoring on the login endpoint to detect brute-force and injection attempts.

## Verification

_Show the Juice Shop success notification for the solved challenge and how the accepted "Fix It" solution
confirms the fix._

## References

- [OWASP: SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [OWASP Cheat Sheet: SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [Pwning OWASP Juice Shop](https://pwning.owasp-juice.shop/)
