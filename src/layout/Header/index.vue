<script setup>
import { ToolOutlined } from '@ant-design/icons-vue'
import { useTabStore } from '@/stores/tabs.js'
const tabStore = useTabStore()
function openCreateTable() {
  tabStore.openTab({
    key: 'table-create1',
    title: '创建表21',
    path: '/table/create',
  })
}
</script>

<template>
  <header>
    <div class="logo">GWDS</div>
    <nav>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>文件</a>
        <template #overlay>
          <a-menu>
            <a-menu-item> <ToolOutlined /> 首选项 </a-menu-item>
            <a-menu-divider />
            <a-menu-item @click="openCreateTable">退出</a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>数据库</a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">新建数据源</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">驱动管理</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>SQL</a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">SQL 模板</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">加载 SQL 脚本</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>帮助</a>
        <template #overlay>
          <a-menu>
            <a-menu-item>
              <a href="javascript:;">关于</a>
            </a-menu-item>
            <a-menu-item>
              <a href="javascript:;">帮助</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a href="javascript:;">快捷键大全</a>
            </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown>
    </nav>
  </header>
</template>

<style scoped>
header {
  height: 50px;
  background-color: #2c2c2c;
  color: white;
  display: flex;
  align-items: center;
  gap: 50px;
}
.logo {
  line-height: 50px;
  font-size: 1.6em;
  margin-left: 16px;
  font-weight: bolder;
}
nav {
  display: flex;
  gap: 20px;

  cursor: pointer;
}
</style>
