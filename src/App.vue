<template>
  <Navbar />
  <main>
    <h1 class="font-semibold text-xl sm:text-2xl text-gray-800 text-center mt-5 dark:text-gray-100">Daftar Buku Saya</h1>
    
    <div class="bg-gray-100 dark:bg-gray-900 mt-5 sticky top-0">
      <div
        class="w-full sm:max-w-screen-sm mx-auto flex gap-3 border-b border-gray-300 dark:border-gray-500">
        <button v-for="tab in tabs" :key="tab" @click="currentTab = tab"
          :class="['tab-btn', {active: currentTab === tab}]">{{tab}}</button>
      </div>
    </div>
    
    <div class="container px-4 mb-10">
      <TextField v-model="keyword" placeholder="Mau cari buku apa?" type="search" class="mt-6 max-w-screen-sm mx-auto" />

      <div v-if="currentTab === 'Selesai dibaca'" class="mt-6">
        <p v-if="finishedReadingBooks.length === 0 && !keyword" class="no-data">
          Tidak ada buku yang sudah selesai dibaca 🙄
        </p>
        <p v-else-if="finishedReadingBooks.length === 0 && keyword" class="no-data">
          Buku yang kamu cari tidak ditemukan 🙄
        </p>
        <BookList v-else :books="finishedReadingBooks" />
      </div>
      
      <div v-if="currentTab === 'Belum selesai dibaca'" class="mt-6">
        <p v-if="UnFinishedReadingBooks.length === 0 && !keyword" class="no-data">
          Tidak ada buku yang belum selesai dibaca 🙄
        </p>
        <p v-else-if="UnFinishedReadingBooks.length === 0 && keyword" class="no-data">
          Buku yang kamu cari tidak ditemukan 🙄
        </p>
        <BookList v-else :books="UnFinishedReadingBooks" />
      </div>
    </div>

    <button @click="isOpen = true" aria-label="Tambah Buku Baru"
      class="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary text-white shadow-md fixed bottom-5 right-5 md:hidden">
      <i aria-hidden="true" class='bx bx-book-add bx-tada text-2xl'></i>
    </button>
  </main>

  <Modal title="Tambah Buku Baru" :isOpen="isOpen" @close-modal="handleCloseModal">
    <template #modal-content>
      <BookForm :formData="bookData" @onSubmit="handleSubmit" />
    </template>
  </Modal>
</template>

<script setup>
import Navbar from "@/components/Navbar.vue"
import BookList from "@/components/BookList.vue"
import Modal from "@/components/Modal.vue"
import BookForm from "@/components/BookForm.vue"
import TextField from "@/components/TextField.vue"
import { ref, provide, reactive, computed } from "vue";

const tabs = ['Selesai dibaca', 'Belum selesai dibaca']
const currentTab = ref(tabs[0])
const books = ref(JSON.parse(localStorage.getItem('vuekuku')) ?? [])
const isOpen = ref(false)
const keyword = ref('')
const bookData = reactive({
  title: '',
  author: '',
  year: '',
  isComplete: false,
  lastReadPage: 0,
})

const finishedReadingBooks = computed(() => books.value.filter(book => book.isComplete && book.title.toLowerCase().includes(keyword.value.toLocaleLowerCase())))
const UnFinishedReadingBooks = computed(() => books.value.filter(book => !book.isComplete && book.title.toLowerCase().includes(keyword.value.toLocaleLowerCase())))

function addBook(newBook){
  books.value = [newBook, ...books.value]
  localStorage.setItem('vuekuku', JSON.stringify(books.value))
}

function deleteBook(bookId){
  books.value = books.value.filter(book => book.id !== bookId)
  localStorage.setItem('vuekuku', JSON.stringify(books.value))
}

function updateBook(editedBook){
  console.log(editedBook)
  const indexOfBook = books.value.findIndex(book => book.id === editedBook.id)
  books.value.splice(indexOfBook, 1, editedBook)
  localStorage.setItem('vuekuku', JSON.stringify(books.value))
}

function handleSubmit() {
  const newBook = { id: + new Date(), ...bookData }
  addBook(newBook)
  resetForm()
  isOpen.value = false
}

function handleCloseModal() {
  resetForm()
  isOpen.value = false
}

function resetForm() {
  bookData.title = ''
  bookData.author = ''
  bookData.year = ''
  bookData.isComplete = false
  bookData.lastReadPage = 0
}

provide('books', { books, addBook, deleteBook, updateBook })
</script>

<style scoped>
.tab-btn{
  @apply flex-1 w-full border-b-2 border-transparent inline-flex items-center justify-center p-3 text-gray-600 text-sm sm:text-base font-medium whitespace-nowrap leading-snug hover:text-primary dark:text-gray-200;
}

.tab-btn.active{
  @apply border-b-primary text-primary
}

.no-data{
  @apply text-center text-sm text-gray-700 dark:text-gray-300 p-3 rounded max-w-screen-sm mx-auto
}
</style>
