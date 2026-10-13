# Empty User Registration

This challenge is about registering a user with an **empty email and password**. The registration form only
validates the input in the browser. By intercepting the request with Burp Suite and clearing the fields before
they reach the server, a user with empty credentials is created.

| | |
| --- | --- |
| **Category** | Improper Input Validation (CWE-20) |
| **Difficulty** | ⭐⭐ |
| **OWASP Top 10** | A04:2021 – Insecure Design (missing server-side validation) |
| **Tools** | Burp Suite (Proxy) |
| **Video** | _Link to the video (max. 5 minutes)_ |

## Table of Contents

- [Vulnerability](#vulnerability)
- [Risks and Consequences](#risks-and-consequences)
- [Exploitation](#exploitation)
- [Mitigation](#mitigation)
- [Verification](#verification)
- [References](#references)

## Vulnerability

The registration form checks that email and password are filled in, but this check runs **only in the browser**.
The backend accepts the registration request without repeating the validation. Because client-side checks can be
bypassed with an intercepting proxy, the server creates an account even when the fields are empty.

## Risks and Consequences

- Accounts can be created with invalid or empty data, polluting the user database.
- Missing server-side validation is a systemic flaw: the same gap often allows invalid prices, negative
  quantities or malformed input elsewhere.
- Empty or malformed accounts can break assumptions in later code (e.g. login, password reset, emails) and open
  the door to further abuse.
- For a real company this means unreliable data, broken business logic and a larger attack surface.

## Exploitation

### Prerequisites

- Juice Shop running locally (see Quickstart in the main README)
- Burp Suite with the browser proxy configured (see Quickstart)

### Steps

_Document your own steps here and add screenshots to `./img/`._

1. In Burp, turn **Proxy → Intercept** on.

2. On the Juice Shop registration page, fill in the fields with any valid values and submit so the request is
   captured.

   _Screenshot placeholder — add your own image here, e.g._ `![Registration form filled in](./img/01-register-form.png)`

3. In the intercepted `POST /api/Users` request, clear the values of the relevant fields in the JSON body
   (e.g. `email` and `password`), then **Forward** the request.

   _Screenshot placeholder — add your own image here, e.g._ `![Intercepted request with emptied fields](./img/02-burp-intercept.png)`

4. The server responds with a created user and Juice Shop shows the solved-challenge notification.

   _Screenshot placeholder — add your own image here, e.g._ `![Challenge solved notification](./img/03-solved.png)`

## Mitigation

### Vulnerable Code

_Link the User model / registration route in the [Juice Shop source](https://github.com/juice-shop/juice-shop)
and show that the fields allow empty values (validation missing on the server)._

```ts
// vulnerable model/route from the Juice Shop repository
```

### Fixed Code

_Show server-side validation on the model (e.g. `allowNull: false`, `notEmpty`, `isEmail`) so the backend
rejects empty or malformed input regardless of the client._

```ts
// fixed code with server-side validation
```

### Juice Shop Coding Challenge

_If this challenge offers a `</>` coding challenge in the Score Board, document Find It / Fix It here.
Otherwise remove this section._

- **Find It:** _Mark the lines where validation is missing._

  _Screenshot placeholder — add your own image here, e.g._ `![Find It: vulnerable lines selected](./img/find-it.png)`

- **Fix It:** _Choose the fix that adds server-side validation and explain why the others fail._

  _Screenshot placeholder — add your own image here, e.g._ `![Fix It: correct fix accepted](./img/fix-it.png)`

### Additional Measures

- Always validate input on the server; never rely on client-side checks alone.
- Enforce constraints at the data layer (`allowNull: false`, format and length checks).
- Return clear validation errors without leaking internal details.
- Add tests that submit empty and malformed payloads directly to the API.

## Verification

_Show the Juice Shop success notification and, if applicable, how the accepted "Fix It" solution confirms the fix._

## References

- [OWASP: Improper Input Validation](https://owasp.org/www-community/vulnerabilities/Improper_Data_Validation)
- [OWASP Cheat Sheet: Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html)
- [Burp Suite: Intercepting requests](https://portswigger.net/burp/documentation/desktop/getting-started/intercepting-http-traffic)
- [Pwning OWASP Juice Shop](https://pwning.owasp-juice.shop/)
