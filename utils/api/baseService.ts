import { toast } from "vue3-toastify"
import type { ILoginResponse } from "~/types/form"

export const useApi = () => {
  const config = useRuntimeConfig()
  const token = useCookie('token')
  const refreshToken = useCookie('refresh')

  const baseURL = config.public.API_ENDPOINT

  const api = $fetch.create({
    baseURL,
    headers: {
      Authorization: `Bearer ${token.value}`
    },

    async onResponseError({ response }) {
      if (response.status === 401 && refreshToken.value) {

        try {
          const res = await $fetch<ILoginResponse>(`${baseURL}/auth/refresh-token`, {
            method: 'POST',
            body: { refreshToken: refreshToken.value },
          })

          token.value = res.data.accessToken
          refreshToken.value = res.data.refreshToken

        } catch (refreshError) {
          token.value = null
          refreshToken.value = null
          navigateTo('/signin')
        }
      }
    }
  })

  return api
}
