// @ts-nocheck

// 查找 views 目录下所有的 vue 文件
const requireComponent = require.context('./views', true, /\.vue$/);
const componen = {};
requireComponent.keys().map(filePath => {
  let config = requireComponent(filePath);
  let componentName = config.name || config.default.name; // 获取组件名
  componen.install = function (Vue) {
    // 注册组件
    Vue.component(componentName, config.default || config);
  }
})

export default componen;
