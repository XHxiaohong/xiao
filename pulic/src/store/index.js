import Vue from 'vue'
import Vuex from 'vuex'


import http from '@/utils/http';

import meun from './modules/meun'
import journalism from './modules/journalism'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: sessionStorage.getItem('userName') || '',
    userImg: sessionStorage.getItem('imgUrl') || ''
  },
  mutations: {
    setUserName (state, value) {
      state.userName = value ;
      sessionStorage.setItem('userName', value);
    },
    setUserImg (state, url) {
      state.userImg = window.baseURL;
      state.userImg += url;
      sessionStorage.setItem('imgUrl', state.userImg);
    }
  },
  actions: {
  },
  modules: {
    meun,
    journalism
  },
  getters: {}
})
