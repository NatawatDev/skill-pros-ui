<template>
  <VField
    :name="name"
    :rules="validate"
    v-slot="{ field, errorMessage }"
    :validate-on-input="true"
  >
    <div class="relative w-full space-y-1">
      <label
        v-if="label"
        class="block text-[14px] font-medium text-[#1E293B]"
      >
        {{ label }}
      </label>

      <div class="relative">
        <input
          v-bind="field"
          :value="modelValue"
          :type="inputType"
          :placeholder="placeholder"
          :disabled="disabled || isLoading"
          :class="[
            'w-full border rounded px-4 py-2 pr-10 focus:outline-none focus:ring-2 bg-white disabled:bg-gray-100 disabled:cursor-not-allowed',
            {
              'focus:ring-blue-500': !errorMessage,
              'border-red-500 focus:ring-red-500': errorMessage,
            },
            props.class
          ]"
          @input="onInput"
          @change="$emit('change', onChange)"
        />

        <!-- Toggle password -->
        <span
          v-if="isPassword"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
          @click="togglePassword"
        >
          <Icon :icon="showPassword ? 'mdi:eye-outline' : 'mdi:eye-off-outline'" class="text-lg" />
        </span>

        <!-- Icon -->
        <span
          v-if="icon"
          class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
        >
          <Icon :icon="icon" class="text-lg" />
        </span>
      </div>

      <p v-if="errorMessage" class="text-sm text-red-500 min-h-[20px]">
        {{ errorMessage }}
      </p>
    </div>
  </VField>
</template>


<script setup lang="ts">
import { ref, computed } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps({
  name: { type: String, default: '' },
  class: { type: String, default: '' },
  label: { type: String, default: '' },
  type: { type: String as PropType<'text' | 'password' | 'number'>, default: 'text' },
  placeholder: { type: String, default: '' },
  validate: { type: [String, Array, Object] as PropType<string | string[] | Record<string, any>>, default: '' },
  icon: { type: String, default: '' },
  isLoading: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false },
})

const emit = defineEmits(['input', 'change'])

const showPassword = ref(false)
const isPassword = computed(() => props.type === 'password')

const modelValue = defineModel<string | number>()

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

function onChange(event: Event) {
  const val = (event.currentTarget as HTMLInputElement).value
  emit('change', val)
}

function onInput(event: Event) {
  const val = (event.currentTarget as HTMLInputElement).value
  modelValue.value = val
}
</script>
