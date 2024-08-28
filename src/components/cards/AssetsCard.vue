<template>
    <div style="width:100%; height:100%; overflow:auto; color:white">
      <div style="margin-bottom: 0.5rem; height:4rem; line-height:4rem; font-size: 2rem; font-weight: bold; box-shadow: 0px 0px 4px black; color:#f7f8f9; background-color:#292E34">
        Assets
      </div>

      <div>
        <div class="list-group-item" style="max-width:100%; max-height:250px; padding-bottom:1rem;">
          <doughnut :chartData="chartData" :options="{responsive: true, maintainAspectRatio: false, legend: {display:false}}"/>
        </div>
        <div style="display:flex; flex-direction:column;; color:black; text-align:left;">
          <div class="list-group-item" style="display:flex; flex-direction:row;  line-height:8px; height:1.2rem; padding-left:0.5rem;">
            <div style="width:20%;"><strong>BTC</strong></div>
            <div style="width:80%;">{{totalBtc}}</div>
          </div>
          <div class="list-group-item" style="display:flex; flex-direction:row; line-height:8px; height:1.2rem;padding-left:0.5rem;">
            <div style="width:20%;"><strong>USDT</strong></div>
            <div style="width:80%;">{{totalUsdt}}</div>
          </div>
        </div>
      </div>
      <br>
      <div v-for="(asset, key) in orderedAssets" :key="key">
        <div style="padding:0.5px;">
          <div  class="list-group-item">
            <div style="display:flex; flex-direction:row;color:BLACK">
              <div style="width:15%;"><strong>{{asset.asset}}</strong></div>
              <div style="width:70%; text-align:left; padding-left:24px;">{{asset.amount}}</div>
              <small style="width: 15%; align-self:center;">{{asset.percent}}%</small>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-dark" :class="{'btn-primary' :showSmall }" style="width:100%" @click="toggleSmall()">See small assets</button>
      <div v-if="showSmall">
        <div v-for="(asset, key) in smallAssets">
          <div  class="list-group-item">
            <div style="display:flex; flex-direction:row;color:BLACK">
              <div style="width:15%;"><strong>{{key}}</strong></div>
              <div style="width:70%;">{{asset}}</div>
              <small style="width: 15%; align-self:center;">foo</small>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Doughnut from '../charts/Doughnut'
import { mapActions } from 'vuex'
import Vue from 'vue'

export default {
  name: 'assets-card',
  components:{Doughnut},
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
  beforeDestroy(){
    clearInterval()
  },
  mounted() {
    this.userAssets()
    this.getChartData()
    this.interval = setInterval(foo => {
      this.getChartData()
    }, 15000);
  },
  computed:{
    currentAssets(){
      return this.$store.getters.getCurrentAssets
    },
    AssetsPrices(){
      return this.$store.getters.getAssetsPrices
    },
    totalBtc(){
      let btc = 0.0
      for(let i in this.currentAssets){
        let asset = this.currentAssets[i]
        let amount = parseFloat(asset.free) + parseFloat(asset.locked)
        let pair = ''
        if(i === 'BTC'){
          pair = 'BTCUSDT'
        } else {
          pair = i + 'BTC'
        }
        let total = parseFloat(amount) *  parseFloat(this.AssetsPrices[pair])
        total = total.toFixed(8);
        if(pair === 'BTCUSDT'){
          btc = btc + parseFloat(amount)
        } else {
          if(total != NaN){
            btc = btc + parseFloat(total)
          }
        }
      }
      return btc.toFixed(8)
    },
    totalUsdt(){
      return (this.totalBtc * this.AssetsPrices['BTCUSDT']).toFixed(2)
    },
    valuableAssets(){
      let valuables = {}
      for(let i in this.currentAssets){
        let asset = this.currentAssets[i]
        let amount = parseFloat(asset.free) + parseFloat(asset.locked)
        let pair = ''
        if(i === 'BTC'){
          pair = i + 'USDT'
        } else {
          pair = i + 'BTC'
        }
        if((parseFloat(amount) * parseFloat(this.AssetsPrices[pair])) > 0.0015){
          Vue.set(valuables, i, {amount: parseFloat(amount), asset: i })
          let percent = 0.0
          if(i === 'BTC'){
            valuables[i].percent = ((valuables[i].amount * this.AssetsPrices['BTCUSDT']) * 100 ) / this.totalUsdt
          } else {
            valuables[i].percent = (((valuables[i].amount * this.AssetsPrices[(i + 'BTC')]) * this.AssetsPrices['BTCUSDT']) * 100 ) / this.totalUsdt
          }
        }else {
          this.smallAssets[i] = parseFloat(amount)
        }
      }
      this.orderedAssets = _.orderBy(valuables, 'percent', 'desc')
      return valuables
    },
  },

  methods: {
    ...mapActions({
      userAssets : 'userAssets',
    }),
    getChartData() {
      let labels = []
      let data = []
      for(let val in this.valuableAssets){
        let percent = 0.0
        if(val === 'BTC'){
          percent = (val, ((this.valuableAssets[val].amount * this.AssetsPrices['BTCUSDT']) * 100 ) / this.totalUsdt )
        } else {
          percent = (val, (((this.valuableAssets[val].amount * this.AssetsPrices[(val + 'BTC')]) * this.AssetsPrices['BTCUSDT']) * 100 ) / this.totalUsdt )
        }
        let parsePercent = percent.toFixed(2)
        labels.push(val )
        data.push(parsePercent)
        this.valuableAssets[val].percent = parsePercent
        this.assetPercent[val] = parsePercent
      }
      let smallData = 0.0
      for(let val in this.smallAssets){
        let percent = 0.0
        if(val === 'BTC'){
          percent = (val, ((this.smallAssets[val] * this.AssetsPrices['BTCUSDT']) * 100 ) / this.totalUsdt )
        } else {
          percent = (val, (((this.smallAssets[val] * this.AssetsPrices[(val + 'BTC')]) * this.AssetsPrices['BTCUSDT']) * 100 ) / this.totalUsdt )
        }
        let parsePercent = percent.toFixed(2)
        smallData = parseFloat(smallData) + parseFloat(parsePercent)
      }
      labels.push('others ')
      data.push(smallData.toFixed(2))

      let obj = {
        labels: labels,
        datasets: [
          {
            backgroundColor: [
              '#0d4563',
              '#3c153b',
              '#89bd9e',
              '#f0c987',
              '#db4c40',
              '#8b1e3f',
              '#0a4032',
              '#102530',
              '#0a4687',
              '#cdcdcd'
            ],
            data : data
          }
        ],
        options : { legend : { display : false }}
      }
      this.chartData = obj
    },
    toggleSmall(){
      this.showSmall = !this.showSmall
    }
  }
}
</script>
