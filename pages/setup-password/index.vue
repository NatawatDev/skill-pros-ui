<template>
  <div class="w-full max-w-[450px] mx-[80px] space-y-6">
    <div>
      <h1 class="text-[32px] font-bold">Setup your account</h1>
    </div>

    <FormSetupAccount />
    
  </div>
</template>

<script setup lang="ts">
import FormSetupAccount from '~/components/form/auth/FormSetupAccount.vue'

definePageMeta({
  layout: 'authen'
})
</script>

<style scoped>

</style>