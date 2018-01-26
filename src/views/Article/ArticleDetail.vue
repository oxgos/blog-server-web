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
            <el-col :span="8">
                <el-input class="input-with-select" v-model="title" placeholder="请输入标题">
                    <el-select v-model="articleType" slot="prepend" placeholder="请选择" style="width: 130px;">
                        <el-option label="原创" value="原创"></el-option>
                        <el-option label="转载" value="转载"></el-option>
                    </el-select>
                </el-input>
            </el-col>
            <el-col :span="16">
                <el-form :model="introduceForm" status-icon :rules="rules" ref="introduceForm" label-width="100px" class="introduceForm">
                    <el-form-item label="" prop="introduce">
                        <el-input placeholder="请输入内容" v-model="introduceForm.introduce">
                            <template slot="prepend">简介：</template>
                            <template slot="append">{{countText}}字</template>
                        </el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row class="editor">
            <el-col :span="24">
                <mavon-editor v-model="content" ref="md"/>
            </el-col>
        </el-row>
        <el-upload
            class="upload-image"
            action="/users/updateInfo"
            :on-change="handleChange"
            :before-remove="beforeRemove"
            :on-exceed="handleExceed"
            :headers="{flag: true}"
            :limit="1"
            :auto-upload="false"
            :file-list="fileList"
        >
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
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
            var validateIntro = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入简介'))
                } else if (value.length > 150) {
                    callback(new Error('字数不能超过150'))
                } else {
                    callback()
                }
            }
            return {
                id: '',
                title: '',
                introduceForm: {
                    introduce: ''
                },
                rules: {
                    introduce: [
                        {
                            validator: validateIntro,
                            trigger: 'blur'
                        }
                    ]
                },
                articleType: '',
                content: '',
                categoryType: '',
                categories: [],
                uploadFile: '',
                fileList: []
            }
       },
       created () {
           this.loadingArticleDetail()
       },
       computed: {
            countText () {
                return this.introduceForm.introduce.length
            }
        },
       mounted () {
           this.setImageTipsPosition()
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
                        let response = res.data.result
                        let obj = {
                            name: response.article.poster.slice(7),
                            url: response.article.poster
                        }
                        this.fileList.push(obj)
                        this.title = response.article.title
                        this.introduceForm.introduce = response.article.introduce
                        this.articleType = response.article.type
                        this.content = response.article.mdContent
                        this.categoryType = response.article.category._id
                        this.categories = response.categories
                    }
                })
            },
            // 改变上传图片提示的位置
            setImageTipsPosition () {
                let ul = document.getElementsByClassName('el-upload-list')[0]
                ul.style.position = 'absolute'
                ul.style.top = '-5px'
                ul.style.left = '100px'
           },
            handleChange (file) {
                console.log(file)
                this.fileList[0].url = file.url
                this.fileList[0].name = file.name
                this.uploadFile = file.raw
            },
            handleExceed (files, fileList) {
                this.$message.warning(`已超出上传文件数量,最多上传 ${files.length} 个,请先删除再上传`)
            },
            beforeRemove (file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            // 保存编辑
            save () {
                var html = ''
                html = this.$refs.md.s_markdown.render(this.content)
                let formData = new FormData()
                formData.append('avatar', this.uploadFile)
                formData.append('id', this.id)
                formData.append('type', this.articleType)
                formData.append('title', this.title)
                formData.append('introduce', this.introduceForm.introduce)
                formData.append('mdContent', this.content)
                formData.append('htmlContent', html)
                formData.append('category', this.categoryType)
                this.$ajax.post('/articles/edit', formData).then(res => {
                    if (res.data.status === '1') {
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.$router.push('/admin/articleList')
                    }
                })
           },
           // 取消编辑
           cancel () {
               this.$router.push('/admin/articleList')
           }
       }
   }
</script>

<style lang="stylus" scoped>
    .category
        margin 20px 0
    .source
        padding 0 10px 20px 10px
    .markdown-body
        height 580px
    .upload-image
        position relative
</style>
