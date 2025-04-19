import { useAppStore } from '~/stores/app'

export default defineNuxtRouteMiddleware((to) => {
  const app = useAppStore()

  if (typeof to.meta.title === 'string') {
    app.setTitle(to.meta.title)
  } else {
    app.setTitle('')
  }
})