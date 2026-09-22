---
title: "View Basket"
sidebar_label: "3. View Basket"
---

# View Basket

:::note For educational purposes only. Performed on a local Juice Shop instance.
:::

| | |
|---|---|
| **Category** | Broken Access Control (IDOR) |
| **OWASP Top 10** | [A01:2021 – Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/) |
| **Difficulty** | ⭐⭐ |
| **Goal** | View another user's shopping basket. |
| **Video** | _TODO: add unlisted link_ |

[⬅️ Back to overview](../README.md)

## Table of Contents

- [Vulnerability Explained](#vulnerability-explained)
- [Risks and Consequences](#risks-and-consequences)
- [Exploitation](#exploitation)
- [Mitigation](#mitigation)
- [References](#references)

## Vulnerability Explained

The application fetches a basket by its numeric ID (`/rest/basket/{id}`) but does
**not** verify that the basket belongs to the logged-in user. The ID is stored on
the client side after login, so a user can simply change it to another value and
the server returns that basket. This is an **Insecure Direct Object Reference
(IDOR)** — a form of Broken Access Control where authorization is missing on the
object level.

## Risks and Consequences

- **Exposure of other customers' data:** their basket contents and order details.
- **Privacy violations:** unauthorized access to personal data (GDPR relevant).
- **Manipulation:** potential tampering with other users' orders.
- **Loss of trust:** customers expect their data to be isolated.

## Exploitation

**Precondition:** logged in to Juice Shop (any registered account).

1. Log in and open **Your Basket**.
2. Open the browser Developer Tools (`F12`) → **Application** → **Session Storage**
   → `http://localhost:3000`.
3. Note the value `bid` — this is **your** basket ID.
4. Change `bid` to a different number (e.g. from `5` to `1`).
5. Reload the basket page. The app requests `/rest/basket/1` and the server returns
   that basket, even though it is not yours.

**Result:** another user's basket is displayed. The Score Board marks the
*View Basket* challenge as solved.

{/* TODO: add screenshots, then uncomment:
![Session storage with the bid value](./images/step-1.png)
![Another user's basket displayed](./images/step-2.png)
*/}

## Mitigation

The root cause is trusting a client-supplied ID without an ownership check. Fixes:

1. **Enforce server-side authorization on every request.** Check that the
   authenticated user owns the requested basket before returning it.
2. **Bind resources to the session/user**, not to a client-supplied ID (derive the
   basket from the logged-in user instead of a URL parameter).
3. **Deny by default:** reject the request when ownership cannot be confirmed.
4. **Defense in depth:** use unpredictable identifiers (UUIDs) so IDs cannot be
   guessed — but never as the only control.

## References

- [OWASP: Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
- [OWASP: Insecure Direct Object Reference (IDOR)](https://owasp.org/www-community/attacks/Insecure_Direct_Object_Reference)
- [OWASP: Authorization Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
