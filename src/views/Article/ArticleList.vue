<template>
    <div class="articleList">
        <el-row class="source">
            <el-col :span="12">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>文章列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-table
            v-loading="loadingFlag"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
            >
            </el-table-column>
            <el-table-column
                prop="type"
                label="文章类型"
            >
            </el-table-column>
            <el-table-column
                prop="title"
                label="文章标题"
            >
            </el-table-column>
            <el-table-column
                prop="category"
                label="文章分类"
            >
            </el-table-column>
            <el-table-column
                prop="createdAt"
                label="创建时间"
            >
            </el-table-column>
            <el-table-column
                label="操作"
            >
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="showArticleDetail(scope.$index, scope.row)">查看</el-button>
                    <el-button type="danger" size="mini" @click="delArticle(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
import { mapState } from 'vuex'
export default {
    data () {
        return {
            tableData: [],
            multipleSelection: [],
            loadingFlag: false
        }
    },
    created () {
        this.loadArticle()
    },
    computed: {
      ...mapState([
          'role'
      ])
    },
    methods: {
        loadArticle () {
            var data = []
            this.loadingFlag = true
            this.$ajax.get('/articles').then(response => {
                this.loadingFlag = false
                let res = response.data
                if (res.status === '1') {
                    res.result.forEach(item => {
                        let obj = {}
                        obj.id = item._id
                        obj.type = item.type
                        obj.title = item.title
                        obj.category = item.category.name
                        obj.createdAt = item.meta.createdAt.split('T')[0]
                        data.push(obj)
                    })
                    this.tableData = data
                }
            })
        },
        handleSelectionChange (val) {
            this.multipleSelection = val
        },
        showArticleDetail (index, row) {
            if (this.role < 50) {
                this.$message.error('权限不够,不能查看')
            } else {
                this.$router.push({
                    path: '/admin/articleDetail',
                    query: {
                        id: row.id
                    }
                })
            }
        },
        // 删除文章
        delArticle (index, row) {
            var flag = false
            this.multipleSelection.forEach(item => {
                if (item.id === row.id) {
                    flag = true
                }
            })
            if (flag) {
                this.$ajax.delete('/articles/delete', {
                    params: {
                        id: row.id
                    }
                }).then(res => {
                    if (res.data.status === '1') {
                        this.$message.success(res.data.msg)
                        this.loadArticle()
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
            } else {
                this.$message.warning('请勾选需删除的文章')
            }
        }
    }
}
</script>

<style scoped lang="stylus">
    .source
        padding 0 10px 20px 10px
</style>
