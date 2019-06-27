<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <el-row>
      <a class="theme-a red" href="/test-element-theme/?theme=red">红色主题色</a>
      <a class="theme-a green" href="/test-element-theme/?theme=green">绿色主题色</a>
      <a class="theme-a blue" href="/test-element-theme/?theme=blue">蓝色主题色</a>
    </el-row>
    <el-row>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="primary" plain>主要按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
    </el-row>
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.theme-a {
  margin: 20px;
  line-height: 50px;
  &.red {
    color: red;
  }
  &.green {
    color: green;
  }
  &.blue {
    color: blue;
  }
}
</style>
