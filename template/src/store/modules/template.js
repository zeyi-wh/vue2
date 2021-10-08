// store 模版

const state = {
  count: 0
}

const getters = {
  getCount (state) {
    return state.count
  }
}

const mutations = {
  setCount (state, val) {
    state.count = val
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
