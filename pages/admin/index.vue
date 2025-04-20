<template>
  <div class="space-y-6">
    <!-- Header & Search -->
    <div class="w-full flex items-center gap-4">
      <span class="whitespace-nowrap">Total admin: {{ paginationMeta.totalItems }}</span>

      <div class="flex-1">
        <BaseInput
          v-model="searchText"
          placeholder="Search by Admin, ID, First name, Last name, Email, Role"
          class="w-full"
          @update:model-value="(value) => searchAdmin(value as string)"
        />
      </div>

      <BaseButton
        v-if="appStore.profile?.role === 'superadmin'"
        icon="mdi:user-add-outline"
        class="w-[160px] h-[44px]"
        @click="() => router.push('/admin/invite')"
      >
        Invite Admin
      </BaseButton>
    </div>

    <!-- Table & Pagination -->
    <div class="w-full">
      <BaseTable 
        :columnList="columnList" 
        :dataList="adminList"
        :isLoading="isLoading" 
      />

      <BasePagination
        v-if="paginationMeta.totalPages > 1"
        :currentPage="paginationMeta.currentPage"
        :totalPages="paginationMeta.totalPages"        
        @update:page="onChangePage"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core'
import { toast } from 'vue3-toastify'
import { useAppStore } from '~/stores/app'
import type { IAdmin, IPaginationMeta } from '~/types/admin'
import type { IColumn } from '~/types/base'
import { useAdminApi } from '~/utils/api/admin'

definePageMeta({ title: 'Admin Management' })

const router = useRouter()
const appStore = useAppStore()

const { getAdminList } = useAdminApi()

const searchText = ref<string>('')
const adminList = ref<IAdmin[]>([])
const isLoading = ref<boolean>(false)

const paginationMeta = ref<IPaginationMeta>({
  totalItems: 0,
  itemsPerPage: 10,
  totalPages: 0,
  currentPage: 1
})

const columnList: IColumn[] = [
  { key: 'id', name: 'Id' },
  { key: 'firstname', name: 'First Name' },
  { key: 'lastname', name: 'Last Name' },
  { key: 'phone', name: 'Phone' },
  { key: 'createdAt', name: 'Created At', type: 'date' },
  { key: 'role', name: 'Role' },
  { key: 'email', name: 'Email' },
  { key: 'status', name: 'Status', type: 'status' }
]

onBeforeMount(() => {
  fetchAdminList()
})

async function onChangePage(page: number) {
  paginationMeta.value.currentPage = page
  await fetchAdminList()
}

const searchAdmin = useDebounceFn((value: string) => {
  fetchAdminList(value)
}, 300)

async function fetchAdminList(searchText: string = '') {
  try {
    isLoading.value = true
    const res = await getAdminList({
      page: paginationMeta.value.currentPage,
      limitPerPage: 5,
      searchText: searchText
    })

    adminList.value = res.data
    paginationMeta.value = res.meta
    
  } catch (err: any) {
    toast.error(err?.data?.message || err?.message || 'Failed to fetch admins')
  } finally {
    isLoading.value = false
  }
}
</script>
