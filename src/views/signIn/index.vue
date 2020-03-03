<template>
  <el-container>
    <el-header style="background-color: rgb(0, 0, 0);opacity: 0.5;left: 0;top: 0;position: fixed;z-index: 100;width: 100%;height: 1000px">
    </el-header>

    <!--    中间内容部分-->
    <el-main style="position:absolute;width: 450px;left: calc(50% - 225px);z-index: 111">
      <div style="width: 356px;height: 408px;margin-left:calc(50% - 178px);opacity:2;margin-top:100px;background: #fff; border-radius: 10px; ">
        <div style="text-align: center;font-size: 24px;color: #393b3d;padding-bottom: 10px;padding-top: 10px">用户登录</div>
<!--        <div style="position: absolute;right: 0">×</div>-->
        <div style="width: 100%;height: 80px;">
          <div class="signInImg"></div>
          <div style="text-align: center;color: #7f8085;">数据改变世界</div>
        </div>
        <el-form :label-position="labelPosition" model="formLabelAlign" style="width: 302px;margin-left: 27px">
          <el-input placeholder="手机/邮箱/用户名" style="margin-top: 20px" v-model="formLabelAlign.name"></el-input>
          <el-input placeholder="密码" style="margin-top: 20px" v-model="formLabelAlign.region"></el-input>
          <el-checkbox style="margin-top: 20px" text-color="#000000" v-model="checked">下次自动登陆</el-checkbox>
          <el-button style="margin-top: 15px;width: 302px" type="primary" @click="toDashboard">登陆</el-button>
          <el-link type="primary" style="margin-top: 15px">忘记密码？</el-link>
        </el-form>
      </div>
    </el-main>
  </el-container>
</template>

<script>

  export default {
    name: 'SingIn',
    data() {
      return {
        labelPosition: 'right',
        checked: true,
        formLabelAlign: {
          name: '',
          region: '',
          type: ''
        }
      };
    },
    methods: {
      toDashboard() {
        this.$router.push({ path: '/dashboard' })
      }
    }
  }
</script>

<style>
  /*.el-container {*/
  /*  -webkit-user-select: none;*/
  /*  -moz-user-select: none;*/
  /*  -o-user-select: none;*/
  /*  user-select: none;*/
  /*}*/
  .main {
    margin-top: 40px;
    padding: 10px 0 0 0;
  }

</style>


<style scoped>
  .signInImg{
    width: 60px;
    height: 60px;
    background: url("../../images/signIn.png") no-repeat;
    background-size: 100% 100%;
    margin: auto;
  }
  .lable_font{
    font-size: 14px;
    line-height: 1.29;
    font-weight: 700;
    position: relative;
    margin-bottom: .5px;
    color: #333;
    word-break: normal;
    font-family: arial;
  }
</style>
