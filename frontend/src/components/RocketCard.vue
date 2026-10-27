<template>
  <RouterLink :to="`/rockets/${rocket.id}`" class="rocket-card">
    <div class="card-image">
      <img v-if="rocket.imageUrl" :src="rocket.imageUrl" :alt="rocket.name || 'Rocket'" loading="lazy" @error="imageFailed = true" v-show="!imageFailed" />
      <div v-if="!rocket.imageUrl || imageFailed" class="image-fallback"><Rocket :size="44" /><span>IMAGE UNAVAILABLE</span></div>
      <span v-if="rocket.local" class="local-badge">LOCAL</span>
      <span class="card-arrow"><ArrowUpRight :size="18" /></span>
    </div>
    <div class="card-content">
      <div class="eyebrow">LAUNCH VEHICLE</div>
      <h2>{{ rocket.name || 'Nama tidak tersedia' }}</h2>
      <p>{{ rocket.description || 'Deskripsi roket belum tersedia.' }}</p>
      <div class="card-bottom"><span>EXPLORE DETAILS</span><ArrowRight :size="15" /></div>
    </div>
  </RouterLink>
</template>
<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router'
import { Rocket, ArrowUpRight, ArrowRight } from 'lucide-vue-next'
defineProps({ rocket: { type: Object, required: true } })
const imageFailed = ref(false)
</script>
