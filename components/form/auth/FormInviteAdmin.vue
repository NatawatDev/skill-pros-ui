<template>
  <div class="w-full">
    <Form @submit="onSubmit" class="h-full w-full space-y-4">
      <div class="grid grid-cols-2 gap-4">

        <BaseInput
          name="email"
          v-model="inviteData.email"
          :disabled="isLoading"
          label="Email"
          type="text"
          placeholder="Enter your email"
          icon="mdi:email-outline"
          validate="required|email"        
        />

      <BaseInput
        name="phone"
        v-model="inviteData.phone"
        :disabled="isLoading"
        label="Phone Number"
        type="text"
        placeholder="Enter your phone number"
        icon="mdi:phone-outline"
        validate="required"        
      />

      <BaseInput
        name="firstname"
        v-model="inviteData.firstname"
        :disabled="isLoading"
        label="Firstname"
        type="text"
        placeholder="Enter your firstname"
        icon="mdi:card-account-details-outline"
        validate="required"        
      />

      <BaseInput
        name="lastname"
        v-model="inviteData.lastname"
        :disabled="isLoading"
        label="Lastname"
        type="text"
        placeholder="Enter your lastname"
        icon="mdi:card-account-details-outline"
        validate="required"        
      />
      </div>
            
      <div class="flex justify-end">
        <BaseButton
          variant="primary"
          :isLoading="isLoading"
          type="submit"
          class="w-[200px]"
        >
          Send invitation
        </BaseButton>
      </div>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { Form, useForm } from 'vee-validate'
import { toast } from 'vue3-toastify'
import type { IResponse } from '~/types/form'

interface IInviteData {
  email: string,
  phone: string,
  firstname: string,
  lastname: string
}


const inviteData = ref<IInviteData>({
  email: '',
  phone: '',
  firstname: '',
  lastname: ''
})

const isLoading = ref<boolean>(false)

const { validate } = useForm()

const token = useCookie('token')
const config = useRuntimeConfig()
const baseURL = config.public.API_ENDPOINT

async function onSubmit() {
  const { valid } = await validate()
  if (!valid) return

  isLoading.value = true

  try {
    const { data, error } = await useFetch<IResponse>(`${baseURL}/admins/invite`, {
      method: 'POST',
      body: inviteData.value,
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    if (error.value) {
      throw error.value
    }

    const message = data.value?.message
    toast.success(message)

  } catch (err: any) {
    toast.error(err?.data?.message || err?.message)
  } finally {
    isLoading.value = false
  }
}
</script>

