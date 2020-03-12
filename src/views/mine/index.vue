<template>
  <el-container>
    <!--    头部搜索框-->
    <el-header style="background-color: #eee">
      <div style="margin-top:10px;font-size: 28px;position:absolute;width: 1024px;left: calc(50% - 512px);">个人中心</div>
    </el-header>    <el-container>
      <el-main style="padding:10px 20px" v-if="flag===0">
        <div>
          <!-- 返回按钮 -->
          <div style="margin-left: 3%; margin-right: 2%">
<!--            <el-button size="medium" @click="pessinfoback">返回</el-button>-->
          </div>
          <!-- 用户信息 -->
          <div style="margin-top: 15px;width: 1024px;margin-left: calc(50% - 512px);">
            <el-table
              :data="tableData"
              style="width: 100%"
              border
              align="center">
              <el-table-column prop="name" label="属性" align="center" min-width="30%">
                <template slot-scope="scope">{{ scope.row.name }}</template>
              </el-table-column>
              <el-table-column prop="value" label="个人信息" align="center" min-width="70%">
                <template slot-scope="scope">
                  <span v-if="scope.row.name === '头像'">
                    <el-row class="demo-avatar demo-basic">
                      <el-col :span="24">
                        <div class="demo-basic--circle">
                          <div class="block"><el-avatar shape="square" :size="50" :src="scope.row.value "/></div>
                        </div>
                      </el-col>
                    </el-row>
                  </span>
                  <span v-else-if="scope.row.name === '自定义标签数量'" >
                    <el-link style="border-bottom: 1px solid black;height: 12px" @click="toLable">{{scope.row.value}}</el-link>
                  </span>
                  <span v-else >{{ scope.row.value }}</span>
                </template>
              </el-table-column>
            </el-table><br><br>
            <div align="right">
            <el-button type="primary"plain @click="showUpdate">编辑</el-button>
            <el-button type="success"plain @click="showchangePass">修改密码</el-button></div>
          </div>

        </div>
      </el-main>
    </el-container>


  <!-- 弹框区域-->
  <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
    <el-form class="small-space" :model="tempUser" label-position="left" label-width="100px"
             style='width: 300px; margin-left:50px;'>
      <el-form-item label="账号" required>
        <el-input type="text" v-model="tempUser.loginName" :disabled="true">
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
      <el-form-item label="创建时间">
        <el-input type="text"  v-model="tempUser.crtTime" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="住址">
        <el-input type="textarea" :rows="6" v-model="tempUser.userAddress"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">

      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary"  @click="updateUser" >修 改</el-button>
    </div>
  </el-dialog>

    <!-- 弹框区域-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible2">
      <el-form class="small-space" :model="tempUser" label-position="left" label-width="100px"
               style='width: 300px; margin-left:50px;'>


        <el-form-item label="原密码" required>
          <el-input type="password"  v-model="password.oldpassword"></el-input>
        </el-form-item>

        <el-form-item label="新密码" required>
          <el-input type="password"  v-model="password.newpassword1"></el-input>
        </el-form-item>

        <el-form-item label="确认新密码" required>
          <el-input type="password"  v-model="password.newpassword2"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="success"  @click="clearpass" >重置</el-button>
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary"  @click="changePassword" >修 改</el-button>
      </div>
    </el-dialog>
   </el-container>
</template>

<script>

  // import { Navbar } from '../../layout/components'
  // import { getpersonal } from '../../../api/userManage/main'
  import {mapGetters} from 'vuex'
  import md5 from 'js-md5';
  import {findbyId,update,changepassword} from '../../api/user'
  export default {
    name: 'Mine',
    data() {
      return {
        flag:0,
        dialogStatus: 'update',  //弹窗区域类型
        dialogFormVisible: false,  //弹窗区域开关
        dialogFormVisible2:false,
        textMap: {
          update: '编辑',
          change:'修改密码'
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
          useState:''
        },
        password:{
            id:'',
            oldpassword:'',
            newpassword1:'',
            newpassword2:''
        },
        tableData: [
          // { name: '', value: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1441588315,1666293982&fm=26&gp=0.jpg' },
          { name: '用户姓名', value:'' },
          { name: '性别', value: '' },
          { name: '登录账号', value: '' },
          { name: '绑定手机', value: '' },
          { name: '组织', value: '' },
          { name: '住址', value: '' },
          { name: '创建时间', value: '' },
          // { name: '简介', value: '这是一个优秀的帅气小伙。。。' }
        ],
      }
    },
    created() {
      // this.sgetpessinfo()
       this.getList()
       this.flag=1;   // 先拿数据后渲染

    },
    methods: {
      toLable() {
        this.$router.push({ path: '/lable' })
      },

      getList(){
        this.tempUser.id = this.userId;
        console.log(this.tempUser.id)
          findbyId(this.tempUser).then(data=>{
            this.tempUser.id = data.data.id;
            this.tempUser.loginName = data.data.loginName;
            this.tempUser.userName = data.data.userName;
            this.tempUser.department = data.data.department;
            this.tempUser.userAddress = data.data.userAddress;
            this.tempUser.telphone  = data.data.telphone;
            // this.tempUser.deadline   = user.deadline;
            this.tempUser.crtTime = data.data.crtTime
            this.tempUser.loginPassword = data.data.loginPassword;
            // this.tempUser.channelId = user.channelId;
            this.tempUser.sex = data.data.sex;
            this.tempUser.useState = data.data.useState

            this.tableData[0].value = this.tempUser.userName
            this.tableData[1].value = this.tempUser.sex
            this.tableData[2].value = this.tempUser.loginName
            this.tableData[3].value = this.tempUser.telphone
            this.tableData[4].value = this.tempUser.department
            this.tableData[5].value = this.tempUser.userAddress
            this.tableData[6].value = this.tempUser.crtTime
              this.flag =0
          })
      },
      showUpdate() {
        this.dialogStatus="update"
        this.getList()
        this.dialogFormVisible = true

      },
      showchangePass() {
        this.dialogStatus="change"
        this.password.oldpassword=''
        this.password.newpassword1=''
        this.password.newpassword2=''
        this.dialogFormVisible2 = true

      },
      clearpass(){
        this.password.oldpassword=''
        this.password.newpassword1=''
        this.password.newpassword2=''
      },
      updateUser(){
        console.log(this.tempUser)
        let m =0;

          if(this.tempUser.userName.length==0){this.$message.error("名字不能为空"); m=1}
          else if(this.tempUser.sex.length==0){this.$message.error("请选择性别"); m=1}
          else if(this.tempUser.telphone.length==0){this.$message.error("号码不能为空"); m=1}
          else if(this.tempUser.department.length==0){this.$message.error("请选择组织"); m=1}

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
   //this.tempuser
      },
      changePassword(){
        let m =0;
            if(this.password.oldpassword==null||this.password.oldpassword.length==0){
              this.$message.error("原密码不能为空");  m=1
            }
            else if(this.password.newpassword1==null||this.password.newpassword1.length==0){
              this.$message.error("新密码不能为空");m=1
            }
            else if(this.password.newpassword2==null||this.password.newpassword2.length==0){
              this.$message.error("新密码不能为空");m=1
            } else if(this.password.oldpassword.includes(" ")){
              this.$message.error("原密码不能包含空格");m=1
            }
            else if(this.password.newpassword1.includes(" ")){
              this.$message.error("新密码不能包含空格");m=1
            }
            else if(this.password.newpassword2.includes(" ")){
              this.$message.error("新密码不能包含空格");m=1
            }else{

            }



        let _this = this
        if(m==0){
          this.password.oldpassword = md5(this.password.oldpassword)
          this.password.newpassword2 = md5(this.password.newpassword2)
          this.password.newpassword1 = md5(this.password.newpassword1)
          this.password.id = this.userId
          changepassword(this.password).then(data=>{
            console.log(data.code)
            console.log(data.msg)
            let msg = data.msg
            if(data.total==0){
              console.log("当code 000")
              this.$message.error(msg)
            }
            else{
              this.$message.success(msg)
              this.dialogFormVisible2 = false
            }
          })
        }
//this.password
      }

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
    },
    computed: {
      ...mapGetters([
        'userId'
      ]),
    }
  }
</script>

<style scoped>

</style>
