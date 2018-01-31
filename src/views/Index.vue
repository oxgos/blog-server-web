<template>
    <div class="adminIndex">
        <el-row>
            <el-col :span="8">
                <el-collapse v-model="activeNames">
                    <el-collapse-item name="1">
                        <template slot="title">
                            <i class="header-icon el-icon-edit" style="padding: 0 10px"></i>文章数量统计
                        </template>
                        <canvas id="articleChart" ref="articleChart"></canvas>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
            <el-col :span="8" :offset="1">
                <el-collapse v-model="activeNames">
                    <el-collapse-item name="2">
                        <template slot="title">
                            <i class="header-icon el-icon-edit" style="padding: 0 10px"></i>文章浏览数排行
                        </template>
                        <canvas id="pvChart" ref="pvChart"></canvas>
                    </el-collapse-item>
                </el-collapse>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    import Chart from 'chart.js'
    export default {
        data () {
            return {
                categoryDate: {
                    name: [],
                    articleCount: []
                },
                activeNames: ['1', '2'],
                articlesTitle: [],
                pv: [],
                labels: [1, 2, 3, 4, 5, 6, 7]
            }
        },
        created () {
            this.loadingInit()
        },
        methods: {
            loadingInit () {
                this.$ajax.all([this.getCategory(), this.getPv()]).then(this.$ajax.spread((category, pv) => {
                    if (category.data.status === '1' && pv.data.status === '1') {
                        category.data.result.forEach((item, index) => {
                            this.categoryDate.name.push(item.name)
                            this.categoryDate.articleCount.push(item.articles.length)
                        })
                        pv.data.result.forEach((item) => {
                            this.pv.push(item.pv)
                            this.articlesTitle.push(item.title)
                        })
                        this.$nextTick(() => {
                            this.initChart()
                        })
                    } else {
                        this.$message.error('读取数据失败')
                    }
                }))
            },
            getCategory () {
                return this.$ajax.get('/categories')
            },
            getPv () {
                return this.$ajax.get('/feArticles/pv')
            },
            initChart () {
                let artCtx = this.$refs.articleChart
                let pvCtx = this.$refs.pvChart
                /* eslint-disable no-unused-vars */
                let myDoughnutChart = new Chart(artCtx, {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: this.categoryDate.articleCount,
                            backgroundColor: [
                                'rgba(103, 194, 58, 0.6)',
                                'rgba(230, 162, 60, 0.6)',
                                'rgba(245, 108, 108, 0.6)',
                                'rgba(75, 192, 192, 0.6)'
                            ]
                        }],
                        labels: this.categoryDate.name
                    }
                })
                /* eslint-disable no-unused-vars */
                var myBarChart = new Chart(pvCtx, {
                    type: 'horizontalBar',
                    data: {
                        datasets: [{
                            label: '浏览量',
                            data: this.pv,
                            backgroundColor: [
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(230, 162, 60, 0.6)',
                                'rgba(103, 194, 58, 0.6)',
                                'rgba(245, 108, 108, 0.6)',
                                'rgba(75, 192, 192, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(204, 101, 254, 0.6)'
                            ]
                        }],
                        labels: this.articlesTitle
                    }
                })
            }
        }
    }
</script>

<style scoped>
</style>
