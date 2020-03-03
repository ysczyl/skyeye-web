<template>
  <el-container>
    <!--    头部搜索框-->
    <el-header style="background-color: #eee">
      <div style="margin-top:10px;font-size: 28px;position:absolute;width: 1024px;left: calc(50% - 512px);">个人中心</div>
    </el-header>    <el-container>
      <el-main style="padding:10px 20px">
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
            </el-table>
          </div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
  // import { Navbar } from '../../layout/components'
  // import { getpersonal } from '../../../api/userManage/main'
  export default {
    name: 'Mine',
    data() {
      return {
        tableData: [
          { name: '头像', value: 'https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1441588315,1666293982&fm=26&gp=0.jpg' },
          { name: '用户名称', value: '慕雪' },
          { name: '性别', value: '男' },
          { name: '生日', value: '3月26日' },
          { name: '绑定手机', value: '15858293500' },
          { name: '自定义标签数量', value: '12' },
          { name: '行业权限', value: '游戏' },
          { name: '邮箱地址', value: '1239864102@qq.com' },
          { name: '简介', value: '这是一个优秀的帅气小伙。。。' }
        ],
      }
    },
    created() {
      // this.sgetpessinfo()
    },
    methods: {
      toLable() {
        this.$router.push({ path: '/lable' })
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
    }
  }
</script>

<style scoped>

</style>
