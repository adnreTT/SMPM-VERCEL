import api from './api'

export async function registerUser (payload) {
  const { data } = await api.post('/auth/register', payload)
  return data
}
