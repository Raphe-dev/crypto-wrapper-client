<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
import { Doughnut, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default {
  name: 'doughnut',
  mixins: [reactiveProp],
  props: ['options'],
  extends: Doughnut,
  mounted () {
    this.renderChart(this.chartData, this.options)
  }
}
</script>
