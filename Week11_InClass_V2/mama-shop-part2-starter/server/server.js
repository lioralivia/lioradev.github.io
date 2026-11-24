import express from 'express'
import cors from 'cors'
const app = express()
app.use(cors())
app.use(express.json())
const products = [
  { id: 1, title: 'Notebook', price: 3.50, description: 'A5 lined notebook for class notes.' },
  { id: 2, title: 'Pen', price: 1.20, description: 'Smooth blue ballpoint pen.' },
  { id: 3, title: 'Backpack', price: 29.90, description: 'Everyday school backpack.' },
  { id: 4, title: 'Water Bottle', price: 9.50, description: 'Reusable 600 ml water bottle.' },
  { id: 5, title: 'USB Drive', price: 12.00, description: '32 GB USB drive.' },
  { id: 6, title: 'Headphones', price: 49.00, description: 'Comfortable wired headphones.' }
]
const sessions = new Map()
const orders = []
let nextId = 1
function authenticate(req, res, next) {
  const token = (req.headers.authorization || '').replace(/^Bearer /, '')
  if (!sessions.has(token)) return res.status(401).json({ message: 'Unauthorized' })
  req.username = sessions.get(token)
  next()
}
app.get('/products', (req, res) => res.json(products))
app.post('/login', (req, res) => {
  const username = String(req.body.username || '').trim()
  const password = String(req.body.password || '').trim()
  if (!username || !password) return res.status(400).json({ message: 'Enter username and password' })
  const token = `demo-${crypto.randomUUID()}`
  sessions.set(token, username)
  res.json({ token, user: { username } })
})
app.post('/orders', authenticate, (req, res) => {
  const items = req.body.items
  if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ message: 'Cart is empty' })
  const cleanItems = []
  for (const item of items) {
    const product = products.find(p => p.id === item.productId)
    if (!product || !Number.isInteger(item.qty) || item.qty < 1) return res.status(400).json({ message: 'Invalid cart item' })
    cleanItems.push({ productId: product.id, title: product.title, price: product.price, qty: item.qty })
  }
  const total = cleanItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const order = { id: nextId++, username: req.username, items: cleanItems, total, createdAt: new Date().toISOString() }
  orders.unshift(order)
  res.status(201).json(order)
})
app.get('/orders', authenticate, (req, res) => res.json(orders.filter(order => order.username === req.username)))
app.listen(8000, () => console.log('Mama Shop API: http://localhost:8000'))
