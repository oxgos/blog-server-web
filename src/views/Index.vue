<template>
    <div class="Index">
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
                            <i class="header-icon el-icon-edit" style="padding: 0 10px"></i>访客数量统计
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
                activeNames: ['1', '2']
            }
        },
        created () {
            this.loadingCategory()  
        },
        methods: {
            loadingCategory () {
                this.$ajax.get('/categories').then(response => {
                    var res = response.data
                    if (res.status === '1') {
                        res.result.forEach((item, index) => {
                            this.categoryDate.name.push(item.name)
                            this.categoryDate.articleCount.push(item.articles.length)
                        })
                    }
                    this.$nextTick(() => {
                        this.initChart()
                    })
                })
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
                let lineChart = new Chart(pvCtx, {
                    type: 'line',
                    data: {
                        datasets: [{
                                backgroundColor: 'rgba(245, 108, 108, 0.6)',
                                label: '访客人数'
                            }]
                    },
                    options: {
                        plugins: {
                            filler: {
                                propagate: true
                            }
                        }
                    }
                })
            }
        },
        components: {

        }
    }
</script>

<style scoped>
</style>
