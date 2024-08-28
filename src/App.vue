<template>
    <div v-if="!login">
      <auth @log="init()"/>
    </div>

    <div v-else>

      <div class="layoutbase">

        <div class="layout-top">
          <div class="nav-links">
            <router-link :to="{ name: 'Dashboard' }" class="nav-item">Dashboard</router-link>
            <router-link :to="{ name: 'Settings' }" class="nav-item">Settings</router-link>
            <router-link :to="{ name: 'Signals' }" class="nav-item">Signals</router-link>
          </div>

          <div style="nav-links">
            <button class="btn" @click="$modal.show('user-settings')">
               <i class="material-icons" style="font-size:2.5rem;">account_circle</i>
            </button>
              <button @click="logout()" class="btn btn-lg btn-primary" >logout</button>
          </div>
        </div>

        <div class="layout-body">

          <div class="layout-router">
            <router-view/>
          </div>

        </div>
      </div>
      <modals/>
    </div>
</template>

<script>
import Vue from 'vue';
import auth from './components/auth/Auth';
import Modals from "./Modals"

export default {
  name: 'App',
  data(){
    return {
      modalProp : {},
      auth : false,
    }
  },
  components: {
    'auth' : auth,
    'modals' : Modals
  },
  methods: {
    init() {
      this.initOpenOrders()
    },
    logout(){
      this.$store.state.user = {};
    },
    initOpenOrders(){
        this.$binance.openOrders({recvWindow:1000000}).then(txs => {
          for(let tx in txs){
            let i = txs[tx]
            if(i.status == 'CANCELED'){}
            if(i.status == 'FILLED'){}
            if(i.status == 'NEW'){
              Vue.set(this.$store.state.open_orders, i.orderId, i)
            }
          }
        })
    },
    beforeOpenModal(event) {
      this.modalProp = event.params
     }
  },
  computed: {
    login(){
      if(this.$store.state.user === false){
        return false
      } else {
        return true
      }
    }
  }
}
</script>

<style>


.nav-links {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.nav-item {
  padding-right: 10px;
  padding-left: 10px;
  height: 100%;
  color : white;
  font-size:16px;
  min-width: 64px;
  text-decoration: none;
}

.nav-item:hover {
  background-color: grey;
}

.card{
  background-color: light-grey;
  border-radius: 2px;
  text-align:center;
  margin: 20px;
  padding : 20px;
  max-height: 800px;
  box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  overflow-x: hidden;
  overflow-y: scroll;
  overflow: auto;
  flex-grow: 1;
  min-width: 100px;
}

.list-group-item{
  background-color:#F7F8F9;
}
</style>
