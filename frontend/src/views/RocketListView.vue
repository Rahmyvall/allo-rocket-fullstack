<template>
  <section class="page">
    <div class="hero">
      <div class="hero-copy">
        <div class="eyebrow hero-eyebrow"><span class="live-line"></span> SPACE X · VEHICLE DATABASE</div>
        <h1>Beyond the<br /><span>ordinary.</span></h1>
        <p>Jelajahi armada roket SpaceX — dari kendaraan peluncur legendaris hingga teknologi yang membawa manusia lebih jauh ke luar angkasa.</p>
        <div class="hero-stats"><div><strong>{{ store.rockets.length.toString().padStart(2, '0') }}</strong><span>ROCKETS</span></div><i></i><div><strong>01</strong><span>MISSION</span></div><i></i><div><strong>∞</strong><span>POSSIBILITIES</span></div></div>
      </div>
      <div class="hero-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="planet"></div><div class="hero-rocket"><Rocket :size="104" :stroke-width="1.05" /></div><div class="hero-label label-top">VEHICLE / 001</div><div class="hero-label label-bottom">ENGINEERED FOR THE STARS</div></div>
    </div>

    <div class="section-heading">
      <div><div class="eyebrow">THE COLLECTION</div><h2>Rocket directory <span class="count">{{ store.rockets.length }}</span></h2></div>
      <button class="button button-primary" @click="showModal = true"><Plus :size="17" /> Add rocket</button>
    </div>
    <div class="toolbar">
      <label class="search-box"><Search :size="18" /><input v-model="query" placeholder="Cari nama roket…" aria-label="Cari roket" /><kbd>⌕</kbd></label>
      <span class="results-label">{{ filteredRockets.length }} RESULTS</span>
    </div>

    <div v-if="store.loading" class="state-panel"><span class="loader"></span><h3>Menghubungkan ke orbit…</h3><p>Sedang mengambil data roket.</p></div>
    <div v-else-if="store.error" class="state-panel error-state"><span class="state-icon"><AlertCircle :size="25" /></span><h3>Data belum tersedia</h3><p>{{ store.error }}</p><button class="button button-primary" @click="store.fetchRockets(true)"><RefreshCw :size="16" /> Coba lagi</button></div>
    <div v-else-if="filteredRockets.length" class="rocket-grid">
      <RocketCard v-for="rocket in filteredRockets" :key="rocket.id" :rocket="rocket" />
    </div>
    <div v-else class="state-panel"><span class="state-icon"><Search :size="25" /></span><h3>Roket tidak ditemukan</h3><p>Coba kata kunci lain atau hapus filter pencarian.</p><button class="button button-ghost" @click="query = ''">Hapus pencarian</button></div>

    <AddRocketModal v-if="showModal" @close="showModal = false" @save="addRocket" />
  </section>
</template>
<script setup>
import { computed, onMounted, ref } from 'vue'
import { AlertCircle, Plus, Rocket, Search, RefreshCw } from 'lucide-vue-next'
import { useRocketStore } from '../stores/rockets'
import RocketCard from '../components/RocketCard.vue'
import AddRocketModal from '../components/AddRocketModal.vue'
const store = useRocketStore()
const query = ref('')
const showModal = ref(false)
const filteredRockets = computed(() => store.rockets.filter(r => (r.name || '').toLowerCase().includes(query.value.trim().toLowerCase())))
onMounted(() => store.fetchRockets())
async function addRocket(payload) {
  await store.addRocket(payload)
  showModal.value = false
}
</script>
