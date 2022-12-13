<template>
  <Teleport v-if="isOpen" to="body">
    <!-- Modal Backdrop Overlay -->
    <div class="modal-backdrop"></div>

    <!-- Modal Content -->
    <div class="fixed top-0 left-0 w-screen h-full z-[1001] flex justify-center items-start px-4 overflow-y-auto">
      <div class="relative bg-white w-full max-w-md rounded px-5 py-4 my-16 sm:px-6 dark:bg-gray-800">
        <div class="flex items-center justify-between gap-4">
          <h2 class="text-lg text-gray-700 font-semibold dark:text-gray-200">{{title}}</h2>
          <button @click="$emit('close-modal')" aria-label="Close Modal"
            class="flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200 dark:bg-transparent dark:hover:bg-gray-900/50">
            <i aria-hidden="true" class='bx bx-x text-[25px] leading-none text-gray-600 dark:text-gray-200'></i>
          </button>
        </div>

        <div class="mt-5">
          <slot name="modal-content" />
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
defineEmits(['close-modal'])
const {title, isOpen} = defineProps({
  title: {type: String, default: 'Modal Title'},
  isOpen: {type: Boolean, default: false}
})

</script>

<style scoped>
.modal-backdrop {
  @apply fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 z-[1000] backdrop-blur-sm
}
</style>
