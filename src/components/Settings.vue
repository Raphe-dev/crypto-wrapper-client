<template>
  <div style="display:flex; justify-content:space-between">
    <api style="flex-grow:1"/>
    <!-- <user-infos /> -->
    <pair-settings style="width:250px" />
    <signals />
  </div>

</template>

<script>
import UserInfos from './cards/UserInfos'
import PairSettings from './cards/PairSettings'
import Signals from './cards/Signals'
import Api from './cards/Api'

export default {
  components: {UserInfos, PairSettings, Api, Signals},
  name: 'Settings'
}
</script>
