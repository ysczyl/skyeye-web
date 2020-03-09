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
            <span class="lable_font">标签预览</span>
          </template>
          <div style="margin-top: 15px;">
            <el-input placeholder="请输入搜索标签名" v-model="input3" class="input-with-select">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </div>
          <el-table
            ref="filterTable"
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="发布日期"
              sortable
              width="120"
              column-key="date"
              :filters="[{text: '2016-05-01', value: '2016-05-01'}, {text: '2016-05-02', value: '2016-05-02'}, {text: '2016-05-03', value: '2016-05-03'}, {text: '2016-05-04', value: '2016-05-04'}]"
              :filter-method="filterHandler"
            >
            </el-table-column>
            <el-table-column
              prop="name"
              label="标签名称"
              width="120">
            </el-table-column>
            <el-table-column
              prop="address"
              label="标签描述"
              :formatter="formatter">
            </el-table-column>
            <el-table-column
              prop="cycle"
              label="周期"
              width="120">
            </el-table-column>
            <el-table-column
              prop="lastSyn"
              label="最后同步"
              width="120">
            </el-table-column>
            <el-table-column
              prop="state"
              label="状态"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.state == 1" style="color: #7f8085">创建中</span>
                <span v-if="scope.row.state == 2" style="color: green">已完成</span>
                <span v-if="scope.row.state == 3" style="color: red">失败</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="option"
              label="操作"
              width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.option == 1" style="color: #7f8085">||</span>
                <span v-if="scope.row.option == 2" style="color: green">|></span>
              </template>
            </el-table-column>
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
    name: 'Lable',
    data() {
      return {
        activeNames: ['2'],
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
        tableData: [{
          date: '2020-01-19',
          name: '冒险类游戏',
          address: '这个标签中包含的信息都是冒险类游戏的信息',
          tag: '游戏',
          cycle:"月",
          state:"1",
          lastSyn:"2020-03",
          option:"2"
        }, {
          date: '2020-01-19',
          name: '恐怖片',
          address: '这个标签中包含的视频都属于恐怖视频',
          tag: '视频',
          cycle:"月",
          state:"2",
          lastSyn:"2020-03",
          option:"1"
        }, {
          date: '2020-01-19',
          name: '射击类',
          address: '这个标签中包含的信息都是冒险类游戏的信息',
          tag: '游戏',
          cycle:"日",
          state:"3",
          lastSyn:"2020-03-07",
          option:"2"
        }, {
          date: '2020-01-19',
          name: '综艺',
          address: '这个标签中包含的视频都属于综艺',
          tag: '视频',
          cycle:"月",
          state:"2",
          lastSyn:"2020-03-07",
          option:"1"
        }, {
          date: '2020-01-19',
          name: '综艺',
          address: '这个标签中包含的视频都属于综艺',
          tag: '视频',
          cycle:"一次性",
          state:"2",
          lastSyn:"2020-03-07",
          option:"1"
        }, {
          date: '2020-01-19',
          name: '综艺',
          address: '这个标签中包含的视频都属于综艺',
          tag: '视频',
          cycle:"月",
          state:"1",
          lastSyn:"2020-03",
          option:"2"
        }, {
          date: '2020-01-19',
          name: '综艺',
          address: '这个标签中包含的视频都属于综艺',
          tag: '视频',
          cycle:"月",
          state:"1",
          lastSyn:"2020-03",
          option:"1"
        }, {
          date: '2020-01-19',
          name: '综艺',
          address: '这个标签中包含的视频都属于综艺',
          tag: '视频',
          cycle:"月",
          state:"1",
          lastSyn:"2020-03",
          option:"1"
        }, {
          date: '2020-01-19',
          name: '综艺',
          address: '这个标签中包含的视频都属于综艺',
          tag: '视频',
          cycle:"月",
          state:"1",
          lastSyn:"2020-03",
          option:"2"
        }]
      };
    },
    methods: {
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
