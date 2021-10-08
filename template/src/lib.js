/**
 * 向外暴露模块通常需要自定义render方法(根据实际场景需要会有较大调整）
 * 根据实际需要引入store或其他文件
 */
import Vue from 'vue'
import SomeLib from 'views/SomeLib/SomeLib'

Vue.config.productionTip = false

let instance = null

function render (props = {}) {
  // 在#subapp-wrap-container挂载点下新建一个dom节点并挂载(防止替换掉该节点）
  const parentNodeId = props.mountNode
  const appContainer = document.createElement('div')
  const wrapper = document.getElementById(parentNodeId || 'subapp-wrap-container')
  wrapper.appendChild(appContainer)

  instance = new Vue({
    render: (h) => h(SomeLib)
  }).$mount(appContainer)
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
