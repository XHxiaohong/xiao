// @ts-nocheck

// 查找 views 目录下所有的 vue 文件
import Message from './views/message/index.js';
import MessageBox from './views/messageBox/index.js';

const requireComponent = require.context('./views', true, /\.vue$/);
const install = (Vue) => {
  if (install.installed) return;
  install.installed;

  requireComponent.keys().map(filePath => {
    let config = requireComponent(filePath);
    let componentName = config.name || config.default.name; // 获取组件名
    Vue.component(componentName, config.default || config); // 注册组件
  })

  // console.log(Message)
  Vue.prototype.$message = Message;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
}

export default {
  install
};
