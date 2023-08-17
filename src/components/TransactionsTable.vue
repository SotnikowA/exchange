<script setup>
import { useTransactionsStore } from '@/stores/transactions'

const transactionsStore = useTransactionsStore()
</script>

<template>
  <div class="w-full overflow-hidden bg-white p-4 mb-4">
    <table class="w-full">
      <thead>
        <tr>
          <td class="px-2">ID</td>
          <td class="px-2">Give</td>
          <td class="px-2">Receive</td>
          <td class="px-2">Date</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in transactionsStore.list" :key="item.id">
          <td class="px-2 border-b border-gray-300">{{ item?.id }}</td>
          <td class="px-2 border-b border-gray-300">
            {{ item?.from?.value }} {{ item?.from?.symbol }}
          </td>
          <td class="px-2 border-b border-gray-300">
            {{ item?.to?.value }} {{ item?.to?.symbol }}
          </td>
          <td class="px-2 border-b border-gray-300 text-xs w-[200px]">{{ item?.date }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss" scoped></style>
