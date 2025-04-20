<template>
  <div class="flex flex-wrap items-center justify-center gap-4 mt-6 text-sm">

    <!-- Page Numbers -->
    <div class="flex items-center gap-2">
      <BaseButton :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
        ‹
      </BaseButton>

      <BaseButton
        v-for="page in visiblePages"
        :key="page"
        :variant="page === currentPage ? 'primary' : 'secondary'"
        class="min-w-[32px] px-2 py-1 rounded border"
        @click="changePage(page)"
      >
        {{ page }}
      </BaseButton>

      <span v-if="showEllipsis">...</span>

      <BaseButton
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        ›
      </BaseButton>
    </div>

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  (e: 'update:page', value: number): void
}>()

const changePage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('update:page', page)
  }
}

const visiblePages = computed(() => {
  const maxVisible = 5
  const half = Math.floor(maxVisible / 2)
  const pages: number[] = []

  let start = Math.max(1, props.currentPage - half)
  let end = Math.min(props.totalPages, start + maxVisible - 1)

  if (end - start + 1 < maxVisible) {
    start = Math.max(1, end - maxVisible + 1)
  }

  for (let i = start; i <= end; i++) {
    pages.push(i)
  }

  return pages
})

const showEllipsis = computed(() => {
  return visiblePages.value.at(-1)! < props.totalPages
})
</script>
