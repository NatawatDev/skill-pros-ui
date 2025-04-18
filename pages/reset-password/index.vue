<template>
  <div class="w-full max-w-[450px] mx-[80px] space-y-6">
    <div>
      <h1 class="text-[32px] font-bold">Reset Password?</h1>
    </div>

    <FormResetPassword />
    
  </div>
</template>

<script setup lang="ts">
import FormResetPassword from '~/components/form/auth/FormResetPassoword.vue'

definePageMeta({
  layout: 'authen'
})
</script>

<style scoped>

</style>