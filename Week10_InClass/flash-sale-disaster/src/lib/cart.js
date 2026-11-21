export function calculateSubtotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0)
}
export function calculateTotal(items, code) {
  const subtotal = calculateSubtotal(items)
  const discount = code.trim().toUpperCase() === 'SAVE10' ? 0.10 : 0
  return Number((subtotal * (1 - discount)).toFixed(2))
}
