<template>
  <div id="review-view-container">
    <button @click="shareGP">Share with GP</button>
    <h1>Past moods</h1>
    <div class="logs-container">
      <MoodLog 
        :key="log.id" 
        v-for="log in logs" 
        :log="log" 
      />
    </div>
  </div>
</template>

<script>
import MoodLog from '../components/MoodLog.vue'

export default {
  name: 'RecordView',
  components: {
    MoodLog
  },
  methods: {
    async shareGP() {
      if (navigator.share) {
        try {
          await navigator.share({
            title: 'My Mind App mood logs',
            text: localStorage.getItem('store')
          })
        } catch (error) {
          console.log(error)
        }
      } else {
        console.log('Share is not supported by this browser')
      }
    }
  },
  computed: {
    logs() {
      return this.$store.getters.logs
    }
  }
}
</script>

<style scoped>
#review-view-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.logs-container {
  display: flex;
  flex-direction: column;
  max-width: 40em;
  padding: 0.5em;
}
/* 
Stretch cards on large screens, 
if no logs with notes have been added yet 
*/
@media (min-width: 42em) {
  .logs-container {
    min-width: 40em;
  }
}
button {
  margin: 1em;
  border: none;
  font-size: 1em;

  align-self: flex-end;
  background-color: #C9C9C9;
  color: #333;
  padding: 0.5em 1em;
}
/* 
Solves button sticking on touchscreen devices,
as checking for hover is not reliable 
*/
@media (min-width: 60em) {
    button:hover {
        background-color: #575757;
        color: #FFF;
    }
}
</style>