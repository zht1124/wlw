<template>
  <div>
    <el-cascader
      v-model="value"
      :options="options"
      @change="handleChange"
      :props="{ value: 'cat_id', label: 'cat_name' }"
    ></el-cascader>

    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="first">
        <el-button type="success" @click="addcon">添加参数</el-button>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="expand">
            <template> </template>
          </el-table-column>
          <el-table-column label="#">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="参数名称" prop="attr_name"> </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button type="success">修改</el-button>
              <el-button type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="静态属性" name="second">
        <el-button type="success">添加属性</el-button>
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="expand">
            <template> </template>
          </el-table-column>
          <el-table-column label="#">
            <template slot-scope="scope">
              {{ scope.$index + 1 }}
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"> </el-table-column>
          <el-table-column label="操作">
            <template>
              <el-button type="success">修改</el-button>
              <el-button type="danger">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      value: "",
      options: [],
      activeName: "first",
      tableData: [],
      sel: "many",
      id:'',
    };
  },
  created() {
    this.getlist();
  },
  methods: {
    getlist() {
      axios.get("/categories").then((res) => {
        // console.log(res.data.data);
        this.options = res.data.data;
      });
    },
    handleChange(value) {
       this.id = value[2];
       this.show()
    },
    show() {
      axios.get(`/categories/${this.id}/attributes?sel=${this.sel}`).then((res) => {
        console.log(res.data);
        this.tableData = res.data.data;
      });
    },
    handleClick(tab) {
      console.log(tab._uid);
      this.sel = tab._uid == 40 ? "only" : "many";
      this.show();
    },
    //添加
    addcon(){

    },
  },
};
</script>