<template>
    <div class='card'>
      <div style="display:flex; justify-content:space-around; padding-bottom: 20px;">
        <h4>Select your pairs (BTC)</h4>
        <button class="btn btn-small btn-primary" @click="selectAll(true)">select all</button>
        <button class="btn btn-small btn-dark" @click="selectAll(false)">deselect all</button>
      </div>
      <div class="list-group" style="display:flex; flex-direction:row; flex-wrap:wrap; justify-content:space-around;">
        <div v-for="pair in pairs" style="padding:0.2rem">
        <label>
          <div class="list-item__title" :class="{ 's-active' : pair.selected}">
            <input type="checkbox" style="display:none;" v-model="pair.selected" @change="parsePairs">
            {{pair.name}}
          </div>
        </label>
        <div/>
      </div>
    </div>

    </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'pair-settings',

  methods: {
    ...mapActions({
      userFavorites : 'userFavorites',
    }),
    parsePairs() {
      let results = []
      for(let key in this.pairs){
        if(this.pairs[key].selected ){
          results.push(key)
        }
      }
      this.selected = results
      this.userFavorites(results)
    },
    selectAll(bool) {
      let results = []
      for(let key in this.pairs){
        let pair = this.pairs[key]
        if(bool){
          pair.selected = bool
          results.push(key)
        }else{
          pair.selected = bool
        }
        }
      this.selected = results
      this.userFavorites(results)
    },

  },
  computed: {
    binance_pairs(){
      return this.$store.state.binance_assets
    },
    pairs(){
      let pairs = {}
      for(let pair of this.binance_pairs){
        pairs[pair] = {name : pair.replace(/BTC/g,'')}
        if(this.$store.state.user.favorites && this.$store.state.user.favorites.length > 0){
          for(let userPair of this.$store.state.user.favorites){
            if(userPair === pair) {
              pairs[pair].selected = true;
            }
          }
        }
      }
      return pairs
    }
  },
  data () {
    return {
      selected : [],
    }
  },
  mounted() {
    let pairs = {}
    for(let pair of this.binance_pairs){
      pairs[pair] = {name : pair.replace(/BTC/g,'')}
      if(this.$store.state.user.favorites && this.$store.state.user.favorites.length > 0){
        for(let userPair of this.$store.state.user.favorites){
          if(userPair === pair) {
            pairs[pair].selected = true;
          }
        }
      }
    }
    this.pairs = pairs
  }

}
</script>

<style scoped>
.s-active {
  background-color: green;
}
</style>
