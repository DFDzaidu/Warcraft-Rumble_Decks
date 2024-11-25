import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './plugins/rem.css';
import axiosInstance from './plugins/axios';
// 将Axios实例挂载到Vue的原型上
Vue.prototype.$axios = axiosInstance;

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
