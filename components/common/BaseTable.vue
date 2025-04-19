<template>
  <div class="overflow-x-auto border rounded-lg">
    <table class="min-w-full text-sm text-left table-fixed">
      <thead class="bg-gray-100 text-gray-700 uppercase">
        <tr>
          <th
            v-for="col in columnList"
            :key="col.key"
            class="px-4 py-3 whitespace-nowrap font-medium text-sm"
          >
            {{ col.name }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Loading -->
        <tr v-if="isLoading">
          <td :colspan="columnList.length" class="text-center py-6 text-gray-500">
            <Icon icon="mdi:loading" class="animate-spin inline-block text-lg text-primary" />
            <span class="ml-2">Loading...</span>
          </td>
        </tr>

        <!-- No data -->
        <tr v-else-if="dataList.length === 0">
          <td :colspan="columnList.length" class="text-center py-6 text-gray-500">
            No data found.
          </td>
        </tr>

        <!-- Data rows -->
        <tr
          v-else
          v-for="(row, index) in dataList"
          :key="index"
          class="border-t hover:bg-gray-50"
        >
          <td
            v-for="col in columnList"
            :key="col.key"
            class="px-4 py-3 whitespace-nowrap truncate"
          >
            <template v-if="col.type === 'status'">
              <span
                :class="[
                  'px-2 py-1 text-xs font-medium rounded-full',
                  row[col.key] === 'active'
                    ? 'bg-green-100 text-green-700'
                    : row[col.key] === 'pending'
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-gray-100 text-gray-600'
                ]"
              >
                {{ row[col.key] }}
              </span>
            </template>

            <template v-else-if="col.type === 'date'">
              {{ formatDate(row[col.key]) }}
            </template>

            <template v-else>
              {{ row[col.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { Icon } from '@iconify/vue'
import type { IColumn } from '~/types/base'

defineProps<{
  columnList: IColumn[]
  dataList: Record<string, any>[]
  isLoading?: boolean
}>()

function formatDate(dateStr: string): string {
  if (!dateStr) return '-'
  const date = new Date(dateStr)
  if (isNaN(date.getTime())) return '-'

  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}
</script>
