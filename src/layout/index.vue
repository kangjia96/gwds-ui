<script setup>
import { ref } from 'vue'
import { CaretRightOutlined, SmileOutlined } from '@ant-design/icons-vue'

const tabActiveKey = ref('sql')
const sql = ref('SELECT * FROM user;')

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
        children: [
          {
            key: '0-0-1-0',
            title: 'vcname00001',
          },
        ],
      },
      {
        title: '会话',
        key: '0-0-3',
        children: [
          {
            key: '0-0-1-0',
            title: 'vcname00001',
          },
        ],
      },
    ],
  },
])
</script>

<template>
  <header>Header 区域</header>
  <main class="main">
    <aside>
      <a-tree :tree-data="treeData" show-icon>
        <template #icon>
          <SmileOutlined />
        </template>
      </a-tree>
    </aside>
    <main class="content">
      <a-tabs v-model:active-key="tabActiveKey" size="small">
        <a-tab-pane key="sql" tab="SQL 控制台">
          <main>
            <section style="display: flex; gap: 10px">
              <a-button size="small" type="primary">
                <template #icon> <CaretRightOutlined /> </template>
              </a-button>
              <a-button size="small">格式化</a-button>
              <a-button size="small">保存为我的 SQL</a-button>
              <a-button size="small">另存为 SQL 文件</a-button>
              <a-button size="small">加载我的 SQL</a-button>
            </section>
            <section>
              <a-textarea
                v-model:value="sql"
                :autoSize="{
                  minRows: 12,
                  maxRows: 12,
                }"
              />
            </section>
            <section>执行结果</section>
          </main>
        </a-tab-pane>
        <a-tab-pane key="normal" tab="创建表"> Normal </a-tab-pane>
      </a-tabs>
    </main>
  </main>
</template>

<style scoped>
header {
  height: 50px;
  background-color: #2c2c2c;
  color: white;
}
.main {
  display: flex;
  height: calc(100vh - 50px);
}

aside {
  width: 300px;
  border-right: 1px grey solid;
  margin-right: 10px;
}

.content {
  flex: 1;
}
</style>
