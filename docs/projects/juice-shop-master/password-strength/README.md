# Password Strength

This challenge is about logging in to the **administrator account** without changing the credentials and
without using SQL injection. The admin account ships with a weak, guessable password, and the login endpoint
has no brute-force protection — so the password can be found with Burp Suite's **Intruder**.

:::warning[Educational purpose only]

This documentation is for **educational purposes only**. The attack was performed against a local,
intentionally vulnerable Juice Shop instance. Never use these techniques against systems you do not own or are
not explicitly authorized to test.

:::

| | |
| --- | --- |
| **Category** | Broken Authentication |
| **Difficulty** | ⭐⭐ |
| **OWASP Top 10** | A07:2021 – Identification and Authentication Failures |
| **Tools** | Burp Suite (Proxy, Intruder) |

## Table of Contents

- [Vulnerability](#vulnerability)
- [Risks and Consequences](#risks-and-consequences)
- [Exploitation](#exploitation)
- [Mitigation](#mitigation)
- [Verification](#verification)
- [References](#references)

## Vulnerability

Two weaknesses combine here:

1. The administrator account uses a **weak, well-known password** (`admin123`).
2. The login endpoint has **no rate limiting or account lockout**, so an attacker can try an unlimited number
   of passwords.

Together this makes the admin account trivially brute-forceable.

## Risks and Consequences

- An attacker gains full administrator access without any credentials of their own.
- From the admin account an attacker can read and modify all users' data, orders and products.
- Weak passwords plus no lockout is one of the most common real-world breach causes (credential stuffing,
  brute force).
- For a real company this means a full compromise, data breach, GDPR fines and loss of customer trust.

## Exploitation

### Prerequisites

- Juice Shop running locally (see Quickstart in the main README)
- Burp Suite with the browser proxy configured (see Quickstart)
- A password wordlist (e.g. from SecLists, or a short custom list that includes common passwords)

### Steps

1. In the browser, submit the login form with email `admin@juice-sh.op` and any password, and let Burp capture
   the `POST /rest/user/login` request.

2. Right-click the request → **Send to Intruder**.

3. In Intruder, choose attack type **Sniper**, clear all payload positions, then mark only the password value in
   the JSON body as the payload position:

   ```json
   {"email":"admin@juice-sh.op","password":"§placeholder§"}
   ```

4. On the **Payloads** tab, load your password wordlist, then **Start attack**.

5. Sort the results by **Status code** / **Length**: failed attempts return `401`, the correct password returns
   `200` with an authentication token (a clearly different length). The hit is `admin123`.

6. Use those credentials to log in; Juice Shop shows the solved-challenge notification.

> **Note:** Burp **Community** throttles Intruder, so the attack runs slowly. A short wordlist that contains the
> target password is enough for the demo.

## Mitigation

### Vulnerable Code

The admin account is seeded with a weak password in
[`data/static/users.yml`](https://github.com/juice-shop/juice-shop/blob/master/data/static/users.yml):

```yaml
- email: admin
  password: 'admin123'
  key: admin
  role: 'admin'
```

In addition, the login route applies no rate limiting or lockout on repeated failed attempts.

### Fixed Code

Do not ship weak or default credentials, and enforce a strong password policy on registration and change
(minimum length, complexity, and a check against known-breached passwords). Conceptually:

```yaml
- email: admin
  password: '<strong, unique, randomly generated password>'
  role: 'admin'
```

```ts
// enforce a password policy on the server before accepting a password
if (!isStrongPassword(password)) {
  return res.status(400).json({ error: 'Password does not meet the strength requirements' })
}
```

### Juice Shop Coding Challenge

- **Find It:** locate where the weak password / missing password rule allows the account to be guessed.
- **Fix It:** choose the option that enforces a stronger password policy. Follow the in-app Score Board coding
  challenge for the exact lines.

### Additional Measures

- Add **rate limiting** and **account lockout** / exponential backoff on failed logins.
- Require **multi-factor authentication**, especially for admin accounts.
- Store passwords with a strong, salted hash (bcrypt/argon2) — never weak hashes.
- Monitor and alert on repeated failed logins and credential-stuffing patterns.

## Verification

In the running app, the Juice Shop success banner confirms the challenge was solved. After applying a strong
password (and rate limiting), re-run the Intruder attack and confirm the wordlist no longer yields a `200`
response, and that repeated attempts are blocked.

## References

- [OWASP: Identification and Authentication Failures](https://owasp.org/Top10/A07_2021-Identification_and_Authentication_Failures/)
- [OWASP Cheat Sheet: Authentication](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP Cheat Sheet: Credential Stuffing Prevention](https://cheatsheetseries.owasp.org/cheatsheets/Credential_Stuffing_Prevention_Cheat_Sheet.html)
- [Burp Suite: Intruder](https://portswigger.net/burp/documentation/desktop/tools/intruder)
- [Juice Shop source: data/static/users.yml](https://github.com/juice-shop/juice-shop/blob/master/data/static/users.yml)
- [Pwning OWASP Juice Shop](https://pwning.owasp-juice.shop/)
