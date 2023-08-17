import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useTransactionsStore = defineStore('transactions', () => {
  const list = useLocalStorage('history-transactions', [])

  const add = (item) => {
    const id = list.value[list.value.length - 1]?.id || 0
    list.value.push({ id: id + 1, ...item, date: new Date().toUTCString() })
  }
  return { list, add }
})
