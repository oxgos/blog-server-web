<template>
    <div class="articleNew">
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
        >
            <el-button size="small" type="primary">选择文件</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <el-row class="category">
            <el-col :span="12" :offset="2">
                文章分类:
                <template>
                    <el-radio-group v-model="categoryId">
                        <el-radio v-for="item in categoryType" :key="item.id" :label="item.id">{{ item.name }}</el-radio>
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
            content: '',
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
            categoryId: '',
            categoryType: [],
            uploadFile: ''
        }
    },
    created () {
        this.loadingCategory()
    },
    computed: {
      countText () {
          return this.introduceForm.introduce.length
      }
    },
    methods: {
        handleChange (file) {
            var ul = document.getElementsByClassName('el-upload-list')[0]
            ul.style.position = 'absolute'
            ul.style.top = '-5px'
            ul.style.left = '100px'
            this.uploadFile = file.raw
        },
        handleExceed (files, fileList) {
            this.$message.warning(`已超出上传文件数量,最多上传 ${files.length} 个,请先删除再上传`)
        },
        beforeRemove (file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`)
        },
        loadingCategory () {
            this.$ajax.get('/categories').then(res => {
                if (res.data.status === '1') {
                    res.data.result.forEach(item => {
                        let obj = {}
                        obj.id = item._id
                        obj.name = item.name
                        this.categoryType.push(obj)
                    })
                }
            })
        },
        newArticle () {
            if (this.articleType && this.title && this.content && this.categoryId && this.introduceForm.introduce && this.introduceForm.introduce.length <= 150) {
                let html = ''
                html = this.$refs.md.s_markdown.render(this.content)
                let formData = new FormData()
                formData.append('avatar', this.uploadFile)
                formData.append('type', this.articleType)
                formData.append('title', this.title)
                formData.append('introduce', this.introduceForm.introduce)
                formData.append('mdContent', this.content)
                formData.append('htmlContent', html)
                formData.append('categoryId', this.categoryId)
                this.$ajax.post('/articles/articleNew', formData).then(res => {
                    if (res.data.status === '1') {
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.$router.push('/admin/articleList')
                    } else {
                        this.$message.error(res.data.msg)
                    }
                })
            } else {
                this.$message({
                    message: '请把文章选项都填上,再提交',
                    type: 'error'
                })
            }
        }
    }
}
</script>

<style scoped lang="stylus">
    .title, .editor
        margin-bottom 20px
    .category
        margin 20px 0
    .markdown-body
        height 580px
    .upload-image
        position relative
</style>
