<template>
  <div class="book-list">
    <BookCard v-for="book in books" :key="book.id" :book="book" />
  </div>
</template>

<script setup>
import BookCard from '@/components/BookCard.vue';

const {books} = defineProps(['books'])
</script>

<style scoped>
.book-list{
  @apply grid grid-cols-[repeat(auto-fill,minmax(min(100%,350px),1fr))] gap-4 items-start;
}
</style>
