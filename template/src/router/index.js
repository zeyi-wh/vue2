import Vue from "vue";
import VueRouter from "vue-router";
import BasicLayout from "@/layouts/BasicLayout";

// import { STORAGE_KEY } from "@/utils/const";
// import StorageHelper from "@/utils/StorageHelper";

Vue.use(VueRouter);

const routes = [
  {
    path: "/user",
    component: { render: (h) => h("router-view") },
    children: [
      {
        path: "/user/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Login"),
      },
      {
        path: "/user/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/User/Register"),
      },
    ],
  },
  {
    path: "/",
    component: BasicLayout,
    children: [
      {
        path: "/",
        redirect: "/workspace",
      },
      {
        path: "/workspace",
        name: "workspace",
        component: () =>
          import(/* webpackChunkName: "user" */ "../views/Workspace"),
      },
    ],
  },
  {
    path: "*",
    component: { render: (h) => h("div", null, "404") },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  next();
  // todo 路由拦截
  // const userInfo = StorageHelper.get("currentOrgInfo") || {};
  // const token = userInfo[STORAGE_KEY._TOKEN];
  // if (token) {
  //   next();
  // } else {
  //   if (process.env.NODE_ENV !== "development") {
  //     window.location.href = "/login";
  //   } else {
  //     next();
  //   }
  // }
});

router.afterEach(() => {});

export default router;
