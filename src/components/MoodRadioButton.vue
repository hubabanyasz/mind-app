<template>
  <label :for="mood">
    <input 
      type="radio" 
      name="mood" 
      :value="mood" 
      :id="mood" 
      @change="this.$emit('mood-selected', mood)" 
    />
    <img :src=getImageUrl(mood) :alt="(`emoji feeling ${mood}`)">
    <p>{{ mood }}</p>
  </label>
</template>

<script>
export default {
  name: 'MoodRadioButton',
  props: {
    mood: {
      type: String,
      required: true
    }
  },
  methods: {
    /* 
    Otziii (2022). Image - Passing and Binding Img Src from Props in Vue.js. 
    [online] stackoverflow.com. Available at: https://stackoverflow.com/a/73659672 [Accessed 15 Nov. 2022].
    
    Twitter Inc. (2020). Twemoji. [online] twemoji.twitter.com. 
    Available at: https://twemoji.twitter.com/ [Accessed 22 Oct. 2022].‌
    */
    getImageUrl(fileName) {
      return new URL(`../assets/${fileName}.png`, import.meta.url)
    }
  },
  emits: ['mood-selected']
}
</script>

<style scoped>
label {
  padding: 0.5em 0.3em 0.5em 0.3em;
  cursor: pointer;
  text-align: center;
  text-transform: capitalize;
  flex-grow: 1;
}
img {
  width: 100%;
  max-width: 5em;
}
input {
  display: none;
}
</style>