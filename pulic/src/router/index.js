// @ts-nocheck

import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const components = [];

const requireComponent = require.context('../views/', true, /\.vue$/);
requireComponent.keys().map(filePath => {
  let file = requireComponent(filePath);
  let fileName = file.default.name || file;

  if (fileName == 'container') return;

  components.push({
    path: '/' + fileName,
    name: fileName,
    component: file.default || file
  })
})

console.log(components)

const routes = [
  {
    name: 'login',
    path: '/',
    component: () => import('@/components/login.vue')
  }, {
    nmae: 'container',
    path: '/container',
    redirect: '/home',
    component: () => import('@/views/home/index.vue'),
    children: [...components]
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router;
