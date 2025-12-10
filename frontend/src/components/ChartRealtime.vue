<template>
  <div class="h-64">
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Chart, LineController, LineElement, PointElement, LinearScale, TimeScale, CategoryScale, Tooltip, Legend } from 'chart.js'

Chart.register(LineController, LineElement, PointElement, LinearScale, TimeScale, CategoryScale, Tooltip, Legend)

const canvas = ref(null)
let chart
let intervalId

function createChart () {
  if (!canvas.value) return

  const ctx = canvas.value.getContext('2d')
  const labels = []
  const dataValues = []

  chart = new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'Atividades em tempo real',
          data: dataValues,
          borderColor: '#3b82f6',
          backgroundColor: 'rgba(59,130,246,0.15)',
          tension: 0.35,
          fill: true,
          pointRadius: 0
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 300
      },
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          mode: 'index',
          intersect: false
        }
      },
      scales: {
        x: {
          display: false
        },
        y: {
          ticks: {
            color: '#64748b',
            precision: 0
          },
          grid: {
            color: 'rgba(148,163,184,0.25)'
          }
        }
      }
    }
  })

  // seed inicial
  for (let i = 0; i < 10; i++) {
    pushPoint(labels, dataValues)
  }
  chart.update()
}

function pushPoint (labels, dataValues) {
  const now = new Date()
  const label = now.toLocaleTimeString('pt-BR', { minute: '2-digit', second: '2-digit' })
  const last = dataValues.length ? dataValues[dataValues.length - 1] : 5
  const next = Math.max(0, last + (Math.random() * 4 - 2))

  labels.push(label)
  dataValues.push(Math.round(next))

  if (labels.length > 30) {
    labels.shift()
    dataValues.shift()
  }
}

onMounted(() => {
  createChart()

  const labels = chart.data.labels
  const dataValues = chart.data.datasets[0].data

  intervalId = setInterval(() => {
    pushPoint(labels, dataValues)
    chart.update('active')
  }, 1000)
})

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
  if (chart) chart.destroy()
})
</script>
