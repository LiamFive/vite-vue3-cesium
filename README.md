# vite2+vue3+cesium项目模版
> 前端项目说明文档，本文档旨在让参与项目人员了解项目结构, 项目依赖, 业务模块, 组件说明 ...

## 技术栈
`vue3` `vite2` `pinia` `vue-router` `ant-design-vue` `less`

## 项目结构
```
|-- dist                         #源代码编译后的生成线上环境代码
|-- node_modules                 #依赖的第三方包
|-- presets                      #vite插件配置文件
|-- public             
    |--favicon.ico               #浏览器标签图标
|-- src                          #主程序代码
|   |-- api                      #各模块接口请求
|   |-- assets                   #静态资源文件包括：图片、字体图标、SVG
|   |-- components               #全局通用组件
|   |-- config                   #全局配置文件
|   |-- helpers                  #功能函数（和业务无关）
|   |-- router                   #路由配置
|   |-- store                    #接口请求函数
|   |-- store                    #全局状态管理工具（基于pinia实现）
|   |-- styles                   #全局样式文件
|   |-- utils                    #工具函数
|   |-- views                    #页面模块文件
|   |-- App.vue                  #根组件
|   |-- main.js                  #项目入口文件
|-- .env.development             #开发环境配置文件
|-- .env.production              #生产环境配置文件
|-- .eslintignore                #eslint配置忽略文件
|-- .eslintrc-auto-import.json   #eslint自定义模块导入规则
|-- .eslintrc.js                 #eslint 代码规则配置
|-- .gitignore                   #不纳入git版本控制的 /文件夹?/ 列表
|-- .prettierignore              #prettier配置需要忽略的文件夹
|-- index.html                   #当前项目的唯一页面
|-- prettier.config.js           #代码格式化工具prettier配置文件
|-- package.json                 #项目信息文件
|-- README.md                    #项目说明
|-- vite.config.js               #Vite基本配置文件
```

## 开发环境依赖
- [node](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)
- [vite](https://vitejs.dev/)
- [eslint](http://eslint.org/)
- [prettier](https://prettier.io/)

## 推荐工具
- [VS Code](https://code.visualstudio.com/) 写代码利器

## 编辑器插件
- ESLint
- EditorConfig
- Vue Language Features (Volar)
- Prettier - Code formatter
- Live Server

## 代码规范
[前端项目规范](https://winter-raincoat-073.notion.site/f05b5c35b3204c53a1496a20b9022646)
[代码质量评判标准](https://winter-raincoat-073.notion.site/af55d73c9a3d497fa37efc88c1340250)
[Kiss原则(keep it simple,stupid)](https://winter-raincoat-073.notion.site/Kiss-keep-it-simple-stupid-b13db3e3eb794e04b91b3404dbf1e3c3)


## 运行与打包
```bash

# 安装依赖
$ npm install

# 启动开发环境
$ npm run dev

# 打包生产环境
$ npm run build

$ npm run lint
# 校验代码规则

$ npm run lint:format
#校验代码并格式化

```
