<template>
   <div class="articleDetail">
       <el-row class="source">
            <el-col :span="12">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/admin' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/admin/articleList' }">文章列表</el-breadcrumb-item>
                    <el-breadcrumb-item>文章列表</el-breadcrumb-item>
                </el-breadcrumb>
            </el-col>
        </el-row>
        <el-row class="title">
            <el-col :span="14">
                <el-input class="input-with-select" v-model="title" placeholder="请输入标题">
                    <el-select v-model="articleType" slot="prepend" placeholder="请选择" style="width: 130px;">
                        <el-option label="原创" value="原创"></el-option>
                        <el-option label="转载" value="转载"></el-option>
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
                        <el-radio v-for="item in categories" :key="item._id" :label="item._id">{{ item.name }}</el-radio>
                    </el-radio-group>
                </template>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="12" :offset="4">
                <el-button type="danger" plain @click="save">保存</el-button>
                <el-button type="danger" plain @click="cancel">取消</el-button>
            </el-col>
        </el-row>
   </div>
</template>

<script type="text/ecmascript-6">
   export default {
       data () {
           return {
               id: '',
               title: '',
               articleType: '',
               content: '',
               categoryType: '',
               categories: []
           }
       },
       mounted () {
           this.loadingArticleDetail()
       },
       methods: {
           loadingArticleDetail () {
               this.id = this.$route.query.id
               this.$ajax.get('/articles/detail', {
                    params: {
                        id: this.id
                    }
                }).then(res => {
                    if (res.data.status === '1') {
                        var response = res.data.result
                        this.title = response.article.title
                        this.articleType = response.article.type
                        this.content = response.article.mdContent
                        this.categoryType = response.article.category._id
                        this.categories = response.categories
                    }
                })
           },
           save () {
                var html = ''
                html = this.$refs.md.s_markdown.render(this.content)
                this.$ajax.post('/articles/edit', {
                    id: this.id,
                    type: this.articleType,
                    title: this.title,
                    mdContent: this.content,
                    htmlContent: html,
                    category: this.categoryType
                }).then(res => {
                    if (res.data.status === '1') {
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.$router.push('/admin/articleList')
                    }
                })
           },
           cancel () {
               this.$router.push('/admin/articleList')
           }
       }
   }
</script>

<style lang="stylus" scoped>
    .title, .editor
        margin-bottom 20px
    .category
        margin-bottom 40px
    .source
        padding 0 10px 20px 10px
    .markdown-body
        height 600px
</style>
