import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '@/components/Dashboard.vue'
import Login from '@/components/Login.vue'
import ResetPassword from '@/components/ResetPassword.vue'
import Register from '@/components/Register.vue'
import store from '../store'
import auth from '../auth'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: __dirname,
  routes: [
    { path: '/dashboard', component: Dashboard, beforeEnter: requireAuth },
    { path: '/login', component: Login, beforeEnter: authRedirect },
    { path: '/reset', component: ResetPassword },
    { path: '/register', component: Register, beforeEnter: authRedirect },
    { path: '/logout',
      beforeEnter (to, from, next) {
        store.dispatch("logout").then(
          location.reload()
        )
        
      }
    }
  ]
})

// If a user attempts to access login or register let's check if they are
// already authenticated and properly route them back to the dashboard

async function authRedirect (to, from, next) {
  if(!store.state.toznyClient && localStorage.getItem('toznyClient')){
    await store.dispatch('rehydrateTozny')
  }
 
  if (!store.state.toznyClient) {
    next()
  } else {
    next({
      path: '/dashboard'
    })
  }
}

// Before we allow access to protected routes the application should
// validate that the user is properly authenticated use our vuex 
// getter that is defined in the store

async function requireAuth (to, from, next) {
  if(!store.state.toznyClient && localStorage.getItem('toznyClient')){
    await store.dispatch('rehydrateTozny')
  }
 
  if (!store.state.toznyClient) {
    next({
      path: '/login',
      query: { redirect: to.fullPath }
    })
  } else {
    next()
  }
}
