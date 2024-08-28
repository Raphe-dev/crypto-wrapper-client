export default {
  getUser: state => { return state.user },
  getCurrentAssets: state => { return state.current_assets },
  getAssetsPrices: state => { return state.assets_prices },
  getTotalProfit: state => {
    if(state.user){
      let total = 0
      state.user.positions.forEach(position => {
        total = total + position.result_btc
      })
      return total
    }
  }
}
