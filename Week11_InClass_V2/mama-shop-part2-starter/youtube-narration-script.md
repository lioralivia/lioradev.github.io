# Mama Shop Part 2 - Complete Browser-First YouTube Narration

**Audience:** IS216 students who have completed Part 1.  
**Estimated recording duration:** 50-65 minutes including live coding, deliberate pauses, and testing.  
**Teaching rule:** Browser → view/component → store → API helper → Express endpoint → implementation → browser verification.

## Opening: What changes from Part 1? (4 minutes)

**[On screen]** Open the completed Part 1 application, then open the Part 2 starter in VS Code. Show the folders briefly. Do not explain every file in isolation.

**Narration:**

"Welcome back to Mama Shop. In Part 1, we followed the application from the browser to the router, then to our views and Pinia stores. We built the cart and used localStorage to remember it after a refresh.

"In Part 2, we're going to build on that same application. The cart already works. Our new challenge is to communicate with a backend server, log in, protect certain pages, check out, and view previous orders.

"We'll keep the same learning approach. Before we implement a function, we'll find where it is used. We'll start from what the user sees, follow the function call, and then implement the missing part.

"Part 2 has two independent applications inside one parent folder. The `client` folder contains our Vue 3 frontend. Vite serves it, usually on port 5173. The `server` folder contains our Express backend, running on port 8000. These are sibling folders, each with its own `package.json` and dependencies. We need two terminals, one for each application."

**[On screen]** Show the two sibling folders, `client/` and `server/`, in the VS Code Explorer. Explain that these are separate Node.js applications, not one Vue project containing a server. Show their independent `package.json` files.

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

**Narration:**

"Leave both terminals running. If your frontend port is different, use the Vite URL shown in your terminal. Notice the product cards and cart from Part 1 are still here. We'll use these existing features as we add new behavior. One important distinction: Vue Router maps the browser URL `/products` to a Vue view; Express handles the separate HTTP request `GET http://localhost:8000/products`. They are not the same route."

**[On screen]** Visit `/products`, open Chrome DevTools > Network, and refresh.

---

## Segment 1: From the browser to the products API (TODO 1A-1C, 10-12 minutes)

### A. Start with what the customer sees

**[On screen]** Open `/products`, then `client/src/views/ProductsView.vue`. Find `onMounted(() => productsStore.fetchProducts())`, the `loading` and `error` paragraphs, the Retry button, and the `ProductCard` loop.

**Narration:**

"Before we type anything, let's find the reason this feature exists. Part 1's products came from `data/products.js`. In Part 2 the Express server becomes the source of products. `loading` tells the view a request is in progress; `error` explains a failed request. `fetchProducts()` is already called by the view, but its starter body is empty.

"Look at the view carefully. Which line starts the operation? Which state properties are used to display feedback? If we haven't implemented the store function yet, what would we expect to happen?"

**[Pause]** Ask students to identify the exact method or property name. Point to it with the cursor.

### B. Follow the code to its source

**[On screen]** Follow `useProductsStore()` into `client/src/stores/products.js`, then the `apiRequest` import to `client/src/services/api.js`, and finally open `server/server.js` to locate `app.get('/products', ...)`.

**Narration:**

"Now we'll follow the code instead of guessing. The view imports a store, calls its function, and expects a result. The store can use our shared API helper, which sends the HTTP request to Express. We should understand this connection before implementing anything.

"When this feature makes an HTTP request, `client/src/services/api.js` sends it to our separate Express backend at port 8000. The helper uses `fetch`, parses JSON, and throws an error for an unsuccessful response. For client-side route changes, however, Vue Router handles navigation without an HTTP request to Express."

**[On screen]** Show the relevant backend route. Explain what HTTP method it expects and what JSON or headers it needs.

### C. Implement the TODO, slowly

**[On screen]** Open the file containing TODO 1A-1C. Type the following reference code into the matching starter placeholders. Do not duplicate existing imports, variables, or function declarations. For the read-only TODO, simply inspect the supplied code.

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

**Narration:**

"Let's read this code from top to bottom, rather than copying it all at once. Explain that `async` allows `await`; `await` waits for the Promise to settle without blocking the browser UI. `apiRequest('/products')` constructs the URL using `BASE_URL` and calls `fetch`. It parses JSON, throws an Error on a non-2xx response, and returns the data on success. The `try` block updates the reactive array. The `catch` block records a message. `finally` always resets the loading flag.

"Pay attention to the flow of data: what enters the function, what we wait for, what state changes, and what the caller receives. The same reasoning will help you build larger Vue applications."

**[On screen]** Revisit the view and highlight exactly where the newly implemented state or action is consumed. Ask students to predict the visible result.

### D. Test and debug in the browser

**[On screen]** Start both servers, reload `/products`, and inspect Network > Fetch/XHR for `GET http://localhost:8000/products`. Stop the API and reload: show the error and Retry button. Note that the starter initially has a local product fallback; after the API succeeds, products are replaced. In the completed solution, products start empty.

**Narration:**

"Let's test what we predicted. Start both servers, reload `/products`, and inspect Network > Fetch/XHR for `GET http://localhost:8000/products`. Stop the API and reload: show the error and Retry button. Note that the starter initially has a local product fallback; after the API succeeds, products are replaced. In the completed solution, products start empty.

"If something fails, check the browser Console first. Then look at the Network tab: did the request go to the correct URL? Was it GET or POST? What status code came back? What JSON did the server return? If no request appears, check the click handler or lifecycle hook and the Pinia action.

"Remember this important limitation: If you see products even when the API is stopped, that is because the starter still initializes `products` with `sampleProducts`. Explain this fallback explicitly. Do not claim an error automatically hides those products."

**[Pause for student checkpoint]** Ask students to explain the full chain from UI to store to backend and back, in their own words.

---
## Segment 2: From the Login form to the authentication store (TODO 2A-2E, 12-15 minutes)

### A. Start with what the customer sees

**[On screen]** Open `/login` and `client/src/views/LoginView.vue`. Trace `@submit.prevent="submit"` to `submit()`, then to `await auth.login(username.value, password.value)`. Open `client/src/components/NavBar.vue` and find `auth.isLoggedIn`, the greeting, and Logout.

**Narration:**

"Before we type anything, let's find the reason this feature exists. The form already expects `auth.login()` to return true or false. The NavBar needs `auth.user` and `auth.isLoggedIn` to decide whether to show Login or the user's name. The login action must request a token, store the result, and handle loading and errors. Afterward, localStorage will restore the demo session across refreshes.

"Look at the view carefully. Which line starts the operation? Which state properties are used to display feedback? If we haven't implemented the store function yet, what would we expect to happen?"

**[Pause]** Ask students to identify the exact method or property name. Point to it with the cursor.

### B. Follow the code to its source

**[On screen]** Open `client/src/stores/auth.js` to find the placeholder `login`, `logout`, and `isLoggedIn` getter. Then open `server/server.js` and locate `app.post('/login', ...)`. The server accepts any nonempty username and password for this demo and returns `{ token, user }`.

**Narration:**

"Now we'll follow the code instead of guessing. The view imports a store, calls its function, and expects a result. The store can use our shared API helper, which sends the HTTP request to Express. We should understand this connection before implementing anything.

"When this feature makes an HTTP request, `client/src/services/api.js` sends it to our separate Express backend at port 8000. The helper uses `fetch`, parses JSON, and throws an error for an unsuccessful response. For client-side route changes, however, Vue Router handles navigation without an HTTP request to Express."

**[On screen]** Show the relevant backend route. Explain what HTTP method it expects and what JSON or headers it needs.

### C. Implement the TODO, slowly

**[On screen]** Open the file containing TODO 2A-2E. Type the following reference code into the matching starter placeholders. Do not duplicate existing imports, variables, or function declarations. For the read-only TODO, simply inspect the supplied code.

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

**Narration:**

"Let's read this code from top to bottom, rather than copying it all at once. Teach TODO 2A-C first: set `loading`, clear the previous error, POST a JSON body, read the response, update `user` and `token`, return true on success, and return false on failure. Explain why the view awaits the result. Next teach TODO 2D: logout must clear both reactive values and browser storage. Finally teach TODO 2E: `loadSession()` must be defined above the store and called before initializing `user` and `token`. Avoid duplicate `const user` or `const token` declarations.

"Pay attention to the flow of data: what enters the function, what we wait for, what state changes, and what the caller receives. The same reasoning will help you build larger Vue applications."

**[On screen]** Revisit the view and highlight exactly where the newly implemented state or action is consumed. Ask students to predict the visible result.

### D. Test and debug in the browser

**[On screen]** Submit with `student` / `demo`; confirm the greeting and Orders link. Inspect Application > Local storage > Vite origin > `mama_shop_auth`. Refresh and confirm the greeting persists. Click Logout and refresh again. Test an empty credential field (HTML `required` prevents submission).

**Narration:**

"Let's test what we predicted. Submit with `student` / `demo`; confirm the greeting and Orders link. Inspect Application > Local storage > Vite origin > `mama_shop_auth`. Refresh and confirm the greeting persists. Click Logout and refresh again. Test an empty credential field (HTML `required` prevents submission).

"If something fails, check the browser Console first. Then look at the Network tab: did the request go to the correct URL? Was it GET or POST? What status code came back? What JSON did the server return? If no request appears, check the click handler or lifecycle hook and the Pinia action.

"Remember this important limitation: This is demonstration-only authentication. The Express server accepts any nonempty credentials, stores sessions in memory, and loses them on restart. The frontend's localStorage token can outlive the server session; it is not production-grade security. Never use this design for real accounts."

**[Pause for student checkpoint]** Ask students to explain the full chain from UI to store to backend and back, in their own words.

---
## Segment 3: Follow a product link and inspect protected navigation (TODO 3 (read-only), 7-9 minutes)

### A. Start with what the customer sees

**[On screen]** From `/products`, click a product title. Observe the URL `/products/1`. Open `client/src/components/ProductCard.vue` and find `<RouterLink :to="`/products/${product.id}`">`.

**Narration:**

"Before we type anything, let's find the reason this feature exists. The URL determines which product detail page is displayed. A route parameter is a string, while product IDs are numbers, so the view converts it. Protected routes use a navigation guard to redirect unauthenticated visitors to `/login` with a `redirect` query.

"Look at the view carefully. Which line starts the operation? Which state properties are used to display feedback? If we haven't implemented the store function yet, what would we expect to happen?"

**[Pause]** Ask students to identify the exact method or property name. Point to it with the cursor.

### B. Follow the code to its source

**[On screen]** Open `client/src/router/index.js` and locate `/products/:id`. Open `client/src/views/ProductDetailView.vue` and trace `useRoute()`, `route.params.id`, `Number(...)`, and the computed `.find()`. Then inspect the `meta.requiresAuth` routes and `router.beforeEach` guard.

**Narration:**

"Now we'll follow the code instead of guessing. The view imports a store, calls its function, and expects a result. The store can use our shared API helper, which sends the HTTP request to Express. We should understand this connection before implementing anything.

"When this feature makes an HTTP request, `client/src/services/api.js` sends it to our separate Express backend at port 8000. The helper uses `fetch`, parses JSON, and throws an error for an unsuccessful response. For client-side route changes, however, Vue Router handles navigation without an HTTP request to Express."

**[On screen]** Show the relevant backend route. Explain what HTTP method it expects and what JSON or headers it needs.

### C. Implement the TODO, slowly

**[On screen]** Open the file containing TODO 3 (read-only). Type the following reference code into the matching starter placeholders. Do not duplicate existing imports, variables, or function declarations. For the read-only TODO, simply inspect the supplied code.

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

**Narration:**

"Let's read this code from top to bottom, rather than copying it all at once. Explain the distinction between `useRouter()` (navigation) and `useRoute()` (information about the current route). In the guard, `to.meta.requiresAuth` controls whether login is needed. The guard uses `auth.isLoggedIn` and redirects to `/login?redirect=...`. LoginView reads the query and navigates to the intended page after success. The guard protects navigation UX only; Express independently checks Bearer tokens.

"Pay attention to the flow of data: what enters the function, what we wait for, what state changes, and what the caller receives. The same reasoning will help you build larger Vue applications."

**[On screen]** Revisit the view and highlight exactly where the newly implemented state or action is consumed. Ask students to predict the visible result.

### D. Test and debug in the browser

**[On screen]** Click a product title and confirm details. Manually visit `/products/999` and see Product not found. Log out, request `/orders` or `/cart`, observe the login redirect, then log in and confirm the intended page opens.

**Narration:**

"Let's test what we predicted. Click a product title and confirm details. Manually visit `/products/999` and see Product not found. Log out, request `/orders` or `/cart`, observe the login redirect, then log in and confirm the intended page opens.

"If something fails, check the browser Console first. Then look at the Network tab: did the request go to the correct URL? Was it GET or POST? What status code came back? What JSON did the server return? If no request appears, check the click handler or lifecycle hook and the Pinia action.

"Remember this important limitation: TODO 3 is an observation task. Do not ask students to implement routes and guards that are already supplied."

**[Pause for student checkpoint]** Ask students to explain the full chain from UI to store to backend and back, in their own words.

---
## Segment 4: From Checkout button to POST /orders (TODO 4A-4C, 9-11 minutes)

### A. Start with what the customer sees

**[On screen]** While logged in, add two products and open `/cart`. Open `client/src/views/CartView.vue` and find the Checkout button, its `@click="checkout"` handler, the `busy` flag, and the call `await cart.checkout(auth.token)`.

**Narration:**

"Before we type anything, let's find the reason this feature exists. The view already knows how to show 'Checking out...', catch errors, and navigate to `/orders` after success. The store action must send the cart to the backend with a token. Only a successful API response should clear the cart.

"Look at the view carefully. Which line starts the operation? Which state properties are used to display feedback? If we haven't implemented the store function yet, what would we expect to happen?"

**[Pause]** Ask students to identify the exact method or property name. Point to it with the cursor.

### B. Follow the code to its source

**[On screen]** Follow `cart.checkout()` into `client/src/stores/cart.js`. Open `server/server.js` to find `app.post('/orders', authenticate, ...)`, the Bearer token check, item validation, and the JSON order response.

**Narration:**

"Now we'll follow the code instead of guessing. The view imports a store, calls its function, and expects a result. The store can use our shared API helper, which sends the HTTP request to Express. We should understand this connection before implementing anything.

"When this feature makes an HTTP request, `client/src/services/api.js` sends it to our separate Express backend at port 8000. The helper uses `fetch`, parses JSON, and throws an error for an unsuccessful response. For client-side route changes, however, Vue Router handles navigation without an HTTP request to Express."

**[On screen]** Show the relevant backend route. Explain what HTTP method it expects and what JSON or headers it needs.

### C. Implement the TODO, slowly

**[On screen]** Open the file containing TODO 4A-4C. Type the following reference code into the matching starter placeholders. Do not duplicate existing imports, variables, or function declarations. For the read-only TODO, simply inspect the supplied code.

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

**Narration:**

"Let's read this code from top to bottom, rather than copying it all at once. Explain POST versus GET, `Content-Type`, the JSON body, and the `Authorization` header. `await` pauses the checkout action until the request succeeds or throws. The view already has try/catch/finally; we should let failures propagate from the store so the view can display an error. `clearCart()` is deliberately after `await`, never before it.

"Pay attention to the flow of data: what enters the function, what we wait for, what state changes, and what the caller receives. The same reasoning will help you build larger Vue applications."

**[On screen]** Revisit the view and highlight exactly where the newly implemented state or action is consumed. Ask students to predict the visible result.

### D. Test and debug in the browser

**[On screen]** With a valid login, add Notebook and Pen and click Checkout. Watch Network for `POST /orders`, confirm a 201 response, confirm the cart clears, and observe navigation to `/orders`. If the API is stopped, checkout should fail and the cart should remain intact.

**Narration:**

"Let's test what we predicted. With a valid login, add Notebook and Pen and click Checkout. Watch Network for `POST /orders`, confirm a 201 response, confirm the cart clears, and observe navigation to `/orders`. If the API is stopped, checkout should fail and the cart should remain intact.

"If something fails, check the browser Console first. Then look at the Network tab: did the request go to the correct URL? Was it GET or POST? What status code came back? What JSON did the server return? If no request appears, check the click handler or lifecycle hook and the Pinia action.

"Remember this important limitation: If a session was restored from localStorage after restarting Express, the old token will no longer be recognized. Log out and log back in before checkout."

**[Pause for student checkpoint]** Ask students to explain the full chain from UI to store to backend and back, in their own words.

---
## Segment 5: From Orders page to GET /orders (TODO 5A-5C, 8-10 minutes)

### A. Start with what the customer sees

**[On screen]** Open `client/src/views/OrdersView.vue`. Observe `onMounted(() => orders.fetchOrders(auth.token))` and the template's `orders.loading`, `orders.error`, `orders.orders.length`, and order `v-for`.

**Narration:**

"Before we type anything, let's find the reason this feature exists. The Orders page already knows how to render order cards, but it needs a store action to retrieve the data. The token identifies the logged-in demo session. `loading` and `error` give feedback while the request is pending or fails.

"Look at the view carefully. Which line starts the operation? Which state properties are used to display feedback? If we haven't implemented the store function yet, what would we expect to happen?"

**[Pause]** Ask students to identify the exact method or property name. Point to it with the cursor.

### B. Follow the code to its source

**[On screen]** Follow `useOrdersStore()` into `client/src/stores/orders.js`. Find the empty `fetchOrders(token)` function. Open `server/server.js` and locate `app.get('/orders', authenticate, ...)`.

**Narration:**

"Now we'll follow the code instead of guessing. The view imports a store, calls its function, and expects a result. The store can use our shared API helper, which sends the HTTP request to Express. We should understand this connection before implementing anything.

"When this feature makes an HTTP request, `client/src/services/api.js` sends it to our separate Express backend at port 8000. The helper uses `fetch`, parses JSON, and throws an error for an unsuccessful response. For client-side route changes, however, Vue Router handles navigation without an HTTP request to Express."

**[On screen]** Show the relevant backend route. Explain what HTTP method it expects and what JSON or headers it needs.

### C. Implement the TODO, slowly

**[On screen]** Open the file containing TODO 5A-5C. Type the following reference code into the matching starter placeholders. Do not duplicate existing imports, variables, or function declarations. For the read-only TODO, simply inspect the supplied code.

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

**Narration:**

"Let's read this code from top to bottom, rather than copying it all at once. Explain that this is a GET request, so there is no request body. The Authorization header is still required. Assign the returned array to `orders.value`. The `finally` block resets loading on success or failure. The `orders` array is separate from the cart's `items` array: the cart represents current selections; orders represent completed purchases.

"Pay attention to the flow of data: what enters the function, what we wait for, what state changes, and what the caller receives. The same reasoning will help you build larger Vue applications."

**[On screen]** Revisit the view and highlight exactly where the newly implemented state or action is consumed. Ask students to predict the visible result.

### D. Test and debug in the browser

**[On screen]** After checkout, confirm the order appears with ID, timestamp, total, and items. Reload `/orders` while the server remains running. Restart Express and explain that its in-memory orders and sessions have been lost.

**Narration:**

"Let's test what we predicted. After checkout, confirm the order appears with ID, timestamp, total, and items. Reload `/orders` while the server remains running. Restart Express and explain that its in-memory orders and sessions have been lost.

"If something fails, check the browser Console first. Then look at the Network tab: did the request go to the correct URL? Was it GET or POST? What status code came back? What JSON did the server return? If no request appears, check the click handler or lifecycle hook and the Pinia action.

"Remember this important limitation: This tutorial uses in-memory server data, not a database. Restarting the backend clears orders and tokens. A real production app would require persistent storage and proper authentication."

**[Pause for student checkpoint]** Ask students to explain the full chain from UI to store to backend and back, in their own words.

---
## Final integration demonstration (4 minutes)

**[On screen]** Restart the frontend if needed. If Express was restarted, log out and log back in to obtain a fresh token. Then complete this flow:

1. Open `/products` and inspect `GET /products`.
2. Click a product title to open `/products/1`.
3. Add products to the cart.
4. If logged out, click Cart and observe the login redirect.
5. Log in using `student` / `demo`.
6. Return to Cart, check out, and inspect `POST /orders`.
7. Open Orders and inspect `GET /orders`.
8. Refresh and explain what persists in localStorage versus server memory.

**Narration:**

"Let's connect the entire Part 2 application. We visit `/products`. The Products view calls the products store. That store requests product data from Express and exposes the result as reactive state. The view renders the product cards.

"Clicking a product title navigates to a dynamic route with its ID. The Product Detail view reads the ID from the URL and finds the matching product.

"When we try to visit a protected page, Vue Router checks whether we appear to be logged in. If not, it sends us to the Login view. The Login view calls the auth store, which posts credentials to Express and receives a demo token. Our NavBar updates because it reads the same auth store.

"When we check out, the cart store posts our selected items to the protected orders API. The server validates the request and creates an order. Only after success does the cart clear. The Orders view then uses the orders store to fetch and display the order history.

"Notice that the view doesn't need to know the details of every HTTP request. It calls a Pinia action and reads reactive state. The store is responsible for coordinating the data, and our API helper handles the common HTTP details.

"This is the main lesson of Part 2: we have extended a local Vue application into a small full-stack application while keeping clear responsibilities between views, stores, and the backend.

"Our demo server stores sessions and orders in memory. That is enough for learning, but it is not how we'd build a secure production store. In a real application, we would need persistent database storage and a more secure authentication design.

"Try explaining one complete flow, such as checkout, from the button all the way to the server and back. If you can do that, you understand how these pieces fit together. Great work, and that's the end of Mama Shop Part 2!"

## Recording checklist

- [ ] Begin from the Part 1 result and explain why a backend is needed.
- [ ] Run the Vite frontend and Express backend in separate terminals.
- [ ] ProductsView → products store → API helper → Express GET /products → TODO 1.
- [ ] LoginView/NavBar → auth store → Express POST /login → TODO 2.
- [ ] ProductCard → dynamic route → ProductDetailView → navigation guard → TODO 3 observation.
- [ ] CartView → cart checkout → Express POST /orders → TODO 4.
- [ ] OrdersView → orders store → Express GET /orders → TODO 5.
- [ ] Test a successful and failed request with DevTools Network.
- [ ] Demonstrate localStorage and explain server-memory limitations.
