import Vue from 'vue'
import App from './App.vue'
import router from './router.js'
import store from './store'
import VueMapbox from "v-mapbox";
import Mapbox from "mapbox-gl";

window.Vue = Vue;
Vue.router = router;

Vue.use(VueMapbox, { mapboxgl: Mapbox });

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
