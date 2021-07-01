import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Vant from "vant";
import "vant/lib/index.css";
// import axios from 'axios';
// Vue.prototype.$http=axios;
import TreeTable from "vue-table-with-tree-grid"
Vue.use(Vant);
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.component("tree-table",TreeTable)
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");

// 路由守卫
// 全局路由守卫   局部路由守卫   组件内路由守卫
// 应用场景
// 后台管理的登陆   移动电商  买  付款  加入购物车 uid
router.beforeEach((to, from, next) => {
  if (to.path == "/login") {
    next();
  } else if (store.state.token != "") {
    next();
  } else {
    next("/login");
  }
});
