<div align="center">

<img src="icon128.png" width="96" height="96" alt="Neater Bookmarks">

# Neater Bookmarks

**灵巧实用的弹出书签 —— 快速、干净、现代化的书签管理扩展**

Manifest V3 · Chrome / Edge 150+ · 21 种语言 · 无构建、无依赖

</div>

---

点一下扩展图标，就在弹窗里完成几乎所有书签操作：树形浏览、实时搜索、右键菜单、拖拽整理、批量打开，全部键盘可达。

> 本仓库是 [Neat Bookmarks](https://github.com/cheeaun/neat-bookmarks) → [Neater Bookmarks](https://github.com/evanshultz/neater-bookmarks) 的延续分支，已迁移到 **Manifest V3**，并完成了一次完整的 **现代界面重构**（2026-10）。

## 目录

- [功能特性](#功能特性)
- [界面改造（2026-10）](#界面改造2026-10)
- [安装](#安装)
- [使用技巧](#使用技巧)
- [选项说明](#选项说明)
- [技术说明](#技术说明)
- [目录结构](#目录结构)
- [开发与测试](#开发与测试)
- [致谢与许可](#致谢与许可)
- [English](#english)

## 功能特性

| 能力 | 说明 |
| --- | --- |
| 🌳 **树形书签** | 文件夹展开 / 折叠，只加载可见层级，大目录也不卡 |
| 🔍 **实时搜索** | 同时匹配标题与网址，输入即出结果，并显示书签所在的父文件夹 |
| 🖱️ **右键菜单** | 在新标签页 / 新窗口 / 隐身窗口打开；编辑、删除书签与文件夹；一键打开整个文件夹 |
| ✋ **拖拽整理** | 拖动书签或文件夹改变顺序、移动到其它文件夹，带插入位置指示线 |
| ⌨️ **全键盘操作** | 方向键遍历（含折叠展开）、首字母跳转、`Ctrl/⌘+F` 搜索、`Esc` 关闭 |
| 🧠 **记住上次状态** | 恢复上次展开的文件夹、滚动位置、搜索词与焦点 |
| 🎨 **个性化** | 自定义工具栏图标、自定义 CSS、界面缩放 90%–150%、弹窗宽度可拖拽（320–640px） |
| 🔗 **地址栏搜索** | 在地址栏输入 `*` 加关键词即可搜索书签（omnibox） |
| 🌗 **深色模式** | 界面自动跟随系统深浅色（`prefers-color-scheme`） |

## 界面改造（2026-10）

在不改动任何业务逻辑（`neat.js` / `options.js` / `background.js` 一行未改）的前提下，重写了整个视觉层：

- **设计令牌体系**：颜色、圆角、阴影、字体全部收敛为 CSS 变量，浅色 / 深色两套主题共用同名令牌
- **圆角与层次**：书签行 8px、搜索框 10px、右键菜单 12px、对话框 16px、设置卡片 18px，配柔和投影
- **选中态**：键盘聚焦 / 当前项改为蓝色渐变胶囊 + 白色文字 + 光晕，明确"光标在哪"
- **搜索框**：内嵌放大镜图标、聚焦光环、占位符弱化
- **右键菜单**：毛玻璃圆角卡片、项圆角高亮、删除项悬停变红
- **对话框**：改为居中卡片，背景毛玻璃遮罩（原来的顶部滑下白条）
- **文件夹箭头**：圆角 chevron + 展开旋转动画
- **细节**：胶囊滚动条、拖拽幽灵卡片、插入指示线、图标圆角、过渡动效
- **选项页**：重构为卡片式布局，自定义圆角勾选框、现代数字 / 文件选择控件、危险操作红色按钮、代码编辑器圆角化
- **深色模式**：全套适配，无需手动切换

> 兼容性保证：保留所有 JS 依赖的行为钩子类与元素 id；附带静态契约校验脚本，确保改造后 JS 与 HTML/CSS 的接口一一对应。

## 安装

1. 下载或克隆本仓库到本地
2. 打开 `chrome://extensions/`（Edge 为 `edge://extensions/`）
3. 打开右上角的 **开发者模式**
4. 点击 **加载已解压的扩展程序**，选择本仓库目录
5. 建议把扩展图标固定到工具栏（拼图图标 → 图钉）

**要求**：Chromium 内核 **150+**（Manifest V3）。不再需要任何 Manifest V2 启动参数。

## 使用技巧

| 操作 | 效果 |
| --- | --- |
| 左键单击书签 | 在当前标签页打开（可在选项里改为在新标签页打开） |
| `Ctrl` / `⌘` + 左键 | 在新标签页打开 |
| `Shift` + 左键 | 在新窗口打开 |
| 中键单击文件夹 | 在新标签页打开该文件夹内全部书签 |
| 右键书签 / 文件夹 | 打开上下文菜单（含编辑与删除） |
| 拖拽书签行 | 调整顺序或移动到其它文件夹 |
| `Ctrl` / `⌘` + `F` | 聚焦搜索框 |
| `Ctrl` / `⌘` + `+` / `-` / `0` | 放大 / 缩小 / 重置界面缩放 |
| `Esc` | 清空搜索（有内容时）/ 关闭对话框 |
| 直接敲首字母 | 在树中跳转到对应书签（可连续输入） |
| 拖动弹窗左下角边缘 | 调整弹窗宽度（320–640px） |

## 选项说明

- **常规设置**
  - 左键单击书签即在新标签页中打开
  - 鼠标中键或按住 Ctrl 键左击时在后台打开书签
  - 展开文件夹时折叠其它已展开的文件夹
  - 打开（鼠标左击）书签时不关闭弹出页面
  - 打开多个书签前需确认
  - 记住上次状态（滚动条位置、所打开文件夹）
- **辅助功能**：界面缩放 90%–150%
- **自定义图标**：上传 19×19 图标替换工具栏图标（尺寸不符会自动缩放）
- **重置设置**：一键恢复默认
- **自定义样式**：内置代码编辑器，可注入自己的 CSS（[GitHub Gist](https://gist.github.com/) 可分享）

## 技术说明

- **Manifest V3**：`action` + service worker 后台脚本 + `chrome.storage.local`
- **图标缓存**：使用 Chrome 扩展专用的 `_favicon` 本地缓存，不再为每个图标请求外部服务
- **启动性能**
  - 只加载根目录与已展开的文件夹，其余按需加载
  - 先绘制弹窗，再恢复展开状态；大文件夹按 100 条分批渲染
  - 渐进加载完成后再恢复滚动位置与焦点，避免闪烁
  - 搜索防抖 80ms、忽略过期响应、批量查询父文件夹
- **权限最小化**：仅 `bookmarks` `favicon` `tabs` `storage`，不申请宽泛的主机访问权限
- **零构建**：纯手写 HTML / CSS / JavaScript，无打包步骤、无第三方依赖；修改后在扩展页点"重新加载"即生效
- **兼容性修复**：`runtime.onMessage` / `tabs.query` / `_favicon` 替代已移除的 MV2 API；`<command>` 等废弃元素替换为 `<button>`；`scrollByLines`、`mousewheel` 等过时 API 升级为标准写法

## 目录结构

```
manifest.json          扩展清单（MV3）
popup.html             弹窗骨架
neat.css               弹窗样式（浅色 / 深色设计令牌）
neat.js                弹窗逻辑：书签树、搜索、右键菜单、拖拽、快捷键
neatools.js            迷你 DOM 工具库
background.js          service worker：omnibox 搜索、工具栏图标
options.html           选项页
options.css            选项页样式
options.js             选项页逻辑（含自定义图标、重置）
codemirror.js/.css     选项页里的自定义 CSS 编辑器
_locales/              21 种语言文案
assets/                商店展示图
tests/                 Node 原生测试（性能与 API 回归）
```

## 开发与测试

```bash
node --test tests/           # 运行回归测试（Node 18+）
```

项目无构建步骤：修改文件后在 `chrome://extensions/` 点击扩展卡片上的 **重新加载** 即可看到效果。

## 致谢与许可

本项目基于以下优秀开源工作：

- [Neat Bookmarks](https://github.com/cheeaun/neat-bookmarks) —— 原作者 [Lim Chee Aun (cheeaun)](https://github.com/cheeaun)
- [Neater Bookmarks](https://github.com/evanshultz/neater-bookmarks) —— [evanshultz](https://github.com/evanshultz) 的后续维护版本
- 以及所有为翻译、图标与代码做出贡献的开发者

以 **MIT License** 发布，详见 [license.txt](license.txt)。

## English

**Neater Bookmarks** is a fast, keyboard-friendly bookmark manager for Chrome / Edge (Manifest V3), forked from [Neat Bookmarks](https://github.com/cheeaun/neat-bookmarks) via [evanshultz/neater-bookmarks](https://github.com/evanshultz/neater-bookmarks).

- Tree-style bookmark popup with lazy loading for large folders
- Instant search over titles and URLs (with parent-folder hints)
- Full context menu: open in new tab / window / incognito, edit, delete, open whole folder
- Drag & drop reordering, complete keyboard navigation, omnibox search (`*` keyword)
- Fully redesigned modern UI (Oct 2026): rounded surfaces, gradient selection, frosted menus, and a complete dark mode — with **zero changes to the business logic**
- Minimal permissions, no build step, no dependencies

**Install**: download this repo → open `chrome://extensions/` → enable *Developer mode* → *Load unpacked* → pick this folder. Requires Chromium **150+**.

MIT licensed. Thanks to [Lim Chee Aun](https://github.com/cheeaun) and [evanshultz](https://github.com/evanshultz) for the original work.
