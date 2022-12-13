<template>
  <header class="bg-white shadow-sm py-3 dark:bg-gray-800 sticky">
    <nav class="container flex justify-between items-center gap-6">
      <h1 class="font-saira text-lg sm:text-xl tracking-wide">
        <span class="text-primary">V</span>
        <span class="text-gray-600 dark:text-white">uekuku</span>
      </h1>
      <div class="flex items-center gap-2">
        <Button variant="primary" class="hidden md:inline-flex mr-5" @click="isOpen = true">Tambah Buku</Button>
        <button @click="toggleDark()" aria-label="Toggle Dark Mode" class="inline-flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600">
          <i v-if="isDark" class='bx bx-sun text-gray-700 text-xl dark:text-white'></i>
          <i v-else aria-hidden="true" class='bx bx-moon text-gray-700 text-xl'></i>
        </button>
        <a href="https://github.com/indraAK" target="_blank" class="inline-flex justify-center items-center w-8 h-8 rounded-full hover:bg-gray-200 dark:hover:bg-gray-600"
          title="Source Code">
          <i class='bx bxl-github text-gray-700 text-xl dark:text-white'></i>
        </a>
      </div>
    </nav>
  </header>

  <Modal title="Tambah Buku Baru" :isOpen="isOpen" @close-modal="handleCloseModal">
    <template #modal-content>
      <BookForm :formData="bookData" @onSubmit="handleSubmit" />
    </template>
  </Modal>
</template>

<script setup>
import { reactive, ref, inject } from "vue";
import { useDark, useToggle } from '@vueuse/core'
import Button from "@/components/Button.vue"
import Modal from "@/components/Modal.vue"
import BookForm from "@/components/BookForm.vue"

const isDark = useDark()
const toggleDark = useToggle(isDark)
const isOpen = ref(false)
const bookData = reactive({
  title: '',
  author: '',
  year: '',
  isComplete: false
})

const {addBook} = inject('books')

function handleSubmit() {
  const newBook = {id: + new Date(), ...bookData}
  addBook(newBook)
  resetForm()
  isOpen.value = false
}

function resetForm() {
  bookData.title = ''
  bookData.author = ''
  bookData.year = ''
  bookData.isComplete = false
}

function handleCloseModal() {
  resetForm()
  isOpen.value = false
}
</script>

