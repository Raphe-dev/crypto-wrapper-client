<template>
    <div class="card" style="min-width:400px;">
      <div>
        <h4>Test</h4>
      </div>
      <button class="btn btn-primary">Test</button>

      <pre>
        {{response}}
      </pre>
        <doughnut :width="150" :height="20"/>

  </div>
</template>

<script>

export default {
  name: 'test-card',
  data () {
    return {
      response : {}
    }
  },
  mounted(){
  },
  methods: {

    connect(){
    },
  }
}
</script>
