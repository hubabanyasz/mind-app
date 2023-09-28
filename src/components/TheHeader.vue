<template>
  <header>
    <h1>{{ title }}</h1>
    <nav>
      <router-link v-show="currentPage === '/review'" to="/">Record</router-link>
      <router-link v-show="currentPage === '/'" to="/review">Review</router-link>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'TheHeader',
  props: {
    title: String
  },
  computed: {
    currentPage() {
      return this.$route.path
    }
  }
}
</script>

<style scoped>
header {
  display: flex;
  flex-direction: row;
  padding: 1.2em;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #000;
}
nav {
  font-size: 1.5em;
  list-style: none;
}
/* router-link */
a {
  border-radius: 30px;
  border: solid 1px #000000;
  background: #325886;
  color: #FFF;
  padding: 8px 24px;
  text-decoration: none;
}
/* 
Solves button sticking on touchscreen devices,
as checking for hover is not reliable 
*/
@media (min-width: 60em) {
  a:hover {
    background-color: #264264;
    color: #FFF;
  }
}
</style>