<template>
    <div class="articleList">
        <el-table
            ref="multipleTable"
            :data="tableData3"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange">
            <el-table-column
                type="selection"
                width="55"
            >
            </el-table-column>
            <el-table-column
                label="创建日期"
                width="120"
            >
                <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column
                prop="name"
                label="文章标题"
                width="120"
            >
            </el-table-column>
            <el-table-column
                prop="address"
                label="分类"
                show-overflow-tooltip
            >
            </el-table-column>
        </el-table>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            articles: [],
            tableData3: [{
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-08',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-06',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-07',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }],
            multipleSelection: []
        }
    },
    created () {
        this.loadArticle()
    },
    methods: {
        loadArticle () {
            this.$ajax.get('/articles').then(response => {
                let res = response.data
                if (res.status === '1') {
                    this.articles = res.result
                }
            })
        },
        handleSelectionChange (val) {
            this.multipleSelection = val
        }
    },
    components: {

    }
}
</script>

<style scoped lang="stylus">

</style>
