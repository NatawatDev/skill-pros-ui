<template>
  <div class="flex justify-center">
    <div class="bg-[#F5F5F5] py-[24px] px-[40px] rounded-2xl">
      <h1 class="text-[24px] font-bold mb-4">Provide the following information to add an invited admin.</h1>
      <FormInviteAdmin/>
    </div>
  </div>
</template>

<script setup lang="ts">
import FormInviteAdmin from '~/components/form/auth/FormInviteAdmin.vue'

  definePageMeta({
    title: 'Invite Admin'
  })
</script>

<style scoped>

</style>