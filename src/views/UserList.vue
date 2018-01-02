<template>
  <div>
    <div class="source">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
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
          <el-button type="primary" size="mini"  @click="editModalFlag = true">编辑</el-button>
          <el-button type="danger" size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <modal :dialogFormVisible="editModalFlag" :correct="true" @modalToggle="modalChange" :title="'权限信息'">
      <el-form :model="form" slot="content">
            <el-form-item label="权限设置" :label-width="formLabelWidth">
                <el-select placeholder="选择用户的权限"  v-model="form.role">
                    <el-option label="普通用户" value="0"></el-option>
                    <el-option label="邮件激活后的用户" value="20"></el-option>
                    <el-option label="高级用户" value="30"></el-option>
                    <el-option label="管理员" value="40"></el-option>
                    <el-option label="超级管理员" value="50"></el-option>
                </el-select>
            </el-form-item>
        </el-form>
    </modal>
    <modal :dialogFormVisible="pwdModalFlag" @resetEvent="resetForm('modifyPwdForm')" :reset="true" @modalToggle="modalChange" :title="'修改密码'">
      <el-form slot="content"  :model="modifyPwdForm" status-icon :rules="rules" ref="modifyPwdForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="密码" prop="pass">
          <el-input type="password" v-model="modifyPwdForm.pass" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="modifyPwdForm.checkPass" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
    </modal>
  </div>
</template>

<script type="text/ecmascript-6">
import modal from '@/components/Modal'

export default {
    data () {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'))
          } else {
            if (this.modifyPwdForm.checkPass !== '') {
              this.$refs.modifyPwdForm.validateField('checkPass')
            }
            callback()
          }
        }
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'))
          } else if (value !== this.modifyPwdForm.pass) {
            callback(new Error('两次输入密码不一致!'))
          } else {
            callback()
          }
        }
        return {
          modifyPwdForm: {
            pass: '',
            checkPass: ''
          },
          rules: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ]
          },
          pwdModalFlag: false,
          editModalFlag: false,
          tableData: [{
            account: 'admin',
            username: '小郭',
            role: '超级管理员'
          }, {
            account: 'admin2017',
            username: '小李',
            role: '管理员'
          }],
          form: {
            role: ''
          },
          formLabelWidth: '120px'
        }
    },
    methods: {
      modalChange () {
        this.pwdModalFlag = false
        this.editModalFlag = false
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
</style>
