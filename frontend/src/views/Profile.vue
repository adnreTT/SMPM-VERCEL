<template>
  <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow p-6 space-y-8">
    <!-- Cabeçalho -->
    <div class="flex items-center gap-4 flex-wrap">
      <div class="w-20 h-20 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-700 text-xl font-semibold">
        {{ initials }}
      </div>

      <div class="flex-1 min-w-[180px]">
        <h1 class="text-xl font-semibold text-slate-800">{{ name }}</h1>
        <p class="text-sm text-slate-500">{{ role }} • {{ department }}</p>
        <p class="mt-1 text-xs text-slate-600">
          {{ bio }}
        </p>
      </div>
    </div>

    <hr class="border-slate-200" />

    <!-- Informações Essenciais -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h2 class="text-lg font-semibold mb-3">Informações Básicas</h2>
        <div class="space-y-1 text-sm">
          <p><span class="font-medium">Nome:</span> {{ name }}</p>
          <p><span class="font-medium">Cargo/Título:</span> {{ role }}</p>
          <p><span class="font-medium">Departamento:</span> {{ department }}</p>
        </div>
      </div>

      <div>
        <h2 class="text-lg font-semibold mb-3">Contato</h2>
        <div class="space-y-1 text-sm">
          <p><span class="font-medium">E-mail:</span> {{ email }}</p>
          <p><span class="font-medium">Telefone/Ramal:</span> {{ phone }}</p>
          <p><span class="font-medium">Localização:</span> {{ location }}</p>
        </div>
      </div>
    </div>

    <hr class="border-slate-200" />

    <!-- Habilidades -->
    <div class="space-y-4">
      <div>
        <h2 class="text-lg font-semibold mb-3">Habilidades</h2>
        <div class="flex flex-wrap gap-2">
          <span
            v-for="skill in skills"
            :key="skill"
            class="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium"
          >
            {{ skill }}
          </span>
        </div>
      </div>
    </div>

    <hr class="border-slate-200" />

    <!-- Ações -->
    <div class="space-y-4">
      <h2 class="text-lg font-semibold">Configurações</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <button class="btn-setting" @click="editProfile">Editar Perfil</button>
        <button class="btn-setting" @click="changePassword">Alterar Senha</button>
        <button class="btn-setting" @click="manageNotifications">Notificações</button>
        <button class="btn-danger" @click="logout">Sair da Conta</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '../store/auth'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

const name = computed(() => auth.name || 'Usuário')
const email = computed(() => auth.email || 'email@empresa.com')
const role = 'Gestor de Manutenção'
const department = 'Engenharia Industrial'
const location = 'Unidade 03 - Bloco B'
const phone = 'Ramal 221 / (11) 99999-0000'

const bio =
  'Responsável pelo acompanhamento, análise e gestão de atividades de manutenção preventiva e corretiva no ambiente fabril.'

const skills = ['PCM', 'Planejamento', 'Relatórios', 'SAP', 'Excel']

const initials = computed(() => {
  const n = name.value || ''
  const parts = n.split(' ').filter(Boolean)
  if (!parts.length) return 'US'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
})

function editProfile () {
  alert('Função de edição de perfil será integrada futuramente.')
}

function changePassword () {
  alert('Função de alteração de senha será integrada futuramente.')
}

function manageNotifications () {
  alert('Painel de notificações será integrado futuramente.')
}

function logout () {
  auth.logout()
  router.push('/login')
}
</script>

<style scoped>
.btn-setting {
  @apply px-4 py-2 bg-slate-200 rounded-lg text-sm hover:bg-slate-300;
}

.btn-danger {
  @apply px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700;
}
</style>
