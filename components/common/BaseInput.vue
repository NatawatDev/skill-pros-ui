<template>
  <VField :name="name" :rules="validate" v-slot="{ field, errorMessage }">
    <div>
      <label v-if="label" class="block text-sm font-medium mb-1">
        {{ label }}
      </label>

      <div class="relative">
        <input
          v-bind="field"
          :value="value"
          :type="inputType"
          :placeholder="placeholder"
          :disabled="disabled || isLoading"
          class="w-full border rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed"
          :class="{
            'focus:ring-blue-500': !errorMessage,
            'border-red-500 focus:ring-red-500': errorMessage,
          }"
          @input="$emit('input', $event.target.value)"
          @change="$emit('change', $event.target.value)"
        />

        <!-- Toggle password -->
        <span
          v-if="isPassword && !isLoading"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          @click="togglePassword"
        >
          <Icon :name="showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'" class="text-lg" />
        </span>

      </div>

      <p v-if="errorMessage" class="text-sm text-red-500 mt-1">{{ errorMessage }}</p>
    </div>
  </VField>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  name: string
  value: string
  label?: string
  type?: 'text' | 'password' | 'number'
  placeholder?: string
  validate?: string | string[] | Record<string, any>
  isLoading?: boolean
  disabled?: boolean
}>()

const emit = defineEmits(['input', 'change'])

const showPassword = ref(false)
const isPassword = computed(() => props.type === 'password')

const inputType = computed(() => {
  if (isPassword.value) {
    if (showPassword.value) {
      return 'text'
    } else {
      return 'password'
    }
  }

  return props.type || 'text'
})

function togglePassword() {
  showPassword.value = !showPassword.value
}
</script>
