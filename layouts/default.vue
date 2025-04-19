
<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />
    <div class="w-full flex flex-col">
      <Navbar />
      <main class="w-full p-6">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>


<script setup>
import Sidebar from '~/components/layout/Sidebar.vue';
import Navbar from '~/components/layout/Navbar.vue'
</script>