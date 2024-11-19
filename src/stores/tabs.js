import { ref } from 'vue'
import { defineStore } from 'pinia'
import router from '@/router/index.js'

export const useTabStore = defineStore('counter', () => {
  const tabList = ref([
    { key: 'dashboard', title: '首页', path: '/dashboard' },
    { key: 'sql', title: 'SQL编辑器', path: '/sql' },
    { key: 'table-create', title: '创建表', path: '/table/create' },
  ])
  const activeKey = ref('dashboard')

  const switchTab = (key) => {
    if (key === activeKey.value) return

    activeKey.value = key
    router.push(tabList.value.find((item) => item.key === key).path)
  }

  const openTab = (tab) => {
    if (!tab) return

    tabList.value.push(tab)
    activeKey.value = tab.key
    router.push(tab.path)
  }

  return { tabList, switchTab, activeKey, openTab }
})
