# {{name}}
## 特别注意
antd vue样式需要使用lbvue的类名包裹
在使用antd弹窗类组件时请加上:getContainer="false" 属性,否则样式会丢失

## 安装依赖
```
yarn
```

### 本地开发
```
yarn start //和之前的项目保持一致
```

### 打包编译
```
yarn build
```
## 项目须知
### 本地调试
公共接口目前不兼容ip形式的本地调试，请用localhost

### 枚举类
可以通过window.enumsMedCloud来获取枚举信息

### 模块子应用
- 需要根据实际情况灵活调整lib.js里的render方法


### 在lb_main项目中添加：
```
// src/microApp/apps.js
// apps中添加item
  {
    name: '{{name}}', // 子应用的名字
    appLibName: '{{name}}', // 子项目在window上挂载对象使用的key，这个是由子项目打包时指定的名称
    activeRule: '/sub_app/{{name}}/', // 根据这个路由来匹配子应用
    entry: '/sub_app/{{name}}/', // 项目入口
    props: {} // 自定义参数
  }
```

### 告诉运维并发邮件的信息：

##### 特别注意
在项目中建立dev uat pre master分支

##### 新服务资源申请：

job名称：{{name}}

环境：dev uat pre prod

仓库地址：https://gitlab.medcloud.cn/{{gitLabGroup}}/{{name}}

环境路由：

- http://dev-tower.laoganma.fun/sub_app/{{name}}
- http://uat-tower.laoganma.fun/sub_app/{{name}}
- https://pre-power.medcloud.cn/sub_app/{{name}}
- https://power.medcloud.cn/sub_app/{{name}}

打包命令：

```
yarn install
yarn run build 
```

申请人：付琦 <qi.fu@medcloud.cn>

负责人：李陆启

申请日期：yyyy/mm/dd


收件人："关伟俊"<weijun.guan@medcloud.cn>;
邮件抄送："SaaS产品技术部"<saas@medcloud.cn>;"李陆启"<luqi.li@medcloud.cn>;"刘伟义"<weiyi.liu@medcloud.cn>;


## 目录结构

```
.
├─ public 不被打包的静态资源文件
├─ src
    ├─ api 接口
    ├─ assets 被打包的静态文件
    ├─ assets 资源
    ├─ component 公共组件目录（基础组件，非业务类型组件)
        ├─ TabelWithFilter 组件
            ├─ index.vue
            ├─ Table.vue
            ├─ Filter.vue
            ├─ components 拆分出来的零散组件（只在该文件下使用）
    ├─ configs 配置文件夹
        ├─ env.config.js 多环境基础参数配置(生成出来的)
    ├─ layouts 布局文件夹
    ├─ router 路由文件夹
    ├─ store 数据中心文件夹（有需要就添加vuex或observable)
    ├─ utils 存放一些方便开发的文件
        ├─ const.js 存放常亮
        ├─ GlobalFilter.js 全局filter定义
        ├─ GlobalMixin.js 全局mixins定义
    ├─ views 页面目录
        ├─ Patient (一级路由)
            ├─ index.vue (一级路由匹配的文件入口)
            ├─ PatientLeftTag.vue (页面的组成部分之一)
            ├─ components (一级路由需要的小组件)
    ├─ globalStyle.less (全局样式写入)
```

### 时间处理和精度处理
1. 在template里需要处理时间格式，这部分内容在GlobalFilter.js里
```
<span>/{/{"2020:11:01" | filterDate/}/}</span>    ----会被转成2020-11-01
```
2. 在javascript里处理，这部分在工具函数utils/util.js里
```
console.log(timeUtils.getNow()); // 与moment转换相关的都可以放在这里供大家使用
```

### API请求说明
#### 我们统一使用壳项目提供的axios封装
#### 具体使用方法参考登录页面

