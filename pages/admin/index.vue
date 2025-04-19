<template>
  <div class="space-y-6">
    <div class="w-full flex items-center gap-4">
      <span class="whitespace-nowrap">Total admin: {{ totalCount }}</span>

      <div class="flex-1">
        <BaseInput
          v-model="searchText"
          placeholder="Search by Admin, ID, First name, Last name, Email, Role"
          class="w-full"
          @update:model-value="(value) => fetchSearchAdmin(value as string)"
        />
      </div>

      <BaseButton
        v-if="appStore.profile?.role === 'superadmin'"
        icon="mdi:user-add-outline"
        class="w-[160px] h-[44px]"
        @click="() => {router.push('/admin/invite')}"

      >
        Invite Admin
      </BaseButton>

    </div>

    <div class="w-full">
      <BaseTable :columnList="columnList" :dataList="adminList"/>
    </div>
  

</div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { toast } from 'vue3-toastify'
import { useAppStore } from '~/stores/app'
import type { IAdmin, IAdminListResponse } from '~/types/admin'
import type { IColumn } from '~/types/base'

definePageMeta({
  title: 'Admin Management'
})

const config = useRuntimeConfig()
const baseURL = config.public.API_ENDPOINT

const token = useCookie('token')

const searchText = ref<string>('')

const adminList = ref<IAdmin[]>([])

const totalCount = ref<number>(0)

const appStore = useAppStore()

const router = useRouter()

const columnList: IColumn[] = [
    { key: 'id', name: 'Name' },    
    { key: 'firstname', name: 'First Name' },    
    { key: 'lastname', name: 'Last Name' },    
    { key: 'phone', name: 'Phone' },    
    { key: 'createdAt', name: 'Created At', type: 'date' },
    { key: 'role', name: 'Role' },
    { key: 'email', name: 'Email' },
    { key: 'status', name: 'Status', type: 'status' },
  ]

onBeforeMount(() => {
  fetchAdminList()
})

const fetchSearchAdmin = useDebounceFn((value: string) => {
  fetchAdminList(value)
}, 300)

const fetchAdminList = async (search: string = '') => {

  try {
    const { data, error } = await useFetch<IAdminListResponse>(`${baseURL}/admins`, {
      method: 'GET',
      query: {
        searchText: search,
        page: 1,
        limitPerPage: 10
      },
      headers: {
        Authorization: `Bearer ${token.value}`
      }
    })

    if (error.value) throw error.value

    if (data.value?.data) {
      adminList.value = data?.value?.data
      totalCount.value = data.value?.meta?.totalItems || 0
    }


  } catch (err: any) {
    toast.error(err?.data?.message || err?.message || 'Failed to fetch admins')
  }
}

</script>

