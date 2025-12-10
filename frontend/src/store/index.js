
import { defineStore } from 'pinia'
import api from '../services/api'

export const useMaintenanceStore = defineStore('maintenance', {
  state: () => ({ items: [], loaded:false }),
  getters: {
    kpis: (state) => {
      const atrasadas = state.items.filter(i => i.status === 'Atrasada').length
      const pendentes = state.items.filter(i => i.status === 'Pendente').length
      const concluidas = state.items.filter(i => i.status === 'Concluída').length
      return { atrasadas, pendentes, concluidas }
    },
    monthlySeries: (state) => {
      const labels = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
      const by = (status) => {
        const arr = new Array(12).fill(0)
        state.items.filter(i => i.status===status).forEach(i => {
          const d = new Date(i.date)
          arr[d.getMonth()]++
        })
        return arr
      }
      return { labels, concluidas: by('Concluída'), pendentes: by('Pendente'), atrasadas: by('Atrasada') }
    }
  },
  actions: {
    async fetchAll(){
      const { data } = await api.get('/api/maintenance')
      this.items = data
      this.loaded = true
    },
    async add(item){
      const { data } = await api.post('/api/maintenance', item)
      this.items.push(data)
    },
    async update(id, patch){
      const { data } = await api.put(`/api/maintenance/${id}`, patch)
      const i = this.items.findIndex(x=>x._id===id)
      if(i>=0) this.items[i] = data
    },
    async remove(id){
      await api.delete(`/api/maintenance/${id}`)
      this.items = this.items.filter(i=>i._id!==id)
    },
    byId(id){ return this.items.find(i=> i._id===id || i.id===id) }
  }
})
