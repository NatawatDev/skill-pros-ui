<template>
  <header class="h-[64px] bg-white border-b border-gray-200 flex items-center justify-between px-6">
    <h1 class="text-xl font-semibold text-gray-800">{{ appStore.title }}</h1>

    <div class="relative">
      <button
        @click="toggleDropdown"
        class="flex items-center gap-2 text-sm text-gray-800 font-medium focus:outline-none cursor-pointer"
      >
        {{ fullname }}
        <Icon
          :icon="isOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'"
          class="w-4 h-4 text-gray-500"
        />
      </button>
      <div
        v-if="isOpen"
        class="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow z-10"
      >
        <button          
          class="w-full text-left px-4 py-2 text-sm text-red-500 cursor-pointer hover:bg-gray-50"
          @click="logout"
        >
          Logout
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAppStore } from '~/stores/app'
import { Icon } from '@iconify/vue'
import { useRouter } from 'vue-router'

const config = useRuntimeConfig()
const baseURL = config.public.API_ENDPOINT
const token = useCookie('token')

const appStore = useAppStore()
const router = useRouter()

const isOpen = ref(false)

const fullname = computed(() =>
appStore.profile ? `${appStore.profile.firstname} ${appStore.profile.lastname}` : ''
)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

async function logout() {
  try {
    const { data } = await useFetch(`${baseURL}/auth/logout`, {
      method: 'post',
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    if (data.value) {
      useCookie('token').value = null
      useCookie('refresh').value = null
      appStore.setProfile(null)
      appStore.setTitle('')
      router.push('/signin')
    }
    
  } catch (err) {
    console.error('Unauthorized')
    return navigateTo('/signin')
  }

}

</script>
