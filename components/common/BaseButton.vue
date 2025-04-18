<template>
  <button
    :disabled="disabled || isLoading"
    class="relative inline-flex items-center justify-center px-4 py-2 cursor-pointer rounded font-medium transition focus:outline-none
           disabled:opacity-50 disabled:cursor-not-allowed
           focus:ring-2"
    :class="variantClasses"
    @click="onClick"
    v-bind="$attrs"
    :type="type"
  >
    <span
      v-if="isLoading"
      class="flex items-center justify-center space-x-2"
    >
      <Icon icon="mdi:loading" class="text-lg animate-spin" />
    </span>

    <span
      v-else
      class="flex items-center justify-center space-x-2"
    >
      <Icon
        v-if="icon"
        :icon="icon"
        class="text-lg"
      />
     
      <span>
        <slot />
      </span>
    </span>
  </button>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps({
  variant: { type: String as PropType<'primary' | 'secondary'>, default: 'primary' },
  icon: { type: String, default: '' },
  class: { type: String, default: '' },
  disabled: { type: Boolean, default: false },
  isLoading: { type: Boolean, default: false },
  type: { type: String as PropType<'submit' | 'button' | 'reset'>, default: 'submit' },
})

const emit = defineEmits(['click'])

const variantClasses = props.variant === 'primary'
  ? 'bg-primary text-white hover:bg-blue-700 focus:ring-blue-500 w-full'
  : 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 w-full'

function onClick(event: Event) {
  emit('click', event)
}
</script>
