
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth'

const Login = () => import('../views/Login.vue')
const Dashboard = () => import('../views/Dashboard.vue')
const Calendar = () => import('../views/Calendar.vue')
const MaintenanceList = () => import('../views/MaintenanceTable.vue')
const MaintenanceDetails = () => import('../views/MaintenanceDetails.vue')
const Profile = () => import('../views/Profile.vue')

const routes = [
  { path: '/login', name: 'login', component: Login, meta: { public: true } },
  { path: '/', redirect: '/dashboard' },
  { path: '/dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/calendar', component: Calendar, meta: { requiresAuth: true } },
  { path: '/list', component: MaintenanceList, meta: { requiresAuth: true } },
  { path: '/details/:id', component: MaintenanceDetails, props: true, meta: { requiresAuth: true } },
  { path: '/profile', component: Profile, meta: { requiresAuth: true } },
]

const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from, next) => {
  const auth = useAuthStore()
  if(!auth.user) auth.hydrateFromToken()
  if(to.meta.public) return next()
  if(to.meta.requiresAuth && !auth.isAuthenticated){
    return next({ name: 'login', query: { redirect: to.fullPath } })
  }
  next()
})

export default router
