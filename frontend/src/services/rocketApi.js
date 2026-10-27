import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 20000
})

export const rocketApi = {
  async list() {
    const { data } = await api.get('/rockets')
    return data
  },
  async get(id) {
    const { data } = await api.get(`/rockets/${encodeURIComponent(id)}`)
    return data
  },
  async create(payload) {
    const { data } = await api.post('/rockets', payload)
    return data
  }
}
