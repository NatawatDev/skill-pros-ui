<template>
  <div class="w-full max-w-[450px] mx-[80px] space-y-6">
    <div>
      <h1 class="text-[32px] font-bold">Forget Password?</h1>
      <span class="text-4 text-primary">Enter your email address you used when you joined and we’ll send you Introduction to reset your password.</span>
    </div>

    <FormForgetPassword/>
    
  </div>
</template>

<script setup lang="ts">
import FormForgetPassword from '~/components/form/auth/FormForgetPassword.vue'

definePageMeta({
  layout: 'authen'
})
</script>

<style scoped>

</style>