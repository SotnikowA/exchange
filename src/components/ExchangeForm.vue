<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import CurrencySelect from '@/components/CurrencySelect.vue'
import CurrencyNumber from '@/components/CurrencyNumber.vue'
import Btn from '@/components/Btn.vue'
import { useCurrenciesStore } from '@/stores/currencies'
import { useTransactionsStore } from '@/stores/transactions'

const transactionsStore = useTransactionsStore()
const currenciesStore = useCurrenciesStore()
let calculateInput = ref('')
const from = ref('')
const to = ref('')
const fromCurrency = ref({
  id: 1,
  symbol: 'USD',
  name: 'US Dollar'
})
const toCurrency = ref({
  id: 2,
  symbol: 'UAH',
  name: 'Hryvnia'
})
const fromCurrencyList = computed(() =>
  currenciesStore.list.filter(
    (el) => el.id !== toCurrency.value?.id && el.id !== fromCurrency.value?.id
  )
)
const toCurrencyList = computed(() =>
  currenciesStore.list.filter(
    (el) => el.id !== fromCurrency.value?.id && el.id !== toCurrency.value?.id
  )
)
const pair = computed(() => `${fromCurrency.value?.symbol}:${toCurrency.value?.symbol}`)
const rate = computed(() => currenciesStore.rates[pair.value] || 0)
const enough = computed(() => +to.value <= +currenciesStore.reservesBalance[pair.value])
const disabled = computed(() => {
  return (!from.value && !to.value) || !enough.value
})
const changeCurrency = async () => {
  const buf = { ...fromCurrency.value }
  fromCurrency.value = { ...toCurrency.value }
  toCurrency.value = buf
  await nextTick()
  calculateInput.value = 'change'
}

const send = () => {
  transactionsStore.add({
    from: { symbol: fromCurrency.value?.symbol, value: from.value },
    to: { symbol: toCurrency.value?.symbol, value: to.value }
  })
}
watch(from, async () => {
  !calculateInput.value && (calculateInput.value = 'from')
})
watch(to, async () => {
  !calculateInput.value && (calculateInput.value = 'to')
})
watch(pair, async () => {
  await nextTick()
  calculateInput.value = 'change'
})
watch(calculateInput, async (value) => {
  switch (value) {
    case 'from':
    case 'change':
      to.value = +from.value > 0 ? currenciesStore.calculate(pair.value, from.value).toFixed(4) : ''
      break
    case 'to':
      from.value =
        +to.value > 0 ? currenciesStore.calculate(pair.value, to.value, true).toFixed(4) : ''
      break
    default:
  }
  await nextTick()
  calculateInput.value = ''
})
</script>

<template>
  <div class="bg-white py-6 p-5 flex flex-col">
    <div>
      <div class="font-medium">Give</div>
      <div class="grid grid-cols-[180px_1fr]">
        <CurrencySelect v-model="fromCurrency" :items="fromCurrencyList" />
        <CurrencyNumber v-model="from" class="-ms-[1px]" />
      </div>
    </div>
    <div class="flex justify-center -mb-6 py-1">
      <button class="transition hover:text-green-400 relative z-10" @click="changeCurrency">
        <svg width="40" height="40" viewBox="0 0 24 24">
          <path fill="currentColor" d="M9,3L5,7H8V14H10V7H13M16,17V10H14V17H11L15,21L19,17H16Z" />
        </svg>
      </button>
    </div>
    <div>
      <div class="font-medium">Receive</div>
      <div class="grid grid-cols-[180px_1fr] relative">
        <CurrencySelect v-model="toCurrency" :items="toCurrencyList" />
        <CurrencyNumber v-model="to" class="-ms-[1px]" />
        <div class="absolute text-xs text-gray-400 top-1 end-2">
          Reserve: {{ currenciesStore.reservesBalance[pair]?.toFixed(2) }}
        </div>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4">
      <div class="mb-4 sm:mb-0">1 {{ fromCurrency?.symbol }} = {{ rate }} {{ toCurrency?.symbol }}</div>
      <Btn :disabled="disabled" @click="!disabled && send()">Change</Btn>
    </div>
    <div v-if="!enough" class="text-center font-medium uppercase text-red-600 pt-2">
      insufficient reserve
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
