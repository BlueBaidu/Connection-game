<template>
  <div class="app">
    <img class="logo" alt="Vue logo" src="./assets/iconfont/logo.svg" />
    <BoardComponent />
  </div>
</template>

<script>
import BoardComponent from "./components/boardComponent.vue";

export default {
  name: "App",
  components: {
    BoardComponent,
  },
};
</script>

<style>
  .app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

  .logo {
    /* width: 100px; */
    height: 200px;
  }
</style>
