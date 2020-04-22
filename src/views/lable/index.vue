<template>
  <el-container>
    <!--    头部搜索框-->
<!--    <el-header>-->

<!--    </el-header>-->

    <!--    中间内容部分-->
    <el-main style="position:absolute;width: 1024px;left: calc(50% - 512px);">
      <el-collapse v-model="activeNames" @change="handleChange">
        <el-collapse-item name="2">
          <template slot="title">
<!--            <span class="lable_font">标签预览</span>-->
            <span class="lable_font">标签同步任务</span>
          </template>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入搜索标签名称关键字" v-model="listQuery.name" @keyup.enter.native="getList" class="input-with-select">
              <el-button slot="append" icon="el-icon-search" @click="getList"></el-button>
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
              label="发布日期"
              sortable="custom"
              width="120"
              align="center">

<!--              column-key="date"-->
<!--              :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"-->
<!--              :filter-method="filterHandler"-->
            </el-table-column>
            <el-table-column
              prop="labelName"
              label="标签名称"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="labelCaliber"
              label="标签描述"
              align="center">
            </el-table-column>
            <el-table-column
              prop="accountPeriod"
              label="周期"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="lastSynchronizarion"
              label="最后同步时间"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="labState"
              label="同步状态"
              width="100"
              align="center">
<!--              <template slot-scope="scope">-->
<!--                <span v-if="scope.row.state == 1" style="color: #7f8085">创建中</span>-->
<!--                <span v-if="scope.row.state == 2" style="color: green">已完成</span>-->
<!--                <span v-if="scope.row.state == 3" style="color: red">失败</span>-->
<!--              </template>-->
            </el-table-column>
<!--            <el-table-column label="操作"  width="100">-->
<!--              <template slot-scope="scope">-->
<!--                <el-button  v-if="scope.row.operationState=='0'" type="primary" icon="el-icon-video-play" circle  plain @click="startwork(scope.$index)"></el-button>-->
<!--                <el-button v-if="scope.row.operationState=='1'" type="danger" icon="el-icon-video-pause" circle  plain @click="stopwork(scope.$index)"></el-button>-->
<!--              </template>-->
<!--&lt;!&ndash;              <template slot-scope="scope">&ndash;&gt;-->
<!--&lt;!&ndash;                <span v-if="scope.row.option == 1" style="color: #7f8085">||</span>&ndash;&gt;-->
<!--&lt;!&ndash;                <span v-if="scope.row.option == 2" style="color: green">|></span>&ndash;&gt;-->
<!--&lt;!&ndash;              </template>&ndash;&gt;-->
<!--            </el-table-column>-->
<!--            <el-table-column-->
<!--              prop="tag"-->
<!--              label="数据分类"-->
<!--              width="100"-->
<!--              :filters="[{ text: '游戏', value: '游戏' }, { text: '视频', value: '视频' }]"-->
<!--              :filter-method="filterTag"-->
<!--              filter-placement="bottom-end">-->
<!--              <template slot-scope="scope">-->
<!--                <el-tag-->
<!--                  :type="scope.row.tag === '游戏' ? 'primary' : 'success'"-->
<!--                  disable-transitions>{{scope.row.tag}}</el-tag>-->
<!--              </template>-->
<!--            </el-table-column>-->
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
        </el-collapse-item>
      </el-collapse>
    </el-main>
  </el-container>
</template>

<script>
  import {findList,operation} from '../../api/label'
  import {mapGetters} from 'vuex'
  export default {
    name: 'Lable',
    data() {
      return {
        tableData:[],
        totalCount:0,
        activeNames: ['2'],
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
        listQuery:{
          pageNum: 1,//页码
          pageRow: 10,//每页条数
          name:'',  //查询关键字
          order:'',   //升降序
          prop:'',   //升降序字段
          id:'' // 当前用户id
        },
        radio: '1',
        // tableData: [{
        //   date: '2020-01-19',
        //   name: '冒险类游戏',
        //   address: '这个标签中包含的信息都是冒险类游戏的信息',
        //   tag: '游戏',
        //   cycle:"月",
        //   state:"1",
        //   lastSyn:"2020-03",
        //   option:"2"
        // }, {
        //   date: '2020-01-19',
        //   name: '恐怖片',
        //   address: '这个标签中包含的视频都属于恐怖视频',
        //   tag: '视频',
        //   cycle:"月",
        //   state:"2",
        //   lastSyn:"2020-03",
        //   option:"1"
        // }, {
        //   date: '2020-01-19',
        //   name: '射击类',
        //   address: '这个标签中包含的信息都是冒险类游戏的信息',
        //   tag: '游戏',
        //   cycle:"日",
        //   state:"3",
        //   lastSyn:"2020-03-07",
        //   option:"2"
        // }, {
        //   date: '2020-01-19',
        //   name: '综艺',
        //   address: '这个标签中包含的视频都属于综艺',
        //   tag: '视频',
        //   cycle:"月",
        //   state:"2",
        //   lastSyn:"2020-03-07",
        //   option:"1"
        // }, {
        //   date: '2020-01-19',
        //   name: '综艺',
        //   address: '这个标签中包含的视频都属于综艺',
        //   tag: '视频',
        //   cycle:"一次性",
        //   state:"2",
        //   lastSyn:"2020-03-07",
        //   option:"1"
        // }, {
        //   date: '2020-01-19',
        //   name: '综艺',
        //   address: '这个标签中包含的视频都属于综艺',
        //   tag: '视频',
        //   cycle:"月",
        //   state:"1",
        //   lastSyn:"2020-03",
        //   option:"2"
        // }, {
        //   date: '2020-01-19',
        //   name: '综艺',
        //   address: '这个标签中包含的视频都属于综艺',
        //   tag: '视频',
        //   cycle:"月",
        //   state:"1",
        //   lastSyn:"2020-03",
        //   option:"1"
        // }, {
        //   date: '2020-01-19',
        //   name: '综艺',
        //   address: '这个标签中包含的视频都属于综艺',
        //   tag: '视频',
        //   cycle:"月",
        //   state:"1",
        //   lastSyn:"2020-03",
        //   option:"1"
        // }, {
        //   date: '2020-01-19',
        //   name: '综艺',
        //   address: '这个标签中包含的视频都属于综艺',
        //   tag: '视频',
        //   cycle:"月",
        //   state:"1",
        //   lastSyn:"2020-03",
        //   option:"2"
        // }]
      };
    },

    created(){
       this.getList();
    },
    methods: {
         getList(){
           this.listQuery.id = this.userId
           findList(this.listQuery).then(data=>{
             this.tableData = data.data
             this.totalCount = data.total
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
      startwork($index){
        let label = this.tableData[$index];
        this.formLabelAlign.id =label.id;
        this.formLabelAlign.operationState = "1";
        this.$message.info("任务开启中，请稍等.....")
        operation(this.formLabelAlign).then(data=>{
           this.$message.success("已经开启任务")
          this.getList()
        })
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
