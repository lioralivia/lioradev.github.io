// The Express server runs separately on port 8000.
const BASE_URL = 'http://localhost:8000'

// Centralize fetch() and error handling to avoid repetition in stores.
export async function apiRequest(path, options = {}) {
  const response = await fetch(`${BASE_URL}${path}`, options)
  const responseData = await response.json()

  if (!response.ok) {
    const message = responseData.message || responseData.error || 'Request failed'
    throw new Error(message)
  }

  return responseData
}
