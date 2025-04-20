import { useAppStore } from "~/stores/app"
import type { IResponseProfile } from "~/types/app"
import type { ILoginResponse } from "~/types/form"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const config = useRuntimeConfig()
  const baseURL = config.public.API_ENDPOINT
  const token = useCookie('token')
  const refreshToken = useCookie('refresh')
  const appStore = useAppStore()

  const publicPages = ['/signin', '/forgot-password', '/reset-password', '/setup-password']

  if (to.path === '/') {
    return navigateTo('/admin')
  }
  if (!token.value && !publicPages.includes(to.path)) {
    return navigateTo('/signin')
  }

  if (token.value && !appStore.profile) {
    const fetchProfile = async () => {
      const res = await $fetch<IResponseProfile>(`${baseURL}/admins/profile`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`
        }
      })
      return res.data
    }

    try {
      const profile = await fetchProfile()
      if (profile) {
        appStore.setProfile(profile)
      }
    } catch (err: any) {

      if (refreshToken.value) {
        try {
          const res = await $fetch<ILoginResponse>(`${baseURL}/auth/refresh-token`, {
            method: 'POST',
            body: { refreshToken: refreshToken.value },
          })

          token.value = res.data.accessToken
          const newProfile = await fetchProfile()
          if (newProfile) {
            appStore.setProfile(newProfile)
          }
        } catch (refreshError) {
          token.value = null
          refreshToken.value = null
          return navigateTo('/signin')
        }
      } else {
        token.value = null
        return navigateTo('/signin')
      }
    }
  }
})
