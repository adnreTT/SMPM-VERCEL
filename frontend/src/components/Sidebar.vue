<template>
  <aside
    class="hidden md:flex md:flex-col fixed inset-y-0 w-64 bg-slate-950 text-slate-100 border-r border-slate-800"
  >
    <!-- Logo / título -->
    <div class="px-5 py-4 border-b border-slate-800 flex items-center gap-3">
      <div class="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-sm font-bold">
        MP
      </div>
      <div class="leading-tight">
        <div class="text-sm font-semibold">SMPM</div>
        <div class="text-[11px] text-slate-400">Manutenção Preventiva</div>
      </div>
    </div>

    <!-- Navegação -->
    <nav class="flex-1 px-3 py-4 space-y-1 text-sm">
      <RouterLink class="nav" to="/dashboard">
        <span class="nav-dot" /> Dashboard
      </RouterLink>
      <RouterLink class="nav" to="/calendar">
        <span class="nav-dot" /> Calendário
      </RouterLink>
      <RouterLink class="nav" to="/list">
        <span class="nav-dot" /> Lista de Manutenções
      </RouterLink>
      <RouterLink class="nav" to="/profile">
        <span class="nav-dot" /> Perfil
      </RouterLink>
    </nav>

    <!-- Rodapé -->
    <div class="px-4 py-3 border-t border-slate-800 text-xs flex items-center justify-between">
      <span class="text-slate-400">versão 1.0</span>
      <button
        class="px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 transition text-[11px]"
        @click="logout"
      >
        Sair
      </button>
    </div>
  </aside>
</template>

<script setup>
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

function logout () {
  auth.logout()
  router.push({ name: 'login' })
}
</script>

<style scoped>
.nav {
  @apply flex items-center gap-2 px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800/80 hover:text-white transition;
}
.nav.router-link-active {
  @apply bg-blue-600 text-white;
}
.nav-dot {
  @apply w-1.5 h-1.5 rounded-full bg-blue-400;
}
</style>
