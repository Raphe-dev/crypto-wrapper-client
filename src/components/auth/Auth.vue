<template>
  <div class="auth-layout">
    <div class="auth-card">
      <div style="display:flex; flex-direction:row;">
        <button class="btn btn btn-lg" :class="{'btn-primary' : tab == 'login'}" @click="tab = 'login'" style="flex-grow:1">login</button>
        <button class="btn btn btn-lg" :class="{'btn-primary' : tab == 'register'}" style="flex-grow:1" @click="tab = 'register'">register</button>
      </div>

      <div class="auth-form" v-if="tab === 'register'">
        register
        <div class="row">
         <form class="col s12">
            <div class="row">
              <div class="input-field col s6">
                <input placeholder="Placeholder" id="first_name" type="text" class="validate">
                <label for="first_name">First Name</label>
              </div>
              <div class="input-field col s6">
                <input id="last_name" type="text" class="validate">
                <label for="last_name">Last Name</label>
              </div>
            </div>
          </form>
        </div>
        <input class="input" type="email" placeholder="email" v-model="creds.email">
        <input class="input" type="password" placeholder="password" v-model="creds.password">

        <div class="buttons">
          <button class="button -regular" @click="register(creds)">register</button>
        </div>
      </div>
      <div class="auth-form" v-if="tab === 'login'">
        Login
        <input class="input" type="text" placeholder="email" v-model="creds.email">
        <input class="input" type="password" placeholder="password" v-model="creds.password">
        <div class="buttons">
          <button class="button -regular" @click="login(creds)">login</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Binance from 'binance-api-node'
import Vue from 'vue'
import { mapActions } from 'vuex'

export default {
    data(){
      return {
        creds : {
          email : '',
          password : '',
          username : ''
        },
        tab : 'login'
      }
    },
    methods: {
      ...mapActions({
        register : 'register',
        login : 'login'
      }),
    }
  }

</script>

<style scoped>
.layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.auth {
  margin-top:100px;
  width: 500px;
  height : 550px;
  background-color: light-grey;
  border-radius: 2px;
  text-align:center;
  padding-top: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.form {
  display: flex;
  justify-content: center;
  flex-flow: column;
  padding : 60px;
}

.input {
  align-self: center;
  flex-grow: 1;
  margin: 15px;
  border-radius: 4px;
  height: 30px;
  width: 300px;
  border-style: hidden;
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 5px 0 rgba(0, 0, 0, 0.19);
}

.buttons {
  padding: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}


</style>
