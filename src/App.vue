<script setup>
import ExchangeForm from '@/components/ExchangeForm.vue'
import TransactionsTable from '@/components/TransactionsTable.vue'
import Charts from '@/components/Charts.vue'
</script>

<template>
  <div class="bg-gradient-to-r from-emerald-50 to-emerald-100 flex flex-col min-h-screen">
    <header class="flex justify-center items-center gap-2 py-2">
      <img src="@/assets/img/logo.png" class="h-14" alt="fiat-exchange" />
      <span class="text-2xl font-medium">Fiat Exchange</span>
    </header>

    <main class="grow">
      <div class="2xl:container mx-auto p-4 xl:grid xl:grid-cols-2 gap-4">
        <div class="mb-4"><ExchangeForm /></div>
        <div>
          <TransactionsTable />
          <Charts />
        </div>
      </div>
    </main>

    <footer class="py-4 text-center text-sm">@Fiat exchange 2023</footer>
  </div>
</template>

<style lang="scss">
.fade-enter-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
