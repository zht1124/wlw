<template>
  <div class="home">
    <el-container>
      <el-header>
        <p>电商后台管理系统</p>
        <el-button type="info" @click="exit">退出</el-button>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row>
            <el-col :span="24">
              <el-menu
                default-active="2"
                :unique-opened='true'
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b"
                router
              >
                <el-submenu v-for='(item) in menus' :key='item.id' :index="String(item.id)" >
                  <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.authName}}</span>
                  </template>
                  <el-menu-item-group v-for="(item1) in item.children" :key="item1.id">
                    <el-menu-item :index="String(item1.path)">{{item1.authName}}</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { menus } from "../api/index";
import {mapMutations} from "vuex"
export default {
  name: "home",
  // 在根组件中data是一个对象，为什么在其他组件中data为一个方法?
  data(){
    return {
      menus:[]
    }
  },
  components: {},
  created() {
    menus().then((res) => {
      let icons = [
        { icon: "el-icon-user" },
        { icon: "el-icon-box" },
        { icon: "el-icon-s-goods" },
        { icon: "el-icon-s-order" },
        { icon: "el-icon-s-platform" }
      ];
      // 向原有数据中推入对应的icon图标
      res.data.data.map((item,index)=>{
        icons.map((item1,index1)=>{
          if(index==index1){
            Object.assign(item,item1)
          }
        })
      })
      this.menus=res.data.data;
      console.log(this.menus);
    });
  },
  methods: {
    handleOpen(){

    },
    handleClose(){

    },
    exit(){
      this.$store.commit("deltoken")
      this.$router.push('/login')
    },
    ...mapMutations(['deltoken'])
  },
};
</script>
<style scoped>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  /* text-align: center; */
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* line-height: 160px; */
  /* text-align: center; */
}
</style>
