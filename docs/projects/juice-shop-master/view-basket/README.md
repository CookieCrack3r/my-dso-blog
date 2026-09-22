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
| **Video** | _TODO: add link_ |

[⬅️ Back to overview](../README.md)

## Table of Contents

- [Vulnerability Explained](#vulnerability-explained)
- [Risks and Consequences](#risks-and-consequences)
- [Exploitation](#exploitation)
- [Mitigation](#mitigation)
- [References](#references)

## Vulnerability Explained

_TODO (2–4 sentences): Which identifier controls the basket, and why does the server fail to check ownership before returning it?_

## Risks and Consequences

- Exposure of other customers' personal data and orders
- Privacy violations (GDPR)
- Manipulation of foreign orders and loss of customer trust

## Exploitation

_TODO: Document your own steps. Add screenshots to `./images/`._

1. _Where is the basket identifier visible? (e.g. request/URL/storage)_
2. _What did you change?_
3. _What data did you gain access to?_

![Step 1](./images/step-1.png)

## Mitigation

- Enforce server-side authorization on every request (object-level access control)
- Bind resources to the authenticated user, not to a client-supplied ID
- Use unpredictable identifiers as defense in depth (not as the only control)

## References

- [OWASP: Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
- [OWASP: IDOR / Insecure Direct Object Reference](https://owasp.org/www-community/attacks/Insecure_Direct_Object_Reference)
