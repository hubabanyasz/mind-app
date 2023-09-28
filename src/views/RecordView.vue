<template>
  <div id="record-view-container">
    <h1>How are you?</h1>
    <AddMoodLog @add-log="addLog" />
  </div>
</template>

<script>
import AddMoodLog from '../components/AddMoodLog.vue'

export default {
  name: 'RecordView',
  components: {
    AddMoodLog
  },
  methods: {
    addLog(newLog) {
      this.$store.dispatch('addLog', newLog)
    }
  }
}
</script>

<style scoped>
#record-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
h1 {
  margin-top: 2.2em;
}
</style>