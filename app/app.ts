import Vue from 'vue'
import InputNumber from '../index.vue'
import App from './app.vue'

Vue.component('input-number', InputNumber)

// tslint:disable-next-line
new Vue({
  el: '#app',
  render: (h) => h(App)
})
