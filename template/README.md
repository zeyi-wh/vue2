# {{name}}

## 注意
eslint有修改，建完项目后第一时间build一下，然后运行命令
eslint --fix --ext .js,.vue src

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
{{#if_eq projectType "qiankun"}}
## qiankun项目须知
### 本地调试
公共接口目前不兼容ip形式的本地调试，请用localhost

### 枚举类
qiankun子应用可以通过window.enumsMedCloud来获取枚举信息

### 公共弹窗类型须知

- 和qiankun子应用一样，就是一个普通的子应用项目。
- 不一样的是路由要使用内存路由，让子应用不关注url的变化，从而达到让一个路由加载n多qiankun子应用的能力（这个需要自己改）
- 你可以把它想象成一个空白页面中有一个隐藏的按钮，点击按钮的时候弹窗呼出。（这个呼出的操作将统一由壳项目来完成）
- 具体配置可以参考账单公共弹窗项目



### 在main项目中添加：
```
// src/microApp/apps.js
// apps中添加item
  {
    name: '{{name}}',
    container: qiankunAppSelector,
    activeRule: '/{{name}}',
    entry: '/sub_app/{{name}}/',
    props: { shared },
  },
```

### 告诉运维并发邮件的信息：

##### 新服务资源申请：

job名称：{{name}}

环境：dev uat pre prod

仓库地址：https://gitlab.medcloud.cn/SCRM-Frontend/{{name}}

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

申请人：{{author}}

负责人：李陆启

申请日期：yyyy/mm/dd



邮件抄送："SaaS产品技术部"<saas@medcloud.cn>;"李陆启"<luqi.li@medcloud.cn>;

{{/if_eq}}

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
        ├─ icons.js 图标按需加载目录（默认不加载任何antd icon）
        ├─ lazy_use.js antd按需加载，用到什么放开什么
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
            ├─ List (二级路由)
                ├─ index.vue (二级路由匹配的文件入口)
                ├─ PatientTableList.vue (页面的组成部分之一)
                ├─ components (二级路由需要的小组件)
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

### Icon使用方案
1. 我们采用按需加载默认Icon的方式，会丢失部分默认Icon，如果发现有丢失，参考按需加载的方案进行补齐
2. 大多数Icon来自于fontIcon自定义,使用方法
```
<LiteIcon type="lite_app_icon_tuifei" style="color: red" />
// type查看请去iconfont网站对应的lite_app仓库找
// 更新方法：
// globalMixi.js
export const LiteIcon = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_2452510_sxppo1y0oxo.js",
});
// 修改scriptUrl(取自iconfont)
```

{{#if_eq projectType "normal"}}
### 开发时按需加载，注意事项（普通项目）：
#### https://github.com/vueComponent/ant-design-vue/issues/325
1. antd vue按需加载
```
// 配合babel插件: babel-plugin-import
import { Button } from "ant-design-vue";
Vue.use(Button);
```
2. antd Icon按需加载
```
src/configs/icons.js
// 参考该文件的配置
```

3. loadash按需加载
```
// 正确用法
import debounce from "lodash/debounce"; //只会打包debounce
// 错误用法
import { debounce } from "lodash"; // 在babel插件下可以使用这种方式(本项目没配)
import _ from "loadash";

```
4. echart按需加载
```
import echarts from "echarts/lib/echarts"; // 引用主文件
import "echarts/lib/chart/bar"; // 引用柱状图
import "echarts/lib/component/title"; ...
```
{{/if_eq}}
API接口使用说明
#### api接口相关的文件放在`src/api`这个目录下 项目中需要使用的api接口时 先在api目录下建一个js文件，这个文件里引用`APIInterceptors`这个接口拦截器，然后定义相关的接口名称，
#### 比如定义了一个`home.js`的文件（这个文件可以根据项目需求来，比如按照页面或者模块来定义）
```
import { HIS_HTTP } from "@/api/APIInterceptors";

export function login(data) {
  return HIS_HTTP.post("/api/scrm/auth/login-general", data);
}

```
#### 在页面中使用
```
<script>
import { login } from '@/api/home';
export default {
  name: "home",
  created() {
      login({
          name:'zhangsan',
          password:'123456'
      }).then((res)=>{
          
      }).catch((err)=>{
          
      })
  }
};
</script>


```

