import Vue from 'vue'
import ElementUI from 'element-ui'
import '../theme/red/index.min.css'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
