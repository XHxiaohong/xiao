// @ts-nocheck

import http from '@/utils/http';

// 配置菜单数据
const meun = [{
	name: '首页',
	path: '/home'
}, {
	name: '菜单管理',
	path: '/meun'
}]

const state = {
	meun: meun
}

const getters = {
	getMeun: (state)=> {
		return new Promise((resolve, reject)=> {
			http.post('/meun/list', {page: 1, size: 25})
			.then(data=> { resolve(data) })
			.catch(err=> { reject(err) })
		})
	},
	addMeun: ()=> {
		let meunName = '首页', meunPath = '/home', meunIcon = ''

		return new Promise((resolve, reject)=> {
			http.post('/meun/add', {meunName, meunPath, meunIcon})
			.then(data=> { resolve(data) })
			.catch(err=> { reject(err) })
		})
	},
	removeMeun: ()=> {

	}
}

export default {
	state,
	getters
}