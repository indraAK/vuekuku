<template>
  <form @submit.prevent="$emit('onSubmit')">
    <div class="field">
      <label class="field-label" for="title">Judul</label>
      <TextField v-model="formData.title" type="text" placeholder="Judul buku" id="title" required />
    </div>
    <div class="field">
      <label class="field-label" for="author">Penulis</label>
      <TextField v-model="formData.author" type="text" placeholder="Penulis buku" id="author" required />
    </div>
    <div class="field">
      <label class="field-label" for="year">Tahun</label>
      <TextField v-model.number="formData.year" type="number" placeholder="Tahun terbit buku" id="year" required />
    </div>
    <div class="field field-checkbox">
      <label for="isComplete" class="field-label">
        Selesai dibaca
        <input v-model="formData.isComplete" type="checkbox" name="isComplete" id="isComplete">
      </label>
    </div>
    <div v-if="!formData.isComplete" class="field">
      <label class="field-label" for="page">Halaman terakhir baca</label>
      <TextField v-model.number="formData.lastReadPage" type="number" placeholder="Halaman terkahir dibaca" id="page" required />
    </div>
    <Button type="submit" variant="primary" class="submit-btn">Submit</Button>
  </form>
</template>

<script setup>
import Button from "@/components/Button.vue"
import TextField from "@/components/TextField.vue"
const {formData} = defineProps(['formData'])
defineEmits(['onSubmit'])
</script>

<style scoped>
form .field {
  @apply mb-3
}

.field-label {
  @apply inline-block text-sm text-gray-600 select-none mb-1 dark:text-gray-200
}

.field-checkbox .field-label {
  @apply inline-flex items-center gap-2
}

.submit-btn :deep(){
  @apply w-full py-[10px] mt-2 mb-1
}
</style>