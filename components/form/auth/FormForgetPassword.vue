<template>
  <div class="w-full">
    <Form @submit="onSubmit" class="h-full w-full space-y-4">

      <BaseInput
        name="email"
        v-model="email"
        :disabled="isLoading"
        label="Email"
        type="text"
        placeholder="Enter your email"
        icon="mdi:email-outline"
        validate="required|email"        
      />
            
      <BaseButton
        variant="primary"
        :isLoading="isLoading"
        class="w-full"
        type="submit"        
      >
        Send reset password Instructions
      </BaseButton>

      <div class="text-left">
        <NuxtLink
          to="/signin"
          class="text-sm text-primary hover:underline flex item-center"
        >
          <Icon icon="mdi:arrow-back" class="text-lg" />
          Back to sign in
        </NuxtLink>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, useForm } from 'vee-validate'
import { toast } from 'vue3-toastify'
import { Icon } from '@iconify/vue'
import { useAdminApi } from '~/utils/api/admin'

const email = ref<string>('')
const isLoading = ref<boolean>(false)

const { validate } = useForm()

const { forgetPasswordAdmin } = useAdminApi()

async function onSubmit() {
  const { valid } = await validate()
  if (!valid) return

  isLoading.value = true

  try {
    const res = await forgetPasswordAdmin({ email: email.value })

    toast.success(res.message)

  } catch (err: any) {
    toast.error(err?.data?.message || err?.message)
  } finally {
    isLoading.value = false
  }
}
</script>

