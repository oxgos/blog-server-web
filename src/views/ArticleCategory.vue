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
                        v-model="choose"
                        active-color="#13ce66"
                        inactive-color="#ff4949">
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini"  @click="modifyCategory(scope.$index, scope.row)">修改</el-button>
                    <el-button type="danger" size="mini" @click="delCategory(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
   </div>
</template>

<script type="text/ecmascript-6">
   export default {
        data () {
            return {
                    tableData: [],
                    categoryName: '',
                    choose: ''
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
                            obj.name = item.name
                            obj.articleCount = item.articles.length
                            obj.visible = item.visible
                            arr.push(obj)
                        })
                        this.tableData = arr
                    }
                })
            },
            modifyCategory (index, row) {},
            delCategory (index, row) {},
            addCategory () {
                this.$ajax.post('/categories/new', {
                    name: this.categoryName
                }).then(res => {
                    if (res.data.status === '1') {
                        this.$message.success(res.data.msg)
                        this.loadingCategory()
                    }
                })
            }
        },
       components: {

       }
   }
</script>

<style scoped lang="stylus">
    .source
        padding 0 10px 20px 10px
</style>
