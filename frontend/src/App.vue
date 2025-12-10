<template>
  <div :class="['min-h-screen flex text-slate-800', authed ? 'bg-slate-100' : 'bg-slate-950']">
    <!-- Sidebar desktop -->
    <Sidebar v-if="authed" class="hidden md:block" />

    <!-- Conteúdo principal -->
    <div class="flex-1 flex flex-col min-h-screen">
      <!-- Header -->
      <header
        v-if="authed"
        class="bg-gradient-to-r from-blue-700 to-slate-900 text-white shadow-md"
      >
        <div class="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center text-sm font-bold">
              SMPM
            </div>
            <div>
              <h1 class="text-base md:text-lg font-semibold">
                Sistema de Manutenção Preventiva de Máquinas
              </h1>
              <p class="text-xs md:text-sm text-white/80">
                Monitoramento, planejamento e controle de manutenções
              </p>
            </div>
          </div>

          <!-- Info usuário -->
          <div class="flex items-center gap-3 text-xs md:text-sm">
            <div class="text-right">
              <div class="font-medium">{{ name }}</div>
              <div class="text-white/70">{{ email }}</div>
            </div>
            <div class="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-xs font-semibold uppercase">
              {{ initials }}
            </div>
          </div>
        </div>
      </header>

      <!-- Conteúdo / router-view -->
      <main class="flex-1">
        <div :class="authed ? 'max-w-6xl mx-auto px-4 py-6 md:py-8' : 'min-h-screen flex items-center justify-center px-4'">
          <router-view />
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import Sidebar from './components/Sidebar.vue'
import { computed } from 'vue'
import { useAuthStore } from './store/auth'

const auth = useAuthStore()

const authed = computed(() => auth.isAuthenticated)
const name = computed(() => auth.name || 'Usuário')
const email = computed(() => auth.email || 'email@empresa.com')

const initials = computed(() => {
  const n = name.value || ''
  const parts = n.split(' ').filter(Boolean)
  if (parts.length === 0) return 'US'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
})
</script>
