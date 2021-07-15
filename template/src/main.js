import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./configs/lazy_use";
import "./store/observable.js";
import "./utils/GlobalFilter";
import { golbalMixin } from "@/utils/GlobalMixin";

Vue.prototype.$EventBus = new Vue();

Vue.config.productionTip = false;
Vue.mixin(golbalMixin);

new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
