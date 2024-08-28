<template>
  <div >
		<grid-layout
            :layout="layout"
            :col-num="12"
            :row-height="30"
            :is-draggable="true"
            :is-resizable="true"
            :is-mirrored="false"
            :vertical-compact="true"
            :margin="[10, 10]"
            :use-css-transforms="true">

        <grid-item v-for="(item, key) in layout" :key="key"
                   :x="item.x"
                   :y="item.y"
                   :w="item.w"
                   :h="item.h"
                   :i="item.i"
                   :minW="item.minW">
            <div style="width:100%; min-width:64px; height:100%; background-color:#eceff1; box-shadow: 0px 0px 4px 	#D3D3D3; border-radius:1px;">
              <component :is="item.component" />
            </div>
        </grid-item>
    </grid-layout>
  </div>

</template>

<script>
import VueGridLayout from 'vue-grid-layout'

import AssetsCard from './cards/AssetsCard'
import Market from './cards/Market'
import ManualTradeCard from './cards/ManualTradeCard'
import PositionCard from './cards/Positions'
import OpenOrders from './cards/OpenOrders'
import Overview from './cards/OverviewCard'

let GridLayout = VueGridLayout.GridLayout;
let GridItem = VueGridLayout.GridItem;


export default {
  components: {AssetsCard, Market, ManualTradeCard,PositionCard, OpenOrders, GridLayout, GridItem, Overview},
  name: 'Dashboard',
  data() {
    return {
      layout: [
        {"x":0,"y":0,"w":2,"h":22,"i":"1", component: 'market'},
        {"x":10,"y":0,"w":2,"h":4,"i":"2", component: 'Overview'},
        {"x":2,"y":0,"w":8,"h":6,"i":"3", component: 'position-card'},
        {"x":2,"y":22,"w":8,"h":6,"i":"4", component: 'OpenOrders'},
        {"x":2,"y":10,"w":8,"h":10,"i":"5", component: 'manual-trade-card'},
        {"x":10,"y":12,"w":2,"h":18,"i":"6", component: 'assets-card'}
	     ]
    }
  },
  methods: {
    tamere(){
      console.log(layout)
    }
  }
}
</script>

<style>


</style>
