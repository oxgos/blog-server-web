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
export default {
    data () {
        return {
            tableData: [],
            multipleSelection: []
        }
    },
    created () {
        this.loadArticle()
    },
    methods: {
        loadArticle () {
            var data = []
            this.$ajax.get('/articles').then(response => {
                let res = response.data
                if (res.status === '1') {
                    res.result.forEach(item => {
                        let obj = {}
                        obj.id = item._id
                        obj.type = item.type
                        obj.title = item.title
                        obj.category = item.category
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
            this.$router.push({
                path: '/admin/articleDetail',
                query: {
                    id: row.id
                }
            })
            /* this.$ajax.get('/articles/detail', {
                params: {
                    id: row.id
                }
            }).then(res => {
                if (res.data.status === '1') {
                    console.log(res.data.result)
                }
            }) */
        },
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
                        this.$message.error(res.data.msg)
                        this.loadArticle()
                    }
                })
            } else {
                this.$message.warning('请勾选需删除的文章')
            }
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
