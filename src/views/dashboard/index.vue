<template>

  <el-container>
    <!--    头部搜索框-->
    <el-header class="header">
      <div class="logo" style="position: absolute;left: 40px;margin-top: -5px">
<!--        <div class="logoImg" style="width: 48px;height: 48px">&nbsp</div>-->
<!--        <span style="margin-bottom: 3px;margin-left: 30px">关键字</span>-->
        关键字
      </div>
      <div class="searchInput" style="position: absolute;left: 20px">
        <el-input v-if="SelectRadio == '1'" v-model="searchKey.keys" placeholder="请输入内容" style="width: 440px" @keyup.enter.native="searchInfoKey"/>
        <el-input v-if="SelectRadio == '2'" v-model="searchURL.urlKey" placeholder="请输入内容" style="width: 440px" @keyup.enter.native="searchInfoKey"/>
        <el-button slot="append" icon="el-icon-search" style="background: #3385ff;border-bottom: 1px solid #2d78f4;color: #fff;" @click.native="searchInfoKey">搜索</el-button>
        <el-link :underline="false" style="border-bottom: 1px solid #333;height: 12px;font-family: arial;font-size: 12px;margin-left: 30px" @click="drawer = true">高级搜索</el-link>
        <el-link :underline="false" style="border-bottom: 1px solid #333;height: 12px;font-family: arial;font-size: 12px;margin-left: 30px" @click="toUrlSearch">URL模式</el-link>
<!--        <template>-->
<!--          <el-radio style="margin-left: 15px" v-model="SelectRadio" label="1">Host模式</el-radio>-->
<!--          <el-radio v-model="SelectRadio" label="2">URL模式</el-radio>-->
<!--        </template>-->
      </div>
      <div style="width: 280px;height: 30px;float: right">
        <el-link v-if="SelectRadio == '1'" :underline="false" style="border-bottom: 1px solid #333;height: 12px;font-family: arial;font-size: 12px;" @click="toShop">host购物车</el-link>
        <el-link v-if="SelectRadio == '2'" :underline="false" style="border-bottom: 1px solid #333;height: 12px;font-family: arial;font-size: 12px;" @click="toUrlShop">URL购物车</el-link>

        <el-divider direction="vertical"/>
        <el-link :underline="false" style="border-bottom: 1px solid #333;height: 12px;font-family: arial;font-size: 12px;" @click="toHelp">帮助</el-link>
        <el-divider direction="vertical"/>
        <!--        <el-link :underline="false" style="border-bottom: 1px solid #333;height: 12px;font-family: arial;font-size: 12px;" @click="toMine">个人</el-link>-->
        <div class="dropdown">
          <el-link :underline="false" style="border-bottom: 1px solid #333;height: 12px;font-family: arial;font-size: 12px;" @click="toMine">个人</el-link>
          <div class="dropdown-content" style="margin-left: -30px;padding-top: 0px">
            <el-link style="height: 30px;font-size: 12px;margin-top: 0px;" @click="toMine">个人信息</el-link>
            <el-link style="height: 30px;font-size: 12px" @click="toLable">标签预览</el-link>
          </div>
        </div>
        <el-divider direction="vertical"/>
        <div class="dropdown">
          <el-link v-if="admin" :underline="false" style="border-bottom: 1px solid #333;height: 12px;font-family: arial;font-size: 12px;" @click="toUser">系统管理</el-link>
          <div class="dropdown-content" style="margin-left: -30px;padding-top: 0px">
            <el-link style="height: 30px;font-size: 12px;margin-top: 0px;" @click="toUser">用户管理</el-link>
            <!--            <el-link style="height: 30px;font-size: 12px" @click="toLable">标签预览</el-link>-->
            <el-link style="height: 30px;font-size: 12px" @click="toLableControl">标签管理</el-link>
          </div>
        </div>

      </div>

    </el-header>
    <!--    <signIn></signIn>-->
    <el-drawer
      :visible.sync="drawer"
      :with-header="false"
      direction="ttb"
      size="50%"
      modal="false">
      <div style="width:100%;height:100%;background-color:  #fafafa;">
        <el-main style="position:absolute;width: 1024px;left: calc(50% - 512px);background: #fafafa;">
          <el-form ref="ruleForm" :model="ruleForm" label-width="180px">
            <el-form-item label="" prop="name" style="font-size: 13px;font-family: arial;background-color: #f3f3f3;margin-bottom: 0px">
              <el-form-item label="包含以下全部的关键词" prop="name">
                <input v-model="ruleForm.allInKey"></input>
              </el-form-item>
              <el-form-item label="包含以下的完整关键词" prop="name">
                <input v-model="ruleForm.isKey"></input>
              </el-form-item>
              <el-form-item label="包含以下任意一个关键词" prop="name">
                <input v-model="ruleForm.inKey"></input>
              </el-form-item>
              <el-form-item label="不包括以下关键词" prop="name">
                <input v-model="ruleForm.notInKey"></input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="" prop="region" style="font-size: 13px;font-family: arial;margin-bottom: 0px">
              <el-form-item label="近7日pv值区间" prop="name">
                <input v-model="advancedKey.pvBegin"></input>  -  <input v-model="advancedKey.pvEnd"></input>
              </el-form-item>
            </el-form-item>
            <el-form-item label="" prop="region" style="font-size: 13px;font-family: arial;margin-bottom: 0px">
              <el-form-item label="近7日uv值区间" prop="name">
                <input v-model="advancedKey.uvBegin"></input>  -  <input v-model="advancedKey.uvEnd"></input>
              </el-form-item>
            </el-form-item>
            <!--            <el-form-item label="" prop="region" style="font-size: 13px;font-family: arial;margin-bottom: 0px">-->
            <!--              <el-form-item label="关键字正则匹配" prop="name">-->
            <!--                <input v-model="ruleForm.time"></input>-->
            <!--              </el-form-item>-->
            <!--            </el-form-item>-->
            <!--              <el-form-item label="时间：" prop="region" style="font-size: 13px;font-family: arial;margin-bottom: 0px">-->
            <!--                <el-form-item label="限定要搜索的网页的时间" prop="name">-->
            <!--                  <input v-model="ruleForm.time"></input>-->
            <!--                </el-form-item>-->
            <!--              </el-form-item>-->
            <!--              <el-form-item label="关键字位置：" style="font-size: 13px;font-family: arial;margin-bottom: 0px">-->
            <!--                <el-form-item label="查询关键字位于" prop="name">-->
            <!--                  <el-radio-group v-model="radio">-->
            <!--                    <el-radio :label="1">网页的任何地方</el-radio>-->
            <!--                    <el-radio :label="2">仅网页的标题中</el-radio>-->
            <!--                    <el-radio :label="3">仅在网页的URL中</el-radio>-->
            <!--                  </el-radio-group>-->
            <!--                </el-form-item>-->
            <!--              </el-form-item>-->
            <el-form-item label="" style="font-size: 13px;font-family: arial;margin-bottom: 0px">
              <el-form-item label="" prop="name">
                <el-button type="primary" style="margin-left: 180px" @click="advancedSearch">高级搜索</el-button>
                &nbsp;&nbsp;&nbsp;&nbsp;<el-link type="primary" @click="showhelp">使用帮助</el-link>
              </el-form-item>
            </el-form-item>
          </el-form>
        </el-main>
      </div>
    </el-drawer>
    <!--    中间内容部分-->
    <el-main class="main">
      <!--      分类条件筛选部分-->
      <div v-if="SelectRadio == '1'" style="background: #f8f8f8;line-height: 40px">
        <el-tabs v-model="activeName" class="tab-container" style="line-height:40px;margin-left: 120px;padding-top:5px;line-height:30px;font-size: 20px;overflow-y:hidden;" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) in tabPane"
            :label="item.sortName"
            :name="item.sortCode">
            <el-row>
              <div>
                <div v-for="(item2, index2) in item.son">
                  <el-link style="width: 100px" @click="searchking('POI_CLS1_CODE,POI_CLS2_CODE',item.sortCode + ',' + item2.sortCode.substring(item.sortCode.length,item2.sortCode.length))">{{item2.sortName}}</el-link>
                  <el-divider direction="vertical"/>
                  <div v-for="(item3, index3) in item2.son" style="display: inline-block">
                    <!--                    <el-popover-->
                    <!--                      placement="top-start"-->
                    <!--                      trigger="hover">-->
                    <!--                      <div v-for="(item4, index4) in item3.son">-->
                    <!--                        <el-link style="width: 100px" @click="searchking('POI_CLS1_CODE,POI_CLS2_CODE,POI_CLS3_CODE,POI_CLS4_CODE',item.sortCode + ',' + item2.sortCode + ','+item3.sortCode + ',' + item4.sortCode)">{{item4.sortName}}</el-link>-->
                    <!--                        <el-divider direction="vertical"/>-->
                    <!--                        <div v-for="(item5, index5) in item4.son" style="display: inline-block">-->
                    <!--                          <el-link style="margin-right: 15px" @click="searchking('POI_CLS1_CODE,POI_CLS2_CODE,POI_CLS3_CODE,POI_CLS4_CODE,POI_CLS5_CODE',item.sortCode + ',' + item2.sortCode + ','+item3.sortCode + ',' + item4.sortCode + ',' +item5.sortCode)">{{item5.sortName}}</el-link>-->
                    <!--                        </div>-->
                    <!--                      </div>-->
                    <el-link slot="reference" style="margin-right: 15px" @click="searchking('POI_CLS1_CODE,POI_CLS2_CODE,POI_CLS3_CODE',item.sortCode + ',' + item2.sortCode.substring(item.sortCode.length,item2.sortCode.length) + ','+item3.sortCode.substring(item2.sortCode.length,item3.sortCode.length))">{{item3.sortName}}</el-link>
                    <!--                    </el-popover>-->
                  </div>
                </div>
              </div>
            </el-row>
          </el-tab-pane>
          <el-tab-pane
            label=">>更多"
            name="last"></el-tab-pane>

          <!--          <el-tab-pane label="银行" name="second"></el-tab-pane>-->
          <!--          <el-tab-pane label="交通" name="third"></el-tab-pane>-->
          <!--          <el-tab-pane label="游戏" name="fourth"></el-tab-pane>-->
          <!--          <el-tab-pane label="动漫" name="five"></el-tab-pane>-->
          <!--          <el-tab-pane label=">>更多" name=""></el-tab-pane>-->
        </el-tabs>

      </div>

      <!--      搜索结果内容-->
      <div style="margin-left: 120px;margin-top: 10px">
        <el-checkbox v-model="allCheck" @change="allChecks">全选</el-checkbox>
        <el-button style="margin-left: 10px;height: 30px;padding-top: 7px" @click="addShop">批量加入购物车</el-button>
      </div>
      <div style="margin-left: 120px;">
        <div style="width: 770px;float: left;">
          <div v-for="(item, index) in tableData">
            <el-checkbox v-model="checks[index]" style="margin-left: -20px;top: 8px;" @click="oneCheck(index)" />
            <el-link :underline="false" style="border-bottom: 1px solid black;margin-top: 14px;color: #0000CC" @click="toURL(item.urlShop)">{{ item.title }}</el-link><br>
            <span style="margin-right: 5px;color: green;font-size: 14px;">{{item.uriShow}}</span>
            <span style="font-size: 12px;color: #4C4C4C;font-weight: bold">近七日UV/PV：{{ item.uv }}/{{ item.pv }}</span><br>
            <span style="font-size: 13px;"><span style="color: #97a8be"></span>{{ item.content }}</span><br>
            <span v-if="item.sort" style="font-size: 12px;color: #4C4C4C">分类：{{ item.sort}}</span><br v-if="item.sort">
            <span style="font-size: 12px;color: #4C4C4C">
              <el-link style=";border-bottom: 1px solid black;height: 12px;margin-left: 5px" @click="addShopOne(index)">加入购物车</el-link>
            </span><br>
          </div>
          <!--          分页-->
          <el-pagination
            :total=total
            style="padding: 15px 0 15px 0;width: 100%"
            background
            :current-page=pageIn
            :page-size="10"
            @current-change="handleCurrentChange"
            font-size="12px !important"
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"/>
        </div>
<!--高级搜索帮助弹框-->
        <el-dialog title="高级搜索使用帮助" :visible.sync="dialogFormVisibleHelp">
          <h3>高级搜索使用</h3>
          <p>按照高级搜索中的描述依次填写，可以选择pv,和uv的区间，也可以使用正则表达式进行搜索。多个关键字用空格分隔。</p>
          <h5>搜索规则</h5><br>
          <p>1.搜索结果中默认包含搜索框中的全部的关键词。例如：输入（游戏 java）,搜索的结果中包含游戏并且同时包含java</p><br>
          <p>2.搜索结果包含以下的完整关键词。例如：输入（游戏 java）,搜索的结果中包含“游戏 java”，即不进行分词处理</p><br>
          <p>3.搜索结果包含以下任意一个关键词。例如：输入（游戏 java）,搜索的结果中包含游戏或者包含java</p><br>
          <p>4.搜索结果不包括以下关键词。例如：输入（游戏 java）,搜索的结果中将不会包括游戏和java(使用该规则的前提为规则1，2，3中的值不都为空)</p><br>
          <p>5.正则表达式搜索的是按照uri上匹配的结果</p><br>
          <p></p>
          <p></p>
          <p></p>

        </el-dialog>

        <div style="width: 300px;float: left;white-space:nowrap;border-left: 1px solid red" >
          <div style="width: 300px;margin-left: 80px;margin-top:15px;position: absolute;">
            <!--            &lt;!&ndash;            热点搜索&ndash;&gt;-->
            <!--            <span class="hot_search">热点搜索</span>-->
            <!--            <div v-for="(item, index) in hot" >-->
            <!--              <div style="margin-top: 15px">-->
            <!--                <div v-if="index == 0" class="hotli" style="background-color: #f54545;">{{ index+1 }}</div>-->
            <!--                <div v-if="index == 1" class="hotli" style="background-color: #ff8547">{{ index+1 }}</div>-->
            <!--                <div v-if="index == 2" class="hotli" style="background-color: #ffac38;">{{ index+1 }}</div>-->
            <!--                <div v-if="index > 2" class="hotli" style="background-color: #8eb9f5;">{{ index+1 }}</div>-->
            <!--                <div style="display: inline-block;border-bottom: 1px solid #606266;width: 285px">-->
            <!--                  <el-link @click="toURL(item.host)">{{ item.title }}</el-link>-->
            <!--                  <span style="float: right">{{ item.pvuv }}</span>-->
            <!--                </div>-->
            <!--              </div>-->
            <!--              &lt;!&ndash;              <el-divider style="margin-top: 0"></el-divider>&ndash;&gt;-->
            <!--            </div>-->

            <!--            &lt;!&ndash;            行业精选&ndash;&gt;-->
            <!--            <div style="margin-top: 30px">-->
            <!--              <span class="hot_search">行业精选</span>-->
            <!--            </div>-->
            <!--            <div v-for="(item, index) in selected" >-->
            <!--              <div style="margin-top: 15px">-->
            <!--                <div v-if="index == 0" class="hotli" style="background-color: #f54545;">{{ index+1 }}</div>-->
            <!--                <div v-if="index == 1" class="hotli" style="background-color: #ff8547">{{ index+1 }}</div>-->
            <!--                <div v-if="index == 2" class="hotli" style="background-color: #ffac38;">{{ index+1 }}</div>-->
            <!--                <div v-if="index > 2" class="hotli" style="background-color: #8eb9f5;">{{ index+1 }}</div>-->
            <!--                <el-link style="border-bottom: 1px solid #606266;">{{ item.title }}</el-link>-->
            <!--                &lt;!&ndash;                <span style="float: right">{{item.pvuv}}</span>&ndash;&gt;-->
            <!--              </div>-->
            <!--              &lt;!&ndash;              <el-divider style="margin-top: 0"></el-divider>&ndash;&gt;-->
            <!--            </div>-->

            <!--            &lt;!&ndash;            相关搜索&ndash;&gt;-->
            <!--            <div style="margin-top: 45px">-->
            <!--              <span class="hot_search">相关搜索</span><br>-->
            <!--              <div v-for="(item, index) in content" style="float: left;margin-right: 15px">-->
            <!--                <div style="margin-top: 15px;">-->
            <!--                  <el-link>{{ item.title }}</el-link>-->
            <!--                </div>-->
            <!--                <el-divider style="margin-top: 0"/>-->
            <!--              </div>-->
            <!--            </div>-->
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import axios from 'axios'
  import advancedSearch from './../advancedSearch'
  import lable from './../lable'
  import signIn from './../signIn'
  import { searchKeys,searchKind } from '../../api/search'
  import { searchSort,findSortInfo,searchKey } from '../../api/sort'
  import {addToShop} from '../../api/shop'

  import {mapGetters} from 'vuex'
  export default {
    name: 'Dashboard',
    components: { advancedSearch, signIn, lable },
    data() {
      return {
        allCheck: false,
        dialogFormVisibleHelp:false,//弹框
        radio: '2',
        pageIn:1,
        SelectRadio:'1',
        total:0,
        searchfs:"",
        tabPaneName:'nothing',
        searchKey: {
          keys: '',
          page: 0
        },
        searchURL:{
          urlKey:"",
          pageable: 1
        },
        checks:[false,false,false,false,false,false,false,false,false,false],
        advancedKey: {
          rules: '',
          pvBegin:'',
          pvEnd:'',
          uvBegin:'',
          uvEnd:'',
          page: 0
        },
        sorts: {
          parent: "0"
        },
        dialogFormVisible: true,
        activeName: 'nothing',
        drawer: false,
        findsort:{
          sortCode:"",
          keys:"",
          page:1
        },
        ruleForm: {
          allInKey: '',
          isKey: '',
          inKey: '',
          notInKey: '',
          time: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        sortKinds:[],
        searchKinds: {
          sortSize:"",
          sortCode:"",
          pages:""
        },


        tableData: [],
        hot: [{
          title: '英雄联盟LPL总决赛',
          pvuv: '309万',
          host: 'https://lol.qq.com/main.shtml'
        }, {
          title: 'PPD中单亚索带崩三路',
          pvuv: '302万',
          host: 'https://lol.qq.com/main.shtml'
        }, {
          title: '剑网三元宵盒子',
          pvuv: '204万',
          host: 'https://lol.qq.com/main.shtml'
        }, {
          title: 'RNG战队官宣LPL春季赛名单 Uzi首发',
          pvuv: '110万',
          host: 'https://lol.qq.com/main.shtml'
        }, {
          title: 'WE微博官宣：前KT战队教练Noex加入',
          pvuv: '89万',
          host: 'https://lol.qq.com/main.shtml'
        }],
        selected: [{
          title: '英雄联盟 -- LPL总决赛视频',
          pvuv: '309万',
          host: 'https://lol.qq.com/main.shtml'
        }, {
          title: '剑网三 -- 重磅推出免点卡任意玩',
          pvuv: '302万',
          host: 'https://lol.qq.com/main.shtml'
        }, {
          title: '剑网三 -- 推出元宵打灯活动',
          pvuv: '204万',
          host: 'https://lol.qq.com/main.shtml'
        }, {
          title: '逆水寒 -- 重磅推出免点卡任意玩活动',
          pvuv: '110万',
          host: 'https://lol.qq.com/main.shtml'
        }, {
          title: 'WE微博官宣 -- 前KT战队教练Noex加入',
          pvuv: '89万',
          host: 'https://lol.qq.com/main.shtml'
        }],
        content: [{
          title: '冒险手机游戏',
          pvuv: '309万'
        }, {
          title: '冒险岛手机版官网',
          pvuv: '302万'
        }, {
          title: '冒险岛',
          pvuv: '302万'
        }, {
          title: '冒险益智小游戏',
          pvuv: '204万'
        }, {
          title: '猪猪公寓手机游戏下载',
          pvuv: '110万'
        }, {
          title: '冒险闯关游戏',
          pvuv: '89万'
        }, {
          title: '闯关游戏',
          pvuv: '89万'
        }, {
          title: '冒险游戏',
          pvuv: '89万'
        }],
        tabPane: [{
          title: '金融',
          name: 'firdt'
        },
          {
            title: '医疗',
            name: 'second'
          },
          {
            title: '交通',
            name: 'thrid'
          },
          {
            title: '游戏',
            name: 'forth'
          },
          {
            title: '教育',
            name: 'jy'
          },
          {
            title: '能源',
            name: 'fiveth'
          },
          {
            title: '快递',
            name: 'six'
          },
          {
            title: '餐饮',
            name: 'server'
          }, {
            title: 'IT',
            name: 'eight'
          },
          {
            title: '>>更多',
            name: 'last'
          }],
        tempShop:{        // 购物车字段
          id:'',
          title:'',
          pv:'',
          uv:'',
          content:'',
          crtTime:'',
          url:'',
          webId:'',
          userId:'',   // 当前操作用户的id
          deleteState:''
        },
        shops:{
          arr:[]
        },
        admin:false
      }
    },
    created(){
      this.searchSorts()
      this.searchKind();
      for (let i = 0 ;i<this.$store.getters.roles.length ; i++){
        if(this.$store.getters.roles[i] === 'ADMIN'){
          this.admin = true
        }
      }
    },
    methods: {
      addShop(){
        this.shops.arr =[]
        console.log(this.checks)
        for(let i =0;i<this.tableData.length;i++){
          if(this.checks[i]){
            this.tempShop.title = this.tableData[i].title
            this.tempShop.pv = this.tableData[i].pv
            this.tempShop.uv = this.tableData[i].uv
            this.tempShop.content = this.tableData[i].content
            this.tempShop.url = this.tableData[i].urlShop
            this.tempShop.webId = this.tableData[i].uri
            this.tempShop.userId = this.userId
            let obj
            if(this.SelectRadio == '2'){
              obj={
                id:'',
                title: this.tempShop.title ,
                pv: this.tempShop.pv ,
                uv: this.tempShop.uv,
                content:this.tempShop.content,
                crtTime:'',
                url: this.tempShop.url,
                webId: this.tempShop.webId,
                userId:this.tempShop.userId,   // 当前操作用户的id
                deleteState:'1',
                type:"url"
              }
            }else{
              obj={
                id:'',
                title: this.tempShop.title ,
                pv: this.tempShop.pv ,
                uv: this.tempShop.uv,
                content:this.tempShop.content,
                crtTime:'',
                url: this.tempShop.url,
                webId: this.tempShop.webId,
                userId:this.tempShop.userId,   // 当前操作用户的id
                deleteState:'1'
              }
            }
            this.shops.arr.push(obj)
          }
        }
        if(this.shops.arr.length===0){
          this.$message.info("请先勾选host")
        }else{
          console.log(this.shops.arr)
          addToShop(this.shops).then(data=>{
            this.$message.success("成功添加到购物车")
            // this.toShop()
          })
        }
      },
      showhelp(){
        this.dialogFormVisibleHelp = true;
      },




      ////////////////////////////////////////////
      handleClick(tab, event) {
        console.log(tab)
        if (this.activeName !== this.findsort.sortCode && tab.name != 'last') {
          this.sorts.parent = tab.name
          // searchSort(this.sorts).then(response => {
          //   console.log(response)
          //   this.sortKinds2 = response.data
          // })
        }else {
          this.activeName = 'nothing'
        }


        const that = this
        console.log(event.target.innerText == '>>更多')
        if (event.target.innerText == '>>更多') {
          this.$router.push({ path: '/kinds' })
        }
      },
      handleClicks(parent,index){
        console.log(parent)
        this.sorts.parent = parent
        searchSort(this.sorts).then(response => {
          console.log(response)
          if(index == 2){
            this.sortKinds3 = response.data
          }else if(index == 3){
            this.sortKinds4 = response.data
          }else if(index == 4){
            this.sortKinds5 = response.data
          }else if(index == 5){

          }
        })

      },

      closeTab() {
        console.log(1111, this.activeName)
        // this.activeName = ''
      },
      oneCheck(index){
        this.checks[index] =!this.checks[index]

      },
      toEvaluate() {
        this.$router.push({ path: '/evaluate' })
      },
      toLable() {
        this.$router.push({ path: '/lable' })
      },
      searchKind() {
        if (this.$route.query.sort && this.$route.query.code) {
          console.log(this.$route.params.sort)
          this.searchking(this.$route.query.sort,this.$route.query.code)
        }
      },
      toShop() {
        this.$router.push({ path: '/shop' })
      },
      toUrlShop() {
        this.$router.push({ path: '/urlShop' })
      },
      toUrlSearch() {
        this.$router.push({ path: '/toUrlSearch' })
      },
      toMine() {
        console.log('1111')
        this.$router.push({ path: '/mine' })
      },
      toUser(){
        this.$router.push({ path: '/user' })
      },
      toHelp() {
        this.$router.push({ path: '/help' })
      },
      toURL(url) {
        if(url != ""){
          window.open(url, '_blank')
        }else{
          this.$message('找不到对应链接 ');
        }
      },
      allChecks() {

        console.log("sdfgh")
        if (this.allCheck) {
          for (let i = 0; i < this.checks.length; i++) {
            console.log(this.checks.length)
            this.checks[i] = true
          }
        } else {
          for (let i = 0; i < this.checks.length; i++) {
            this.checks[i]= false
          }
        }
      },
      toLableControl() {
        this.$router.push({ path: '/labelControl'})
      },
      searchking(index,sortCode){
        this.searchfs = ""
        this.searchKinds.sortSize = index
        this.searchKinds.sortCode = sortCode
        this.searchKinds.pages  = this.pageIn-1
        searchKind(this.searchKinds).then(response => {
          console.log(response)
          this.tableData = response.data
          this.total = response.total
          if(response.data.length == 0) {
            this.$message('搜索结果0条记录');
          }
        })

      },
      mouseEnter() { this.isActive = true },
      mouseOut() { this.isActive = false },
      searchInfoKey(){
        if(this.SelectRadio == '1'){
          this.ruleForm.allInKey = ""
          this.ruleForm.isKey = ""
          this.ruleForm.inKey = ""
          this.ruleForm.notInKey = ""
          this.advancedKey.pvBegin = ""
          this.advancedKey.uvBegin = ""
          this.advancedKey.pvEnd = ""
          this.advancedKey.uvEnd = ""
          this.searchfs = 'key'
          this.searchInfo();
        }else {


        }
      },
      searchInfo() {
        if(this.searchfs == 'key'){
          if(this.searchKey.keys != ""){
            searchKeys(this.searchKey).then(response => {
              console.log(response)
              this.tableData = response.data
              this.total = response.total
            })
          }
        }else if(this.searchfs == 'high'){
          searchKeys(this.advancedKey).then(response => {
            console.log(response)
            this.tableData = response.data
          })
        } else {
          searchKind(this.searchKinds).then(response => {
            console.log(response)
            this.tableData = response.data
            this.total = response.total
          })
        }
      },
      searchSorts() {
        searchSort(this.sorts).then(response => {
          console.log(response)
          this.tabPane = response.data
          this.activeName = response.data[0].sortCode
        })
      },
      kindClick(val) {
        this.findsort.sortCode = val
        searchKey(this.findsort).then(response => {
          console.log(response)
          this.tableData = response.data.content
        })
      },
      advancedSearch() {
        this.searchKey.keys = ""
        this.advancedKey.rules = 'allInKey€' + this.ruleForm.allInKey +
          '€isKey€' + this.ruleForm.isKey +
          '€inKey€' + this.ruleForm.inKey +
          '€notInKey€' + this.ruleForm.notInKey + '#'
        searchKeys(this.advancedKey).then(response => {
          console.log(response)
          this.tableData = response.data
          this.total = response.total
          this.searchfs = "high"
        })
        this.drawer = false
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {})
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.searchKey.page = val -1
        this.searchKinds.pages = val - 1
        this.findsort.page = val
        this.advancedKey.page = val - 1
        this.searchInfo()
        this.allCheck = false
        this.allChecks()
      },
      addShopOne(index){
        this.tempShop.title = this.tableData[index].title
        this.tempShop.pv = this.tableData[index].pv
        this.tempShop.uv = this.tableData[index].uv
        this.tempShop.content = this.tableData[index].content
        this.tempShop.url = this.tableData[index].urlShop
        this.tempShop.webId = this.tableData[index].uri
        this.tempShop.userId = this.userId
        let obj
        if(this.SelectRadio == '2'){

        }
         if(this.SelectRadio == '2'){
           obj= {
             id: '',
             title: this.tempShop.title,
             pv: this.tempShop.pv,
             uv: this.tempShop.uv,
             content: this.tempShop.content,
             crtTime: '',
             url: this.tempShop.url,
             webId: this.tempShop.webId,
             userId: this.tempShop.userId,   // 当前操作用户的id
             deleteState: '1',
             type: "url"
           }
           }else{
             obj={
               id:'',
               title: this.tempShop.title ,
               pv: this.tempShop.pv ,
               uv: this.tempShop.uv,
               content:this.tempShop.content,
               crtTime:'',
               url: this.tempShop.url,
               webId: this.tempShop.webId,
               userId:this.tempShop.userId,   // 当前操作用户的id
               deleteState:'1'
             }
           }

        this.shops.arr.push(obj)
        addToShop(this.shops).then(data=>{
          this.$message.success("成功添加到购物车")
          // this.toShop()
        })


      }

    },
    computed: {
      ...mapGetters([
        'userId'
      ]),
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
  .logo {
    float: left;
    width: 60px;
    top: 5px;
  }
  .logoImg {
    /*background: url("../../images/logo2.png") no-repeat;*/
    background-size: 100% 100%;
  }
  .searchInput {
    float: left;
    margin-left: 100px;
    position: absolute;
    z-index: 100;
    /*width: 40%*/
  }
  .el-divider{
    margin-top: 0px;
    margin-bottom: 0px;
  }
  .hotli{
    display: inline-block;
    padding: 1px 0;
    color: #fff;
    width: 14px;
    line-height: 100%;
    font-size: 12px;
    text-align: center;
    /*background-color: #f54545;*/
    font-family: arial;
  }
  .hot_search{
    font-size: 14px;
    line-height: 1.29;
    font-weight: 700;
    position: relative;
    margin-bottom: .5px;
    color: #333;
    word-break: normal;
    font-family: arial;
  }
  .dropdown {
    position: relative;
    display: inline-block;
  }
  .dropdown-content {
    display: none;
    position: absolute;
    background-color: #f9f9f9;
    min-width: 90px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    padding: 12px 16px;
  }
  .dropdown:hover .dropdown-content {
    display: block;
  }
  .tab-container /deep/ .el-tabs__nav-wrap::after {
    background: transparent;
  }
  .tab-container /deep/ .el-tabs__header{
    margin: 0;
  }
</style>
