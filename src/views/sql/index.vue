<script setup>
import { CaretRightOutlined } from '@ant-design/icons-vue'
import { onMounted, ref, toRaw } from 'vue'
import * as monaco from 'monaco-editor'
import { format } from 'sql-formatter'

const editor = ref(null)
onMounted(async () => {
  editor.value = await monaco.editor.create(document.getElementById('editor_container'), {
    // 此处的配置项几乎与 VSCode 中的一致
    automaticLayout: true,
    // scrollBeyondLastLine: true,
    tabSize: 2,
    fontSize: 14,
    cursorBlinking: 'smooth',
    lineHeight: 1.6,
    mouseWheelZoom: true,
    language: 'sql',
    value: `SELECT * FROM user WHERE id = 1 and username like '%kangjia%' ORDER BY age DESC;`,
    contextmenu: true,
  })

  await editor.value.addAction({
    id: 'sql-formatter',
    label: 'SQL 格式化',
    contextMenuGroupId: 'navigation',
    contextMenuOrder: 1.5,
    precondition: 'editorLangId === sql',
    run() {
      formatSQL()
    },
  })
})

const tabActiveKey2 = ref('exInfo')

function formatSQL() {
  let oldContent = toRaw(editor.value).getValue()
  toRaw(editor.value).setValue(format(oldContent))
}

const tableData = ref([
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
])
const columns = ref([
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
])
</script>

<template>
  <main>
    <section style="display: flex; gap: 10px; margin-bottom: 5px">
      <a-dropdown-button size="small">
        执行 F8<CaretRightOutlined />
        <template #overlay>
          <a-menu>
            <a-menu-item key="1"> 全部执行 </a-menu-item>
            <a-menu-item key="2"> 执行选中代码 </a-menu-item>
          </a-menu>
        </template>
      </a-dropdown-button>
      <a-button size="small" type="primary">
        <template #icon> <CaretRightOutlined /> </template>
      </a-button>
      <a-button size="small" @click="formatSQL">格式化</a-button>
      <a-button size="small">保存为我的 SQL</a-button>
      <a-button size="small">另存为 SQL 文件</a-button>
      <a-button size="small">清空所有</a-button>
    </section>
    <div id="editor_container" style="height: 300px; border: 1px #eae9e9 solid"></div>
    <section>
      <a-tabs v-model:active-key="tabActiveKey2" size="small">
        <a-tab-pane key="exInfo" tab="执行信息">
          <main>
            <p>> 执行 1 条 SQL, 耗时 34 毫秒。</p>
          </main>
        </a-tab-pane>
        <a-tab-pane key="exRes" tab="user">
          <a-table size="small" :data-source="tableData" :columns="columns" />
        </a-tab-pane>
      </a-tabs>
    </section>
  </main>
</template>

<style scoped></style>
