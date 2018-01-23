<template>
    <div class="articleNew">
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
        <el-upload
        class="upload-demo"
        action="https://jsonplaceholder.typicode.com/posts/"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :before-remove="beforeRemove"
        multiple
        :limit="3"
        :on-exceed="handleExceed"
        :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
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
        return {
            content: '',
            title: '',
            articleType: '',
            categoryId: '',
            categoryType: [],
            fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}]
        }
    },
    created () {
        this.loadingCategory()
    },
    methods: {
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
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
            if (this.articleType && this.title && this.content && this.categoryId) {
                let html = ''
                html = this.$refs.md.s_markdown.render(this.content)
                this.$ajax.post('/articles/articleNew', {
                    type: this.articleType,
                    title: this.title,
                    mdContent: this.content,
                    htmlContent: html,
                    categoryId: this.categoryId
                }).then(res => {
                    if (res.data.status === '1') {
                        this.$message({
                            message: res.data.msg,
                            type: 'success'
                        })
                        this.$router.push('/admin/articleList')
                    }
                })
            } else {
                this.$message({
                    message: '请把文章选项都填上,再提交',
                    type: 'error'
                })
            }
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
        height 550px
</style>
