<template>
  <section class="page detail-page">
    <RouterLink to="/" class="back-link"><ArrowLeft :size="17" /> Back to directory</RouterLink>
    <div v-if="loading" class="state-panel"><span class="loader"></span><h3>Memuat detail roket…</h3><p>Sebentar, kami sedang mengambil data.</p></div>
    <div v-else-if="error" class="state-panel error-state"><span class="state-icon"><AlertCircle :size="25" /></span><h3>Detail gagal dimuat</h3><p>{{ error }}</p><button class="button button-primary" @click="loadRocket"><RefreshCw :size="16" /> Coba lagi</button></div>
    <template v-else-if="rocket">
      <div class="detail-hero">
        <div class="detail-copy"><div class="eyebrow"><span class="live-line"></span> VEHICLE SPECIFICATION</div><h1>{{ rocket.name || 'Nama tidak tersedia' }}</h1><p>{{ rocket.description || 'Deskripsi roket belum tersedia.' }}</p><span v-if="rocket.local" class="local-badge detail-local">LOCAL ENTRY</span></div>
        <div class="detail-image">
          <img v-if="rocket.imageUrl && !imageFailed" :src="rocket.imageUrl" :alt="rocket.name || 'Rocket'" @error="imageFailed = true" />
          <div v-else class="image-fallback"><Rocket :size="64" /><span>IMAGE UNAVAILABLE</span></div>
          <div class="image-caption">FIG. {{ String(rocket.id).slice(-6).toUpperCase() }} / LAUNCH VEHICLE</div>
        </div>
      </div>
      <div class="spec-heading"><div class="eyebrow">TECHNICAL OVERVIEW</div><h2>Mission data</h2></div>
      <div class="spec-grid">
        <div class="spec-card"><span class="spec-icon"><CircleDollarSign :size="19" /></span><span class="spec-label">COST PER LAUNCH</span><strong>{{ formatCost(rocket.launchCost) }}</strong><small>Estimated launch cost</small></div>
        <div class="spec-card"><span class="spec-icon"><Globe2 :size="19" /></span><span class="spec-label">COUNTRY</span><strong>{{ rocket.country || 'Data tidak tersedia' }}</strong><small>Manufacturer origin</small></div>
        <div class="spec-card"><span class="spec-icon"><CalendarDays :size="19" /></span><span class="spec-label">FIRST FLIGHT</span><strong>{{ formatDate(rocket.firstFlight) }}</strong><small>Maiden flight date</small></div>
      </div>
    </template>
  </section>
</template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { AlertCircle, ArrowLeft, CalendarDays, CircleDollarSign, Globe2, RefreshCw, Rocket } from 'lucide-vue-next'
import { rocketApi } from '../services/rocketApi'
const route = useRoute()
const rocket = ref(null)
const loading = ref(false)
const error = ref('')
const imageFailed = ref(false)
async function loadRocket() {
  loading.value = true; error.value = ''; rocket.value = null; imageFailed.value = false
  try { rocket.value = await rocketApi.get(route.params.id) }
  catch (e) { error.value = e.response?.data?.message || 'Tidak dapat mengambil detail roket. Periksa koneksi lalu coba lagi.' }
  finally { loading.value = false }
}
function formatCost(value) {
  if (value === null || value === undefined || value === '') return 'Data tidak tersedia'
  const number = Number(value)
  return Number.isFinite(number) ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(number) : String(value)
}
function formatDate(value) {
  if (!value) return 'Data tidak tersedia'
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(date)
}
watch(() => route.params.id, loadRocket)
onMounted(loadRocket)
</script>
