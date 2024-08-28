<template>
  <div style="width:100%; height:100%; overflow:auto; overflow-y:hidden;">
      <div style="margin-bottom: 0.5rem; height:4rem; line-height:4rem; font-size: 2rem; font-weight: bold; box-shadow: 0px 0px 4px black; color:#f7f8f9; background-color:#292E34">
        Current positions
      </div>

      <table class="table">
        <thead class="thead-dark">
          <tr style="line-height:2rem;">
            <th scope="col">Symbol</th>
            <th scope="col">Amount</th>
            <th scope="col">Buy price</th>
            <th scope="col">Value</th>
            <th scope="col">Profits</th>
            <th scope="col">Result</th>
            <th scope="col">
            </th>

          </tr>
        </thead>
        <tbody>
          <tr v-if="showForm">
            <th scope="row">
              <select class="form-control" v-model="fields.pair">
                <option v-for="key in binanceBtc" :value="key">{{key}}</option>
              </select>
              </th>
            <td><input class="form-control"  type="number" v-model="fields.amount"/></td>
            <td><input class="form-control" type="number" v-model="fields.buy_price"/></td>
            <td></td>
            <td></td>
            <td></td>
            <td><button class="btn btn-sm btn-primary" @click="postPosition(fields)">Save</button></td>

          </tr>
          <tr v-for="i in this.positions">
            <th scope="row">{{i.pair}}</th>
            <td>{{i.amount}}</td>
            <td>{{i.buy_price}}</td>
            <td>{{(i.amount * i.buy_price).toFixed(8)}}</td>
            <td :class="{
              'p-positive' : ((i.amount * currentPrices[i.pair]) - (i.amount * i.buy_price)).toFixed(8) > 0,
              'p-negative' : ((i.amount * currentPrices[i.pair]) - (i.amount * i.buy_price)).toFixed(8) < 0
            }">
              {{((i.amount * currentPrices[i.pair]) - (i.amount * i.buy_price)).toFixed(8)}}<br>
            </td>
            <td :class="{
              'p-positive' : ((i.amount * currentPrices[i.pair]) - (i.amount * i.buy_price)).toFixed(8) > 0,
              'p-negative' : ((i.amount * currentPrices[i.pair]) - (i.amount * i.buy_price)).toFixed(8) < 0
            }">
              {{(((currentPrices[i.pair] / i.buy_price)*100)-100).toFixed(2)}}%
            </td>
            <td>
              <div>
                <button class="btn" @click="toggleSettings(i)">
                   <i class="material-icons">settings</i>
                </button>
                <button class="btn" @click="sellPosition(i.id)">sell</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import Vue from 'vue'
export default {
  name: 'position-card',
  data () {
    return {
      showForm: false,
      showSettings: false,
      response: {},
      fields: {
        pair : '',
        buy_amount: '',
        buy_price: '',
      },
    }
  },

  computed: {
    positions(){
      return this.$store.state.user.positions.filter(pos => pos.status === 'ACTIVE')
    },
    currentPrices(){
      return this.$store.getters.getAssetsPrices
    },

    binanceBtc(){
      return this.$store.state.binance_assets
    }
  },
  mounted(){
    this.userOrders()
  },
  methods: {
    ...mapActions({
      postPosition : 'postPosition',
      userOrders : 'userOrders',
    }),

    sellPosition(id){
      Vue.prototype.$api.post('/positions/sell', {id:id}).then(response => {
        console.log(response)
      })
    },
    toggleSettings(i){
      this.$modal.show('position-settings', { position: i });
    }
  }
}
</script>

<style scoped>

.p-positive {
  color: rgba(0,200,0,0.5);
}

.p-negative {
  color: rgba(255,0,0,0.7);
}

.p-trans{
   transition: color 0.2s ease-in;
}
</style>
