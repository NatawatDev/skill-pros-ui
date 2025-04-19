<template>
  <aside class="w-[300px] bg-[#1E293B] text-white p-6 space-y-2">
    <div class="text-[28px] font-semi-bold flex items-center justify-center gap-2 mb-6">
      <NuxtImg src="/images/admin-icon.svg" width="28" />
      <span>Skill Pros</span>
    </div>

    <div class="text-sub-header">Operation</div>
    <nav class="space-y-1">
      <NuxtLink 
        to="/admin" 
        class="flex items-center text-sub-text text-4 py-2 px-3 rounded hover:bg-white/10 transition duration-200;" 
        active-class="bg-white/10"
      >
        <Icon icon="mdi:view-dashboard-outline" class="mr-2 w-4" /> 
        Admin Management
      </NuxtLink>
    </nav>

    <div class="text-sub-header pt-4">Content Management</div>
    <nav class="space-y-1">      
      <NuxtLink 
        to="/admin/labs" 
        class="flex items-center text-sub-text text-4 py-2 px-3 rounded hover:bg-white/10 transition duration-200;" 
        active-class="bg-white/10"
      >
        <Icon icon="mdi:flask-outline" class="mr-2 w-4" /> 
        Labs
      </NuxtLink>
    </nav>
  </aside>
</template>

<script setup>
import { Icon } from '@iconify/vue'
</script>