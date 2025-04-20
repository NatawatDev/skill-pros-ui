<template>
  <div class="w-full">
    <Form @submit="onSubmit" class="h-full w-full space-y-4">

      <BaseInput
        name="password"
        v-model="password"
        :disabled="isLoading"
        label="Password"
        type="password"
        placeholder="Enter your password"
        validate="required|min:8"
      />

      <BaseInput
        name="confirmPassword"
        v-model="confirmPassword"
        :disabled="isLoading"
        label="Confirm Password"
        type="password"
        placeholder="Enter your confirm password"
        validate="required|min:8"
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

const router = useRouter()
const route = useRoute()
const token = route.query.token as string

const password = ref<string>('')
const confirmPassword = ref<string>('')
const isLoading = ref<boolean>(false)

const { validate } = useForm()


const { resetPasswordAdmin, verifyTokenAdmin } = useAdminApi()

onMounted(() => {
  verifyToken()
})

async function verifyToken() {
  const { valid } = await validate()
  if (!valid) return

  isLoading.value = true

  try {
    const payload = {
      token: token,
      type: 'reset'
    }

    await verifyTokenAdmin(payload)

  } catch (err: any) {
    toast.error(err.message)
    setTimeout(() => {
      router.push('/signin')
    }, 1000)
  } finally {
    isLoading.value = false    
  }
}

async function onSubmit() {
  const { valid } = await validate()
  if (!valid) return

  if (password.value !== confirmPassword.value) {
    return toast.error("Passwords do not match")    
  }

  isLoading.value = true

  try {
    const payload = {
      resetPasswordToken: token,    
      password: password.value,
      confirmPassword: confirmPassword.value
    }
    
    const res = await resetPasswordAdmin(payload)

    toast.success(res.message)

    router.push('./')

  } catch (err: any) {
    toast.error(err?.data?.message || err?.message)
  } finally {
    isLoading.value = false
  }
}
</script>

