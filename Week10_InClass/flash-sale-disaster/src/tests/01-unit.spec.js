import { describe, it, expect } from 'vitest'
import { calculateSubtotal, calculateTotal } from '../lib/cart.js'
describe('Cart calculations', () => {
  it('calculates a subtotal with quantities', () => {
    expect(calculateSubtotal([{ price: 50, quantity: 2 }])).toBe(100)
  })
  it('returns zero for an empty cart', () => {
    expect (calculateSubtotal([])).toBe(0)
  })
  it('applies SAVE10 for a 10% discount', () => {
    expect (calculateTotal([{price: 50, quantity: 1}], 'SAVE10')).toBe(45)
  })
  it('does not discount an invalid code', () => {
    expect (calculateSubtotal([{price: 50, quantity: 1}], 'NOPE')).toBe(50)
  })
})
