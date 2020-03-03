<template>
  <el-container style="background-color: #eee;">
    <!--    头部搜索框-->
<!--    <el-header>-->
<!--      <div style="margin-top:10px;font-size: 28px;position:absolute;width: 1024px;left: calc(50% - 512px);">标签自助挖掘平台自助中心</div>-->
<!--    </el-header>-->

    <!--    中间内容部分-->
    <el-main style="position:absolute;width: 880px;left: calc(50% - 440px);">
<!--      文章-->
      <div style="width: 100%;border: 1px solid #eeeeee">

      </div>
<!--      历史评论-->
      <div v-for="(item,index) in pl" style="width: 100%;border: 1px solid #eeeeee;line-height: 50px">
        <div style="font-size: 12px;height: 23px;float: right">{{item.date}}</div>
        <div style="font-size: 16px;height: 23px">{{item.title}}</div>
        <div style="font-size: 12px;margin-left: 50px">{{item.content}}</div>
      </div>
<!--      评论框-->
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入评价内容"
        v-model="textarea"
        style="margin-top: 30px">
      </el-input>
      <el-button style="float: right;margin-top: 10px" type="primary">发布</el-button>
    </el-main>
  </el-container>
</template>

<script>

  export default {
    name: 'Evaluate',
    data() {
      return {
        pl:[{
          title:"文章写的不错，赞！！！",
          content:"我觉的这篇文章写的很好，给你一个大大的赞",
          date:"2020-02-20"
        },
          {
            title:"水一下",
            content:"随便水一下，经验+5！！！！",
            date:"2020-02-20"
          },
          {
            title:"文章写的不错，赞！！！",
            content:"我觉的这篇文章写的很好，给你一个大大的赞",
            date:"2020-02-20"
          },
          {
            title:"文章写的不错，赞！！！",
            content:"我觉的这篇文章写的很好，给你一个大大的赞",
            date:"2020-02-20"
          },
          {
            title:"文章写的不错，赞！！！",
            content:"我觉的这篇文章写的很好，给你一个大大的赞",
            date:"2020-02-20"
          }],
        textarea:""
      };
    },
    methods: {}
  }
</script>

<style>
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
  .el-container {
    -webkit-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
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
