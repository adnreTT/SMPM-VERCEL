
<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">Lista de Manutenções</h2>
      <button
        class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
        @click="openAddModal = true"
      >
        + Adicionar Manutenção
      </button>
    </div>

    <div class="bg-white rounded-xl p-4 shadow">
      <div class="grid grid-cols-1 md:grid-cols-5 gap-3">
        <input v-model="q.machine" placeholder="Máquina" class="input" />
        <input v-model="q.sector" placeholder="Setor" class="input" />
        <input v-model="q.date" placeholder="Data (YYYY-MM-DD)" class="input" />
        <select v-model="q.status" class="input">
          <option value="">Status</option>
          <option>Concluída</option>
          <option>Pendente</option>
          <option>Atrasada</option>
        </select>
        <button class="px-3 py-2 bg-slate-200 rounded" @click="store.fetchAll()">Recarregar</button>
      </div>
    </div>

    <div class="bg-white rounded-xl p-4 shadow overflow-auto">
      <table class="min-w-full text-sm">
        <thead class="text-left text-slate-500">
          <tr>
            <th class="py-2">ID</th>
            <th>Máquina</th>
            <th>Data</th>
            <th>Setor</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="m in filtered" :key="m._id" class="border-t">
            <td class="py-2">{{ m._id.slice(-6) }}</td>
            <td>{{ m.machine }}</td>
            <td>{{ fmt(m.date) }}</td>
            <td>{{ m.sector }}</td>
            <td>
              <span :class="statusClass(m.status)" class="px-2 py-1 rounded text-white text-xs">
                {{ m.status }}
              </span>
            </td>
            <td class="space-x-2">
              <RouterLink :to="`/details/${m._id}`" class="btn">Ver</RouterLink>
              <button class="btn-secondary" @click="store.remove(m._id)">Excluir</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal de Nova Manutenção Programada -->
    <Modal v-if="openAddModal" @close="closeModal">
      <template #title>
        Nova Manutenção Programada
      </template>

      <template #content>
        <form class="space-y-3" @submit.prevent>
          <div>
            <label class="text-sm text-slate-600">Máquina</label>
            <input v-model="form.machine" class="input" placeholder="Ex: M1" />
          </div>
          <div>
            <label class="text-sm text-slate-600">Setor</label>
            <input v-model="form.sector" class="input" placeholder="Ex: Produção" />
          </div>
          <div>
            <label class="text-sm text-slate-600">Data</label>
            <input v-model="form.date" type="date" class="input" />
          </div>
          <div>
            <label class="text-sm text-slate-600">Status</label>
            <select v-model="form.status" class="input">
              <option value="Pendente">Pendente</option>
              <option value="Concluída">Concluída</option>
              <option value="Atrasada">Atrasada</option>
            </select>
          </div>
          <div>
            <label class="text-sm text-slate-600">Observações</label>
            <textarea v-model="form.notes" rows="3" class="input" />
          </div>
        </form>
      </template>

      <template #footer>
        <button
          class="px-3 py-1 rounded bg-green-600 text-white text-sm hover:bg-green-700"
          @click="addMaintenance"
        >
          Salvar
        </button>
      </template>
    </Modal>
  </div>
</template>

<script setup>
import { reactive, computed, onMounted, ref } from 'vue'
import { useMaintenanceStore } from '../store'
import Modal from '../components/Modal.vue'

const store = useMaintenanceStore()
onMounted(() => {
  if (!store.loaded) store.fetchAll()
})

const q = reactive({ machine: '', date: '', sector: '', status: '' })
const filtered = computed(() => {
  return store.items.filter((i) => {
    const ok = (v, term) => !term || String(v).toLowerCase().includes(String(term).toLowerCase())
    return (
      ok(i.machine, q.machine) &&
      ok(i.sector, q.sector) &&
      (!q.date || String(i.date).slice(0, 10) === q.date) &&
      ok(i.status, q.status)
    )
  })
})

function fmt(d) {
  return new Date(d).toISOString().slice(0, 10)
}
function statusClass(s) {
  return (
    {
      Concluída: 'bg-success',
      Pendente: 'bg-warning',
      Atrasada: 'bg-danger'
    }[s] || 'bg-slate-400'
  )
}

// Modal de nova manutenção
const openAddModal = ref(false)
const form = reactive({
  machine: '',
  sector: '',
  date: '',
  status: 'Pendente',
  notes: ''
})

function resetForm() {
  form.machine = ''
  form.sector = ''
  form.date = ''
  form.status = 'Pendente'
  form.notes = ''
}

function closeModal() {
  openAddModal.value = false
}

async function addMaintenance() {
  try {
    if (!form.machine || !form.date || !form.sector) {
      alert('Preencha máquina, setor e data.')
      return
    }
    await store.add({ ...form })
    resetForm()
    openAddModal.value = false
    openAddModal.value = false
  } catch (e) {
    console.error('Erro ao criar manutenção', e)
    alert('Erro ao criar manutenção')
  }
}
</script>

<style scoped>
.input {
  @apply border rounded-lg px-3 py-2 w-full;
}
.btn {
  @apply inline-block px-3 py-1 bg-blue-600 text-white rounded;
}
.btn-secondary {
  @apply px-3 py-1 bg-slate-200 rounded;
}
</style>
