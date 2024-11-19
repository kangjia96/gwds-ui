<script setup>
import { HddOutlined, SyncOutlined } from '@ant-design/icons-vue'
import { ref } from 'vue'

const searchValue = ref('')
const treeData = ref([
  {
    title: 'mysql@localhost',
    key: '0-0',
    children: [
      {
        title: '系统数据库',
        key: '0-0-0',
        children: [
          {
            title: 'mysql',
            key: '0-0-0-0',
            disableCheckbox: true,
          },
          {
            title: 'user',
            key: '0-0-0-1',
          },
        ],
      },
      {
        title: '用户数据库',
        key: '0-0-1',
        children: [
          {
            key: '0-0-1-0',
            title: 'vcname00001',
          },
        ],
      },
      {
        title: '用户',
        key: '0-0-2',
        children: [{ key: '0-0-1-0', title: 'root' }],
      },
      {
        title: '会话',
        key: '0-0-3',
        children: [
          {
            key: '0-0-1-0',
            title: 'session1',
          },
        ],
      },
    ],
  },
])

const onContextMenuClick = (treeKey, menuKey) => {
  console.log(`treeKey: ${treeKey}, menuKey: ${menuKey}`)
}
</script>

<template>
  <aside>
    <a-space>
      <a-input-search v-model:value="searchValue" placeholder="Search" />
      <a-button shape="circle">
        <SyncOutlined />
      </a-button>
    </a-space>
    <a-tree :tree-data="treeData" show-icon :selectable="false">
      <template #icon>
        <HddOutlined />
      </template>
      <template #title="{ key: treeKey, title }">
        <a-dropdown :trigger="['contextmenu']">
          <span>{{ title }}</span>
          <template #overlay>
            <a-menu @click="({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)">
              <a-menu-item key="1">1st menu item</a-menu-item>
              <a-menu-item key="2">2nd menu item</a-menu-item>
              <a-menu-item key="3">3rd menu item</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tree>
  </aside>
</template>

<style scoped></style>
