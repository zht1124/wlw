<template>
  <div class="categories">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item><a href="/">用户管理</a></el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 三级表格展示 -->
    <!-- <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="cat_id"
      border
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="#" prop="index" width="80">
      </el-table-column>
      <el-table-column prop="cat_name" label="分类名称" width="180">
      </el-table-column>
      <el-table-column label="是否有效"> 
        √
      </el-table-column>
      <el-table-column prop="cat_level" label="排序">
      </el-table-column>
      <el-table-column label="操作"> 
        <el-button type="primary" icon="el-icon-edit" circle></el-button>
        <el-button type="danger" icon="el-icon-delete" circle></el-button>
      </el-table-column>
    </el-table> -->
    <!-- 三级表格再展示 -->
    <tree-table
      class="treeTable"
      :data="tableData"
      :columns="columns"
      :selection-type="false"
      :expand-type="false"
      :show-index="true"
      index-text="#"
      border
      :show-row-hover="false"
    >
      <!-- 是否有效 -->
      <template v-slot:isok="scope">
        <i
          class="el-icon-success"
          v-if="scope.row.cat_deleted === false"
          style="color: lightgreen"
        ></i>
        <i class="el-icon-error" v-else style="color: red"></i>
      </template>
      <!-- 排序 -->
      <template v-slot:level="scope">
        <el-tag size="mini" v-if="scope.row.cat_level === 0">一级</el-tag>
        <el-tag size="mini" type="success" v-else-if="scope.row.cat_level === 1"
          >二级</el-tag
        >
        <el-tag size="mini" type="warning" v-else-if="scope.row.cat_level === 2"
          >三级</el-tag
        >
      </template>
      <!-- 操作 -->
      <template>
        <el-button type="primary" icon="el-icon-edit" size="mini"
          >编辑</el-button
        >
        <el-button type="warning" icon="el-icon-delete" size="mini"
          >删除</el-button
        >
      </template>
    </tree-table>
  </div>
</template>

<script>
import { typesapi } from "../api/index";
export default {
  data() {
    return {
      tableData: [],
      tableData2: [],
      columns: [
        {
          label: "分类名称",
          prop: "cat_name",
        },
        {
          label: "是否有效",
          type: "template",
          template: "isok",
        },
        {
          label: "排序",
          type: "template",
          template: "level",
        },
        {
          label: "操作",
          type: "template",
          template: "opt",
        },
      ],
    };
  },
  async created() {
    let res = await typesapi("/categories", {
      params: {
        type: 3,
        pagenum: 1,
        pagesize: 10,
      },
    });
    // console.log(res);
    // 一级二级三级
    res.data.data.result.map((item, index) => {
      Object.assign(item, { index: index + 1 });
    });
    this.tableData = res.data.data.result;
  },
};
</script>

<style>
/* .el-form-item {
  width: 888px !important;
} */
</style>