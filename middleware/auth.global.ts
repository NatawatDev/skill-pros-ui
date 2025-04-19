import { useAppStore } from "~/stores/app"
import type { IResponseProfile } from "~/types/app"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.API_ENDPOINT
  const token = useCookie('token')
  const appStore = useAppStore()
  const publicPages = ['/signin', '/forgot-password', '/reset-password', '/setup-password']

  if (to.path === '/') {
    return navigateTo('/admin')
  }

  if (!token.value && !publicPages.includes(to.path)) {
    return navigateTo('/signin')
  }

  if (token.value && !appStore.profile) {
    try {
      const { data } = await useFetch<IResponseProfile>(`${baseURL}/admins/profile`, {
        method: 'get',
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })

      if (data.value?.data) {
        appStore.setProfile(data.value.data)
      }
    } catch (err) {
      console.error('Unauthorized')
      return navigateTo('/signin')
    }
  }
})
