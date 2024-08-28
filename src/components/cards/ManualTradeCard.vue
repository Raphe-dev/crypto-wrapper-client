<template>
  <div style="width:100%; height:100%; overflow:auto; overflow-y:hidden;">
      <div style="margin-bottom: 0.5em; height:4rem; line-height:4rem; font-size: 2rem; font-weight: bold; box-shadow: 0px 0px 4px black; color:#f7f8f9; background-color:#292E34">
        Manual trade
      </div>
      <div style="display:flex; flex-direction:row; flex-wrap: wrap; justify-content:space-between;  ">
      <div>
        <div class="tradingview-widget-container">
          <div id="tradingview_ebb36"></div>
        </div>
      </div>
      <div style="height:100%; flex-grow:1; display:flex; flex-direction:column; justify-content:space-between; padding-left:24px; padding-right:24px;" >
        <div style="display:flex;  padding-top: 10px;">
          <button class="btn" :class="{ 'btn-primary' : (data.side === 'SELL')}" @click="data.side = 'SELL'" style="flex-grow: 1; margin-right:0.5rem;">SELL</button>
          <button class="btn" :class="{ 'btn-primary' : (data.side === 'BUY')}" @click="data.side = 'BUY'" style="flex-grow: 1;margin-left:0.5rem;">BUY</button>
        </div>
        <div style="padding-top: 10px; display:flex; align-items: flex-start;" class="form-inline">
            <label for="price" style="padding-right: 24px;  align-self:center"> Price </label>
            <input type="text" id="price" class="form-control" style="flex-grow:1;" v-model="data.price" :placeholder="assetsPrice[data.pair]">
        </div>

        <div style="padding-top: 10px; display:flex; align-items: flex-start;" class="form-inline">
            <label for="amount" style="padding-right: 7px; align-self:center"> Amount </label>
            <input type="text" id="amount" class="form-control" style="flex-grow:1;" v-model="data.qty" placeholder="0">
        </div>
        <small class="form-text text-muted" v-if="data.amount">total : {{currentTotal}} BTC</small>
        <div style="padding-top: 10px; display:flex; justify-content:center;">
          <button class="btn btn-block btn-primary" style="width:240px" @click="postOrder(data)">Trade !</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'manual-trade-card',
  data () {
    return {
      data: {
        pair : 'LTCBTC',
        side: '',
        price : null,
        qty : null,
      },
      graphjs: {}
    }
  },
  mounted() {
    this.graphjs = this.graph();
    this.side = 'BUY'
  },
  watch: {
     pair() {
       this.graphjs = this.graph();
     },
   },
  computed:{
    pair(){
      this.data.pair = this.$store.state.selected_pair
      return this.$store.state.selected_pair
    },
    settings() {
      return {
        "width": 600,
        "height": 350,
        "symbol": this.symbol,
        "interval": "240",
        "timezone": "Etc/UTC",
        "theme": "Light",
        "style": "1",
        "locale": "en",
        "toolbar_bg": "#f1f3f6",
        "enable_publishing": false,
        "allow_symbol_change": false,
        "save_image": false,
        "no_referral_id": true,
        "container_id": "tradingview_ebb36"
      }
    },
    symbol(){
      return "BINANCE:" + this.pair
    },
    assetsPrice(){
      return this.$store.getters.getAssetsPrices
    },
    currentAssetPrice() {
      return this.assetsPrice[this.data.pair]
    },
    currentTotal() {
      if(this.amount > 0 && this.price > 0){
        return (this.price * this.amount).toFixed(8);
      }
    }
  },

  methods: {
    ...mapActions({
      postOrder : 'postOrder',
    }),
    graph(){
      return new TradingView.widget(
        this.settings
      )
    },
  }
}
</script>
