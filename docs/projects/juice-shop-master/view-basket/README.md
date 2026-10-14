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

## Table of Contents

- [Vulnerability](#vulnerability)
- [Risks and Consequences](#risks-and-consequences)
- [Exploitation](#exploitation)
- [Mitigation](#mitigation)
- [Verification](#verification)
- [References](#references)

## Vulnerability

The basket is requested by an id that the client controls (`GET /rest/basket/{id}`). The server returns the
basket for that id without checking whether it belongs to the logged-in user. By changing the id, a user can
access baskets that are not theirs.

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

1. Log in, open your own basket, and let Burp capture the request. Send the `GET /rest/basket/{id}` request to
   **Repeater** (`Ctrl+R`). Note your own basket id in the path.

2. In Repeater, change the id in the request path to a different number (e.g. from your own `6` to `1`), then
   send the request:

   ```http
   GET /rest/basket/1 HTTP/1.1
   Host: localhost:3000
   Authorization: Bearer <your-token>
   ```

3. The response returns the other user's basket (different products than your own) and Juice Shop shows the
   solved-challenge notification.

## Mitigation

> **Note:** This challenge has no built-in Juice Shop coding challenge (no `</>` icon in the Score Board),
> so the fix is documented from the source code only.

### Vulnerable Code

The basket route looks up the basket by the id from the URL and returns it without verifying ownership
([`routes/basket.ts`](https://github.com/juice-shop/juice-shop/blob/master/routes/basket.ts)):

```ts
// routes/basket.ts
export function retrieveBasket () {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const basket = await BasketModel.findOne({ where: { id }, include: [{ model: ProductModel, paranoid: false, as: 'Products' }] })
      // ... no check that the basket belongs to the authenticated user
      res.json(utils.queryResultToJson(basket))
    } catch (error) {
      next(error)
    }
  }
}
```

### Fixed Code

Compare the requested id with the authenticated user's own basket id before returning anything:

```ts
// routes/basket.ts — enforce ownership
export function retrieveBasket () {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = req.params.id
      const user = security.authenticatedUsers.from(req)
      if (!user || user.bid !== parseInt(id, 10)) {
        res.status(401).send(res.__('Access denied'))
        return
      }
      const basket = await BasketModel.findOne({ where: { id }, include: [{ model: ProductModel, paranoid: false, as: 'Products' }] })
      res.json(utils.queryResultToJson(basket))
    } catch (error) {
      next(error)
    }
  }
}
```

Now a request for a basket that is not the caller's own is rejected with `401 Access denied`.

### Additional Measures

- Enforce access control on the server for every object, never trust client-supplied ids.
- Prefer deriving the id from the session/token instead of from the request where possible.
- Use indirect references or UUIDs to make enumeration harder (defense in depth, not a replacement for checks).
- Log and monitor access-denied events.

## Verification

In the running app, the Juice Shop success banner confirms the challenge was solved. After applying the fix,
resend the Repeater request for another user's id and confirm the server now responds with `401 Access denied`
instead of returning the basket.

## References

- [OWASP: Broken Access Control](https://owasp.org/Top10/A01_2021-Broken_Access_Control/)
- [OWASP Cheat Sheet: Authorization](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [Burp Suite: Repeater](https://portswigger.net/burp/documentation/desktop/tools/repeater)
- [Juice Shop source: routes/basket.ts](https://github.com/juice-shop/juice-shop/blob/master/routes/basket.ts)
- [Pwning OWASP Juice Shop](https://pwning.owasp-juice.shop/)
