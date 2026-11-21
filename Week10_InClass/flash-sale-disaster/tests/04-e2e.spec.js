import { test, expect } from '@playwright/test'
test('shopping cart page loads', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: 'Flash Sale Disaster' })).toBeVisible()
})
test('shopper adds an item and applies SAVE10', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', {name: 'Add to Cart' }).click()
  await page.getByRole('textbox', {name: 'Discount code'}).fill('SAVE10')
  await page.getByRole('button', {name:'Apply Discount'}).click()
  await expect(page.getByTestId('total')).toHaveText('Total: $45.00')
})
