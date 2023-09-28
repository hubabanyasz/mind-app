<template>
  <TheHeader title="Mind App" />
  <router-view></router-view>
  <TheFooter content="© 2022 Huba Banyasz. Developed for CI609 - Advanced Web Application Development" />
</template>

<script>
import TheHeader from './components/TheHeader.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  name: 'App',
  components: {
    TheHeader,
    TheFooter
  },
  beforeCreate() {
    this.$store.dispatch('loadPin')
    this.$store.dispatch('loadStore')
    this.$store.dispatch('loadAuth')
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  /*
  Google LLC (2022). Google Fonts. [online] fonts.google.com. 
  Available at: https://fonts.google.com/specimen/Cabin 
  [Accessed 26 Nov. 2022].
  */
  font-family: 'Cabin', sans-serif;
  margin: 0;
}
button {
  cursor: pointer;
  border-radius: 1.2em;
  border: solid 1px #000000;
  background: #325886;
  color: #FFF;
  text-decoration: none;
  font-size: 1.2em;
}
/* 
Solves button sticking on touchscreen devices,
as checking for hover is not reliable 
*/
@media (min-width: 60em) {
  button:hover {
    background-color: #264264;
    color: #FFF;
  }
}
</style>