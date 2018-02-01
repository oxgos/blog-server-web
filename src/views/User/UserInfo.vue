<template>
    <div class="UserInfo">
        <el-row>
            <el-col :span="10">
                <el-form ref="form" :model="form" label-width="80px" style="text-align: center;">
                    <el-upload class="avatar-uploader"
                        action="/users/updateInfo"
                        :show-file-list="false"
                        :headers="{flag: true}"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar">
                        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
                    <el-form-item label="用户名">
                        <el-input v-model="form.username"></el-input>
                    </el-form-item>
                    <el-form-item label="职业">
                        <el-input v-model="form.job"></el-input>
                    </el-form-item>
                    <el-form-item label="居住地">
                        <el-input v-model="form.address"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话">
                        <el-input v-model="form.tel"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱">
                        <el-input v-model="form.email"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="updateInfo">保存</el-button>
                        <el-button type="danger" native-type="reset">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        data () {
            return {
                form: {
                    avatar: '',
                    username: '',
                    job: '',
                    address: '',
                    tel: '',
                    email: ''
                },
                imageUrl: ''
            }
        },
        created () {
            this.loadingUserInfo()
        },
        methods: {
            loadingUserInfo () {
                this.$ajax.get('/users/getUserInfo', {
                    params: {
                        infoId: this.$route.params.id
                    }
                }).then(res => {
                    if (res.data.status === '1') {
                        let formData = res.data.result
                        this.imageUrl = formData.avatar
                        this.form.username = formData.username
                        this.form.job = formData.job
                        this.form.address = formData.address
                        this.form.tel = formData.tel
                        this.form.email = formData.email
                    }
                })
            },
            handleAvatarSuccess (res, file) {
                this.imageUrl = URL.createObjectURL(file.raw)
            },
            beforeAvatarUpload (file) {
                // const isJPG = file.type === 'image/jpeg'
                this.form.avatar = file
                const isLt2M = file.size / 1024 / 1024 < 2

                /* if (!isJPG) {
                    this.$message.error('上传头像图片只能是 JPG 格式!')
                } */
                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!')
                }
                return isLt2M
            },
            updateInfo () {
                let formData = new FormData()
                formData.append('infoId', this.$store.state.infoId)
                formData.append('username', this.form.username)
                formData.append('job', this.form.job)
                formData.append('address', this.form.address)
                formData.append('tel', this.form.tel)
                formData.append('email', this.form.email)
                formData.append('avatar', this.form.avatar)
                this.$ajax.post('/users/updateInfo', formData).then(res => {
                    if (res.data.status === '1') {
                        this.$message.success(res.data.msg)
                        this.$store.commit('SET_USERNAME', res.data.result.username)
                        this.$router.push('/admin/userList')
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .avatar-uploader {
        margin-bottom: 20px;
    }
    .avatar-uploader-icon {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }
    .avatar-uploader-icon:hover {
        border-color: #409EFF;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>
