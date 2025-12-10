<template>
  <div class="max-w-6xl mx-auto p-6">
    <!-- Card principal -->
    <div class="bg-white rounded-3xl shadow-xl p-8 border border-slate-100">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-semibold text-slate-800 tracking-tight">
          📅 Calendário de Manutenções
        </h2>
      </div>

      <!-- GRID DO CALENDÁRIO -->
      <div class="grid grid-cols-7 gap-4">
        <!-- Cabeçalho -->
        <div
          v-for="d in weekDays"
          :key="d"
          class="text-center font-semibold text-slate-600 text-sm pb-2 border-b"
        >
          {{ d }}
        </div>

        <!-- Dias -->
        <div
          v-for="day in days"
          :key="day.date"
          class="day-box transition-all duration-200 rounded-xl border cursor-pointer shadow-sm"
          :class="getDayClass(day)"
          @click="openDay(day)"
        >
          <div class="text-slate-700 font-medium text-sm">
            {{ day.day }}
          </div>

          <!-- pontos coloridos indicando manutenções -->
          <div v-if="day.maint.length > 0" class="flex gap-1 mt-2">
            <span
              v-for="m in day.maint"
              :key="m._id"
              class="w-2.5 h-2.5 rounded-full"
              :class="{
                'bg-green-500': m.status === 'Concluída',
                'bg-yellow-500': m.status === 'Pendente',
                'bg-red-500': m.status === 'Atrasada'
              }"
            ></span>
          </div>
        </div>
      </div>

      <!-- legenda -->
      <div class="flex gap-8 mt-8 text-sm font-medium">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-green-500"></span> Concluída
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-yellow-500"></span> Pendente
        </div>
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-red-500"></span> Atrasada
        </div>
      </div>
    </div>

    <!-- MODAL -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
    >
      <div class="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md border border-slate-200 space-y-4">
        <h3 class="text-xl font-semibold">
          Manutenções – Dia {{ selectedDay?.day }}
        </h3>

        <div v-if="dayMaintenances.length === 0" class="text-sm text-slate-500">
          Nenhuma manutenção programada para este dia.
        </div>

        <div
          v-for="m in dayMaintenances"
          :key="m._id"
          class="p-4 bg-slate-50 rounded-xl border border-slate-200"
        >
          <p class="font-semibold text-slate-700">{{ m.machine }}</p>
          <p class="text-sm text-slate-600">{{ m.sector }}</p>

          <span
            class="px-2 py-1 text-xs rounded-full font-medium mt-2 inline-block"
            :class="{
              'bg-green-100 text-green-700': m.status === 'Concluída',
              'bg-yellow-100 text-yellow-700': m.status === 'Pendente',
              'bg-red-100 text-red-700': m.status === 'Atrasada'
            }"
          >
            {{ m.status }}
          </span>
        </div>

        <button
          class="w-full py-2 bg-slate-200 rounded-lg hover:bg-slate-300"
          @click="showModal = false"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

const maintenances = ref([])
const days = ref([])

const selectedMonth = new Date().getMonth()
const selectedYear = new Date().getFullYear()

const showModal = ref(false)
const selectedDay = ref(null)
const dayMaintenances = ref([])

async function loadMaintenances () {
  const { data } = await api.get('/api/maintenance')
  maintenances.value = data
  buildCalendar()
}

function buildCalendar () {
  days.value = []
  const totalDays = new Date(selectedYear, selectedMonth + 1, 0).getDate()

  for (let d = 1; d <= totalDays; d++) {
    const dateString = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`

    days.value.push({
      day: d,
      date: dateString,
      maint: maintenances.value.filter(m => m.date === dateString)
    })
  }
}

function getDayClass (day) {
  if (day.maint.length === 0) return 'border-slate-200 bg-white'

  const hasAtrasada = day.maint.some(m => m.status === 'Atrasada')
  const hasPendente = day.maint.some(m => m.status === 'Pendente')
  const hasConcluida = day.maint.some(m => m.status === 'Concluída')

  if (hasAtrasada) return 'bg-red-100 border-red-300'
  if (hasPendente) return 'bg-yellow-100 border-yellow-300'
  if (hasConcluida) return 'bg-green-100 border-green-300'

  return 'bg-white border-slate-200'
}

function openDay (day) {
  selectedDay.value = day
  dayMaintenances.value = day.maint
  showModal.value = true
}

onMounted(loadMaintenances)
</script>

<style scoped>
.day-box {
  padding: 14px;
  min-height: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}

.day-box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

/* Cores mais elegantes */
.bg-green-100 { background-color: #e8f9ef; }
.bg-yellow-100 { background-color: #fff7d9; }
.bg-red-100 { background-color: #ffe5e5; }

.border-green-300 { border-color: #8ee3a1; }
.border-yellow-300 { border-color: #f5d27a; }
.border-red-300 { border-color: #f59a9a; }
</style>
