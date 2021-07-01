<template>
  <div class="login">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="ruleForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="pass">
        <el-input
          type="password"
          v-model="ruleForm.pass"
          autocomplete="off"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')"
          >提交</el-button
        >
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {mapMutations} from "vuex"
import {loginapi} from "../api/index"
export default {
  name: "login",
  data() {
    var checkUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (
        this.ruleForm.username != "" &&
        this.ruleForm.username.length >= 5 &&
        this.ruleForm.username.length <= 8
      ) {
        callback();
      } else {
        callback(new Error("请输入正确格式的用户名"));
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          callback();
        } else {
          callback(new Error("请输入正确格式的密码"));
        }
      }
    };
    return {
      ruleForm: {
        pass: "",
        username: "",
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        username: [{ validator: checkUsername, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 登录的逻辑
          loginapi({
              username:this.ruleForm.username,
              password:this.ruleForm.pass
          }).then(res=>{
              console.log(res);
              let token=res.data.data.token;
              this.$store.commit("gettoken",token)
              token!=undefined?this.$router.push("/"):alert("没有该用户")
          })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    ...mapMutations(['gettoken'])
  },
};
</script>

<style>
</style>