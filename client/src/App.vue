<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  watch: {
    '$route.path' () {
      this.$nextTick(() => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        })
      })
    }
  }
}
</script>

<style lang="scss">
html, body {
  height: 100%;
  margin: 0;
}
#app {
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #222222;
  text-align: center;
  -webkit-overflow-scrolling: touch;
  box-sizing: border-box;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }

}
</style>
