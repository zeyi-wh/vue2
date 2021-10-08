/**
 * 这是代替store的轻量级数据中心方案
 * 对于不需要大量使用store的场景可以使用该方案
 * 将该文件在main.js里引用即为向全局注册
 * 具体使用方法可以参考官方文档vue.observable或参考北吉熊极速版pc端的使用方法
 */
import Vue from 'vue'

// 示例:
// 定义一个observable
export const userData = Vue.observable({
  age: 0,
  name: ''
})

// mutation定义
export const userMutation = {
  setAge (val) {
    userData.age = val
  },
  setName (val) {
    userData.name = val
  }
}

// 定义另一个observable
export const patientData = Vue.observable({
  state: 1,
  gender: 0
})

// mutation定义
export const patientMutation = {
  setState (val) {
    patientData.state = val
  },
  setGender (val) {
    patientData.gender = val
  }
}
