<template>
  <el-container>
    <el-button style="position: absolute;left: 30px;margin-top: 20px;" @click="toDashboard">返回</el-button>
    <!--    头部搜索框-->
    <!--    <el-header>-->

    <!--    </el-header>-->
    <el-dialog title="定制标签" :visible.sync="dialogFormVisible">
      <el-form style="width: 500px;margin-left: calc(50% - 250px);" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">
        <el-form-item label="客群名称">
          <el-input v-model="formLabelAlign.name"></el-input>
        </el-form-item>
        <el-form-item label="客群周期">
          <template style="display: inline-block">
            <el-radio v-model="radio2" label="1">一次性推送</el-radio>
            <el-radio v-model="radio2" label="2">周期推送</el-radio>
          </template>
          <el-form-item v-if="radio2 == 2" label="">
            <template style="display: inline-block">
              <el-radio v-model="radio" label="1">月</el-radio>
              <el-radio v-model="radio" label="2">日</el-radio>
            </template>
          </el-form-item>
        </el-form-item>
        <el-form-item label="客群描述">
          <el-input type="textarea" :rows="3" v-model="formLabelAlign.desc"></el-input>
        </el-form-item>
        <el-form-item label="主键类型">
          <el-select placeholder="手机号码">
            <el-option value="手机号码">手机号码</el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left: 60px">
          <el-button style="width: 120px" type="primary" @click="designBQ">定制标签</el-button>
          <el-button style="margin-left: 60px;width: 120px" @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--    中间内容部分-->
    <el-main style="position:absolute;width: 1024px;left: calc(50% - 512px);">
      <el-collapse v-model="activeNames" @change="handleChange">
<!--        <el-collapse-item name="1">-->
<!--          <template slot="title">-->
<!--            <span class="lable_font">标签定制</span>-->
<!--          </template>-->
<!--          <el-form style="width: 500px;margin-left: calc(50% - 250px);" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">-->
<!--            <el-form-item label="名称">-->
<!--              <el-input v-model="formLabelAlign.name"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="口径">-->
<!--              <el-input type="textarea" :rows="3" v-model="formLabelAlign.desc"></el-input>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="账期">-->
<!--              <template style="display: inline-block">-->
<!--                <el-radio v-model="radio" label="1">月</el-radio>-->
<!--                <el-radio v-model="radio" label="2">日</el-radio>-->
<!--              </template>-->
<!--              <div v-if="radio == 1" class="block">-->
<!--                <el-date-picker-->
<!--                  v-model="month"-->
<!--                  type="month"-->
<!--                  placeholder="选择月">-->
<!--                </el-date-picker>-->
<!--              </div>-->
<!--              <div v-if="radio == 2" class="block">-->
<!--                <el-date-picker-->
<!--                  v-model="dateTime"-->
<!--                  type="date"-->
<!--                  placeholder="选择日期">-->
<!--                </el-date-picker>-->
<!--              </div>-->
<!--            </el-form-item>-->
<!--            <el-form-item style="margin-left: 60px">-->
<!--              <el-button style="width: 120px" type="primary" @click="onSubmit">定制标签</el-button>-->
<!--              <el-button style="margin-left: 60px;width: 120px">取消</el-button>-->
<!--            </el-form-item>-->
<!--          </el-form>-->
<!--        </el-collapse-item>-->
        <el-collapse-item name="2">
          <template slot="title">
          <span class="lable_font">host购物车</span>
        </template>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入host信息" v-model="input3" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <el-collapse accordion @change="dateShows">
            <el-collapse-item>
              <template slot="title">
                <div style="position: absolute;left: calc(100% - 100px)">
                  <span>搜索工具</span>
                </div>
              </template>
              <div style="border: 1px solid #DCDFE6;padding: 10px;padding-top: 5px">
                <div style="margin-bottom: 5px">
                  <span>时间范围：</span>
                  <el-date-picker
                    v-model="time"
                    size="mini"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期">
                  </el-date-picker>
                </div>
                <span style="margin-right:10px">分组TOPN</span>
                <span>分组条件</span>
                <el-select size="mini" v-model="searchCGP.value1" style="width: 100px" @change="checkCgp">
                  <el-option value="host">host</el-option>
                  <el-option value="客群">客群</el-option>
                </el-select>
                <span>统计指标</span>
                <el-select size="mini" v-model="searchCGP.value2" style="width: 100px" @change="checkCgp">
                  <el-option value="PV">PV</el-option>
                </el-select>
                <el-select size="mini" v-model="searchCGP.value3" style="width: 100px" @change="checkCgp">
                  <el-option value="求和">求和</el-option>
                  <el-option value="计数">计数</el-option>
                </el-select>
                <span>按</span>
                <el-select size="mini" v-model="searchCGP.value4" style="width: 100px" @change="checkCgp">
                  <el-option value="从大到小">从大到小</el-option>
                  <el-option value="从小到大">从小到大</el-option>
                </el-select>
                <span>排名，取前</span>
                <el-input size="mini" v-model="searchCGP.value5" style="width: 100px" @change="checkCgp"></el-input>
                <span>名</span>
                <el-button type="primary" size="mini">搜索</el-button><br>
                <!--                <el-input type="button">查询</el-input>-->
                <span>客群人数：0</span>
              </div>
            </el-collapse-item>
          </el-collapse>
          <el-button style="float: right;margin-top: 10px;right: 20px;z-index: 999" @click="dialogFormVisible = true">定制标签</el-button>
          <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              type="selection"
              width="66">
            </el-table-column>
            <el-table-column
              prop="date"
              label="收集时间"
              sortable
              width="180"
              column-key="date"
              :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
              :filter-method="filterHandler"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="title"
              width="180">
            </el-table-column>
            <el-table-column
              prop="uvpv"
              label="uv/pv"
              width="100">
            </el-table-column>
            <el-table-column
              prop="address"
              label="内容"
              width="360"
              :formatter="formatter">
            </el-table-column>
<!--            <el-table-column-->
<!--              prop="url"-->
<!--              label="地址">-->
<!--              @click="toURL('http://www.4399.com/top/top-6.htm')"-->
<!--            </el-table-column>-->
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  @click="handleEdit(scope.$index, scope.row)">查看</el-button>
<!--                <el-button-->
<!--                  size="mini"-->
<!--                  type="danger"-->
<!--                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>-->
              </template>
            </el-table-column>

          </el-table>
          <el-pagination
            background
            style="width: 500px;margin-left: 250px;margin-top: 30px"
            layout="prev, pager, next"
            :total="1000">
          </el-pagination>
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<script>

  export default {
    name: 'Shop',
    data() {
      return {
        activeNames: ['2'],
        dialogFormVisible:false,
        formLabelWidth: '120px',
        time:'',
        cgpUserShow:false,
        dateShow:false,
        form:{
          name:"",
          region:""
        },
        searchCGP:{
          value1:"host",
          value2:"PV",
          value3:"求和",
          value4:"从大到小",
          value5:"",
        },
        labelPosition: 'right',
        month:"",
        dateTime:"",
        input3:"",
        formLabelAlign: {
          name: '',
          region: '',
          desc:"",
          type: ''
        },
        radio: '1',
        radio2: '1',
        tableData: [{
          date: '2020-01-19',
          name: '冒险岛官方网站',
          address: '2D横版卷轴式网络游戏——《冒险岛Online》是旗下的一款超人气家庭休闲网游。整个游戏画面以2D平面展开,采用了与其他Q版2D游戏不同的横向卷轴的移动方式。游戏场景...',
          tag: '游戏',
          uvpv:'50/150',
          cycle:"2020-02-06",
          url:"https://www.4399.com"
        }, {
          date: '2020-01-19',
          name: '冒险小游戏',
          address: '14冰娃与火娃4 15火柴人吃豆豆2 16双刃战士无敌版 17天空之城冒险 18屁王兄弟无敌版 19超奥特曼格斗 20冰火人面兽 更多 全部冒险小游戏 123456..15 造梦...',
          tag: '视频',
          uvpv:'50/150',
          cycle:"2020-02-06",
          url:"https://www.4399.com"
        }, {
          date: '2020-01-19',
          name: '安卓冒险游戏大全',
          address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
          tag: '游戏',
          uvpv:'50/150',
          cycle:"2020-02-06",
          url:"https://www.4399.com"
        }, {
          date: '2020-01-19',
          name: '安卓冒险游戏大全',
          address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
          tag: '游戏',
          uvpv:'50/150',
          cycle:"2020-02-06",
          url:"https://www.4399.com"
        }, {
          date: '2020-01-19',
          name: '安卓冒险游戏大全',
          address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
          tag: '游戏',
          uvpv:'50/150',
          cycle:"2020-02-06",
          url:"https://www.4399.com"
        }, {
          date: '2020-01-19',
          name: '安卓冒险游戏大全',
          address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
          tag: '游戏',
          uvpv:'50/150',
          cycle:"2020-02-06",
          url:"https://www.4399.com"
        }, {
          date: '2020-01-19',
          name: '安卓冒险游戏大全',
          address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
          tag: '游戏',
          uvpv:'50/150',
          cycle:"2020-02-06",
          url:"https://www.4399.com"
        }, {
          date: '2020-01-19',
          name: '安卓冒险游戏大全',
          address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
          tag: '游戏',
          uvpv:'50/150',
          cycle:"2020-02-06",
          url:"https://www.4399.com"
        }, {
          date: '2020-01-19',
          name: '安卓冒险游戏大全',
          address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
          tag: '游戏',
          uvpv:'50/150',
          cycle:"2020-02-06",
          url:"https://www.4399.com"
        }]
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
        this.activeNames = ['2']
      },
      toURL(url) {
        window.open(url, '_blank');
      },
      console() {
        console.log("11")
      },
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      handleEdit(index, row) {
        console.log(index, row);
        window.open(row.url, '_blank')
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
      },
      toDashboard() {
        this.$router.push({ path: '/dashboard' })
      },
      designBQ(){
        this.$router.push({ path: '/lable' })
      },
      formatter(row, column) {
        return row.address;
      },
      filterTag(value, row) {
        return row.tag === value;
      },
      filterHandler(value, row, column) {
        const property = column['property'];
        return row[property] === value;
      },
      dateShows(val) {
        this.dateShow = !this.dateShow
      },
      checkCgp() {
        if (this.searchCGP.value1!=''&&this.searchCGP.value2!=''&&this.searchCGP.value3!=''&&this.searchCGP.value4!=''&&this.searchCGP.value5!='')  {
          this.cgpUserShow  = true
        }else {
          this.cgpUserShow  = false
        }
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
