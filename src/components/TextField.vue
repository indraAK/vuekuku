<template>
  <input type="text" class="form-control" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)" />
</template>

<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])

</script>

<style scoped>
.form-control{
  @apply block w-full bg-white dark:bg-gray-700 px-3 py-2 rounded text-base text-gray-700 dark:text-gray-200 border border-gray-300 dark:border-gray-600 placeholder:text-gray-400 placeholder:text-sm focus:border-blue-300 focus:outline-none focus:ring-1 focus:ring-blue-100 focus:ring-opacity-50 dark:ring-0 dark:focus:border-blue-500;
}
</style>