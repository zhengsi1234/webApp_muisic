import Vue from 'vue'
import App from './App'
import VueResouse from 'vue-resource'
import 'lib-flexible'
import '../static/css/Reset.css'
import VueLazyload from 'vue-lazyload'
import router from './router'
import store from './components/store/store'
import animate from 'animate.css'

import {Dialog,LoadMore,Slider} from 'muse-ui'
import 'muse-ui/lib/styles/base.less'
import 'muse-ui/lib/styles/theme.less'
Vue.use(Dialog)
Vue.use(LoadMore)
Vue.use(Slider)
Vue.use(animate)
Vue.use(VueResouse)
Vue.use(VueLazyload,{
  loading:'../../../static/img/loading_img.gif'
})
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})
