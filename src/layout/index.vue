<script setup>
import { onMounted, ref, toRaw } from 'vue'
import { CaretRightOutlined, HddOutlined, SyncOutlined, ToolOutlined } from '@ant-design/icons-vue'
import * as monaco from 'monaco-editor'
import { format } from 'sql-formatter'

const editor = ref(null)
onMounted(() => {
  editor.value = monaco.editor.create(document.getElementById('editor_container'), {
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

  editor.value.addAction({
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

const tabActiveKey = ref('sql')
const tabActiveKey2 = ref('exInfo')

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
  <header>
    <div class="logo">GWDS</div>
    <nav>
      <a-dropdown>
        <a class="ant-dropdown-link" @click.prevent>文件</a>
        <template #overlay>
          <a-menu>
            <a-menu-item> <ToolOutlined /> 首选项 </a-menu-item>
            <a-menu-divider />
            <a-menu-item>
              <a href="javascript:;">退出</a>
            </a-menu-item>
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

  <main class="main">
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

    <main class="content">
      <a-tabs v-model:active-key="tabActiveKey" size="small">
        <a-tab-pane key="sql" tab="SQL 控制台[mysql@localhost]">
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
        </a-tab-pane>
        <a-tab-pane key="normal" tab="创建表[mysql@localhost]"> Normal </a-tab-pane>
      </a-tabs>
    </main>
  </main>
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

.main {
  display: flex;
  height: calc(100vh - 50px);
}

aside {
  width: 300px;
  border-right: 1px #eae9e9 solid;
  margin-right: 10px;
}

.content {
  flex: 1;
}
</style>
