
<template><canvas ref="canvas"></canvas></template>
<script setup>
import { onMounted, ref, watch } from 'vue'
import { Chart, BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip } from 'chart.js'
Chart.register(BarController, BarElement, CategoryScale, LinearScale, Legend, Tooltip)
const props = defineProps({ labels: Array, series: Object })
const canvas = ref(null); let chart
onMounted(()=> render())
watch(()=>props.series, ()=>{ if(chart){ chart.destroy() }; render() })
function render(){
  if(!canvas.value) return
  chart = new Chart(canvas.value.getContext('2d'), {
    type:'bar',
    data:{
      labels: props.labels,
      datasets:[
        { label:'Concluídas', data: props.series.concluidas, backgroundColor:'#16a34a' },
        { label:'Pendentes', data: props.series.pendentes, backgroundColor:'#f59e0b' },
        { label:'Atrasadas', data: props.series.atrasadas, backgroundColor:'#dc2626' }
      ]
    },
    options:{ responsive:true, maintainAspectRatio:false }
  })
}
</script>
<style scoped>
:host,canvas{ display:block; width:100%; height:280px }
</style>
