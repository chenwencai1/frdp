import Vue from 'vue'
import VueRouter from 'vue-router'
import Ysxq from '../views/ysxq'
import Main from '../views/main1'
Vue.use(VueRouter)

  const routes = [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/ysxq',
      name: 'Ysxq',
      component: Ysxq
    }
 
]

const router = new VueRouter({
  routes
})

export default router
