<template>
  <button :class="['inline-flex items-center justify-center align-middle px-5 py-2 rounded font-medium select-none', variants[variant], sizes[size]]">
    <slot />
  </button>
</template>

<script setup>
const {variant, size} =  defineProps({
  variant: {type: String, default: 'primary'},
  size: {type: String, default: 'md'},
})

const variants = {
  'primary': 'bg-primary text-white',
  'outline': 'bg-transparent text-gray-800 border border-gray-300 dark:bg-gray-700 dark:border-gray-500 dark:text-gray-200'
}

const sizes = {
  md: 'px-5 py-2 text-base',
}
</script>