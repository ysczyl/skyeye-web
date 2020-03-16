<template>
  <el-container>
    <el-button style="position: absolute;left: 30px;margin-top: 20px;" @click="toDashboard">返回</el-button>
    <!--    头部搜索框-->
    <!--    <el-header>-->

    <!--    </el-header>-->
    <el-dialog title="定制标签" :visible.sync="dialogFormVisible">
      <el-form style="width: 500px;margin-left: calc(50% - 250px);" :label-position="labelPosition" label-width="80px" :model="formLabelAlign">

        <el-form-item label="客群名称" required>
          <el-input v-model="formLabelAlign.labelName"></el-input>
        </el-form-item>
        <el-form-item label="客群周期" required>
          <el-radio-group v-model="formLabelAlign.accountPeriod">
            <el-radio label="一次性推送"></el-radio>
            <el-radio label="日"></el-radio>
            <el-radio label="月"></el-radio>
          </el-radio-group>
         <!-- <template style="display: inline-block">
            <el-radio v-model="radio" label="1">一次性推送</el-radio>
            <el-radio v-model="radio2" label="2">周期推送</el-radio>
          </template>
          <el-form-item v-if="radio2 == 2" label="">
            <template style="display: inline-block">
              <el-radio v-model="formLabelAlign.accountPeriod" label="1">月</el-radio>
              <el-radio v-model="formLabelAlign.accountPeriod" label="2">日</el-radio>
            </template>
          </el-form-item>-->
        </el-form-item>

        <el-form-item label="客群描述">
          <el-input type="textarea" :rows="6" v-model="formLabelAlign.labelCaliber"></el-input>
        </el-form-item>
        <el-form-item label="主键类型" required>
          <el-select placeholder="手机号码" v-model="formLabelAlign.keyType">
            <el-option value="手机号码" >手机号码</el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-left: 60px">
          <el-button style="width: 120px" type="primary" @click="createLab" :disabled="this.createState===0">定制标签</el-button>
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
            <el-input placeholder="请输入host标题关键字" v-model="listQuery.name" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
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
<!--         标签定制按钮-->
          <el-button style="float: right;margin-top: 10px;right: 20px;z-index: 999" @click="showcreate">定制标签</el-button>


          <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%"
            @sort-change='sortChange'
            @selection-change="selsChange"
            >
            <el-table-column
              type="selection"
              width="60">
            </el-table-column>
            <el-table-column align="center" label="序号" width="60" >
              <template slot-scope="scope">
                <span v-text="getIndex(scope.$index)"> </span>
              </template>
            </el-table-column>
<!--            <el-table-column-->
<!--              prop="crtTime"-->
<!--              label="收集时间"-->
<!--              sortable="custom"-->
<!--              width="180"-->
<!--            >-->
<!--            </el-table-column>-->
            <el-table-column
              label="标题"
              width="200"
              align="center">
              <template slot-scope="scope">
                <el-button type="text" @click="toURL(scope.$index)"> <span >{{scope.row.title}}</span></el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="uv，pv"
              label="uv/pv"
              width="200"
              align="center">
              <template slot-scope="scope">{{scope.row.uv}}/{{scope.row.pv}}</template>
            </el-table-column>
<!--            <el-table-column-->
<!--              prop="pv"-->
<!--              label="pv"-->
<!--              width="100">-->
<!--            </el-table-column>-->
            <el-table-column
              prop="content"
              label="内容"
              width="460"
              align="center"
            >
            </el-table-column>
<!--            <el-table-column-->
<!--              prop="url"-->
<!--              label="地址">-->
<!--              @click="toURL('http://www.4399.com/top/top-6.htm')"-->
<!--            </el-table-column>-->


<!--            <el-table-column label="操作">-->
<!--              <template slot-scope="scope">-->
<!--                <el-button-->
<!--                  size="mini"-->
<!--                  @click="handleEdit(scope.$index, scope.row)">查看</el-button>-->
<!--&lt;!&ndash;                <el-button&ndash;&gt;-->
<!--&lt;!&ndash;                  size="mini"&ndash;&gt;-->
<!--&lt;!&ndash;                  type="danger"&ndash;&gt;-->
<!--&lt;!&ndash;                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>&ndash;&gt;-->
<!--              </template>-->
<!--            </el-table-column>-->

          </el-table>
          <!--          分页区域-->
          <div align="center">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="listQuery.pageNum"
            :page-size="listQuery.pageRow"
            :total="totalCount"
            :page-sizes="[3, 5, 10, 20]"
            layout="total, sizes, prev, pager, next, jumper">
          </el-pagination>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<script>
  import {getlistById} from '../../api/shop'
  import {createLabel} from '../../api/label'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Shop',
    data() {
      return {
        tableData:[],
        activeNames: ['2'],
        totalCount:0,           //数据总条数
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
        formLabelAlign: {    //定制标签弹框部分
          id:'',
          labelName:'',
          labelCaliber:'',
          userId:'',             //当前操作用户的id
          crtTime:'',
          accountPeriod:'',
          keyType:'',
          labState:'',
          lastSynchronizarion:'',
          operationState:'',
          shopIDs:'',
          labReturnId:''
        },
        radio: '1',
        radio2: '1',
        // tableData: [{
        //   date: '2020-01-19',
        //   name: '冒险岛官方网站',
        //   address: '2D横版卷轴式网络游戏——《冒险岛Online》是旗下的一款超人气家庭休闲网游。整个游戏画面以2D平面展开,采用了与其他Q版2D游戏不同的横向卷轴的移动方式。游戏场景...',
        //   tag: '游戏',
        //   uvpv:'50/150',
        //   cycle:"2020-02-06",
        //   url:"https://www.4399.com"
        // }, {
        //   date: '2020-01-19',
        //   name: '冒险小游戏',
        //   address: '14冰娃与火娃4 15火柴人吃豆豆2 16双刃战士无敌版 17天空之城冒险 18屁王兄弟无敌版 19超奥特曼格斗 20冰火人面兽 更多 全部冒险小游戏 123456..15 造梦...',
        //   tag: '视频',
        //   uvpv:'50/150',
        //   cycle:"2020-02-06",
        //   url:"https://www.4399.com"
        // }, {
        //   date: '2020-01-19',
        //   name: '安卓冒险游戏大全',
        //   address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
        //   tag: '游戏',
        //   uvpv:'50/150',
        //   cycle:"2020-02-06",
        //   url:"https://www.4399.com"
        // }, {
        //   date: '2020-01-19',
        //   name: '安卓冒险游戏大全',
        //   address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
        //   tag: '游戏',
        //   uvpv:'50/150',
        //   cycle:"2020-02-06",
        //   url:"https://www.4399.com"
        // }, {
        //   date: '2020-01-19',
        //   name: '安卓冒险游戏大全',
        //   address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
        //   tag: '游戏',
        //   uvpv:'50/150',
        //   cycle:"2020-02-06",
        //   url:"https://www.4399.com"
        // }, {
        //   date: '2020-01-19',
        //   name: '安卓冒险游戏大全',
        //   address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
        //   tag: '游戏',
        //   uvpv:'50/150',
        //   cycle:"2020-02-06",
        //   url:"https://www.4399.com"
        // }, {
        //   date: '2020-01-19',
        //   name: '安卓冒险游戏大全',
        //   address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
        //   tag: '游戏',
        //   uvpv:'50/150',
        //   cycle:"2020-02-06",
        //   url:"https://www.4399.com"
        // }, {
        //   date: '2020-01-19',
        //   name: '安卓冒险游戏大全',
        //   address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
        //   tag: '游戏',
        //   uvpv:'50/150',
        //   cycle:"2020-02-06",
        //   url:"https://www.4399.com"
        // }, {
        //   date: '2020-01-19',
        //   name: '安卓冒险游戏大全',
        //   address: '我们都怀揣着冒险的梦想,这里游戏好玩的冒险游戏推荐给你,让你的冒险梦想燃烧起来!冒险游戏其意思就是有危险的游戏需要玩家去经历和游玩才能通过。这种游戏的特点是...',
        //   tag: '游戏',
        //   uvpv:'50/150',
        //   cycle:"2020-02-06",
        //   url:"https://www.4399.com"
        // }]
        tempShop:{
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
        listQuery:{
          pageNum: 1,//页码
          pageRow: 10,//每页条数
          name:'',  //查询关键字
          order:'',   //升降序
          prop:'',   //升降序字段
          id:'' // 当前用户id
        },
        sels: [],//选中显示的值
        createState:0   //用于防止重复创建标签
      };
    },
    created() {
      this.getList()

    },
    methods: {

       getList(){
          this.listQuery.id = this.userId
          getlistById(this.listQuery).then(data=>{
            this.tableData = data.data
            this.totalCount = data.total
          })


       },
      createLab(){
         let flag = 0;
         this.formLabelAlign.userId = this.userId;
         this.formLabelAlign.labState="成功";  ///////////////////写死的状态
         this.formLabelAlign.operationState="0"; ////////////////默认执行状态为0 待执行
        this.formLabelAlign.shopIDs="";
        let length = this.sels.length
        for(let i =0 ; i<length;i++)
        {
          this.formLabelAlign.shopIDs+=","+this.sels[i].id
        }


        if(this.formLabelAlign.labelName.length==0){
          this.$message.error("请填写客群名称"); flag = 1
        }else if(this.formLabelAlign.accountPeriod.length==0){
          this.$message.error("请选择客群周期");flag = 1
        }else if(this.formLabelAlign.keyType.length==0){
          this.$message.error("请选择主键类型");flag = 1
        }

        if(flag==0){
          this.createState=0;
          createLabel(this.formLabelAlign).then(data=>{
            console.log(data)
            this.$message.success(data.msg)
            this.$router.push({ path: '/lable' })
          })
        }




      },
      handleSizeChange(val) {
        //改变每页数量
        this.listQuery.pageRow = val
        this.handleFilter();
      },
      handleCurrentChange(val) {
        //改变页码
        this.listQuery.pageNum = val
        this.getList();
      },
      handleFilter() {
        //查询事件
        this.listQuery.pageNum = 1
        this.getList()
      },
      getIndex($index) {
        //表格序号
        return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
      },
      sortChange(column){               //排序监听器
        this.listQuery.order=column.order
        this.getList()

      },
      selsChange(sels){           //多选框监听器

        this.sels = sels
        console.log(this.sels)
      },
      toURL($index) {                //标题跳转网页
         let url = this.tableData[$index].url
        window.open(url, '_blank');
      },
      showcreate(){
         this.createState =1;
         this.formLabelAlign.keyType='';
         this.formLabelAlign.labelCaliber = '';
         this.formLabelAlign.accountPeriod = '';
         this.formLabelAlign.labelName= '';
        this.formLabelAlign.crtTime = '';
        this.formLabelAlign.labState = '';
        this.formLabelAlign.lastSynchronizarion = '';
        this.formLabelAlign.userId= '';
         this.dialogFormVisible = true;

      },
      ////////////////////////////////////////////////////////////////////////////////////////////
      handleChange(val) {
        console.log(val);
        this.activeNames = ['2']
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
