<template>
  <el-container>
    <!--    头部搜索框-->
    <el-header style="background-color: #eee">
      <div style="margin-top:10px;font-size: 28px;position:absolute;width: 1024px;left: calc(50% - 666px);">用户信息</div>
    </el-header>
    <el-container>
      <el-main style="padding:10px 20px">
        <div>
          <!-- 返回按钮 -->
          <div style="margin-left: 3%; margin-right: 2%">
<!--            <el-button size="medium" @click="pessinfoback">返回</el-button>-->
          </div>
          <!-- 用户信息 -->
          <div style="margin-top: 15px;width: 1300px;margin-left: calc(50% - 666px);">
<!--            创建用户按钮-->
            <div id="main" style="width:100%;">
            <div id="left" style="width:25%;float:left;" >
            <el-button type="primary" @click="showCreate"><i class="el-icon-upload el-icon--right" ></i>新建用户</el-button>
            </div>
            <div id="right" style="width:65%;float:right;" align="right">
            <el-input placeholder="输入用户姓名/账号"  style="width: 60% " v-model="listQuery.name"  @keyup.enter.native="getList">
              <el-button slot="append" icon="el-icon-search" @click="getList">
              </el-button>
              </el-input>
            </div><br><br>
            </div>
<!--            <el-input placeholder="请输入搜索内容" v-model="listQuery.name">-->
<!--              <el-button slot="append" icon="el-icon-search" @click="getList()"></el-button>-->
<!--            </el-input>-->
            <el-table
              :data="tableData"
              style="width: 100%"
              border
              align="center"
              @sort-change='sortChange'
              :default-sort = "{prop: 'date', order: 'descending'}"
              @selection-change="selsChange"
            >
              <el-table-column
                type="selection"
                width="55"
               >
              </el-table-column>

              <el-table-column align="center" label="序号" width="60" >
                <template slot-scope="scope">
                  <span v-text="getIndex(scope.$index)"> </span>
                </template>
              </el-table-column>
              <el-table-column align="center" label="姓名" prop="userName" style="width: 40px;" ></el-table-column>
              <el-table-column align="center" label="姓别" prop="sex" style="width: 30px;"></el-table-column>
              <el-table-column align="center" label="账号" prop="loginName" style="width: 40px;"></el-table-column>
              <el-table-column align="center" label="组织" prop="department" style="width: 40px;"></el-table-column>
              <el-table-column align="center" label="创建时间" prop="crtTime" width="160"  sortable="custom"></el-table-column>
              <el-table-column align="center" label="电话"  prop="telphone" style="width: 40px;"></el-table-column>
              <el-table-column align="center" label="住址" prop="userAddress" style="width: 40px;"></el-table-column>
              <el-table-column align="left" label="管理"   width="150" >
                <template slot-scope="scope">

                  <el-tooltip  effect="dark" content="修改" placement="top" :enterable="false" :open-delay="500" >
                    <el-button type="primary" icon="el-icon-edit" @click="showUpdate(scope.$index)" ></el-button>
                  </el-tooltip>
                  <el-tooltip  effect="dark" content="删除" placement="top" :enterable="false" :open-delay="500" >
                    <el-button type="danger" icon="el-icon-delete"
                               @click="deleteUser(scope.$index)"></el-button>
                  </el-tooltip>
                </template>
              </el-table-column>
            </el-table>
            <!--          分页区域-->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="listQuery.pageNum"
              :page-size="listQuery.pageRow"
              :total="totalCount"
              :page-sizes="[3, 5, 10, 20]"
              layout="total, sizes, prev, pager, next, jumper">
            </el-pagination>
              <div align="right"><el-button  type="danger" @click="deleteAll" :disabled="this.sels.length === 0"><i class="el-icon-delete"  ></i>批量删除</el-button></div>
          </div>
        </div>
      </el-main>
    </el-container>

    <!-- 弹框区域-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form class="small-space" :model="tempUser" label-position="left" label-width="100px"
               style='width: 300px; margin-left:50px;'>
        <el-form-item label="账号" required v-if="dialogStatus=='create'">
          <el-input type="text" v-model="tempUser.loginName">
          </el-input>
        </el-form-item>
        <el-form-item label="密码" v-if="dialogStatus=='create'" required>
          <el-input type="password" v-model="tempUser.loginPassword">
          </el-input>
        </el-form-item>
        <el-form-item label="新密码" v-else>
          <el-input type="password" v-model="tempUser.loginPassword" placeholder="不填则表示不修改">
          </el-input>
        </el-form-item>


        <el-form-item label="姓名" required>
          <el-input type="text" v-model="tempUser.userName">
          </el-input>
        </el-form-item>

        <el-form-item label="性别" required>
          <el-radio-group v-model="tempUser.sex">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
          </el-radio-group>
        </el-form-item>

        </el-form-item>
        <el-form-item label="电话" required>
          <el-input type="text" v-model="tempUser.telphone">
          </el-input>
        </el-form-item>

        <el-form-item label="所属组织" required>
          <el-select v-model="tempUser.department" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="住址">
          <el-input type="textarea" :rows="6" v-model="tempUser.userAddress"></el-input>
        </el-form-item>
<!--        <el-form-item label="入职时间" required>-->
<!--          <el-col :span="25">-->
<!--            <el-date-picker-->
<!--              type="date"-->
<!--              placeholder="选择日期"-->
<!--              v-model="tempUser.starttime"-->
<!--              style="width: 100%;"-->
<!--              value-format="yyyy-MM-dd"-->
<!--              format="yyyy-MM-dd">-->
<!--            </el-date-picker>-->
<!--          </el-col>-->
<!--        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button v-if="dialogStatus=='create'" type="success" @click="createUser" :disabled="this.createState===0">创 建</el-button>
        <el-button type="primary" v-else @click="updateUser" >修 改</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>


<script>
  import md5 from 'js-md5';
  import {users,update,deleteusers,save,deleteall} from '../../api/user'
  // import { Navbar } from '../../layout/components'
  // import { getpersonal } from '../../../api/userManage/main'
  export default {
    name: 'Mine',
    data() {
      return {
        createState:0, // 防止多次创建
        tableData:[],
        totalCount:0,// 数据总条数
        dialogStatus: 'create',  //弹窗区域类型
        dialogFormVisible: false,  //弹窗区域开关
        textMap: {
          update: '编辑',
          create: '新建用户'
        },
        tempUser: {
          id:'',
          loginName:'',
          userName: '',
          department: '',
          crtTime: '',
          // deadline: '',
          telphone:'',
          userAddress:'',
          useState:'',
          loginPassword:'',
          // channelId:'',
          sex:'',
        },
        options: [{
          value: '组织1',
          label: '组织1'
        }, {
          value: '组织2',
          label: '组织2'
        }, {
          value: '组织3',
          label: '组织3'
        }],
        value: '',
        listQuery: {
          pageNum: 1,//页码
          pageRow: 10,//每页条数
          name:'',
          order:'',
          prop:''

        },
        sels: [],//选中显示的值
        ids:{
          dearr:''
        }
      }
    },
    created() {
      // this.sgetpessinfo()
      this.getList()

    },
    methods: {
      toLable() {
        this.$router.push({ path: '/lable' })


      },
      getList(){users(this.listQuery).then(data=>{
           console.log(data)
           this.tableData =data.data
           this.totalCount=data.total})
      },
      selsChange(sels){           //多选框监听器

        this.sels = sels
        console.log(this.sels)
      },
      sortChange(column){               //排序监听器
        console.log(column.prop)
        console.log(column.order)
       this.listQuery.order=column.order
        console.log(this.listQuery.order)
        this.getList()

      },
      // search(){
      //   this.$http({
      //     url:"http://localhost:7001/skyeye/findBynameLike",
      //     method:"post",
      //     data:this.listQuery
      //   }).then(data=>{
      //     console.log(data)
      //     this.tableData =data.data[0]
      //     this.totalCount = data.data[1]
      //
      //   })
      // },
      updateUser() {
        console.log(this.tempUser)
        let m =0;
        if(this.tempUser.loginPassword==null){
          if(this.tempUser.userName.length==0){this.$message.error("名字不能为空"); m=1}
          else if(this.tempUser.sex.length==0){this.$message.error("请选择性别"); m=1}
          else if(this.tempUser.telphone.length==0){this.$message.error("号码不能为空"); m=1}
          else if(this.tempUser.department.length==0){this.$message.error("请选择组织"); m=1}
        }
         else{
          if(this.tempUser.loginPassword.length==0){this.$message.error("密码不能为空"); m=1}
          else if(this.tempUser.loginPassword.includes(" ")){this.$message.error("密码不能包含空格"); m=1}
          else if(this.tempUser.userName.length==0){this.$message.error("名字不能为空"); m=1}
          else if(this.tempUser.sex.length==0){this.$message.error("请选择性别"); m=1}
          else if(this.tempUser.telphone.length==0){this.$message.error("号码不能为空"); m=1}
          else if(this.tempUser.department.length==0){this.$message.error("请选择组织"); m=1}
          this.tempUser.loginPassword = md5(this.tempUser.loginPassword)
            }

        //修改用户信息

       let _this = this
        if(m==0){
           update(this.tempUser).then(data=>{
             let msg = data.msg;
             _this.getList();
             this.$message.success(msg)
             this.dialogFormVisible = false
           }).catch(data=>{
             this.$message.error("修改失败" )
           })

        }

      },
      deleteUser($index){
        let _vue = this;
        this.$confirm('确定删除此用户?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
          let user = _vue.tableData[$index];
          console.log(user)
           deleteusers(user).then(data=>{
             _vue.getList()
               let msg = data.msg
             _vue.$message.success(msg)
           }).catch(()=>{
             _vue.$message.error("删除失败")
           })
        })
      },

      deleteAll(){
        let _vue = this;
        this.dearr=""
        let length = this.sels.length
        for(let i =0 ; i<length;i++)
        {
          this.ids.dearr+=","+this.sels[i].id
        }
        console.log(this.ids.dearr)
        this.$confirm('确定批量删除?', '提示', {
          confirmButtonText: '确定',
          showCancelButton: false,
          type: 'warning'
        }).then(() => {
             deleteall(this.ids).then(data=>{
               _vue.getList()
               let msg = data.msg
               _vue.$message.success(msg)
             }).catch(data=>{
               _vue.$message.error("删除失败")
             })
          // _vue.$http({
          //   url: "http://localhost:7001/skyeye/deleteAll",
          //   method: "post",
          //   data: this.dearr
          // }).then(() => {
          //   _vue.getList()
          //   _vue.$message.success("成功删除批量用户")
          // }).catch(() => {
          //   _vue.$message.error("删除失败")
          // })
        })
      },

      createUser() {

        let m =0;
        let flag = 0
        for(let i = 0 ;i< this.tableData.length; i++){
          if (this.tempUser.loginName == this.tableData[i].loginName ){
            flag = 1
          }
        }
        if(this.tempUser.loginName.length==0){
          this.$message.error("账号不能为空");m=1
        }
        else  if(flag==1){this.$message.error("该账号已经存在"); }
        else  if(this.tempUser.loginName.includes(" ")){this.$message.error("账号不能包含空格"); m=1}
        else  if(this.tempUser.loginPassword.length==0){this.$message.error("密码不能为空"); m=1}
        else  if(this.tempUser.loginPassword.includes(" ")){this.$message.error("密码不能包含空格"); m=1}
        else if(this.tempUser.loginName.includes(" ")){this.$message.error("账号不能包含空格"); m=1}
        else if(this.tempUser.userName.length==0){this.$message.error("名字不能为空"); m=1}
        else if(this.tempUser.sex.length==0){this.$message.error("请选择性别"); m=1}
        else if(this.tempUser.telphone.length==0){this.$message.error("号码不能为空"); m=1}
        else if(this.tempUser.department.length==0){this.$message.error("请选择组织"); m=1}
        this.tempUser.useState='1';

        if(flag==0&&m==0){
          this.createState=0
          //添加新用户
           this.tempUser.loginPassword = md5(this.tempUser.loginPassword)
          save(this.tempUser).then(response=>{

            this.getList();
            this.dialogFormVisible=false;
            let msg = response.msg
            this.$message.success(msg)
          }).catch(err=>{
           console.log(err)
          })
          // this.$http({
          //   url: "http://localhost:7001/skyeye/saveUser",
          //   method: "post",
          //   data: this.tempUser
          // }).then(() => {
          //   this.getList();
          //   this.dialogFormVisible = false
          //   this.$message.success("成功添加用户")
          // }).catch(data=>{
          //   this.$message.error("创建失败")
          // })
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

      showCreate() {
        //显示新增对话框
        this.createState =1;
        this.tempUser.loginName = "";
        this.tempUser.userName = "";
        this.tempUser.loginPassword = "";
        this.tempUser.department = "";
        this.tempUser.userAddress = "";
        this.tempUser.telphone = "";
        // this.tempUser.deadline="";
        this.dialogStatus = "create"
        this.dialogFormVisible = true
      },
      showUpdate($index) {
        let user = this.tableData[$index];
        this.tempUser.id = user.id;
        this.tempUser.loginName = user.loginName;
        this.tempUser.userName = user.userName;
        this.tempUser.department = user.department;
        this.tempUser.userAddress = user.userAddress;
        this.tempUser.telphone  = user.telphone;
        // this.tempUser.deadline   = user.deadline;
        this.tempUser.crtTime = user.crtTime
        this.tempUser.useState = '1';
        this.tempUser.loginPassword = user.loginPassword;
        // this.tempUser.channelId = user.channelId;
        this.tempUser.sex = user.sex;
        this.dialogStatus = "update"
        this.dialogFormVisible = true

      },
      // pessinfoback() {
      //   this.$store.dispatch('GetInfo').then(() => {
      //     this.$router.push(`/userManage/userManage`)
      //   })
      // },
      /** 查询个人信息*/
      // sgetpessinfo: function() {
      //   getpersonal().then(response => {
      //     console.log(response)
      //     this.tableData[0].value = 'https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png' // 头像链接
      //     this.tableData[1].value = response.data.userName // 用户名称
      //     this.tableData[2].value = response.data.phone // 电话
      //     this.tableData[3].value = response.data.walletpath // 钱包地址
      //     this.tableData[4].value = response.data.userAddress // 账户地址
      //     this.tableData[5].value = response.data.useState // 账户状态
      //     this.tableData[6].value = response.data.crtTime // 入网时间
      //     this.tableData[7].value = response.data.gasNumber // 瓦斯数量
      //     this.tableData[8].value = response.data.publicKey // 公钥
      //     console.log(this.tableData)
      //   })
      // },
    }
  }
</script>

<style scoped>

</style>
