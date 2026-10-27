import { defineStore } from 'pinia'
import { ref } from 'vue'
import { rocketApi } from '../services/rocketApi'

export const useRocketStore = defineStore('rockets', () => {
  const rockets = ref([])
  const loading = ref(false)
  const error = ref('')
  const loaded = ref(false)

  async function fetchRockets(force = false) {
    if (loaded.value && !force) return
    loading.value = true
    error.value = ''
    try {
      rockets.value = await rocketApi.list()
      loaded.value = true
    } catch (e) {
      error.value = e.response?.data?.message || 'Data roket gagal dimuat. Periksa koneksi lalu coba lagi.'
    } finally {
      loading.value = false
    }
  }

  async function addRocket(payload) {
    const rocket = await rocketApi.create(payload)
    rockets.value = [rocket, ...rockets.value]
    return rocket
  }

  return { rockets, loading, error, loaded, fetchRockets, addRocket }
})
