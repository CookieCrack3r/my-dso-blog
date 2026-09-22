---
title: "Login Admin"
sidebar_label: "1. Login Admin"
---

# Login Admin

:::note For educational purposes only. Performed on a local Juice Shop instance.
:::

| | |
|---|---|
| **Category** | Injection (SQL Injection) |
| **OWASP Top 10** | [A03:2021 – Injection](https://owasp.org/Top10/A03_2021-Injection/) |
| **Difficulty** | ⭐⭐ |
| **Goal** | Log in with the administrator's user account. |
| **Video** | _TODO: add unlisted link_ |

[⬅️ Back to overview](../README.md)

## Table of Contents

- [Vulnerability Explained](#vulnerability-explained)
- [Risks and Consequences](#risks-and-consequences)
- [Exploitation](#exploitation)
- [Mitigation](#mitigation)
- [References](#references)

## Vulnerability Explained

The login endpoint builds its SQL query by directly concatenating the submitted
email into a query string. Because the input is not separated from the query
logic, a crafted email can close the string literal and inject additional SQL.
The application then treats the injected part as **code**, not as **data** — this
is a classic SQL Injection.

Conceptually, the backend runs something like:

```sql
SELECT * FROM Users
WHERE email = '<email>' AND password = '<hashed_password>' AND deletedAt IS NULL
```

The result set's first row is used as the authenticated user. If we can make the
`WHERE` clause always true and comment out the password check, we log in as the
first user in the table — the administrator.

## Risks and Consequences

- **Authentication bypass:** log in as any user, including admin, without a password.
- **Data breach:** read, modify or delete the entire database (customers, orders, credentials).
- **Legal impact:** exposure of personal data leads to GDPR violations and fines.
- **Reputation:** loss of customer trust after a public breach.

## Exploitation

**Precondition:** Juice Shop running at `http://localhost:3000`.

1. Open the login page: `http://localhost:3000/#/login`.
2. In the **Email** field, enter the following payload:

   ```text
   ' OR 1=1--
   ```

3. In the **Password** field, enter any non-empty value (e.g. `test`).
4. Click **Log in**.

**What happens:** the injected `' OR 1=1` makes the condition always true and
`--` comments out the rest of the query (including the password check). The query
returns all users; the application logs us in as the first row, which is the
administrator account (`admin@juice-sh.op`).

To target the admin account explicitly, this equivalent payload also works in the
Email field:

```text
admin@juice-sh.op'--
```

**Result:** we are logged in as admin (visible via the account menu / email), and
the Score Board marks the *Login Admin* challenge as solved.

{/* TODO: add screenshots, then uncomment:
![Login form with payload](./images/step-1.png)
![Logged in as admin](./images/step-2.png)
*/}

## Mitigation

The root cause is building SQL from untrusted input. Fixes, in order of importance:

1. **Use parameterized queries / prepared statements.** Never concatenate user
   input into the query string. With Sequelize, use bind parameters so input is
   always treated as data:

   ```js
   // Vulnerable: string concatenation
   db.query(`SELECT * FROM Users WHERE email = '${email}' AND password = '${hash}'`)

   // Fixed: parameterized (replacements are escaped/bound, never executed as SQL)
   db.query(
     'SELECT * FROM Users WHERE email = :email AND password = :password AND deletedAt IS NULL',
     { replacements: { email, password: hash }, type: QueryTypes.SELECT }
   )
   ```

2. **Prefer the ORM/query builder** (e.g. `Model.findOne({ where: { email } })`)
   instead of raw SQL.
3. **Validate and normalize input** (expected format for an email address).
4. **Least privilege:** the database account used by the app should have only the
   permissions it needs.
5. **Defense in depth:** generic error messages and rate limiting on the login.

## References

- [OWASP: SQL Injection](https://owasp.org/www-community/attacks/SQL_Injection)
- [OWASP: SQL Injection Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html)
- [OWASP Juice Shop – Injection challenges](https://pwning.owasp-juice.shop/)
