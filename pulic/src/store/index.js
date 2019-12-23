import Vue from 'vue'
import Vuex from 'vuex'


import http from '@/utils/http';

import meun from './modules/meun'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: localStorage.getItem('userName') || ''
  },
  mutations: {
    setUserName (state, value) {
      state.userName = value ;
      localStorage.setItem('userName', value);
    }
  },
  actions: {
  },
  modules: {
    meun
  },
  getters: {
    // getMeun: (state)=> {
    //   return new Promise((resolve, reject)=> {
    //     http.post('/meun/list', {page: 0, size: 25})
    //     .then(data=> { resolve(data) })
    //     .catch(err=> { reject(err) })
    //   })
    // }
  }
})
