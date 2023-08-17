<script setup>
import { computed } from 'vue'
import { useTransactionsStore } from '@/stores/transactions'
import { useCurrenciesStore } from '@/stores/currencies'
import { Chart as ChartJS, Title, Tooltip, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(Title, Tooltip, BarElement, CategoryScale, LinearScale)

const chartOptions = {
  responsive: true
}
const currenciesStore = useCurrenciesStore()
const transacationsStore = useTransactionsStore()

const symbols = computed(() => currenciesStore.list.map((el) => el.symbol))
const symbolsValue = computed(() => {
  return symbols.value.map((symbol) => {
    const res = transacationsStore.list.filter((el) =>
      [el?.from?.symbol, el?.to?.symbol].includes(symbol)
    )
    let sum = 0
    return res.reduce((acc, item) => {
      const isFrom = item?.from?.symbol === symbol
      return acc + (+item[isFrom ? 'from' : 'to']?.value || 0)
    }, sum)
  })
})
const chartData = computed(() => {
  return {
    labels: symbols.value,
    datasets: [
      {
        data: symbolsValue.value,
        backgroundColor: ['green', 'yellow', 'orange', 'blue', 'red', 'lime']
      }
    ]
  }
})
const topCurrency = computed(() => {
  const res = {}
  transacationsStore.list.map((el) => {
    const count = res[el?.to?.symbol]
    if (!count && count !== 0) res[el?.to?.symbol] = 1
    else res[el.to.symbol] = res[el.to.symbol] + 1
  })
  let max = 0
  let maxSymbol = ''
  Object.keys(res).map((key) => {
    if (res[key] > max) {
      max = res[key]
      maxSymbol = key
    }
  })
  return maxSymbol
})
const countTransactionsDay = computed(
  () =>
    transacationsStore.list.filter((item) => {
      const today = new Date().toLocaleDateString()
      const date = new Date(item?.date).toLocaleDateString()
      console.log(today, date)
      return today === date
    }).length
)
</script>
<template>
  <div class="bg-white p-4">
    <div class="flex gap-4">
      <div class="font-medium mb-4">Top currency: {{ topCurrency }}</div>
      <div class="font-medium mb-4">Transactions today: {{ countTransactionsDay }}</div>
    </div>
    <div class="font-medium mb-4">Exchanged:</div>
    <Bar id="chart-symbols" :options="chartOptions" :data="chartData" />
  </div>
</template>

<style lang="scss" scoped></style>
