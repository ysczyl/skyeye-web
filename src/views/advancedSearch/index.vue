<template>
  <el-container>
    <!--    头部搜索框-->
    <!--    <el-header>-->

    <!--    </el-header>-->

    <!--    中间内容部分-->
    <el-main style="position:absolute;width: 1024px;left: calc(50% - 512px);background: #fafafa;">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
        <el-form-item label="搜索结果：" prop="name" style="font-size: 13px;font-family: arial;background-color: #f3f3f3;margin-bottom: 0px">
          <el-form-item label="包含以下全部的关键词" prop="name">
            <input v-model="ruleForm.name1"></input>
          </el-form-item>
          <el-form-item label="包含以下的完整关键词" prop="name">
            <input v-model="ruleForm.name2"></input>
          </el-form-item>
          <el-form-item label="包含以下任意一个关键词" prop="name">
            <input v-model="ruleForm.name3"></input>
          </el-form-item>
          <el-form-item label="不包括以下关键词" prop="name">
            <input v-model="ruleForm.name4"></input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="时间：" prop="region" style="font-size: 13px;font-family: arial;margin-bottom: 0px">
          <el-form-item label="限定要搜索的网页的时间" prop="name">
            <input v-model="ruleForm.time"></input>
          </el-form-item>
        </el-form-item>
        <el-form-item label="关键字位置：" style="font-size: 13px;font-family: arial;margin-bottom: 0px">
          <el-form-item label="查询关键字位于" prop="name">
            <el-radio-group v-model="radio">
              <el-radio :label="3">网页的任何地方</el-radio>
              <el-radio :label="6">仅网页的标题中</el-radio>
              <el-radio :label="9">仅在网页的URL中</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-form-item>
        <el-form-item label="" style="font-size: 13px;font-family: arial;margin-bottom: 0px">
          <el-form-item label="" prop="name">
            <el-button type="primary" style="margin-left: 180px" onclick="search">高级搜索</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>

  export default {
    name: 'AdvancedSearch',
    data() {
      return {
        radio:'3',
        ruleForm: {
          name1: '',
          name2: '',
          name3: '',
          name4: '',
          time: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
      };
    },
    methods: {
      search() {
        this.$router.push({ path: '/dashboard'})
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
  .header {
    background-color: white;
    color: #333;
    line-height: 60px;
    position: fixed;
    top: 0px;
    padding-left: 20%;
    width: 100%;
    z-index: 99;
    /*box-shadow:0 0 1px #000 inset;*/
    border-bottom: 1px solid #ebebeb;
    box-shadow: 0 0 5px #888;
  }
  .main {
    margin-top: 40px;
    padding: 10px 0 0 0;
  }

</style>


<style scoped>
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
