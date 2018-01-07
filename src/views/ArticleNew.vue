<template>
    <div class="articleNew">
        <el-row class="title">
            <el-col :span="12">
                <el-input v-model="title" placeholder="请输入标题">
                    <template slot="prepend">文章标题</template>
                </el-input>
            </el-col>
        </el-row>
        <mavon-editor v-model="value"/>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            value: '',
            title: ''
        }
    },
    components: {

    }
}
</script>

<style scoped lang="stylus">
    .title
        margin-bottom 20px
    .markdown-body
        height 700px
</style>
