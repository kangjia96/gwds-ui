<script setup>
import Header from './Header/index.vue'
import Aside from './Aside/index.vue'
import Main from './Main/index.vue'
</script>

<template>
  <!-- Header 区域 -->
  <Header />

  <main class="main">
    <!-- 侧边栏，树形区域 -->
    <Aside class="aside" />

    <!-- 主体区域，承载 tab 页面 -->
    <Main class="content" />
  </main>
</template>

<style scoped>
.main {
  display: flex;
  height: calc(100vh - 50px);
}

aside {
  width: 300px;
  min-width: 300px;
  border-right: 1px #eae9e9 solid;
  margin-right: 10px;
}

.content {
  flex: 1;
}
</style>
