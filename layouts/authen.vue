<template>
  <div class="h-screen w-full grid grid-cols-2 px-4 py-6">
    <div class="flex items-center justify-center border-r border-gray-200">
      <div class="text-center max-w-sm">
        <div class="flex items-center justify-center gap-2 mb-4">
          <div class="bg-primary text-white p-2 rounded-md">
            <NuxtImg src="/images/admin-icon.svg" alt="Admin-icon" format="webp"/>
          </div>
          <h1 class="text-[32px] font-bold">Skill Pros</h1>
        </div>
        <p class="text-[#64748B] mb-4">
          A admin system to manage all your skill<br/> content in one place.
        </p>
        <NuxtImg src="/images/admin-main.png" alt="Admin-main" format="png" />
      </div>
    </div>

    <div class="flex items-center justify-center h-full">
      <NuxtPage />
    </div>
  </div>
</template>
