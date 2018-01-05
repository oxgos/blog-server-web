<template>
  <div>
    <el-row class="source">
      <el-col :span="12">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
          </el-breadcrumb>
      </el-col>
      <el-col :span="1" :offset="11">
          <el-button @click="addModalFlag = true" type="success" size="mini">添加</el-button>
      </el-col>
    </el-row>
    <el-table
      :data="tableData"
      stripe
      style="width: 100%">
      <el-table-column
        prop="account"
        label="帐号"
        >
      </el-table-column>
      <el-table-column
        prop="username"
        label="用户名"
        >
      </el-table-column>
      <el-table-column
        prop="role"
        label="权限"
        >
      </el-table-column>
      <el-table-column
        label="操作"
        >
        <template slot-scope="scope">
          <el-button type="primary" size="mini"  @click="pwdModalFlag = true">修改密码</el-button>
          <el-button type="warning" size="mini"  @click="editModalFlag = true">权限设置</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <modal :dialogFormVisible="editModalFlag" @modalToggle="modalChange" :title="'权限信息'">
      <el-form :model="form" slot="content">
          <el-form-item label="权限设置" :label-width="formLabelWidth">
              <el-select placeholder="选择用户的权限"  v-model="form.role">
                  <el-option label="普通用户" value="0"></el-option>
                  <el-option label="邮件激活后的用户" value="1"></el-option>
                  <el-option label="高级用户" value="2"></el-option>
                  <el-option label="管理员" value="10"></el-option>
                  <el-option label="超级管理员" value="50"></el-option>
              </el-select>
          </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="modalChange">取 消</el-button>
          <el-button type="primary" @click="modalChange">确 定</el-button>
      </div>
    </modal>
    <modal :dialogFormVisible="pwdModalFlag" @modalToggle="modalChange" :title="'修改密码'">
      <el-form slot="content"  :model="modifyPwdForm" status-icon :rules="rules" ref="modifyPwdForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="modifyPwdForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="modifyPwdForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="modalChange">确 定</el-button>
          <el-button type="danger" @click="resetForm('modifyPwdForm')">重 置</el-button>
      </div>
    </modal>
    <modal :dialogFormVisible="addModalFlag" @modalToggle="modalChange" :title="'添加用户'">
      <el-form slot="content"  :model="addUserForm" status-icon :rules="rules" ref="addUserForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="帐号名" prop="account">
          <el-input type="text" v-model="addUserForm.account" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户名" prop="username">
          <el-input type="text" v-model="addUserForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="addUserForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="addUserForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
          <el-button @click="addNewUser">确 定</el-button>
          <el-button type="danger" @click="resetForm('addUserForm')">重 置</el-button>
      </div>
    </modal>
  </div>
</template>

<script type="text/ecmascript-6">
import modal from '@/components/Modal'

export default {
    data () {
        var validateAccount = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('帐号不能为空'))
          } else {
            callback()
          }
        }
        var validateUserName = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('用户名不能为空'))
          } else {
            callback()
          }
        }
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'))
          } else {
            if (this.modifyPwdForm.checkPass !== '') {
              this.$refs.modifyPwdForm.validateField('checkPass')
            } else if (this.addUserForm.checkPass !== '') {
              this.$refs.addUserForm.validateField('checkPass')
            }
            callback()
          }
        }
        var validatePass2 = (rule, value, callback) => {
          let pass = this.modifyPwdForm.pass === '' ? this.addUserForm.pass : this.modifyPwdForm.pass
          if (value === '') {
            callback(new Error('请再次输入密码'))
          } else if (value !== pass) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        }
        return {
          // 双向绑定修改添加用户输入框
          addUserForm: {
            account: '',
            username: '',
            pass: '',
            checkPass: ''
          },
          // 存入所有用户数据
          users: [],
          // 双向绑定修改密码输入框
          modifyPwdForm: {
            pass: '',
            checkPass: ''
          },
          // 验证密码的规则
          rules: {
            account: [
              { validator: validateAccount, trigger: 'blur' }
            ],
            username: [
              { validator: validateUserName, trigger: 'blur' }
            ],
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ]
          },
          // 控制修改密码模态框
          pwdModalFlag: false,
          // 控制编辑模态框
          editModalFlag: false,
          // 控制添加用户模态框
          addModalFlag: false,
          // 存放表格数据
          tableData: [],
          // 双向绑定选项卡
          form: {
            role: ''
          },
          formLabelWidth: '120px'
        }
    },
    mounted () {
      this.loadingUser()
    },
    methods: {
      loadingUser () {
        let userRole = ''
        this.$ajax.get('/users').then(response => {
          let res = response.data
          if (res.status === '1') {
            this.users = res.result
            for (let i = 0; i < this.users.length; i++) {
              switch (this.users[i].role) {
                case 0:
                  userRole = '普通用户'
                  break
                case 1:
                  userRole = '邮件激活后的用户'
                  break
                case 2:
                  userRole = '高级用户'
                  break
                case 10:
                  userRole = '管理'
                  break
                case 50:
                  userRole = '超级管理员'
                  break
              }
              this.tableData[i] = {
                account: this.users[i].account,
                username: this.users[i].username,
                role: userRole
              }
            }
          }
        })
      },
      addNewUser () {
        this.$ajax.post('/users/newAccount', {
          account: this.addUserForm.account,
          username: this.addUserForm.username,
          password: this.addUserForm.password
        }).then(res => {
          if (res.data.status === '1') {
            alert(res.data.msg)
          }
        })
      },
      modalChange () {
        this.pwdModalFlag = false
        this.editModalFlag = false
        this.addModalFlag = false
      },
      resetForm (formName) {
        this.$refs[formName].resetFields()
      }
    },
    components: {
      modal
    }
}
</script>

<style scoped lang="stylus">
  .source
    padding 0 10px 20px 10px
  .dialog-footer
    padding 20px 10px 5px 15px
    text-align right
    box-sizing border-box
</style>
