import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
{{#if_eq projectType “normal”}}
import "./configs/lazy_use";
{{/if_eq}}
import "./store/observable.js";
import "./utils/GlobalFilter";
import { golbalMixin } from "@/utils/GlobalMixin";

Vue.prototype.$EventBus = new Vue();

Vue.config.productionTip = false;
Vue.mixin(golbalMixin);

{{#if_eq projectType “normal”}}
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
{{/if_eq}}

{{#if_eq projectType "qiankun"}}
let instance = null;
function render(props = {}) {
  console.log(props);
  instance = new Vue({
    store,
    router,
    render: (h) => h(App),
  }).$mount("#app");
}

if (window.__POWERED_BY_QIANKUN__) {
  // eslint-disable-next-line no-undef
  __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
}

// 独立运行时
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

export async function bootstrap() {
  console.log("[vue] vue app bootstraped");
}
export async function mount(props) {
  console.log("[vue] props from main framework11", props);
  render(props);
}
export async function unmount() {
  instance.$destroy();
  instance.$el.innerHTML = "";
  instance = null;
}
{{/if_eq}}

