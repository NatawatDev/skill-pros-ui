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

      <div>
        <BaseInput
          name="password"
          v-model="password"
          :disabled="isLoading"
          label="Password"
          type="password"
          placeholder="Enter your password"
          validate="required|min:8"
        />
        <div class="text-left">
          <NuxtLink
            to="/forgot-password"
            class="text-sm text-primary hover:underline inline-block"
          >
            Forgot password?
          </NuxtLink>
        </div>
      </div>
      
            
      <BaseButton
        variant="primary"
        :isLoading="isLoading"
        class="w-full"
        type="submit"        
      >
        Sign in
      </BaseButton>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, useForm } from 'vee-validate'
import { toast } from 'vue3-toastify'
import { useAuthApi } from '~/utils/api/auth'

const password = ref<string>('')
const email = ref<string>('')
const isLoading = ref<boolean>(false) 

const { validate } = useForm()
const router = useRouter()

const { signinAdmin } = useAuthApi()

async function onSubmit() {
  const { valid } = await validate()
  if (!valid) return

  isLoading.value = true

  try {    
    const payload = {
      email: email.value,
      password: password.value
    }

    const res = await signinAdmin(payload)

    const message = res.message
    toast.success(message)

    const accessToken = res.data.accessToken
    const refreshToken = res.data.refreshToken

    if (accessToken) {
      useCookie('token').value = accessToken
      useCookie('refresh').value = refreshToken
    }

    router.push('/admin')
  } catch (err: any) {
    toast.error(err?.data?.message || err?.message)
  } finally {
    isLoading.value = false
  }
}
</script>

