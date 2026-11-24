# Mama Shop Part 2 - Browser-First Student Guide

**Prerequisite:** Complete Mama Shop Part 1. Part 2 already includes the completed Part 1 cart.  
**Goal:** Extend Mama Shop with Express APIs, login, product details, protected routes, checkout, and order history.

## Project layout and starting both applications

```text
mama-shop-part2/
├── client/                       # Vue 3 / Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── data/
│   │   ├── router/
│   │   ├── services/api.js       # HTTP requests to Express
│   │   ├── stores/              # Pinia stores
│   │   └── views/
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
├── server/                       # Independent Express backend
│   ├── server.js
│   └── package.json
├── README.md
├── student-guide.md
└── youtube-narration-script.md
```

**Terminal 1 — Vue frontend (from the `mama-shop-part2` parent folder):**

```bash
cd client
pnpm install
pnpm dev
```

**Terminal 2 — Express backend (open a second terminal at `mama-shop-part2`):**

```bash
cd server
pnpm install
pnpm dev
```

Open the Vite URL shown in Terminal 1 (usually `http://localhost:5173`). The backend API is at `http://localhost:8000`. Keep both processes running. Each application has its **own `package.json`**; do not run `pnpm install` or `pnpm dev` from the parent folder.

### How we will learn

For every TODO, follow this order:

1. **Observe:** Find the UI that needs the feature.
2. **Trace:** Follow the import, store call, API helper, and backend endpoint.
3. **Predict:** What should happen when it works? What if the server fails?
4. **Implement:** Fill the TODO without duplicating existing declarations.
5. **Test:** Use the browser, Console, Network, and Application tabs.
6. **Explain:** Describe the full data flow in your own words.

The code below is reference material to insert at the matching TODO. The starter project is deliberately incomplete. Read the existing file first and preserve its surrounding code.

## Part 1 recap

- `cart.js` already contains `items`, cart actions, and computed getters.
- Cart changes are saved to localStorage using `watch(..., { deep: true })`.
- Vue Router already handles `/products` and `/cart`.
- Part 2 introduces a **separate backend** and new stores for authentication and orders.

> **Important folder rule:** In the instructions below, paths beginning `client/` belong to the Vue application; `server/server.js` belongs to the Express application. When editing a Vue file, look inside `client/src/`, **not** the parent folder.

## TODO roadmap

| TODO | What we see first | File to implement |
|---|---|---|
| 1A-1C | ProductsView loading, errors, Retry | `client/src/stores/products.js` |
| 2A-2E | LoginView form and NavBar greeting | `client/src/stores/auth.js` |
| 3 (observation) | Product links, detail URL, protected routes | `client/src/router/index.js`, `ProductDetailView.vue` |
| 4A-4C | CartView Checkout button | `client/src/stores/cart.js` |
| 5A-5C | OrdersView order list | `client/src/stores/orders.js` |

---
## Lesson 1: From the browser to the products API (TODO 1A-1C)

### 1. Find the need before writing code

Open `/products`, then `client/src/views/ProductsView.vue`. Find `onMounted(() => productsStore.fetchProducts())`, the `loading` and `error` paragraphs, the Retry button, and the `ProductCard` loop.

**Ask yourself:** What is already implemented in the view? What is missing in the store? Which property or function does the template expect?

Part 1's products came from `data/products.js`. In Part 2 the Express server becomes the source of products. `loading` tells the view a request is in progress; `error` explains a failed request. `fetchProducts()` is already called by the view, but its starter body is empty.

### 2. Follow the data flow

Follow `useProductsStore()` into `client/src/stores/products.js`, then the `apiRequest` import to `client/src/services/api.js`, and finally open `server/server.js` to locate `app.get('/products', ...)`.

**Explain the connection aloud:** Browser interaction → Vue view/component → Pinia store → `apiRequest()` → Express endpoint → JSON response → store state → updated UI.

### 3. Code the TODO

**Reference implementation** (read existing starter code first; don't duplicate function declarations or imports):

```javascript
async function fetchProducts() {
  loading.value = true
  error.value = ''

  try {
    const fetchedProducts = await apiRequest('/products')
    products.value = fetchedProducts
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    loading.value = false
  }
}
```

### 4. Understand the code

Explain that `async` allows `await`; `await` waits for the Promise to settle without blocking the browser UI. `apiRequest('/products')` constructs the URL using `BASE_URL` and calls `fetch`. It parses JSON, throws an Error on a non-2xx response, and returns the data on success. The `try` block updates the reactive array. The `catch` block records a message. `finally` always resets the loading flag.

**Predict:** What would happen if the request takes a long time? What happens when it fails? Which part of the UI displays the result?

### 5. Checkpoint

Start both servers, reload `/products`, and inspect Network > Fetch/XHR for `GET http://localhost:8000/products`. Stop the API and reload: show the error and Retry button. Note that the starter initially has a local product fallback; after the API succeeds, products are replaced. In the completed solution, products start empty.

**Important limitation:** If you see products even when the API is stopped, that is because the starter still initializes `products` with `sampleProducts`. Explain this fallback explicitly. Do not claim an error automatically hides those products.

**Reflect:** Which view uses this store? Which reactive state changes? How does the UI know it has changed?

---
## Lesson 2: From the Login form to the authentication store (TODO 2A-2E)

### 1. Find the need before writing code

Open `/login` and `client/src/views/LoginView.vue`. Trace `@submit.prevent="submit"` to `submit()`, then to `await auth.login(username.value, password.value)`. Open `client/src/components/NavBar.vue` and find `auth.isLoggedIn`, the greeting, and Logout.

**Ask yourself:** What is already implemented in the view? What is missing in the store? Which property or function does the template expect?

The form already expects `auth.login()` to return true or false. The NavBar needs `auth.user` and `auth.isLoggedIn` to decide whether to show Login or the user's name. The login action must request a token, store the result, and handle loading and errors. Afterward, localStorage will restore the demo session across refreshes.

### 2. Follow the data flow

Open `client/src/stores/auth.js` to find the placeholder `login`, `logout`, and `isLoggedIn` getter. Then open `server/server.js` and locate `app.post('/login', ...)`. The server accepts any nonempty username and password for this demo and returns `{ token, user }`.

**Explain the connection aloud:** Browser interaction → Vue view/component → Pinia store → `apiRequest()` → Express endpoint → JSON response → store state → updated UI.

### 3. Code the TODO

**Reference implementation** (read existing starter code first; don't duplicate function declarations or imports):

```javascript
// Add above defineStore():
const AUTH_KEY = 'mama_shop_auth'

function loadSession() {
  try {
    const savedText = localStorage.getItem(AUTH_KEY)

    if (!savedText) {
      return null
    }

    const savedSession = JSON.parse(savedText)

    if (typeof savedSession?.token !== 'string') {
      return null
    }

    if (!savedSession.user?.username) {
      return null
    }

    return savedSession
  } catch (error) {
    console.warn('Unable to restore login session:', error)
    return null
  }
}

// Inside defineStore(), replace the original user/token declarations:
const savedSession = loadSession()
const user = ref(savedSession ? savedSession.user : null)
const token = ref(savedSession ? savedSession.token : '')

// Replace the placeholder login() function:
async function login(username, password) {
  loading.value = true
  error.value = ''

  try {
    const result = await apiRequest('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username,
        password
      })
    })

    user.value = result.user
    token.value = result.token

    localStorage.setItem(AUTH_KEY, JSON.stringify({
      user: user.value,
      token: token.value
    }))

    return true
  } catch (requestError) {
    error.value = requestError.message
    return false
  } finally {
    loading.value = false
  }
}

// Add this line inside the existing logout() function:
localStorage.removeItem(AUTH_KEY)
```

### 4. Understand the code

Teach TODO 2A-C first: set `loading`, clear the previous error, POST a JSON body, read the response, update `user` and `token`, return true on success, and return false on failure. Explain why the view awaits the result. Next teach TODO 2D: logout must clear both reactive values and browser storage. Finally teach TODO 2E: `loadSession()` must be defined above the store and called before initializing `user` and `token`. Avoid duplicate `const user` or `const token` declarations.

**Predict:** What would happen if the request takes a long time? What happens when it fails? Which part of the UI displays the result?

### 5. Checkpoint

Submit with `student` / `demo`; confirm the greeting and Orders link. Inspect Application > Local storage > Vite origin > `mama_shop_auth`. Refresh and confirm the greeting persists. Click Logout and refresh again. Test an empty credential field (HTML `required` prevents submission).

**Important limitation:** This is demonstration-only authentication. The Express server accepts any nonempty credentials, stores sessions in memory, and loses them on restart. The frontend's localStorage token can outlive the server session; it is not production-grade security. Never use this design for real accounts.

**Reflect:** Which view uses this store? Which reactive state changes? How does the UI know it has changed?

---
## Lesson 3: Follow a product link and inspect protected navigation (TODO 3 (read-only))

### 1. Find the need before writing code

From `/products`, click a product title. Observe the URL `/products/1`. Open `client/src/components/ProductCard.vue` and find `<RouterLink :to="`/products/${product.id}`">`.

**Ask yourself:** What is already implemented in the view? What is missing in the store? Which property or function does the template expect?

The URL determines which product detail page is displayed. A route parameter is a string, while product IDs are numbers, so the view converts it. Protected routes use a navigation guard to redirect unauthenticated visitors to `/login` with a `redirect` query.

### 2. Follow the data flow

Open `client/src/router/index.js` and locate `/products/:id`. Open `client/src/views/ProductDetailView.vue` and trace `useRoute()`, `route.params.id`, `Number(...)`, and the computed `.find()`. Then inspect the `meta.requiresAuth` routes and `router.beforeEach` guard.

**Explain the connection aloud:** Browser interaction → Vue view/component → Pinia store → `apiRequest()` → Express endpoint → JSON response → store state → updated UI.

### 3. Code the TODO

**Reference implementation** (read existing starter code first; don't duplicate function declarations or imports):

```javascript
// These are already present in the starter: observe, don't retype.
{ path: '/products/:id', component: ProductDetailView }
{ path: '/cart', component: CartView, meta: { requiresAuth: true } }
{ path: '/orders', component: OrdersView, meta: { requiresAuth: true } }

// ProductDetailView.vue:
const product = computed(() => {
  const productId = Number(route.params.id)

  return productsStore.products.find((item) => {
    return item.id === productId
  })
})
```

### 4. Understand the code

Explain the distinction between `useRouter()` (navigation) and `useRoute()` (information about the current route). In the guard, `to.meta.requiresAuth` controls whether login is needed. The guard uses `auth.isLoggedIn` and redirects to `/login?redirect=...`. LoginView reads the query and navigates to the intended page after success. The guard protects navigation UX only; Express independently checks Bearer tokens.

**Predict:** What would happen if the request takes a long time? What happens when it fails? Which part of the UI displays the result?

### 5. Checkpoint

Click a product title and confirm details. Manually visit `/products/999` and see Product not found. Log out, request `/orders` or `/cart`, observe the login redirect, then log in and confirm the intended page opens.

**Important limitation:** TODO 3 is an observation task. Do not ask students to implement routes and guards that are already supplied.

**Reflect:** Which view uses this store? Which reactive state changes? How does the UI know it has changed?

---
## Lesson 4: From Checkout button to POST /orders (TODO 4A-4C)

### 1. Find the need before writing code

While logged in, add two products and open `/cart`. Open `client/src/views/CartView.vue` and find the Checkout button, its `@click="checkout"` handler, the `busy` flag, and the call `await cart.checkout(auth.token)`.

**Ask yourself:** What is already implemented in the view? What is missing in the store? Which property or function does the template expect?

The view already knows how to show 'Checking out...', catch errors, and navigate to `/orders` after success. The store action must send the cart to the backend with a token. Only a successful API response should clear the cart.

### 2. Follow the data flow

Follow `cart.checkout()` into `client/src/stores/cart.js`. Open `server/server.js` to find `app.post('/orders', authenticate, ...)`, the Bearer token check, item validation, and the JSON order response.

**Explain the connection aloud:** Browser interaction → Vue view/component → Pinia store → `apiRequest()` → Express endpoint → JSON response → store state → updated UI.

### 3. Code the TODO

**Reference implementation** (read existing starter code first; don't duplicate function declarations or imports):

```javascript
async function checkout(token) {
  const createdOrder = await apiRequest('/orders', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      items: items.value
    })
  })

  clearCart()

  return createdOrder
}
```

### 4. Understand the code

Explain POST versus GET, `Content-Type`, the JSON body, and the `Authorization` header. `await` pauses the checkout action until the request succeeds or throws. The view already has try/catch/finally; we should let failures propagate from the store so the view can display an error. `clearCart()` is deliberately after `await`, never before it.

**Predict:** What would happen if the request takes a long time? What happens when it fails? Which part of the UI displays the result?

### 5. Checkpoint

With a valid login, add Notebook and Pen and click Checkout. Watch Network for `POST /orders`, confirm a 201 response, confirm the cart clears, and observe navigation to `/orders`. If the API is stopped, checkout should fail and the cart should remain intact.

**Important limitation:** If a session was restored from localStorage after restarting Express, the old token will no longer be recognized. Log out and log back in before checkout.

**Reflect:** Which view uses this store? Which reactive state changes? How does the UI know it has changed?

---
## Lesson 5: From Orders page to GET /orders (TODO 5A-5C)

### 1. Find the need before writing code

Open `client/src/views/OrdersView.vue`. Observe `onMounted(() => orders.fetchOrders(auth.token))` and the template's `orders.loading`, `orders.error`, `orders.orders.length`, and order `v-for`.

**Ask yourself:** What is already implemented in the view? What is missing in the store? Which property or function does the template expect?

The Orders page already knows how to render order cards, but it needs a store action to retrieve the data. The token identifies the logged-in demo session. `loading` and `error` give feedback while the request is pending or fails.

### 2. Follow the data flow

Follow `useOrdersStore()` into `client/src/stores/orders.js`. Find the empty `fetchOrders(token)` function. Open `server/server.js` and locate `app.get('/orders', authenticate, ...)`.

**Explain the connection aloud:** Browser interaction → Vue view/component → Pinia store → `apiRequest()` → Express endpoint → JSON response → store state → updated UI.

### 3. Code the TODO

**Reference implementation** (read existing starter code first; don't duplicate function declarations or imports):

```javascript
async function fetchOrders(token) {
  loading.value = true
  error.value = ''

  try {
    const fetchedOrders = await apiRequest('/orders', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    orders.value = fetchedOrders
  } catch (requestError) {
    error.value = requestError.message
  } finally {
    loading.value = false
  }
}
```

### 4. Understand the code

Explain that this is a GET request, so there is no request body. The Authorization header is still required. Assign the returned array to `orders.value`. The `finally` block resets loading on success or failure. The `orders` array is separate from the cart's `items` array: the cart represents current selections; orders represent completed purchases.

**Predict:** What would happen if the request takes a long time? What happens when it fails? Which part of the UI displays the result?

### 5. Checkpoint

After checkout, confirm the order appears with ID, timestamp, total, and items. Reload `/orders` while the server remains running. Restart Express and explain that its in-memory orders and sessions have been lost.

**Important limitation:** This tutorial uses in-memory server data, not a database. Restarting the backend clears orders and tokens. A real production app would require persistent storage and proper authentication.

**Reflect:** Which view uses this store? Which reactive state changes? How does the UI know it has changed?

---
## Final end-to-end verification

1. Confirm both servers are running.
2. Visit `/` and observe the redirect to `/products`.
3. Open the Network tab and verify `GET /products`.
4. Click a product title and observe `/products/:id`.
5. Add two products to the cart.
6. Log out and attempt to open `/cart`. Observe the redirect to Login.
7. Log in using any nonempty username/password (e.g., `student` and `demo`).
8. Return to the protected page and click Checkout.
9. Verify `POST /orders` returns success before the cart is cleared.
10. Open Orders and verify `GET /orders`.
11. Inspect localStorage for `mama_shop_cart` and `mama_shop_auth`.
12. Refresh the frontend. Then restart Express and explain why the server's sessions and orders disappear.

## Debugging checklist

- **Blank page:** Check the Console for an import or syntax error.
- **Network request missing:** Confirm the lifecycle hook or click handler calls the store action.
- **Connection refused:** Start the Express server in its own terminal.
- **401 Unauthorized:** Your saved demo token may be stale after restarting Express. Log out and log in again.
- **Old products still visible when the server is down:** The Part 2 starter deliberately initializes products from local sample data. This is a fallback, not a successful API response.
- **Cart disappears after checkout:** That should happen only after a successful POST.
- **Order history disappears after restarting Express:** The demo backend stores orders in memory, not a database.

## Conceptual summary

- **View:** Displays data and calls store actions.
- **Pinia store:** Manages reactive state, async operations, loading, and errors.
- **API helper:** Sends HTTP requests and reports unsuccessful responses.
- **Express:** Serves product data, validates tokens, and manages demo orders.
- **Vue Router:** Maps URLs to views and can redirect visitors.
- **localStorage:** Persists selected browser data across refreshes, but does not make a token secure.

**Security note:** This is a teaching demo, not a production authentication system. Never store real secrets in this exercise.
