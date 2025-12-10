<template>
  <div class="space-y-6">
    <div>
      <h2 class="text-xl md:text-2xl font-semibold text-slate-800">Visão Geral</h2>
      <p class="text-sm text-slate-500">
        Acompanhe rapidamente o status das manutenções e indicadores principais.
      </p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <KpiCard label="Manutenções Atrasadas" :value="kpis.atrasadas" />
      <KpiCard label="Manutenções Pendentes" :value="kpis.pendentes" />
      <KpiCard label="Manutenções Concluídas" :value="kpis.concluidas" />
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 items-start">
      <div class="lg:col-span-2 bg-white rounded-2xl p-4 shadow-sm border border-slate-100 min-h-[260px]">
        <h3 class="text-sm font-semibold text-slate-700 mb-2">Evolução Mensal</h3>
        <div class="h-64">
          <ChartBar :labels="series.labels" :series="series" />
        </div>
      </div>
      <div class="bg-white rounded-2xl p-4 shadow-sm border border-slate-100">
        <h3 class="text-sm font-semibold text-slate-700 mb-3">Fluxo em tempo real</h3>
        <p class="text-xs text-slate-500 mb-2">
          Simulação de movimentação contínua de manutenções registradas ao longo do tempo.
        </p>
        <ChartRealtime />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useMaintenanceStore } from '../store'
import KpiCard from '../components/KpiCard.vue'
import ChartBar from '../components/ChartBar.vue'
import ChartRealtime from '../components/ChartRealtime.vue'

const store = useMaintenanceStore()

onMounted(() => {
  if (!store.loaded) store.fetchAll()
})

const kpis = computed(() => store.kpis)
const series = computed(() => store.monthlySeries)
</script>
