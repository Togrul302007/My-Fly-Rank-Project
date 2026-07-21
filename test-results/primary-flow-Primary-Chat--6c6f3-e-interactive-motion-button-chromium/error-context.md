# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: primary-flow.spec.ts >> Primary Chat Flow >> allows user to navigate and test the interactive motion button
- Location: e2e\primary-flow.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('button')
Expected: visible
Error: strict mode violation: getByRole('button') resolved to 4 elements:
    1) <button type="button" class="↵        relative inline-flex items-center justify-center h-11 px-6 rounded-xl font-medium text-sm↵        select-none overflow-hidden transition-colors duration-200↵        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2↵        disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none↵        bg-primary text-primary-foreground hover:bg-primary/90↵      ">…</button> aka getByRole('button', { name: 'Send Message' })
    2) <button class="px-3 py-1.5 text-xs rounded-lg border transition-all bg-primary text-primary-foreground border-primary">Random (20% Fail)</button> aka getByRole('button', { name: 'Random (20% Fail)' })
    3) <button class="px-3 py-1.5 text-xs rounded-lg border transition-all border-border hover:bg-accent">Force Success</button> aka getByRole('button', { name: 'Force Success' })
    4) <button class="px-3 py-1.5 text-xs rounded-lg border transition-all border-border hover:bg-accent">Force Failure</button> aka getByRole('button', { name: 'Force Failure' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('button')

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - navigation [ref=e2]:
    - link "Home" [ref=e3] [cursor=pointer]:
      - /url: /
    - link "Kanban Board" [ref=e4] [cursor=pointer]:
      - /url: /kanban
    - link "Settings" [ref=e5] [cursor=pointer]:
      - /url: /settings
    - link "Health Check" [ref=e6] [cursor=pointer]:
      - /url: /health
  - main [ref=e7]:
    - generic [ref=e8]:
      - generic [ref=e9]:
        - heading "Interactive State Motion Button" [level=1] [ref=e10]
        - paragraph [ref=e11]: Choreographed state transitions (idle → hover → loading → success/error) built with zero layout thrash.
      - button "Send Message" [active] [ref=e13]:
        - generic [ref=e14]:
          - generic [ref=e15]: Send Message
          - img [ref=e16]
      - generic [ref=e19]:
        - generic [ref=e20]: Testing Controls
        - generic [ref=e21]:
          - button "Random (20% Fail)" [ref=e22]
          - button "Force Success" [ref=e23]
          - button "Force Failure" [ref=e24]
      - generic [ref=e25]:
        - heading "Motion Choices & Architecture Note:" [level=2] [ref=e26]
        - list [ref=e27]:
          - listitem [ref=e28]:
            - strong [ref=e29]: "Durations & Easings:"
            - text: Text transitions use
            - code [ref=e30]: 200ms
            - text: with custom
            - code [ref=e31]: cubic-bezier(0.16, 1, 0.3, 1)
            - text: for rapid start and fluid deceleration. Success state uses a spring curve (
            - code [ref=e32]: "stiffness: 400, damping: 25"
            - text: ) for a tactile pop.
          - listitem [ref=e33]:
            - strong [ref=e34]: "Compositor-Friendly:"
            - text: Exclusively animates GPU-accelerated
            - code [ref=e35]: opacity
            - text: and
            - code [ref=e36]: transform (y, scale)
            - text: without causing reflows.
          - listitem [ref=e37]:
            - strong [ref=e38]: "Accessibility & Interruption:"
            - text: Native keyboard
            - code [ref=e39]: focus-visible
            - text: ring included. Framer Motion handles
            - code [ref=e40]: prefers-reduced-motion
            - text: gracefully by stripping heavy motion while preserving state colors and icons.
  - alert [ref=e41]
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test";
  2  | 
  3  | test.describe("Primary Chat Flow", () => {
  4  |   test("allows user to navigate and test the interactive motion button", async ({ page }) => {
  5  |     // API Call Mocking - Real endpoint çağırılmır
  6  |     await page.route("**/api/chat", async (route) => {
  7  |       await route.fulfill({
  8  |         status: 200,
  9  |         contentType: "text/plain",
  10 |         body: "Hello! This is a mocked AI response.",
  11 |       });
  12 |     });
  13 | 
  14 |     await page.goto("/button-demo");
  15 | 
  16 |     // Interactive button check
  17 |     const sendButton = page.getByRole("button", { name: /send message/i });
  18 |     await expect(sendButton).toBeVisible();
  19 | 
  20 |     await sendButton.click();
  21 |     
  22 |     // Check loading or success transition
> 23 |     await expect(page.getByRole("button")).toBeVisible();
     |                                            ^ Error: expect(locator).toBeVisible() failed
  24 |   });
  25 | });
```