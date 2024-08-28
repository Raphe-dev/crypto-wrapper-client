<template>
  <div name="position-settings">
    <header>
      Position settings
    </header>
    <template>
      <span class="input-field">
        <input id="buy_time" type="text" class="validate" disabled v-model="position.buy_time">
        <label for="buy_time" class="active">Buy time</label>
      </span>
      <span class="input-field">
        <input id="pair" type="text" class="validate" disabled v-model="position.pair">
        <label for="pair" class="active">Pair</label>
      </span>
      <span class="input-field">
        <input id="amount" type="text" class="validate" disabled v-model="position.amount">
        <label for="amount" class="active">Amount</label>
      </span>
      <span class="input-field">
        <input id="buy_price" type="text" class="validate" disabled v-model="position.buy_price">
        <label for="buy_price" class="active">Buy price</label>
      </span>
      <span class="input-field">
        <input id="goal_percent" type="number" class="validate" v-model="position.goal_percent">
        <label for="goal_percent">Goal %</label>
      </span>
      <span class="input-field">
        <input id="amount" type="text" class="validate" disabled :value="(position.buy_price * (1+parsePercent)).toFixed(8)">
        <label for="amount" class="active">Goal price</label>
      </span>
    </template>

    <footer class="flex">
      <button class="btn" style="flex-grow:1;" @click="$modal.hide('position-settings')">Cancel</button>
      <button class="btn" style="flex-grow:1;">Save</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'position-settings',
  props: ['data'],
  data () {
    return {
      position: {}
    }
  },
  computed: {
    currentPrices() {
      return this.$store.getters.getAssetsPrices
    },
    parsePercent(){
      if(this.position.goal_percent){
        return this.position.goal_percent / 100
      }
    }
  },

  beforeMount(){
    Object.assign(this.position, this.data.position)
  },
}
</script>
