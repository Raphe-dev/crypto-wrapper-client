<template>
    <div class="card" style="width:450px">
      <div>
        <h4>User</h4>
      </div>
      <div style="display:flex; flex-direction:row; justify-content:center;">
        <div style="display:flex; flex-direction: column; margin-right: 15px">
          <img :src="user.photoURL" height="143" width="143">
          <button class="btn" @click="toggleEdit()" v-if="!edit">edit</button>
          <button class="btn btn-primary" @click="toggleEdit()" v-else>edit</button>
        </div>
        <ul class="list-group" style="width:320px">
          <li class="list-group-item">
            {{user.displayName}}
            <span class="badge badge-primary badge-pill">Name</span>
          </li>
          <li class="list-group-item">
            {{user.email}}
            <span class="badge badge-primary badge-pill">Email</span>
          </li>
          <li class="list-group-item">
            <div style="display: inline; word-wrap: break-word;">
              {{user.api_key || 'no api key'}}
            </div>
            <span class="badge badge-primary badge-pill">Api</span>
          </li>
          <!-- <li class="list-group-item">
            <div style="display: inline; word-wrap: break-word;">
              {{user.secret_key || 'no secret key'}}
            </div>
            <span class="badge badge-primary badge-pill">secret</span>
          </li> -->
        </ul>
      </div>
      <div v-if="edit">
        <div class="form-group" >
          <div style="display:flex; ">
            <span style="width:7em; line-height:2em; text-align:right; padding-right:4px;"> Api key </span>
            <input type="text" class="form-control"  v-model="apiKey"/>
          </div>
          <div style="display:flex;">
            <span style="width:7em; line-height:2em; text-align:right; padding-right:4px;"> Secret key </span>
            <input type="text" class="form-control"  v-model="secretKey"/>
          </div>

        </div>
        <div style="height:40px">
          <button class="btn btn-primary btn-block" @click="postKey()">Save</button>
        </div>
      </div>
    </div>
</template>

<script>
import Binance from 'binance-api-node'
import Vue from 'vue'
export default {
  name: 'user-infos',
  data () {
    return {
      apiKey : '',
      secretKey: '',
      edit: false,
    }
  },
  computed:{
    user(){
      return this.$store.getters.getUser;
    },
  },

  methods: {
    postKey(){
      this.$api.post('users/binanceKeys', {binance_key: this.apiKey, binance_secret: this.secretKey}).then( response => {
        console.log(response)
      })

    },
    toggleEdit(){
      this.edit = !this.edit
    },
  }
}
</script>
