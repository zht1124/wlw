import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Login from "./login/login.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      component: Home,
      // 二级路由配置
      children: [
        {
          path: "/users",
          component: () =>
            import(/* webpackChunkName: "about" */ "./user/user.vue"),
        },
        {
          path: "/roles",
          component: () =>
            import(/* webpackChunkName: "about" */ "./roles/roles.vue"),
        },
        {
          path: "/goods",
          component: () =>
            import(/* webpackChunkName: "about" */ "./product/goods.vue"),
        },
        {
          path: "/categories",
          component: () =>
            import(/* webpackChunkName: "about" */ "./categories/categories.vue"),
        },
        {
          path: "/params",
          component: () =>
            import(/* webpackChunkName: "about" */ "./params/params.vue"),
        },
      ],
    },
    // vue2.6之后出的路由懒加载
    {
      path: "/about",
      name: "about",
      meta: {
        isLogin: true,
      },
      component: () =>
        import(/* webpackChunkName: "about" */ "./views/About.vue"),
    },
    {
      path: "/login",
      component: Login,
    },
  ],
});
