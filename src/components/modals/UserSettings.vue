<template>
  <div name="user-settings">
    <header>
      User settings
    </header>
    <template>
      <span class="row">
        <span class="input-field col s6">
          <input id="email" type="text" v-model="user.email" disabled>
          <label for="email" class="active">Email</label>
        </span>
        <span class="input-field col s6">
          <input id="username" type="text" v-model="user.username">
          <label for="username" class="active">Username</label>
        </span>
      </span>
      <span class="row">
        <span class="input-field col s6">
          <input id="buy_total_amount" type="text" v-model="settings.buy_total_amount">
          <label for="buy_total_amount">Max amount in BTC</label>
        </span>
        <span class="input-field col s6">
          <input id="amount" type="text" v-model="settings.buy_amount">
          <label for="amount" >Signal buy amount</label>
        </span>
      </span>
      <span class="row">
        <span class="input-field col s6">
          <input id="amount" type="number" v-model="settings.sell_at">
          <label for="amount">sell goal %</label>
        </span>
        <span class="input-field col s6">
          <input id="amount" type="number" v-model="settings.stop_loss_at">
          <label for="amount">stop loss %</label>
        </span>
      </span>

      <div class="row">
        <span class="switch col s6">
          Buy signals
          <label>
            Off
            <input type="checkbox" v-model="settings.buy_signals">
            <span class="lever"></span>
            On
          </label>
        </span>
        <span class="switch col s6">
          stop loss
          <label>
            Off
            <input type="checkbox" v-model="settings.stop_loss">
            <span class="lever"></span>
            On
          </label>
        </span>
      </div>

      <br>

      <div class="row">
        <span class="input-field col s6">
          <input id="apikey" type="text"  v-model="apiKey"/>
          <label for="apikey">Binance api key</label>
        </span>
        <span class="input-field col s6">
          <input id="secretkey" type="text"  v-model="secretKey"/>
          <label for="secretkey">Binance secret key</label>
        </span>
      </div>


    </template>

    <footer class="flex">
      <button class="btn" style="flex-grow:1;" @click="$modal.hide('user-settings')">Cancel</button>
      <button class="btn" style="flex-grow:1;" @click="patchUserSettings">Save</button>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'user-settings',
  computed: {
    user(){
      return this.$store.state.user
    }
  },
  data(){
    return {
      settings: {},
      apiKey : '',
      secretKey: '',
    }
  },
  created(){
    Object.assign(this.settings, this.user.settings[0])
  },
  methods: {
    patchUserSettings() {
      this.$api.patch('/users/settings', this.settings).then(response => {
        this.$store.state.user.settings[0] = response
      })
      if(this.apiKey !== ''){
        this.$api.post('users/binanceKeys', {binance_key: this.apiKey, binance_secret: this.secretKey}).then( response => {
          console.log(response)
        })
      }
    },
  }
}
</script>
