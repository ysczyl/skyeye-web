<template>
  <el-container style="background-color: #eee;">
    <!--    头部搜索框-->
        <el-header>
          <div style="margin-top:10px;font-size: 28px;position:absolute;width: 1024px;left: calc(50% - 512px);">标签自助挖掘平台自助中心</div>
        </el-header>

    <!--    中间内容部分-->
    <el-main style="position:absolute;width: 1024px;left: calc(50% - 512px);top: 60px;">
      <h3>普通搜索使用</h3>
      <p>在输入框中输入需要搜索的关键字，点击搜索，多个关键字用空格分隔</p>
      <h5>搜索规则</h5>
      <p>搜索结果中默认包含搜索框中的全部的关键词。例如：输入（游戏 java）,搜索的结果中包含游戏并且同时包含java</p>
      <h3>高级搜索使用</h3>
      <p>按照高级搜索中的描述依次填写，可以选择pv,和uv的区间，也可以使用正则表达式进行搜索。多个关键字用空格分隔。</p>
      <h5>搜索规则</h5>
      <p>1.搜索结果中默认包含搜索框中的全部的关键词。例如：输入（游戏 java）,搜索的结果中包含游戏并且同时包含java</p>
      <p>2.搜索结果包含以下的完整关键词。例如：输入（游戏 java）,搜索的结果中包含“游戏 java”，即不进行分词处理</p>
      <p>3.搜索结果包含以下任意一个关键词。例如：输入（游戏 java）,搜索的结果中包含游戏或者包含java</p>
      <p>4.搜索结果不包括以下关键词。例如：输入（游戏 java）,搜索的结果中将不会包括游戏和java(使用该规则的前提为规则1，2，3中的值不都为空)</p>
      <p>5.正则表达式搜索的是按照uri上匹配的结果</p>
    </el-main>
  </el-container>
</template>

<script>

  export default {
    name: 'Help',
    data() {
      return {

      };
    },
    methods: {}
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
