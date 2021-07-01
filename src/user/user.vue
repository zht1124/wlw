<template>
  <div class="user">
    <!-- 列表渲染 -->
    <!-- 表格 盛放数据 -->
    <el-table :data="tableData" border style="width: 100%; margin-top: 20px">
      <el-table-column prop="pid" label="#" width="60"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180">
      </el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"> </el-table-column>
      <el-table-column prop="mobile" label="电话" width="180">
      </el-table-column>
      <el-table-column prop="role_name" label="角色" width="180">
      </el-table-column>
      <el-table-column label="状态" width="180">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template>
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            size="small"
          ></el-button>
          <el-button type="danger" icon="el-icon-delete" circle size="small">
          </el-button>
          <el-button
            type="warning"
            icon="el-icon-star-off"
            circle
            size="small"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[1, 2, 5, 10]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { userapi } from "../api/index";
export default {
  name: "user",
  data() {
    return {
      tableData: [],
      currentPage: 1,
      total: null,
      pagesize:2,
      pagenum:1
    };
  },
  created() {
      this.show()
  },
  methods: {
    async show() {
      let res = await userapi({
        query: "",
        pagenum: this.pagenum,
        pagesize: this.pagesize,
      });
      console.log(res);
      this.tableData = res.data.data.users;
      this.total = res.data.data.total;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.show()
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum=val;
      this.show()
    },
  },
};
</script>

<style>
</style>