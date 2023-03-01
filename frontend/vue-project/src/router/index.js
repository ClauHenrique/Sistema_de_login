import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Login.vue'
import { checkToken, validateToken } from '../authentication'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/paginainicial',
      name: 'PaginaInicial',
      component: () => import('../views/PaginaInicial.vue'),
      meta: {
        auth: true
      }
    },
    {
      path: '/CriarConta',
      name: 'CriarConta',
      component: () =>  import('../views/CriarConta.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.meta.auth) {
    // se existe um token
    if (checkToken()) {
      const isAuthenticatede = await validateToken(checkToken())
      if (isAuthenticatede) {
        console.log(to.name)
        next()
      }
      else {
        next({name: "login"})
      }
    }
    else {
      next({name: "login"})
    }
  }
  else {
    next()
  }
})

export default router
