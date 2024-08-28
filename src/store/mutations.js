import Vue from 'vue'

export default {
  setUser (state, user){
    if(state.user === false){
      state.user = user
    } else {
      Object.assign(state.user, user)
    }
  },
  setCurrentAssets (state, assets){
    for(let asset of assets){
      Vue.set(state.current_assets, asset.asset, {
        free :  parseFloat(asset.free),
        locked :  parseFloat(asset.locked)
      })
    }
  },
  setOpenOrders(state,orders){
    state.open_orders = orders
  },
  setAssetPrice (state, tick){
    Vue.set(state.last_asset_prices, tick.symbol, state.assets_prices[tick.symbol])
    if(tick.symbol == 'BTCUSDT'){
      Vue.set(state.assets_prices, tick.symbol, parseFloat(tick.price).toFixed(2))
    } else {
      Vue.set(state.assets_prices, tick.symbol, parseFloat(tick.price).toFixed(8))
    }
  }
}
