import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Vuex from 'vuex'
import store from './state/state'

Vue.use(Vuex)

Vue.config.productionTip = false;

new Vue({
  vuetify,store,
  render: h => h(App)
}).$mount("#app");
