<template>
    <div style="width:100%; height:100%; overflow:auto; color:white">
      <div style="margin-bottom: 0.5rem; height:4rem; line-height:4rem; font-size: 2rem; font-weight: bold; box-shadow: 0px 0px 4px black; color:#f7f8f9; background-color:#292E34">
        Overview
      </div>

      <div v-for="(asset, key) in showData" :key="key">
        <div style="padding:0.5px;">
          <div  class="list-group-item">
            <div style="display:flex; flex-direction:row;color:BLACK; text-align: left; padding-left: 1rem;">
              <div style="width:55%;"><strong>{{key}}</strong></div>
              <div style="width:45%; text-align:left; padding-left:24px;">{{asset}}</div>
            </div>
          </div>
        </div>
      </div>

  </div>
</template>

<script>

export default {
  name: 'overview-card',
  data () {
    return {
      smallAssets: {},
      showSmall : false,
      interval : {},
      chartData: {},
      assetPercent: {},
      orderedAssets: {}
    }
  },
  computed:{
    totalProfit(){
      return this.$store.getters.getTotalProfit
    },
    totalProfitUsd(){
      return (this.totalProfit * this.$store.state.assets_prices['BTCUSDT']).toFixed(2)
    },
    totalPositions(){
      return this.$store.state.user.positions.filter(pos => (pos.status !== 'ACTIVE' && pos.status !== 'HOLD')  ).length
    },
    averagePercent(){
      let positions = this.$store.state.user.positions

      let percentTotal = 0

      positions.forEach(pos => {
        percentTotal = percentTotal + (pos.sell_price / pos.buy_price)
      })
      return (percentTotal / positions.length).toFixed(2)
    },
    showData(){
      return {
        'your profit in BTC' : this.totalProfit.toFixed(8),
        'your profit in USD' : this.totalProfitUsd,
        'Sold position' : this.totalPositions,
        'Average %' : this.averagePercent

      }
    }
  }
}
</script>
