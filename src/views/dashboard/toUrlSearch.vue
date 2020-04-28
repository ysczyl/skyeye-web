<template>
  <el-container>
    <!--    头部搜索框-->
    <!--    <el-header>-->

    <!--    </el-header>-->

    <!--    中间内容部分-->
    <el-main style="position:absolute;width: 1024px;left: calc(50% - 512px);">
<!--      <el-collapse v-model="activeNames" @change="handleChange">-->
<!--        <el-collapse-item name="2">-->
          <div style="margin-top: 10px">
            <span class="lable_font">URL检索</span>
          </div>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入需要检索的URL关键字" v-model="urlSearchKey.keys" @keyup.enter.native="searchUrl" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="searchUrl"></el-button>
            </el-input>
          </div>

          <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%"
            @sort-change='sortChange'>

            <el-table-column align="center" label="序号" width="60" >
              <template slot-scope="scope">
                <span v-text="getIndex(scope.$index)"> </span>
              </template>
            </el-table-column>
            <el-table-column
              prop="crtTime"
              label="检索时间"
              sortable="custom"
              width="240"
              align="center">
            </el-table-column>
            <el-table-column
              prop="searchKey"
              label="关键字"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="state"
              label="检索状态"
              align="center">
              <template slot-scope="scope">
                  <span v-if="scope.row.state == '1'" style="color: #97a8be">检索中</span>
                  <span v-if="scope.row.state == '0'" style="color: green">已完成</span>
                  <span v-if="scope.row.state == '2'" style="color: red">失败</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="accountPeriod"
              label="查看"
              width="120"
              align="center">
              <template slot-scope="scope">
                <el-tooltip  effect="dark" content="查看查询结果" placement="top" :enterable="false" :open-delay="500">
                  <el-button @click="showSearchResult(scope)">查看结果</el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
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
<!--        </el-collapse-item>-->
<!--      </el-collapse>-->



      <el-dialog title="URL查询结果预览" :visible.sync="urlResult">
        <div style="margin-top: -25px;margin-bottom: 8px">
          <span>时间范围：</span>
          <el-date-picker
            :disabled="cgpNumber != '--'"
            v-model="urlListQuery.times"
            size="mini"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
        <el-table :data="urlList" height="300" border @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55"></el-table-column>
          <el-table-column property="url" label="URL" width="500"></el-table-column>
          <el-table-column property="pvuv" label="pvuv" >
          </el-table-column>
        </el-table>
        <div style="margin-top: 15px">
          <span>客群人数:{{cgpNumber}}</span>
        </div>
        <div v-if="cgpNumber == '--'" slot="footer" class="dialog-footer">
          <el-button @click="urlResult = false">取 消</el-button>
          <el-button type="primary" @click="explore">探 索</el-button>
        </div>
        <div v-if="cgpNumber != '--'" slot="footer" class="dialog-footer">
          <el-button @click="urlResult = false">取 消</el-button>
          <el-button type="primary" @click="pushCgp">推送</el-button>
        </div>
      </el-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import {findList,operation} from '../../api/label'
  import {getlistById,addUrlSearch,getUrlList,getExplore,getCgpExplore} from '../../api/urlSearch'
  import {mapGetters} from 'vuex'
  export default {
    name: 'toUrlSearch',
    data() {
      return {
        tableData:[],
        totalCount:0,
        activeNames: ['2'],
        labelPosition: 'right',
        month:"",
        urlResult:false,
        dateTime:"",
        input3:"",
        StateListSearch:{
          pages:1
        },
        urlSearchKey:{
          keys:""
        },
        urlListQuery:{
          searchNo:"",
          pages:1,
          urls:[],
          times:[new Date(this.getDateInfo(new Date())), new Date()]
        },
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
        listQuery:{
          pageNum: 1,//页码
          pageRow: 10,//每页条数
          name:'',  //查询关键字
          order:'',   //升降序
          prop:'',   //升降序字段
          id:'' // 当前用户id
        },
        radio: '1',
        urlList:[],
        cgpNumber:"--"
      };
    },

    created(){
      this.getList();
    },
    methods: {
      getList(){
        getlistById(this.StateListSearch).then(data=>{
          console.log(data)
          this.tableData = data.data
          this.totalCount = data.total
        })
      },
      searchUrl(){
        if (this.urlSearchKey.keys != ""){
          addUrlSearch(this.urlSearchKey).then(data=>{
            this.$message.success("查询请求申请成功")
            this.getList()
          })
        }else{
          this.$message("请输入待查询URL关键字")
        }
      },
      showSearchResult(val){
        if (val.row.state == "0"){
          this.urlListQuery.searchNo = val.row.searchNo
          this.cgpNumber= val.row.cgpNumber
          getUrlList(this.urlListQuery).then(data=>{
            this.urlList = data.data
            if (data.startTime != null && data.endTime != null){
              this.urlList.times = []
              this.urlList.times.push(data.startTime)
              this.urlList.times.push(data.endTime)
            }
          })
          this.urlResult = true
        } else if (val.row.state == "1") {
          this.$message("URL正在检索中，请稍后再试")
        }else{
          this.$message("URL查询失败")
        }
      },
      //探索数量客群
      explore(){
        this.urlResult = false
        getExplore(this.urlListQuery).then(data=>{
          this.$message.success("探索请求发起成功")
        })
      },
      pushCgp(){
        this.urlResult = false
        getCgpExplore(this.urlListQuery).then(data=>{
          this.$message.success("推送请求发起成功")
        })
      },
      getIndex($index) {
        //表格序号
        return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
      },
      handleSizeChange(val) {
        //改变每页数量
        this.listQuery.pageRow = val
        this.handleFilter();
      },
      getDateInfo:function(date){
        return date.setDate(date.getDate()-7);
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
      handleSelectionChange(val) {
        this.urlListQuery.urls = []
        for (let i = 0; i < val.length; i++) {
          this.urlListQuery.urls.push(val[i].url)
        }
        console.log(this.urlListQuery.urls)
      },
      getIndex($index) {
        //表格序号
        return (this.listQuery.pageNum - 1) * this.listQuery.pageRow + $index + 1
      },
      sortChange(column){               //排序监听器
        this.listQuery.order=column.order
        this.getList()

      },
      startwork($index){

      },
      stopwork($index){
        let label = this.tableData[$index];
        this.formLabelAlign.id =label.id;
        this.formLabelAlign.operationState = "0";
        this.$message.info("正在暂停任务")
        operation(this.formLabelAlign).then(data=>{
          this.$message.success("任务已暂停")
          this.getList()
        })
      },


      ////////////////////////////////////////////////////////////////////////////////////////////////////////////
      handleChange(val) {
        console.log(val);
      },
      resetDateFilter() {
        this.$refs.filterTable.clearFilter('date');
      },
      clearFilter() {
        this.$refs.filterTable.clearFilter();
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
