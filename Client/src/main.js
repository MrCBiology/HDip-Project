import Vue from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap'
import './assets/app.scss'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { faPenSquare } from '@fortawesome/free-solid-svg-icons'
import { faMinusSquare } from '@fortawesome/free-solid-svg-icons'
import { faSortUp } from '@fortawesome/free-solid-svg-icons'
import { faSortDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faMinusCircle, faPlusSquare, faPenSquare, faMinusSquare, faSortUp, faSortDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.config.debug = true // turn on debugging mode

new Vue({
  components: {
  },
  router,
  render: h => h(App)
}).$mount('#app') //call #App
