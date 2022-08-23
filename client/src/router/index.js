import { createRouter, createWebHistory } from 'vue-router'
import { getAuth } from '../helpers/auth'

const routes = [
	{
		path: '/',
		name: 'home',
		component: () => import('@/views/HomeView.vue'),
		beforeEnter: async (to, from, next) => {
			const authed = await getAuth()
			if (authed !== true) next({ name: 'login' })
			else next()
		}
	},
	{
		path: '/login',
		name: 'login',
		component: () => import('@/views/LoginView.vue'),
		beforeEnter: async (to, from, next) => {
			const authed = await getAuth()
			if (authed === true) next({ name: 'home' })
			else next()
		}
	},
	{
		path: '/register',
		name: 'register',
		component: () => import('@/views/RegisterView.vue'),
		beforeEnter: async (to, from, next) => {
			const authed = await getAuth()
			if (authed === true) next({ name: 'home' })
			else next()
		}
	}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
