<template>
  <div style="width:100%; height:100%; overflow:auto; overflow-y:hidden;">
    <div style="margin-bottom: 0.5rem; height:4rem; line-height:4rem; font-size: 2rem; font-weight: bold; box-shadow: 0px 0px 4px black; color:#f7f8f9; background-color:#292E34">
      Open orders
    </div>

    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Symbol</th>
          <th scope="col">Side</th>
          <th scope="col">Quantity</th>
          <th scope="col">Price</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in this.openOrders">
          <th scope="row">{{order.symbol}}</th>
          <td>{{order.side}}</td>
          <td>{{order.origQty}}</td>
          <td>{{order.price}}</td>
          <td><button class="btn btn-sm btn-secondary" @click="cancelOrder(order)">cancel</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      response: {}
    }
  },
  computed: {
    openOrders(){
      return this.$store.state.open_orders
    },
  },
  methods: {
    ...mapActions({
      cancelOrder : 'cancelOrder',
    }),

  }
}
</script>
