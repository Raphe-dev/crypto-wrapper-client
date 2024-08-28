<template>
    <div style="width:100%; height:100%;  overflow-y:auto;">
      <div style="margin-bottom: 0.5rem; height:4rem; line-height:4rem; font-size: 2rem; font-weight: bold; box-shadow: 0px 0px 4px black; color:#f7f8f9; background-color:#292E34">
        Market prices
      </div>
        <div class="list-item" :class="{ '-positive' : (last['BTCUSDT'] < pairs['BTCUSDT']),  '-negative' : (last['BTCUSDT'] > pairs['BTCUSDT'])}"  @click="$store.state.selected_pair = 'BTCUSDT'">
          <div class="list-item__title" :class="{'list-item__title-selected' : ($store.state.selected_pair == 'BTCUSDT')}">USDT</div>
          <div style="width:70%; flex-grow: 1">{{parseFloat(pairs['BTCUSDT']).toFixed(2)}} $</div>
          <div style="width:15%"></div>
        </div>
        FAVORITES
        <div v-for="value in user.favorites" >
          <div v-if="!(value === 'BTCUSDT')" style="padding:0.5px;">
            <div  class="list-item" :class="{ '-positive' : (last[value] < pairs[value]),  '-negative' : (last[value] > pairs[value])}" @click="$store.state.selected_pair = value">
              <div class="list-item__title"  :class="{'list-item__title-selected' : ($store.state.selected_pair == value)}"><strong>{{value.replace(/BTC/g,'')}}</strong></div>
              <div class="list-item__middle">{{pairs[value]}}</div>
              <small class="list-item__end">{{(pairs[value]*pairs['BTCUSDT']).toFixed(3)}}$</small>
            </div>
          </div>
        </div>
        ALL
        <br>
        FILTER (todo)
        <div v-for="(value,key) in pairs" >
          <div v-if="!(key === 'BTCUSDT') && !(user.favorites.includes(key))" style="padding:0.5px;">
            <div  class="list-item" :class="{ '-positive' : (last[key] < value),  'negative' : (last[key] > value)}"  @click="$store.state.selected_pair = key">
                <div class="list-item__title" :class="{'list-item__title-selected' : ($store.state.selected_pair == key)}"><strong>{{key.replace(/BTC/g,'')}}</strong></div>
                <div class="list-item__middle">{{value}}</div>
                <small class="list-item__end">{{(value*pairs['BTCUSDT']).toFixed(3)}}$</small>
            </div>
          </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
  name: 'market',
  data () {
    return {
      socket : {},
    }
  },
  computed: {
    pairs(){
      return this.$store.getters.getAssetsPrices;
    },
    last(){
      return this.$store.state.last_asset_prices;
    },
    user(){
      return this.$store.state.user
    }
  },
}
</script>
