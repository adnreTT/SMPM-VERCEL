
<template>
  <div class="bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-slate-100 max-w-3xl">
    <h2 class="text-lg font-semibold mb-4">Registro de Manutenção</h2>
    <form class="grid grid-cols-1 md:grid-cols-2 gap-3" @submit.prevent="save">
      <div>
        <label class="label">Máquina</label>
        <input v-model="item.machine" class="input" required />
      </div>
      <div>
        <label class="label">Data</label>
        <input v-model="item.date" class="input" type="date" required />
      </div>
      <div>
        <label class="label">Setor</label>
        <input v-model="item.sector" class="input" />
      </div>
      <div>
        <label class="label">Status</label>
        <select v-model="item.status" class="input">
          <option>Concluída</option>
          <option>Pendente</option>
          <option>Atrasada</option>
        </select>
      </div>
      <div class="md:col-span-2">
        <label class="label">Observações</label>
        <textarea v-model="item.notes" class="input" rows="4"></textarea>
      </div>
      <div class="md:col-span-2 flex justify-end gap-2">
        <button class="px-4 py-2 bg-slate-200 rounded" type="button" @click="newItem">Novo</button>
        <button class="px-4 py-2 bg-blue-600 text-white rounded" type="submit">{{ item._id ? 'Atualizar' : 'Salvar' }}</button>
      </div>
    </form>
  </div>
</template>
<script setup>
import { reactive, watchEffect, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useMaintenanceStore } from '../store'
const store = useMaintenanceStore()
const route = useRoute()
const router = useRouter()
const blank = () => ({ machine:'', date:'', sector:'', status:'Pendente', notes:'' })
const item = reactive(blank())
onMounted(()=> { if(!store.loaded) store.fetchAll() })
watchEffect(()=>{
  const id = route.params.id
  if(id){
    const found = store.byId(id)
    if(found) Object.assign(item, JSON.parse(JSON.stringify(found)))
  }
})
function newItem(){ Object.assign(item, blank()) }
async function save(){
  if(item._id){
    await store.update(item._id, item)
  }else{
    await store.add(item)
    router.push('/list')
  }
  alert('Salvo')
}
</script>
<style scoped>
.label{ @apply text-sm text-slate-600; }
.input{ @apply border rounded-lg px-3 py-2 w-full; }
</style>
