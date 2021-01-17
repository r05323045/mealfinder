<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
html, body {
  margin: 0;
  width: 100%;
  height: 100%;
}
#app {
  width: 100%;
  height: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #222222;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }

}
</style>
