import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import VueMapbox from "vue-mapbox";
import Mapbox from "mapbox-gl";
import VTooltip from "v-tooltip";
window.Vue = Vue;
Vue.router = router;

Vue.use(VTooltip, VueMapbox, { mapboxgl: Mapbox });

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
