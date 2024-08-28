<template>
  <div class="card">
    <section>
      Signals
    </section>
    <div style="display:flex; justify-content:space-around; align-items:center;">
      Mining Hamster
      <span class="input-field">
        <input id="buy_time" type="text" v-model="signals.miningHamster.api">
        <label for="buy_time">Api Key</label>
      </span>
      <div class="switch">
        <label>
          Off
          <input type="checkbox" v-model="signals.miningHamster.buy">
          <span class="lever"></span>
          On
        </label>
      </div>
    </div>

    <div style="display:flex; justify-content:space-around; align-items:center;">
      Crypto Grower
      <span class="input-field">
        <input id="buy_time" type="text" disabled>
        <label for="buy_time">FREE</label>
      </span>
      <div class="switch">
        <label>
          Off
          <input type="checkbox" v-model="signals.cryptoGrower.buy">
          <span class="lever"></span>
          On
        </label>
      </div>
    </div>

    <div style="display:flex; justify-content:space-around; align-items:center;">
      Crypto Quality
      <span class="input-field">
        <input id="buy_time" type="text" disabled>
        <label for="buy_time">FREE</label>
      </span>
      <div class="switch">
        <label>
          Off
          <input type="checkbox" v-model="signals.cryptoQuality.buy">
          <span class="lever"></span>
          On
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'api',
  data () {
    return {
      signals: {
        miningHamster: {
          api: null,
          buy: false
        },
        cryptoGrower: {
          buy: false
        },
        cryptoQuality: {
          buy: false
        }
      }
    }
  },
  mounted(){
    },
  methods: {
  }
}
</script>
