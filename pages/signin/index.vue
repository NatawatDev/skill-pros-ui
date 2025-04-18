<template>
  <div class="w-full max-w-[450px] mx-[80px] space-y-6">
    <div>
      <h1 class="text-[32px] font-bold">Sign Into Skill Pros!</h1>
      <span class="text-4 text-primary">Please sign in to Continue.</span>
    </div>

    <FormSignIn/>        
  </div>
</template>

<script setup lang="ts">
import FormSignIn from '~/components/form/auth/FormSignIn.vue';

definePageMeta({
  layout: 'authen'
})

</script>

<style scoped>

</style>