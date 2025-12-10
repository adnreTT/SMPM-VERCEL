
import { defineStore } from 'pinia'
import { loginApi } from '../services/auth'
const KEY = 'smpm_auth_token'

export const useAuthStore = defineStore('auth', {
  state: () => ({ token: localStorage.getItem(KEY) || null, user: null }),
  getters: {
    isAuthenticated: (s) => !!s.token,
    email: (s) => s.user?.email || '',
    name: (s) => s.user?.name || ''
  },
  actions: {
    async login(email, password){
      const { token, user } = await loginApi(email, password)
      this.token = token
      this.user = user
      localStorage.setItem(KEY, token)
    },
    loginWithToken(token, user){
      this.token = token
      this.user = user
      localStorage.setItem(KEY, token)
    },
    logout(){
      this.token = null
      this.user = null
      localStorage.removeItem(KEY)
    },
    hydrateFromToken(){
      const t = localStorage.getItem(KEY)
      if(t){
        this.token = t
        if(!this.user){
          this.user = { name: 'Usuário', email: '' }
        }
      }
    }
  }
})
