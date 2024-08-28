import './sass/app.scss'

import 'babel-polyfill'

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Axios from 'axios'
import socketIOClient from 'socket.io-client'
import sailsIOClient from 'sails.io.js'

import App from './App'
import router from './router'
import store from './store'
import VModal from 'vue-js-modal'
import Lodash from 'lodash'

Vue.use(VModal)

Vue.prototype.$api = Axios.create({
  baseURL: 'http://localhost:1337',
});

Vue.prototype.$axios = Axios.create({
})

Vue.prototype.$_ = Lodash

let io = sailsIOClient(socketIOClient);
io.sails.url = 'http://localhost:1337';

io.socket.on('binancePrices', response => {
  vue.$store.state.last_asset_prices = vue.$store.state.assets_prices
  vue.$store.state.assets_prices = response
})


let vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
