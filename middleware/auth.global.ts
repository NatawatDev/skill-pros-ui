import { useAppStore } from "~/stores/app"
import { useAdminApi } from "~/utils/api/admin"

export default defineNuxtRouteMiddleware(async (to, from) => {
  const token = useCookie('token')
  const appStore = useAppStore()

  const { profileAdmin } = useAdminApi()

  const publicPages = ['/signin', '/forgot-password', '/reset-password', '/setup-password']

  if (to.path === '/') {
    return navigateTo('/admin')
  }
  if (!token.value && !publicPages.includes(to.path)) {
    return navigateTo('/signin')
  }

  if (token.value && !appStore.profile) {
    try {
      const res = await profileAdmin()
      
      if (res.data) {
        appStore.setProfile(res.data)
      }

    } catch (err: any) {
      token.value = null
      return navigateTo('/signin')
    }
  }
})
