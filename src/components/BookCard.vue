<template>
  <div class="bg-white p-4 rounded shadow dark:bg-gray-800">
    <h1 class="text-gray-800 text-xl dark:text-gray-100">{{ book.title }}</h1>
    <p class="text-sm text-gray-600 mt-3 dark:text-gray-400">Penulis : {{ book.author }}</p>
    <p class="text-sm text-gray-600 mt-1 dark:text-gray-400">Tahun terbit : {{ book.year }}</p>
    <p v-if="!book.isComplete" class="text-sm text-gray-600 mt-1 dark:text-gray-400">Halaman terkahir dibaca : {{ book.lastReadPage }}</p>
    <div class="flex items-center gap-2 mt-5">
      <button @click="isOpen = true; actionType = 'delete'" aria-label="Delete Book" title="Hapus Buku"
        class="inline-flex items-center justify-center w-6 h-6 rounded bg-red-700/10 text-red-700 dark:bg-gray-900 dark:text-red-400">
        <i class='bx bx-trash'></i>
      </button>
      <button @click="handleShowModalEdit" aria-label="Delete Book" title="Edit Buku"
        class="inline-flex items-center justify-center w-6 h-6 rounded bg-primary/10 text-primary dark:bg-gray-900 dark:text-primary">
        <i class='bx bx-edit'></i>
      </button>
    </div>
  </div>

  <!-- Modal Delete Book -->
  <Modal title="Hapus Buku" :isOpen="isOpen && actionType === 'delete'" @close-modal="handleCloseModal">
    <template #modal-content>
      <p class="text-gray-700 dark:text-gray-300">Yakin nih, buku ini mau dihapus?</p>
      <div class="flex items-center justify-end gap-4 mt-5">
        <Button variant="outline" @click="handleCloseModal">Jangan dulu</Button>
        <Button variant="primary" @click="deleteBook(book.id)">Iya, hapus</Button>
      </div>
    </template>
  </Modal>

  <!-- Modal Edit Book -->
  <Modal title="Edit Buku" :isOpen="isOpen && actionType === 'edit'" @close-modal="handleCloseModal">
    <template #modal-content>
      <BookForm :formData="editedBook" @onSubmit="handleSubmit" />
    </template>
  </Modal>
</template>

<script setup>
import { ref, inject } from "vue";
import Modal from "@/components/Modal.vue"
import Button from "@/components/Button.vue"
import BookForm from "@/components/BookForm.vue"

const { book } = defineProps({
  book: { type: Object }
})
const isOpen = ref(false)
const actionType = ref(null);
const editedBook = ref({ ...book })
const { deleteBook, updateBook } = inject('books');

function handleCloseModal() {
  isOpen.value = false
  actionType.value = null
}

function handleShowModalEdit() {
  isOpen.value = true;
  actionType.value = 'edit'
  editedBook.value = { ...book }
}

function handleSubmit() {
  updateBook({
    ...editedBook.value,
    lastReadPage: editedBook.value.isComplete ? null : editedBook.value.lastReadPage,
  })
  isOpen.value = false
}

</script>