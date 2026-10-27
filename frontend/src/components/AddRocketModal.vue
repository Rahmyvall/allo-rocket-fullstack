<template>
  <div class="modal-backdrop" @click.self="$emit('close')" @keydown.esc="$emit('close')">
    <section class="modal">
      <div class="modal-head"><div><div class="eyebrow">CUSTOM ENTRY</div><h2>Tambahkan roket</h2></div><button class="icon-button" type="button" @click="$emit('close')" aria-label="Tutup">×</button></div>
      <p class="modal-intro">Roket tambahan disimpan sementara di backend dan tidak dikirim ke API eksternal.</p>
      <form @submit.prevent="submit">
        <label>Nama roket <span>*</span><input v-model.trim="form.name" required maxlength="120" placeholder="Contoh: Nusantara One" /></label>
        <label>Deskripsi<textarea v-model.trim="form.description" rows="3" maxlength="2000" placeholder="Deskripsi singkat roket"></textarea></label>
        <label>URL gambar<input v-model.trim="form.imageUrl" type="url" placeholder="https://..." /></label>
        <div class="form-grid">
          <label>Biaya peluncuran<input v-model="form.launchCost" type="number" min="0" step="0.01" placeholder="Opsional" /></label>
          <label>Negara<input v-model.trim="form.country" maxlength="10" placeholder="ID" /></label>
        </div>
        <label>Penerbangan pertama<input v-model.trim="form.firstFlight" type="date" /></label>
        <p v-if="error" class="form-error">{{ error }}</p>
        <div class="modal-actions"><button class="button button-ghost" type="button" @click="$emit('close')">Batal</button><button class="button button-primary" type="submit" :disabled="saving">{{ saving ? 'Menyimpan…' : 'Tambahkan roket' }}</button></div>
      </form>
    </section>
  </div>
</template>
<script setup>
import { reactive, ref } from 'vue'
const emit = defineEmits(['close', 'save'])
const form = reactive({ name: '', description: '', imageUrl: '', launchCost: '', country: '', firstFlight: '' })
const saving = ref(false)
const error = ref('')
async function submit() {
  error.value = ''
  saving.value = true
  try {
    await emit('save', {
      name: form.name,
      description: form.description || null,
      imageUrl: form.imageUrl || null,
      launchCost: form.launchCost === '' ? null : Number(form.launchCost),
      country: form.country || null,
      firstFlight: form.firstFlight || null
    })
  } catch (e) {
    error.value = e?.message || 'Roket gagal ditambahkan. Coba lagi.'
  } finally { saving.value = false }
}
</script>
