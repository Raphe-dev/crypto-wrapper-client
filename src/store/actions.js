import Vue from 'vue'

export default {
  register(state, data){
    Vue.prototype.$api.post('/user', data)
  },
  login(state, data){
    Vue.prototype.$api.post('/login', data).then(response => {
      if(response.data.message == "Username not found"){
        throw "not found"
      } else {
        Vue.prototype.$api.defaults.headers.common['Authorization'] = response.data.token
        Vue.prototype.$api.defaults.headers.common['uuid'] = response.data.user.id
        Vue.prototype.$api.get('/me').then(response => {
          state.commit('setUser', response.data.user)
        })
      }
    })
  },

  userFavorites(state, data){
    Vue.prototype.$api.post('/users/favorites', data).then(response => {
      state.commit('setUser', response.data.user[0])
    })
  },
  userAssets(state, data){
    Vue.prototype.$api.get('/users/assets').then(response => {
      state.commit('setCurrentAssets', response.data)
    })
  },
  userOrders(state, data){
    Vue.prototype.$api.get('/users/orders').then(response => {
      state.commit('setOpenOrders', response.data)
    })
  },

  postOrder(state, data){
    Vue.prototype.$api.post('/binance/order', data).then(response => {
      console.log(response)
    })
  },
  cancelOrder(state, data){
    Vue.prototype.$api.post('/binance/cancelorder', data).then(response => {
      console.log(response)
    })
  },

  postPosition(state, data){
    Vue.prototype.$api.post('/positions', data).then(response => {
      state.commit('setUser', response.data)
    })
  }

}
