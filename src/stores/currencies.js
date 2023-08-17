import { defineStore } from 'pinia'
import { useTransactionsStore } from '@/stores/transactions'
import { computed } from 'vue'

export const useCurrenciesStore = defineStore('currencies', () => {
  const transactionsStore = useTransactionsStore()
  const list = [
    {
      id: 1,
      symbol: 'USD'
    },
    {
      id: 2,
      symbol: 'UAH'
    },
    {
      id: 3,
      symbol: 'EUR'
    },
    {
      id: 4,
      symbol: 'PLN'
    }
  ]
  const rates = {
    'USD:UAH': 37.061288,
    'USD:EUR': 0.916415,
    'USD:PLN': 4.077968,
    'UAH:USD': 0.026938,
    'UAH:EUR': 0.024632,
    'UAH:PLN': 0.109261,
    'EUR:USD': 1.091209,
    'EUR:UAH': 40.441611,
    'EUR:PLN': 4.449915,
    'PLN:USD': 0.24522,
    'PLN:UAH': 9.088176,
    'PLN:EUR': 0.224723
  }
  const reserve = {
    'USD:UAH': 100000,
    'USD:EUR': 5000,
    'USD:PLN': 21000,
    'UAH:USD': 24000,
    'UAH:EUR': 31000,
    'UAH:PLN': 25000,
    'EUR:USD': 40000,
    'EUR:UAH': 120000,
    'EUR:PLN': 67000,
    'PLN:USD': 26000,
    'PLN:UAH': 28000,
    'PLN:EUR': 87000
  }
  const reservesBalance = computed(() => {
    const reserves = { ...reserve }
    transactionsStore.list.forEach((item) => {
      const key = `${item.from.symbol}:${item.to.symbol}`
      reserves[key] -= item.to.value
    })
    return reserves
  })
  const calculate = (pair, value, reverse = false) => {
    const rate = rates[pair]
    const res = rate ? (!reverse ? rate * value : value / rate) : 0
    return res
  }
  return { list, rates, reserve, calculate, reservesBalance }
})
