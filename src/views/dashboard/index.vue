<template>


  <el-container>
    <!--    头部搜索框-->
    <el-header class="header">
      <div class="logo" style="position: absolute;left: 30px">
        <div class="logoImg" style="width: 48px;height: 48px">&nbsp</div>
      </div>
      <div class="searchInput" style="position: absolute;left: 20px">
        <el-input placeholder="请输入内容" v-model="searchKey.keys" style="width: 440px">
        </el-input>

        <el-button slot="append" icon="el-icon-search" style="background: #3385ff;border-bottom: 1px solid #2d78f4;color: #fff;" @click.native="searchInfo">搜索</el-button>
        <el-link :underline="false" style="border-bottom: 1px solid #333;height: 12px;font-family: arial;font-size: 12px;margin-left: 30px" @click="drawer = true">高级搜索</el-link>
<!--        <el-button size="small" style="position: absolute;right: 0px;top: 60px;z-index: 60">批量加入分类</el-button>-->
      </div>
      <div style="width: 200px;height: 30px;float: right">
        <el-link :underline="false" style="border-bottom: 1px solid #333;height: 12px;font-family: arial;font-size: 12px;" @click="toShop">host购物车</el-link>
        <el-divider direction="vertical"></el-divider>
        <el-link :underline="false" style="border-bottom: 1px solid #333;height: 12px;font-family: arial;font-size: 12px;" @click="toHelp">帮助</el-link>
        <el-divider direction="vertical"></el-divider>
<!--        <el-link :underline="false" style="border-bottom: 1px solid #333;height: 12px;font-family: arial;font-size: 12px;" @click="toMine">个人</el-link>-->
        <div class="dropdown">
          <el-link :underline="false" style="border-bottom: 1px solid #333;height: 12px;font-family: arial;font-size: 12px;" @click="toMine">个人</el-link>
          <div class="dropdown-content" style="margin-left: -30px;padding-top: 0px">
            <el-link style="height: 30px;font-size: 12px;margin-top: 0px;" @click="toMine">个人信息</el-link>
            <el-link style="height: 30px;font-size: 12px" @click="toLable">标签预览</el-link>
          </div>
        </div>
      </div>



    </el-header>
<!--    <signIn></signIn>-->
    <el-drawer
      :visible.sync="drawer"
      direction="ttb"
      size="50%"
      :with-header="false"
      modal="false">
        <div style="width:100%;height:100%;background-color:  #fafafa;">
          <span style="padding: 15px;margin-top: 15px">高级搜索</span>
          <el-main style="position:absolute;width: 1024px;left: calc(50% - 512px);background: #fafafa;">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="180px">
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
                <el-form-item label="pv值区间" prop="name">
                  <input></input>  -  <input></input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="" prop="region" style="font-size: 13px;font-family: arial;margin-bottom: 0px">
                <el-form-item label="uv值区间" prop="name">
                  <input></input>  -  <input></input>
                </el-form-item>
              </el-form-item>
              <el-form-item label="" prop="region" style="font-size: 13px;font-family: arial;margin-bottom: 0px">
                <el-form-item label="关键字正则匹配" prop="name">
                  <input v-model="ruleForm.time"></input>
                </el-form-item>
              </el-form-item>
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
                </el-form-item>
              </el-form-item>
            </el-form>
          </el-main>
        </div>
    </el-drawer>
    <!--    中间内容部分-->
    <el-main class="main">
      <!--      分类条件筛选部分-->
      <div style="background: #f8f8f8;line-height: 40px">
        <el-tabs class="tab-container" style="line-height:40px;margin-left: 120px;padding-top:5px;line-height:30px;font-size: 20px;overflow-y:hidden;" v-model="activeName" @tab-click="handleClick">
          <el-tab-pane
            v-for="(item, index) in tabPane"
            :label="item.title"
            :name="item.name">
            <el-row v-if="item.name != 'jy' && item.name != 'last'">
              <span style="font-size: 14px;word-break: normal;margin-right: 15px">端游:</span>
              <el-link>动作</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>冒险</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>求生</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>角色扮演</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>格斗</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>战争</el-link>
            </el-row>

            <el-row v-if="item.name == 'jy' && item.name != 'last'">
              <span style="font-size: 14px;word-break: normal;margin-right: 15px"></span>
              <el-link>数学</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>外语</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>文学</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>艺术</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>体育</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>IT</el-link>
            </el-row>

            <el-row v-if="item.name != 'jy' && item.name != 'last'">
              <span style="font-size: 14px;word-break: normal;margin-right: 15px">手游:</span>
              <el-link>休闲</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>塔防</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>养成</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>角色扮演</el-link>
              <el-divider direction="vertical"></el-divider>
              <el-link>射击</el-link>
            </el-row>
          </el-tab-pane>

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
        <el-button style="margin-left: 10px;height: 30px;padding-top: 7px" @click="toShop">批量加入购物车</el-button>
      </div>
      <div style="margin-left: 120px;">
        <div style="width: 770px;float: left;">
          <div  v-for="(item, index) in tableData">
            <el-checkbox v-model="item.check" style="margin-left: -20px;top: 8px;"></el-checkbox>
            <el-link :underline="false" style="border-bottom: 1px solid black;margin-top: 14px;color: #0000CC" @click="toURL(item.uri)">{{item.title}}</el-link><br>
            <span style="font-size: 13px;"><span style="color: #97a8be">{{item.time}}</span>-{{item.content}}</span><br>
            <span style="font-size: 12px;color: #4C4C4C">pv/uv：{{item.pvuv}}</span><br>
            <span style="font-size: 12px;color: #4C4C4C">
              <el-link style="margin-right: 5px;color: green" @click="toURL(item.host)">{{item.uri}}</el-link><br>
              <el-link style=";border-bottom: 1px solid black;height: 12px" @click="toEvaluate">评价({{item.pjNum}})</el-link>
              <el-link style=";border-bottom: 1px solid black;height: 12px;margin-left: 5px" @click="toShop">加入购物车</el-link>
            </span><br>
            </div>
          <!--          分页-->
          <el-pagination
            style="padding: 15px 0 15px 0;width: 100%"
            background
            font-size="12px !important"
            layout="prev, pager, next"
            prev-text="上一页"
            next-text="下一页"
            :total="1000">
          </el-pagination>
        </div>




        <div style="width: 300px;float: left;white-space:nowrap;border-left: 1px solid red" >
          <div style="width: 300px;margin-left: 80px;margin-top:15px;position: absolute;">
            <!--            热点搜索-->
            <span class="hot_search">热点搜索</span>
            <div v-for="(item, index) in hot" >
              <div style="margin-top: 15px">
                <div class="hotli" v-if="index == 0" style="background-color: #f54545;">{{index+1}}</div>
                <div class="hotli" v-if="index == 1" style="background-color: #ff8547">{{index+1}}</div>
                <div class="hotli" v-if="index == 2" style="background-color: #ffac38;">{{index+1}}</div>
                <div class="hotli" v-if="index > 2" style="background-color: #8eb9f5;">{{index+1}}</div>
                <div style="display: inline-block;border-bottom: 1px solid #606266;width: 285px">
                  <el-link @click="toURL(item.host)">{{item.title}}</el-link>
                  <span style="float: right">{{item.pvuv}}</span>
                </div>
              </div>
<!--              <el-divider style="margin-top: 0"></el-divider>-->
            </div>


            <!--            行业精选-->
            <div style="margin-top: 30px">
              <span class="hot_search">行业精选</span>
            </div>
            <div v-for="(item, index) in selected" >
              <div style="margin-top: 15px">
                <div class="hotli" v-if="index == 0" style="background-color: #f54545;">{{index+1}}</div>
                <div class="hotli" v-if="index == 1" style="background-color: #ff8547">{{index+1}}</div>
                <div class="hotli" v-if="index == 2" style="background-color: #ffac38;">{{index+1}}</div>
                <div class="hotli" v-if="index > 2" style="background-color: #8eb9f5;">{{index+1}}</div>
                <el-link style="border-bottom: 1px solid #606266;">{{item.title}}</el-link>
<!--                <span style="float: right">{{item.pvuv}}</span>-->
              </div>
<!--              <el-divider style="margin-top: 0"></el-divider>-->
            </div>

            <!--            相关搜索-->
            <div style="margin-top: 45px">
              <span class="hot_search">相关搜索</span><br>
              <div v-for="(item, index) in content" style="float: left;margin-right: 15px">
                <div style="margin-top: 15px;">
                  <el-link>{{item.title}}</el-link>
                </div>
                <el-divider style="margin-top: 0"></el-divider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import advancedSearch from './../advancedSearch'
  import lable from './../lable'
  import signIn from './../signIn'
  import {searchKeys} from '../../api/search'


  export default {
  name: 'Dashboard',
  components: { advancedSearch ,signIn,lable},
  data() {
    return {
      allCheck:false,
      radio:'2',
      searchKey:{
        keys: '',
        page: 0
      },
      advancedKey:{
        rules: "",
        page:0
      },
      dialogFormVisible:true,
      activeName: 'first',
      drawer: false,
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
      tableData:[{
        title:"冒险岛官方网站(MapleStory)-爱我就来冒险吧!",
        content:"2D横版卷轴式网络游戏——《冒险岛Online》是旗下的一款超人气家庭休闲网游。整个游戏画面以2D平面展开,采用了与其他Q版2D游戏不同的横向卷轴的移动方式。游戏场景...",
        key:"4399",
        time:"2020-02-18",
        pvuv:"150/462",
        lable:"游戏",
        pjNum:"111",
        uri:"http://www.4399.com/top/top-6.htm",
        check:false
      },
        {
          title:"冒险小游戏,4399双人冒险小游戏,冒险类小游戏,4399小游戏",
          content:"14冰娃与火娃4 15火柴人吃豆豆2 16双刃战士无敌版 17天空之城冒险 18屁王兄弟无敌版 19超奥特曼格斗 20冰火人面兽 更多 全部冒险小游戏 123456..15 造梦...",
          key:"剑三",
          time:"2020-02-18",
          pvuv:"150/462",
          lable:"游戏",
          pjNum:"111",
          uri:"http://www.4399.com/top/top-6.htm",
          check:false
        },
        {
          title:"冒险小游戏_冒险小游戏大全_冒险游戏全集_7k7k冒险小游戏",
          content:"7k7k小游戏大全下设冒险小游戏大全为您提供各种冒险小游戏,冒险小游戏下载,双人冒险小游戏,希望你在7k7k冒险小游戏里玩的开心。",
          key:"中国银行",
          time:"2020-02-18",
          pvuv:"150/462",
          lable:"银行",
          pjNum:"111",
          uri:"http://www.4399.com/top/top-6.htm",
          check:false
        },
        {
          title:"安卓冒险游戏大全_好玩的安卓冒险游戏_安卓冒险游戏推荐-游戏下载",
          content:"我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...",
          key:"剑三",
          time:"2020-02-18",
          pvuv:"150/462",
          lable:"游戏",
          pjNum:"111",
          uri:"http://www.4399.com/top/top-6.htm",
          check:false
        },
        {
          title:"冒险游戏大全_冒险游戏排行榜_冒险单机游戏下载_游戏堡",
          content:"游戏堡为您提供最新的冒险游戏大全,这里有最热门的冒险游戏下载,以及冒险游戏排行榜,这里包含了一系列好玩的冒险游戏,好玩的冒险游戏尽在游戏堡冒险游戏大全。",
          key:"中国银行",
          time:"2020-02-18",
          pvuv:"150/462",
          lable:"银行",
          pjNum:"111",
          uri:"http://www.4399.com/top/top-6.htm",
          check:false
        },
        {
          title:"冒险岛online专区---17173网络游戏",
          content:"17173.com: 中文图形网络游戏尽在17173,17173冒险岛专区... 冒险岛心情故事[快速投稿]冒险的故事以及大家的心情文字,不管是开心还是难过,都可以尽情的表达。[...",
          key:"剑三",
          time:"2020-02-18",
          pvuv:"150/462",
          lable:"游戏",
          pjNum:"111",
          uri:"http://www.4399.com/top/top-6.htm",
          check:false
        },
        {
          title:"冒险小游戏_逗游小游戏",
          content:"猪猪侠丛林冒险 大头儿子小头爸爸 屁王兄弟2 森林冰火人6地狱 猫和老鼠历险记 大头儿子小头爸爸 冰火熊猫大冒险 超奥特曼冒险 森林冰火人大冒险 被诅咒的水晶 ...",
          key:"中国银行",
          time:"2020-02-18",
          pvuv:"150/462",
          lable:"银行",
          pjNum:"111",
          uri:"http://www.4399.com/top/top-6.htm",
          check:false
        },
        {
          title:"布莱克斌 来了-冒险岛2-腾讯游戏",
          content:"三大特权齐迎春《冒险岛2》官方网站,是腾讯旗下全新网游大作,延续了《冒险岛》的经典游戏品牌并融入沙盒玩法,是一款拥有萌爆的可爱画面、创新的房屋系统、自由丰富...",
          key:"剑三",
          time:"2020-02-18",
          pvuv:"150/462",
          lable:"游戏",
          pjNum:"111",
          uri:"http://www.4399.com/top/top-6.htm",
          check:false
        },
        {
          title:"冒险类手机游戏大全_冒险类网游/单机游戏下载_好玩的冒险类..._九游",
          content:"冒险类游戏大全提供最新最好玩的冒险类网游/单机手机游戏下载,推荐权威的冒险类手游排行榜前十名,免费冒险类安卓、iOS、电脑版下载,受到冒险类游戏玩家的一致好评,玩...",
          key:"中国银行",
          time:"2020-02-18",
          pvuv:"150/462",
          lable:"银行",
          pjNum:"111",
          uri:"http://www.4399.com/top/top-6.htm",
          check:false
        },
        {
          title:"雨中冒险2游戏专区_雨中冒险2中文版下载及攻略秘籍..._游民星空",
          content:"游民星空雨中冒险2游戏专题,提供雨中冒险2中文版下载,雨中冒险2攻略,雨中冒险2修改器,雨中冒险2收集,雨中冒险2角色,隐藏,关卡,剧情,配置,联机,汉化,补丁等游戏资料...",
          key:"剑三",
          time:"2020-02-18",
          pvuv:"150/462",
          lable:"游戏",
          pjNum:"111",
          uri:"http://www.4399.com/top/top-6.htm",
          check:false
        }],
      hot:[{
        title:"英雄联盟LPL总决赛",
        pvuv:"309万",
        host:"https://lol.qq.com/main.shtml"
      },{
        title:"PPD中单亚索带崩三路",
        pvuv:"302万",
        host:"https://lol.qq.com/main.shtml"
      },{
        title:"剑网三元宵盒子",
        pvuv:"204万",
        host:"https://lol.qq.com/main.shtml"
      },{
        title:"RNG战队官宣LPL春季赛名单 Uzi首发",
        pvuv:"110万",
        host:"https://lol.qq.com/main.shtml"
      },{
        title:"WE微博官宣：前KT战队教练Noex加入",
        pvuv:"89万",
        host:"https://lol.qq.com/main.shtml"
      }],
      selected:[{
        title:"英雄联盟 -- LPL总决赛视频",
        pvuv:"309万",
        host:"https://lol.qq.com/main.shtml"
      },{
        title:"剑网三 -- 重磅推出免点卡任意玩",
        pvuv:"302万",
        host:"https://lol.qq.com/main.shtml"
      },{
        title:"剑网三 -- 推出元宵打灯活动",
        pvuv:"204万",
        host:"https://lol.qq.com/main.shtml"
      },{
        title:"逆水寒 -- 重磅推出免点卡任意玩活动",
        pvuv:"110万",
        host:"https://lol.qq.com/main.shtml"
      },{
        title:"WE微博官宣 -- 前KT战队教练Noex加入",
        pvuv:"89万",
        host:"https://lol.qq.com/main.shtml"
      }],
      content:[{
        title:"冒险手机游戏",
        pvuv:"309万"
      },{
        title:"冒险岛手机版官网",
        pvuv:"302万"
      },{
        title:"冒险岛",
        pvuv:"302万"
      },{
        title:"冒险益智小游戏",
        pvuv:"204万"
      },{
        title:"猪猪公寓手机游戏下载",
        pvuv:"110万"
      },{
        title:"冒险闯关游戏",
        pvuv:"89万"
      },{
        title:"闯关游戏",
        pvuv:"89万"
      },{
        title:"冒险游戏",
        pvuv:"89万"
      }],
      tabPane:[{
        title:"金融",
        name:"firdt"
      },
        {
          title:"医疗",
          name:"second"
        }
        ,
        {
          title:"交通",
          name:"thrid"
        }
        ,
        {
          title:"游戏",
          name:"forth"
        },
        {
          title:"教育",
          name:"jy"
        }
        ,
        {
          title:"能源",
          name:"fiveth"
        }
        ,{
          title:"快递",
          name:"six"
        }
        ,{
          title:"餐饮",
          name:"server"
        },{
          title:"IT",
          name:"eight"
        }
        ,
        {
          title:">>更多",
          name:"last"
        }]
    };
  },
  methods: {
    handleClick(tab, event) {
      const  that = this
      console.log(event.target.innerText == ">>更多");
      if (event.target.innerText == ">>更多") {
        // that.$router.push({name: 'kinds'})
        this.$router.push({ path: '/kinds' })
        // this.$router.push('/kinds')
      }
    },
    closeTab() {
      console.log(1111,this.activeName)
      // this.activeName = ''
    },
    toEvaluate() {
      this.$router.push({ path: '/evaluate' })
    },
    toLable() {
      this.$router.push({ path: '/lable' })
    },
    toShop() {
      this.$router.push({ path: '/shop' })
    },
    toMine() {
      console.log("1111")
      this.$router.push({ path: '/mine' })
    },
    toHelp() {
      this.$router.push({ path: '/help' })
    },
    toURL(url) {
      window.open(url, '_blank');
    },
    allChecks(){
      if (this.allCheck){
        for (let i = 0;i<this.tableData.length;i++) {
          this.tableData[i].check = true
        }
      }else {
        for (let i = 0;i<this.tableData.length;i++) {
          this.tableData[i].check = false
        }
      }
    },
    searchInfo() {
      searchKeys(this.searchKey).then(response => {
        console.log(response)
        this.tableData = response.data.content
      })
    },
    advancedSearch() {
      this.advancedKey.rules = "allInKey€"+this.ruleForm.allInKey
      +"€isKey€"+this.ruleForm.isKey
      +"€inKey€"+this.ruleForm.inKey
      +"€notInKey€"+this.ruleForm.notInKey+" #"
      searchKeys(this.advancedKey).then(response => {
        console.log(response)
        this.tableData = response.data.content
      })
      this.drawer = false
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
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
