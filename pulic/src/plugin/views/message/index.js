// @ts-nocheck
import Vue from 'vue';
import MessageVue from './index.vue';
let MessageConstructor = Vue.extend(MessageVue);

let seed = 0;
let instance;
let instances = [];
const Message = (options) => {
  options = options || {};

  if (typeof options === 'string') {
    options = { message: options };
  }
  let id = 'message_' + seed++;

  instance = new MessageConstructor({
    data: options,
  });
  instance.id = id;

  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
}
['info', 'success', 'warning', 'error'].forEach(type=> {
  Message[type] = options => {
    if (typeof options === 'string') {
      options = {
        type: type,
        message: options,
      }
    }
    return Message(options);
  }
})

export default Message;