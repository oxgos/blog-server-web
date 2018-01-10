<template>
   <div class="ArticleCategory">
       <el-row class="source">
            <el-col :span="12">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>文章分类</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
            <el-col :span="4" :offset="8">
                <el-input v-model="categoryName" placeholder="请输入分类名称">
                    <el-button @click="addCategory" slot="append" type="success" style="background-color: #67c23a; color: #fff;border-color: #67c23a;">添加</el-button>
                </el-input>
            </el-col>
        </el-row>
        <el-table
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
                prop="visible"
                label="是否在前台显示"
            >
                <template slot-scope="scope">
                    <el-switch
                        v-model="scope.row.visible"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
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
        <Modal :dialogFormVisible="modifyModal" :title="'修改分类'" @modalToggle="modalToggle">
            <div slot="content">
                <el-row>
                    <el-col :span="12" :offset="5">
                        <el-input v-model="modifyName" placeholder="输入新的分类名"></el-input>
                    </el-col>
                </el-row>
            </div>
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
    export default {
        data () {
            return {
                    tableData: [],
                    categoryName: '',
                    modifyName: '',
                    modifyModal: false,
                    tempId: '',
                    tempVisible: '',
                    timer: ''
            }
        },
        mounted () {
            this.loadingCategory()
        },
        methods: {
            loadingCategory () {
                this.$ajax.get('/categories').then(response => {
                    var arr = []
                    var res = response.data
                    if (res.status === '1') {
                        res.result.forEach((item, index) => {
                            let obj = {}
                            obj.id = item._id
                            obj.name = item.name
                            obj.articleCount = item.articles.length
                            obj.visible = item.visible
                            arr.push(obj)
                        })
                        this.tableData = arr
                    }
                })
            },
            showModifyModal (index, row) {
                this.modifyModal = true
                this.tempId = row.id
                this.tempVisible = row.visible
            },
            modifyCategory () {
                if (this.modifyName) {
                    this.$ajax.post('/categories/modify', {
                        id: this.tempId,
                        visible: this.tempVisible,
                        name: this.modifyName
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
            modalToggle () {
                this.modifyModal = false
            },
            delCategory (index, row) {
                this.$ajax.delete('/categories/del', {
                    params: {
                        id: row.id
                    }
                }).then(res => {
                    if (res.data.status === '1') {
                        this.$message.error(res.data.msg)
                        this.loadingCategory()
                    }
                })
            },
            addCategory () {
                this.timer && clearTimeout(this.timer)
                this.timer = setTimeout(() => {
                    if (this.categoryName) {
                        this.$ajax.post('/categories/new', {
                            name: this.categoryName
                        }).then(res => {
                            if (res.data.status === '1') {
                                this.$message.success(res.data.msg)
                                this.loadingCategory()
                            }
                        })
                    } else {
                        this.$message.error('分类名不能为空')
                    }
                }, 500)
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
