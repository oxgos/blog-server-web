<template>
    <div class="articleNew">
        <el-row class="title">
            <el-col :span="14">
                <el-input class="input-with-select" v-model="title" placeholder="请输入标题">
                    <el-select v-model="articleType" slot="prepend" placeholder="请选择" style="width: 130px;">
                        <el-option label="原创" value="1"></el-option>
                        <el-option label="转载" value="2"></el-option>
                    </el-select>
                </el-input>
            </el-col>
        </el-row>
        <el-row class="editor">
            <el-col :span="24">
                <mavon-editor v-model="content" ref="md"/>
            </el-col>
        </el-row>
        <el-row class="category">
            <el-col :span="12" :offset="2">
                文章分类:
                <template>
                    <el-radio-group v-model="categoryType">
                        <el-radio :label="1">前端分享</el-radio>
                        <el-radio :label="2">后端分享</el-radio>
                        <el-radio :label="3">工作心得</el-radio>
                    </el-radio-group>
                </template>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12" :offset="4">
                <el-button type="danger" plain @click="newArticle">发表文章</el-button>
                <el-button type="danger" plain>重置</el-button>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
export default {
    data () {
        return {
            content: '',
            title: '',
            articleType: '',
            categoryType: 1
        }
    },
    methods: {
        newArticle () {
            var category = ''
            var html = ''
            var type = ''
            switch (this.categoryType) {
                case 1:
                    category = '前端分享'
                    break
                case 2:
                    category = '后端分享'
                    break
                case 3:
                    category = '工作心得'
                    break
            }
            switch (this.articleType) {
                case '1':
                    type = '原创'
                    break
                case '2':
                    type = '转载'
                    break
            }
            html = this.$refs.md.s_markdown.render(this.content)
            this.$ajax.post('/articles/articleNew', {
                type: type,
                title: this.title,
                content: html,
                category: category
            }).then(res => {
                if (res.data.status === '1') {
                    this.$message({
                        message: res.data.msg,
                        type: 'success'
                    })
                    this.$router.push('/admin/articleList')
                }
            })
        }
    },
    components: {

    }
}
</script>

<style scoped lang="stylus">
    .title, .editor
        margin-bottom 20px
    .category
        margin-bottom 40px
    .markdown-body
        height 600px
</style>
