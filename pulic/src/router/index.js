// @ts-nocheck
import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)
const components = [];
const requireComponent = require.context('../views/', true, /\.vue$/);
requireComponent.keys().map(filePath => {
  let file = requireComponent(filePath);
  let fileName = file.default.name || file;

  components.push({
    path: '/' + fileName,
    name: fileName,
    component: file.default || file
  })
})

const routes = [
  {
    name: '',
    path: '/',
    redirect: '/home'
  },
  // {
  //   path: '/about',
  //   name: 'about',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  ...components
]

// console.log(components, 'components')
// console.log(routes, 'routes')

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
