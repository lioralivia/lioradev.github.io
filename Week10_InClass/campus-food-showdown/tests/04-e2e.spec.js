import { test, expect } from '@playwright/test'

test('a student votes, sees the leaderboard update, and resets votes', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Vote!' }).nth(1).click()
  await page.getByRole('button', { name: 'Vote!' }).nth(1).click()
  await expect(page.locator('.topline')).toContainText('Total Votes: 2')
  await expect(page.locator('.leaderboard li').first()).toContainText('Pizza — 2 votes')
  await page.getByRole('button', { name: 'Reset Votes' }).click()
  await expect(page.locator('.topline')).toContainText('Total Votes: 0')
  // TODO: Vote for Pizza twice.
  // TODO: Assert that the total is 2 and Pizza leads the leaderboard.
  // TODO: Click Reset Votes and assert that the total returns to 0.
})
