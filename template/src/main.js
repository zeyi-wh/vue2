import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './store/observable.js'
import './utils/GlobalFilter'
import { golbalMixin } from '@/utils/GlobalMixin'
const envConfig = require('../src/configs/env.config')

Vue.prototype.$EventBus = new Vue()

Vue.config.productionTip = false
Vue.mixin(golbalMixin)

let instance = null

function render (props = {}) {
  // 在#subapp-wrap-container挂载点下新建一个dom节点并挂载(防止替换掉该节点）
  const parentNodeId = props.mountNode
  const appContainer = document.createElement('div')
  const wrapper = document.getElementById(parentNodeId || 'subapp-wrap-container')
  wrapper.appendChild(appContainer)

  instance = new Vue({
    store,
    router,
    render: (h) => h(App)
  })
  instance.$mount(appContainer)
}

// 独立运行时 __SUB_APP__为壳项目定义的变量,表示作为子应用加载
if (!window.__SUB_APP__) {
  render()
} else {
  // eslint-disable-next-line
  __webpack_public_path__ = envConfig.DOMAIN + '/sub_app/{{name}}/'
}

// 微前端对外暴露的3个方法
export async function bootstrap () {

}
export async function mount (props) {
  render(props)
}
export async function unmount () {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
}
