<script setup>
import { useTabStore } from '@/stores/tabs.js'
import { storeToRefs } from 'pinia'

const tabStore = useTabStore()
const { tabList, activeKey } = storeToRefs(tabStore)

function onChange(key) {
  tabStore.switchTab(key)
}
</script>

<template>
  <main class="content">
    <a-tabs
      :active-key="activeKey"
      type="editable-card"
      size="small"
      hide-add
      default-active-key="dashboard"
      @change="onChange"
    >
      <a-tab-pane v-for="tab in tabList" :key="tab.key" :closeable="tab.key !== 'dashboard'">
        <template #tab>
          <a-tooltip placement="bottom" color="white">
            <template #title>
              <p>数据源：mysql@localhost</p>
              <p>数据库：user</p>
              <p>类型：MySQL</p>
              <p>URL：jdbc:gbase://1.1.1.1:3309/</p>
            </template>
            {{ tab.title }}
          </a-tooltip>
        </template>
        <RouterView v-slot="{ Component, route }">
          <component :is="Component" :key="route.fullPath" />
          {{ route.fullPath }}
        </RouterView>
      </a-tab-pane>
    </a-tabs>
  </main>
</template>

<style scoped>
p {
  margin: 0;
  padding: 0;
  color: #2c2c2c;
}
</style>
