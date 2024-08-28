<template>
    <div>
      <modal name="position-settings" @before-open="beforeOpenModal" height="auto" :scrollable="true">
        <position-settings :data="modalProp" />
      </modal>
      <modal name="user-settings" @before-open="beforeOpenModal" height="auto" :scrollable="true">
        <user-settings :data="modalProp" />
      </modal>
    </div>
</template>

<script>
import PositionSettings from "./components/modals/PositionsSettings"
import UserSettings from "./components/modals/UserSettings"

export default {
  name: 'modals',
  data(){
    return {
      modalProp : {},
    }
  },
  components: {
    'PositionSettings' : PositionSettings,
    'UserSettings' : UserSettings
  },
  methods: {
    beforeOpenModal(event) {
      this.modalProp = event.params
     }
  },
}
</script>
