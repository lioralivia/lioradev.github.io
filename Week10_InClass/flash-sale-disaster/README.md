# Week 10: Flash Sale Disaster - 90-minute testing challenge

## Setup (before class)
Requirements: Node.js 20+ and npm. In this folder:

```bash
npm install
npx playwright install chromium
npm run dev
```

Open http://127.0.0.1:5173. In a second terminal run `npm test` or `npm run test:watch`. Run browser tests with `npm run test:e2e`.

> The starter tests intentionally include `it.todo` and `test.skip`. These are unfinished tasks, not passing test coverage. Replace each TODO with a real test; remove `.skip` from the Playwright test.

## Student instructions
**Scenario:** A flash-sale cart must correctly add products, track quantities, and apply a 10% discount for code SAVE10. Test it before launch.

**0-10 min: Explore.** Open the app, add headphones twice, apply SAVE10. Identify the difference between verifying the specified discount and validating that shoppers find the cart useful. Explain unit, component, integration and E2E tests in this app.

**10-25 min: Unit testing.** Open `src/tests/01-unit.spec.js`. Replace all `it.todo` cases. Check an empty cart, SAVE10 and an invalid code. Run `npm test`. Identify `describe`, `it`, `expect`, and `toBe`. Bonus: add a boundary case with zero quantity.

**25-45 min: Component testing.** Open `src/tests/02-component.spec.js`. Complete the two TODOs. Use `mount`, `trigger`, `emitted`, `toEqual`, and `toContain`. Explain why these tests do not need the entire app.

**45-60 min: Integration testing.** Open `src/tests/03-integration.spec.js`. Mount the real `App.vue` and verify that clicking Add to Cart updates `CartSummary` through the parent. Complete both TODOs. No stubs are needed because the interaction itself is being tested.

**60-80 min: E2E testing.** Open `tests/04-e2e.spec.js`. Remove `.skip` and implement a complete shopper workflow in Playwright. Use page.goto, getByRole, click, fill and an assertion on the displayed total. You may use the Playwright VS Code recorder and refine its output. Run `npm run test:e2e`.

**80-90 min: Regression and discussion.** Temporarily change the discount in `src/lib/cart.js` from `0.10` to `0.20`. Rerun unit and E2E tests. Observe the failures, then restore `0.10` and rerun. Discuss: regression tests catch unintended changes; TDD is red-green-refactor (describe the cycle rather than performing a full TDD exercise); robust tests verify user-visible behavior rather than incidental HTML structure; load testing would simulate many concurrent shoppers and is not implemented here.

## Submission
Submit completed `01-unit.spec.js`, `02-component.spec.js`, `03-integration.spec.js`, and `04-e2e.spec.js` plus a short note: which testing level catches which bug?

## Instructor notes
- The instructor solution is distributed separately.
- All levels use the same shopping cart and real parent-child event flow. No API, database, checkout, or payment processing is present. The Playwright test is E2E for **this small browser app**, not a full commercial checkout stack.
- This is deliberately scoped to a 90-minute class. Verification/validation, regression, TDD, and load testing are conceptual mini-discussions, not separate coding labs.
- If Playwright browsers are not installed in advance, setup may consume the E2E segment; preinstall them before class.
- For an optional TDD demonstration, ask students to write a failing test for `SAVE20` before implementing that new feature, then refactor.
