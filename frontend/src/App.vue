<template>
  <div class="app-shell">
    <header class="topbar">
      <RouterLink to="/" class="brand">
        <span class="brand-mark"><Rocket :size="20" /></span>
        <span>ALLO<span class="brand-accent">SPACE</span></span>
      </RouterLink>
      <div class="topbar-right"><span class="status-dot"></span><span>SPACE X EXPLORER</span></div>
    </header>
    <main><RouterView /></main>
    <footer class="footer">SPACE EXPLORATION, SIMPLIFIED <span>·</span> Data via Launch Library 2</footer>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { Rocket } from 'lucide-vue-next'
</script>
