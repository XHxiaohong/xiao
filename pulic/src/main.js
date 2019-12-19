// @ts-nocheck
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';

import http from '.utils/http';
import xhUi from './plugin';

// import axios from 'axios';
Vue.prototype.$http = http;


Vue.use(xhUi);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
