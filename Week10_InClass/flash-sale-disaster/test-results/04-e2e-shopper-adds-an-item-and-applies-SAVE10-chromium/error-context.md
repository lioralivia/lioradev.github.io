# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 04-e2e.spec.js >> shopper adds an item and applies SAVE10
- Location: tests\04-e2e.spec.js:6:1

# Error details

```
Error: expect(locator).toHaveText(expected) failed

Locator:  getByTestId('total')
Expected: "Total: $45.00"
Received: "Total: $40.00"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" getByTestId('total') with timeout 5000ms
  - waiting for getByTestId('total')
    14 × locator resolved to <p data-testid="total">Total: $40.00</p>
       - unexpected value "Total: $40.00"

```

```yaml
- paragraph: "Total: $40.00"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test'
  2  | test('shopping cart page loads', async ({ page }) => {
  3  |   await page.goto('/')
  4  |   await expect(page.getByRole('heading', { name: 'Flash Sale Disaster' })).toBeVisible()
  5  | })
  6  | test('shopper adds an item and applies SAVE10', async ({ page }) => {
  7  |   await page.goto('/')
  8  |   await page.getByRole('button', {name: 'Add to Cart' }).click()
  9  |   await page.getByRole('textbox', {name: 'Discount code'}).fill('SAVE10')
  10 |   await page.getByRole('button', {name:'Apply Discount'}).click()
> 11 |   await expect(page.getByTestId('total')).toHaveText('Total: $45.00')
     |                                           ^ Error: expect(locator).toHaveText(expected) failed
  12 | })
  13 | 
```