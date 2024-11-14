# GWDS-UI


## 前端技术选型 
- Vite & Vue
- Ant Design Vue
- Axios

## 技术难点

- 页面布局主体架构
  - Header、Main 区域
  - Main 区域分左右两块，支持宽度鼠标左右拖动
  - 左侧 Sidebar 树形区域与右侧 Tab 页区域
  - 其中 Tab 区域当显示 SQL 编辑器时分上下两块，支持高度鼠标上下拖动
- SQL 编辑器技术选型：CodeMirror VS Monaco
- 树形结构深度使用
  - 右键菜单与事件处理
  - 自定义节点功能
  - 自定义搜索显示
  - 性能调研（懒加载、虚拟展示）
- UI 框架选型：Element Plus VS Ant Design Vue 
- Electron 打包构建：Web 端、桌面端（Win、Mac、Linux）