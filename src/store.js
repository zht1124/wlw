import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import VuexPersistence from "vuex-persist";
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
});

export default new Vuex.Store({
  state: {
    token: "",
  },
  mutations: {
    // 登陆的时候，存储token
    gettoken(state,payload){
      state.token=payload;
    },
    // 退出的时候，删除token
    deltoken(state,payload){
      state.token=''
    }
  },
  actions: {},
  plugins: [vuexLocal.plugin],
});
