import Vue from 'vue';
import MessageBoxVue from './index.vue';
const MessageBoxConstructor = Vue.extend(MessageBoxVue);

let seed = 0;
let instance;

let MessageBox = (options) => {
  options = options || {};

  let id = 'MessageBox_' + seed++
  instance = new MessageBoxConstructor({
    data: options
  });
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;

  // console.log(instance)
  return new Promise ((resolve, reject) => {
    options.onClose = function(value = false) {
      console.log(value, 'value')
      value === false ? reject(value) : resolve(value);
    }
  })
}

MessageBox.alert = (message, title, options) => {
  if (typeof title  === 'object' ) {
    options = title;
    title = ''
  } else if (title  === undefined) {
    title = ''
  }
  return MessageBox({
    ...options,
    type: 'alert',
    title,
    message,
    closeOnClickModal: false
  });
}

MessageBox.confirm = (message, title, options) => {
  if (typeof title  === 'object' ) {
    options = title;
    title = ''
  } else if (title  === undefined) {
    title = ''
  }
  return MessageBox({
    ...options,
    type: 'confirm',
    title,
    message
  });
}

MessageBox.prompt = (message, title, options) => {
  if (typeof title  === 'object' ) {
    options = title;
    title = ''
  } else if (title  === undefined) {
    title = ''
  }
  return MessageBox({
    ...options,
    type: 'prompt',
    title,
    message,
    showInput: true
  });
}

export default MessageBox;