import { defineStore } from 'pinia'
import type { IProfileData } from '~/types/app'


export const useAppStore = defineStore('app', () => {
  const title = ref('')
  const profile = ref<IProfileData | null>(null)

  function setTitle(newTitle: string) {
    title.value = newTitle
  }

  function setProfile(data: IProfileData | null) {
    profile.value = data
  }

  return { title, profile, setTitle, setProfile }
})