<template>
    <div class="container">
        <div class="wrapper" ref="wrapper">
            <i class="icon" ref="icon"></i>
            <input id="file" type="file" @change="showAvatar" ref="file">
        </div>
        <el-button type="danger" plain @click="uploadImg">提交</el-button>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                fileData: ''
            }
        },
        methods: {
            uploadImg () {
                var formData = new FormData()
                formData.append('image', this.fileData)
                formData.append('username', 'jack')
                this.$ajax.post('/users/uploadAvatar', formData).then(res => {
                    console.log(res)
                })
            },
            showAvatar () {
                var _this = this
                _this.fileData = _this.$refs.file.files[0]
                // FileReader对象
                var reader = new FileReader()
                // 读取文件
                reader.readAsDataURL(_this.fileData)
                // 读取完文件后进行的逻辑
                reader.onload = function (evt) {
                    var result = evt.target.result
                    var img = document.createElement('img')
                    img.src = result
                    img.style.width = '178px'
                    img.style.height = '178px'
                    img.style.borderRadius = '6px'
                    _this.$refs.wrapper.replaceChild(img, _this.$refs.icon)
                }
            }
        }
    }
</script>

<style scoped>
    .container {
        width: 178px;
    }
    #file {
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
        opacity: 0;
        cursor: pointer;
    }
    .wrapper {
        width: 178px;
        height: 178px;
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        position: relative;
        overflow: hidden;
    }
    .wrapper:hover {
        border-color: #e4393c;
    }
    .wrapper > .icon {
        position: relative;
        display: block;
        width: 178px;
        height: 178px;
        font-size: 28px;
        line-height: 178px;
        text-align: center;
        color: #8c939d;
    }
    .wrapper > .icon:before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        margin-top: -13px;
        margin-left: -13px;
        width: 26px;
        height: 26px;
        background: url('./add.png');
        background-size: 26px 26px;
    }
</style>
