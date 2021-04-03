import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import Vuex from 'vuex';
import store from "./store"
import Vuelidate from 'vuelidate'
import router from './router'

Vue.config.productionTip = false

Vue.use(Vuex).use(Vuelidate)

new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')
