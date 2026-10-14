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

## Table of Contents

- [Vulnerability](#vulnerability)
- [Risks and Consequences](#risks-and-consequences)
- [Exploitation](#exploitation)
- [Mitigation](#mitigation)
- [Verification](#verification)
- [References](#references)

## Vulnerability

The login endpoint builds its SQL query by concatenating the user input directly into the query string instead
of using parameters. Because the `email` value becomes part of the query itself, an attacker can inject SQL,
comment out the password check and authenticate as a chosen account.

## Risks and Consequences

- An attacker can log in as a specific user without their password.
- A targeted login means complete takeover of that account, including its orders and personal data.
- The same flaw can be extended to read entire database tables (user records, password hashes).
- For a real company this means targeted account takeover, a data breach, GDPR fines and loss of customer trust.

## Exploitation

### Prerequisites

- Juice Shop running locally (see Quickstart in the main README)
- Burp Suite with the browser proxy configured (see Quickstart)

### Steps

1. In Burp, turn **Proxy → Intercept** on, then submit the login form with any values so the request is captured.

2. Send the captured `POST /rest/user/login` request to **Repeater** (`Ctrl+R`).

3. In Repeater, set the `email` field in the JSON body to the payload below and use any value as the password,
   then send the request:

   ```text
   bender@juice-sh.op'--
   ```

   The trailing `'--` closes the string and comments out the `AND password = '…'` part of the query, so the
   account is selected by the email column alone. Targeting Bender's address returns Bender, not the admin.

4. The response returns an authentication token for Bender (see `umail` in the response). Juice Shop shows the
   solved-challenge notification.

## Mitigation

### Vulnerable Code

The login handler concatenates the request input directly into the SQL string
([`routes/login.ts`](https://github.com/juice-shop/juice-shop/blob/master/routes/login.ts)):

```ts
// routes/login.ts
models.sequelize.query(
  `SELECT * FROM Users WHERE email = '${req.body.email || ''}' AND password = '${security.hash(req.body.password || '')}' AND deletedAt IS NULL`,
  { model: UserModel, plain: true }
)
```

The `${req.body.email}` value is part of the query text, so input like `bender@juice-sh.op'--` changes the
query structure.

### Fixed Code

Use a parameterised (bound) query so the input is sent separately from the SQL and can no longer change its
structure:

```ts
// routes/login.ts — parameterised query
models.sequelize.query(
  'SELECT * FROM Users WHERE email = $email AND password = $password AND deletedAt IS NULL',
  {
    bind: {
      email: req.body.email || '',
      password: security.hash(req.body.password || '')
    },
    model: UserModel,
    plain: true
  }
)
```

With `bind`, the database treats `email` and `password` as data, so `'--` is looked up as a literal email and
no longer bypasses the password check.

### Juice Shop Coding Challenge

- **Find It:** the vulnerable line is the raw `models.sequelize.query(...)` call that concatenates
  `req.body.email` into the `SELECT` statement.
- **Fix It:** choose the option that uses a parameterised query with `bind`. Options that only escape quotes or
  validate the email format are insufficient, because injection can still occur through other characters.

### Additional Measures

- Use an ORM or parameterised queries everywhere, never string concatenation.
- Validate and normalise input (e.g. a strict email format).
- Apply least privilege to the database account.
- Add rate limiting and monitoring on the login endpoint to detect injection and brute-force attempts.

## Verification

After applying the fix, resend the same Repeater request: the response is now `Invalid email or password.`
instead of a token. In the running app, the Juice Shop success banner confirms the challenge was solved, and
the accepted **Fix It** solution confirms the code fix.

## References

- [OWASP: SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [OWASP Cheat Sheet: SQL Injection Prevention](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [Burp Suite: Repeater](https://portswigger.net/burp/documentation/desktop/tools/repeater)
- [Juice Shop source: routes/login.ts](https://github.com/juice-shop/juice-shop/blob/master/routes/login.ts)
- [Pwning OWASP Juice Shop](https://pwning.owasp-juice.shop/)
