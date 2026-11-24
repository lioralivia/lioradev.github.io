import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { apiRequest } from '../services/api'

const AUTH_KEY = 'mama_shop_auth'
function loadSession(){
  try{
    const savedText = localStorage.getItem(AUTH_KEY)
    if (!savedText){
      return null
    }

    const savedSession = JSON.parse(savedText)
    if(typeof savedSession?.token !== 'string'){
      return null
    }

    if(!savedSession.user?.username){
      return null
    }
    return savedSession
  }catch(error){
    console.warn('Unable to restore login session: error')
    return null
  }
}

export const useAuthStore = defineStore('auth', () => {
  const savedSession = loadSession()
  const user = ref(savedSession ? savedSession.user : null)
  const token = ref(savedSession ? savedSession.token : '')
  const loading = ref(false)
  const error = ref('')

  const isLoggedIn = computed(() => {
    return Boolean(token.value)
  })

  // TODO 2A-2C: Implement login using POST /login.\n  // FIRST: Read LoginView.vue and NavBar.vue to see how login()\n  // and isLoggedIn are used.
  async function login(username, password) {
    // TODO 2A: Set loading=true and clear error.
    loading.value = true
    error.value = ''

    // TODO 2B: POST JSON { username, password }.
    // If successful, assign result.user and result.token.
    // Save both values in localStorage under 'mama_shop_auth'.

    // TODO 2C: Catch errors; always reset loading in finally.
    try {
      const result = await apiRequest('/login', {
        method : 'POST',
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
    } catch (requestError){
      error.value = requestError.message
      return false
    } finally {
      loading.value = false
    }
  }

  function logout() {
    user.value = null
    token.value = ''

    // TODO 2D: Remove 'mama_shop_auth' from localStorage.
    localStorage.removeItem(AUTH_KEY)
  }

  // TODO 2E: Restore saved user/token when the store is created.
  // Hint: Write loadSession() ABOVE defineStore().

  return {
    user,
    token,
    loading,
    error,
    isLoggedIn,
    login,
    logout
  }
})
