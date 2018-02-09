<template>
   <div class="ArticleCategory">
       <el-row class="source">
            <el-col :span="12">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>文章分类</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="1" :offset="11">
                <el-button @click="addModalShow" type="success" size="mini">添加</el-button>
            </el-col>
        </el-row>
        <el-table
            v-loading="loadingFlag"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            :data="tableData"
            stripe
            style="width: 100%">
            <el-table-column
                prop="name"
                label="类别"
            >
            </el-table-column>
            <el-table-column
                prop="articleCount"
                label="文章数"
            >
            </el-table-column>
            <el-table-column
                prop="path"
                label="前端显示路径"
            >
            </el-table-column>
            <el-table-column
                prop="visible"
                label="是否在前台显示"
            >
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.visible"
                        active-color="#13ce66"
                        inactive-color="#ff4949"
                        @change="showToggle(scope.row.visible, scope.row.id)"
                    >
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini"  @click="showModifyModal(scope.$index, scope.row)">修改</el-button>
                    <el-button type="danger" size="mini" @click="delCategory(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Modal :dialogFormVisible="addModal" :title="'添加分类'" @modalToggle="modalToggle">
            <el-form slot="content"  :model="categoryForm" status-icon :rules="rules" ref="categoryForm" label-width="100px">
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input type="text" v-model="categoryForm.categoryName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类路径" prop="path">
                    <el-input type="text" v-model="categoryForm.path" auto-complete="off">
                        <template slot="append">格式: /frontend</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-row>
                    <el-col :span="12" :offset="2">
                        <el-button type="primary" size="mini" plain @click="addCategory">确定</el-button>
                        <el-button type="danger" size="mini" plain @click="modalToggle">取消</el-button>
                    </el-col>
                </el-row>
            </div>
        </Modal>
        <Modal :dialogFormVisible="modifyModal" :title="'修改分类'" @modalToggle="modalToggle">
            <el-form slot="content"  :model="categoryForm" status-icon :rules="rules" ref="categoryForm" label-width="100px">
                <el-form-item label="分类名称" prop="categoryName">
                    <el-input type="text" v-model="categoryForm.categoryName" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="分类路径" prop="path">
                    <el-input type="text" v-model="categoryForm.path" auto-complete="off">
                        <template slot="append">格式: /frontend</template>
                    </el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-row>
                    <el-col :span="12" :offset="2">
                        <el-button type="primary" size="mini" plain @click="modifyCategory">修改</el-button>
                        <el-button type="danger" size="mini" plain @click="modalToggle">取消</el-button>
                    </el-col>
                </el-row>
            </div>
        </Modal>
   </div>
</template>

<script type="text/ecmascript-6">
import Modal from '@/components/Modal'
import { mapState } from 'vuex'
    export default {
        data () {
            var validateName = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('分类名称不能为空'))
                } else {
                    callback()
                }
            }
                var validatePath = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('分类路径不能为空'))
                } else {
                    callback()
                }
            }
            return {
                    loadingFlag: false,
                    // 表格所有数据
                    tableData: [],
                    // 修改分类的名称
                    modifyModal: false,
                    // 添加分类模态框显示与否
                    addModal: false,
                    categoryForm: {
                        // 添加分类的名称
                        categoryName: '',
                        // 添加分类的前台显示路径
                        path: ''
                    },
                    // 添加模态框的验证
                    rules: {
                        categoryName: [
                            { validator: validateName, trigger: 'blur' }
                        ],
                        path: [
                            { validator: validatePath, trigger: 'blur' }
                        ]
                    },
                    // 临时存放的id
                    tempId: ''
            }
        },
        mounted () {
            this.loadingCategory()
        },
        computed: {
          ...mapState([
              'role'
          ])
        },
        methods: {
            loadingCategory () {
                this.loadingFlag = true
                this.$ajax.get('/categories').then(response => {
                    this.loadingFlag = false
                    var arr = []
                    var res = response.data
                    if (res.status === '1') {
                        res.result.forEach((item, index) => {
                            let obj = {}
                            obj.id = item._id
                            obj.name = item.name
                            obj.articleCount = item.articles.length
                            obj.path = item.path
                            obj.visible = item.visible
                            arr.push(obj)
                        })
                        this.tableData = arr
                    }
                })
            },
            // 显示修改模态框
            showModifyModal (index, row) {
                if (this.role < 50) {
                    this.$message.error('权限不够,不能修改')
                } else {
                    this.modifyModal = true
                    this.tempId = row.id
                }
            },
            // 修改分类
            modifyCategory () {
                if (this.categoryForm.categoryName && this.categoryForm.path) {
                    this.$ajax.post('/categories/modify', {
                        id: this.tempId,
                        path: this.categoryForm.path,
                        name: this.categoryForm.categoryName
                    }).then(res => {
                        if (res.data.status === '1') {
                            this.$message.success(res.data.msg)
                            this.loadingCategory()
                            this.modalToggle()
                        }
                    })
                } else {
                    this.$message.error('分类名不能为空')
                }
            },
            // 添加分类
            addModalShow () {
                if (this.role < 50) {
                    this.$message.error('权限不够,不能添加')
                } else {
                    this.addModal = true
                }
            },
            // 前端是否显示
            showToggle (visible, id) {
                this.$ajax.post('/categories/modify', {
                    id: id,
                    visible: visible
                }).then(res => {
                    if (res.data.status === '1') {
                        this.$message.success(res.data.msg)
                    }
                })
            },
            // 关闭模态框
            modalToggle () {
                this.addModal = false
                this.modifyModal = false
                this.resetForm('categoryForm')
            },
            // 删除分类
            delCategory (index, row) {
                this.$ajax.delete('/categories/del', {
                    params: {
                        id: row.id
                    }
                }).then(res => {
                    if (res.data.status === '1') {
                        this.$message.success(res.data.msg)
                        this.loadingCategory()
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
            },
            // 添加分类
            addCategory () {
                if (this.categoryForm.categoryName && this.categoryForm.path) {
                    this.$ajax.post('/categories/new', {
                        name: this.categoryForm.categoryName,
                        path: this.categoryForm.path
                    }).then(res => {
                        if (res.data.status === '1') {
                            this.$message.success(res.data.msg)
                            this.modalToggle()
                            this.loadingCategory()
                        }
                    })
                } else {
                    this.$message.error('分类名不能为空')
                }
            },
            // 重置表单
            resetForm (formName) {
                this.$refs[formName].resetFields()
            }
        },
       components: {
           Modal
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
