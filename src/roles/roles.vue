<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-row
            v-for="item in props.row.children"
            :key="item.id"
            style="border: 1px #ededed solid"
          >
            <!-- 第一层 -->
            <el-col :span="8" style=""
              ><el-tag closable effect="dark">{{
                item.authName
              }}</el-tag></el-col
            >
            <el-col :span="16">
              <el-row v-for="item1 in item.children" :key="item1.id">
                <!-- 第二层 -->
                <el-col :span="8"
                  ><el-tag type="danger" effect="dark" closable>{{
                    item1.authName
                  }}</el-tag></el-col
                >
                <!-- 第三层 -->
                <el-col :span="16">
                  <el-tag
                    style="margin: 7px"
                    v-for="item2 in item1.children"
                    :key="item2.id"
                    closable
                    type="warning"
                    effect="dark"
                  >
                    {{ item2.authName }}
                  </el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" prop="id"> </el-table-column>
      <el-table-column label="角色名称" prop="roleName"> </el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="props2">
          <el-button type="primary" icon="el-icon-search">修改</el-button>
          <el-button type="danger" icon="el-icon-search">删除</el-button>
          <el-button
            type="warning"
            icon="el-icon-search"
            @click="allot(props2.row.id)"
            >分配权限</el-button
          ></template
        >
      </el-table-column>
    </el-table>
    <!-- 分配权限的模态框 -->
    <el-dialog title="分配权限" :visible.sync="allotShow">
      <el-tree
        :data="treeData"
        :default-checked-keys="keyAll"
        show-checkbox
        default-expand-all
        node-key="id"
        ref="tree"
        highlight-current
        :props="defaultProps"
      >
      </el-tree>
      <el-button>取消</el-button>
      <el-button type="success" @click="getCheckedKeys">确定</el-button>
    </el-dialog>
  </div>
</template>

<script>
import { rolesapi, treeapi, editqxapi } from "../api/index";
export default {
  data() {
    return {
      tableData: [],
      allotShow: false, // 控制分配模态框状态
      treeData: [], // 树形控件的数据
      defaultProps: {
        children: "children",
        label: "authName",
      },
      keyAll: [], // 默认选中的key
    };
  },
  created() {
    this.show();
    // 权限反显
  },
  methods: {
    async show() {
      let roles = await rolesapi();
      this.tableData = roles.data.data;
      this.tableData.map((item) => {
        item.children
          ? item.children.map((item1) => {
              item1.children
                ? item1.children.map((item2) => {
                    item2.children
                      ? item2.children.map((item3) => {
                          this.keyAll.push(item3.id);
                        })
                      : null;
                  })
                : null;
            })
          : null;
      });
    },
    // 分配权限
    allot(rid) {
      this.allotShow = true;
      treeapi().then((res) => {
        this.treeData = res.data.data;
        console.log(this.treeData);
      });
      localStorage.setItem("roleId", rid);
    },
    // 确认修改权限
    getCheckedKeys() {
      // 这个是用户id
      let roleId = localStorage.getItem("roleId");
      // console.log(this.keyAll);
      let arrkey = this.$refs.tree.getCheckedKeys();
      console.log(this.treeData);
      this.treeData.map((item1) => {
        item1.children.map(item2=>{
          item2.children.map(item3=>{
            // console.log(item3.pid);
            let parr = item3.pid.split(',');
            parr.map(pitem=>{
              // console.log(pitem);
              if(arrkey.indexOf(pitem) == -1){
                arrkey.push(pitem)
              }
            })
          })
        })
      });
      // let rids = { rids: this.$refs.tree.getCheckedKeys().join(",") };
      editqxapi("/roles/" + roleId + "/rights", {
        rids: arrkey.toString()
      }).then((res) => {
        console.log(res);
        if (res.meta.status == 200) {
          this.show();
        }
      });
    },
  },
};
</script>

<style scoped>
.demo-table-expand {
  font-size: 0;
}
.demo-table-expand label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
</style>