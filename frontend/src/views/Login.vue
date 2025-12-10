<template>
  <div class="min-h-screen bg-slate-950 flex items-center justify-center px-4">
    <div class="relative w-full max-w-5xl bg-slate-900 text-slate-100 rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row border border-slate-800">
      <!-- Lado informativo -->
      <div class="hidden md:flex md:flex-col md:w-1/2 bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-400 p-8 text-white">
        <div class="flex items-center gap-3 mb-8">
          <div class="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-sm font-bold">
            SMPM
          </div>
          <div>
            <div class="text-sm font-semibold">Sistema de Manutenção</div>
            <div class="text-xs text-white/80">Ambiente corporativo industrial</div>
          </div>
        </div>

        <div class="flex-1 flex flex-col justify-center gap-4">
          <h1 class="text-2xl font-semibold leading-snug">
            Controle profissional de manutenções preventivas e corretivas.
          </h1>
          <p class="text-sm text-white/90">
            Acesse o painel para acompanhar indicadores, calendário de manutenções e o histórico completo de intervenções em máquinas.
          </p>
          <ul class="mt-2 text-xs space-y-1 text-white/90">
            <li>• Dashboard com KPIs em tempo real</li>
            <li>• Calendário de manutenções programadas</li>
            <li>• Registro e rastreabilidade das intervenções</li>
          </ul>
        </div>

        <div class="mt-6 text-[11px] text-white/80">
          Desenvolvido para cenários reais de chão de fábrica e gestão de ativos industriais.
        </div>
      </div>

      <!-- Lado do formulário -->
      <div class="w-full md:w-1/2 bg-slate-900 px-6 py-8 md:px-8 md:py-10">
        <div class="mb-6 md:hidden flex items-center gap-2">
          <div class="w-9 h-9 rounded-lg bg-blue-600/20 flex items-center justify-center text-sm font-bold text-blue-400">
            SMPM
          </div>
          <div>
            <div class="text-sm font-semibold">Sistema de Manutenção</div>
            <div class="text-xs text-slate-400">Ambiente corporativo</div>
          </div>
        </div>

        <h2 class="text-xl font-semibold mb-1">Acessar painel</h2>
        <p class="text-xs text-slate-400 mb-6">
          Use seu usuário corporativo ou autentique com sua conta Google.
        </p>

        <form class="space-y-4" @submit.prevent="handleLogin">
          <div class="space-y-1">
            <label class="text-xs text-slate-300">E-mail</label>
            <input
              v-model="email"
              type="email"
              class="input"
              placeholder="seu.email@empresa.com"
              required
            />
          </div>

          <div class="space-y-1">
            <label class="text-xs text-slate-300 flex items-center justify-between">
              <span>Senha</span>
            </label>
            <input
              v-model="password"
              type="password"
              class="input"
              placeholder="••••••••"
              required
            />
          </div>

          <p v-if="error" class="text-xs text-red-400">
            {{ error }}
          </p>

          <button
            type="submit"
            class="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium transition"
          >
            Entrar
          </button>
        </form>

        <div class="mt-4 flex items-center gap-3">
          <div class="h-px flex-1 bg-slate-700" />
          <span class="text-[11px] text-slate-400">ou</span>
          <div class="h-px flex-1 bg-slate-700" />
        </div>

        <button
          class="mt-4 w-full py-2.5 rounded-lg bg-white text-slate-900 text-sm font-medium flex items-center justify-center gap-2 hover:bg-slate-100 transition"
          type="button"
          @click="loginWithGoogle"
        >
          <span class="w-4 h-4 rounded bg-gradient-to-br from-yellow-400 via-red-400 to-blue-500"></span>
          Entrar com Google
        </button>

        <p class="text-center text-xs mt-4 text-slate-300">
          Ainda não tem conta?
          <button
            class="text-blue-400 hover:underline"
            type="button"
            @click="openRegister = true"
          >
            Criar conta
          </button>
        </p>
      </div>
    </div>

    <!-- Modal de Registro -->
    <div
      v-if="openRegister"
      class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4"
    >
      <div class="w-full max-w-md bg-slate-900 text-slate-100 rounded-2xl shadow-xl border border-slate-700 p-6 space-y-4">
        <div class="flex items-center justify-between">
          <h2 class="text-lg font-semibold">Criar nova conta</h2>
          <button
            class="text-slate-400 hover:text-white text-sm"
            type="button"
            @click="openRegister = false"
          >
            Fechar
          </button>
        </div>

        <form class="space-y-3" @submit.prevent="handleRegister">
          <div>
            <label class="text-xs text-slate-300">Nome completo</label>
            <input v-model="reg.name" type="text" class="input" required />
          </div>

          <div>
            <label class="text-xs text-slate-300">E-mail</label>
            <input v-model="reg.email" type="email" class="input" required />
          </div>

          <div>
            <label class="text-xs text-slate-300">Senha</label>
            <input v-model="reg.password" type="password" class="input" required />
          </div>

          <p v-if="regError" class="text-xs text-red-400">
            {{ regError }}
          </p>

          <button
            class="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-sm font-medium transition"
            type="submit"
          >
            Registrar e acessar
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../store/auth'
import { registerUser } from '../services/register'

const email = ref('')
const password = ref('')
const error = ref('')

const openRegister = ref(false)
const regError = ref('')
const reg = reactive({
  name: '',
  email: '',
  password: ''
})

const auth = useAuthStore()
const router = useRouter()
const route = useRoute()

async function handleLogin () {
  error.value = ''
  try {
    await auth.login(email.value, password.value)
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
  } catch (e) {
    error.value = e?.response?.data?.error || 'Erro ao autenticar'
  }
}

async function handleRegister () {
  regError.value = ''
  try {
    const resp = await registerUser({
      name: reg.name,
      email: reg.email,
      password: reg.password
    })

    auth.loginWithToken(resp.token, resp.user)
    const redirect = route.query.redirect || '/dashboard'
    router.push(redirect)
    openRegister.value = false
  } catch (e) {
    regError.value = e?.response?.data?.error || 'Erro ao registrar'
  }
}

function loginWithGoogle () {
  const redirect = route.query.redirect || '/dashboard'
  window.location.href = `http://localhost:3000/auth/google?redirect=${encodeURIComponent(
    redirect
  )}`
}

onMounted(() => {
  const token = route.query.token
  const name = route.query.name
  const emailQ = route.query.email
  const redirect = route.query.redirect || '/dashboard'
  if (token) {
    auth.loginWithToken(token, { name: name || 'Usuário', email: emailQ || '' })
    router.replace(redirect)
  }
})
</script>

<style scoped>
.input {
  @apply w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500;
}
</style>
