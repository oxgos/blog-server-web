<template>
   <div class="login">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0; height: 0" id="__SVG_SPRITE_NODE__">
            <symbol class="icon" viewBox="0 0 1024 1024" id="icon-user">
                <defs></defs>
                <path d="M504.951 511.98c93.49 0 169.28-74.002 169.28-165.26 0-91.276-75.79-165.248-169.28-165.248-93.486 0-169.287 73.972-169.279 165.248-0.001 91.258 75.793 165.26 169.28 165.26z m77.6 55.098H441.466c-120.767 0-218.678 95.564-218.678 213.45V794.3c0 48.183 97.911 48.229 218.678 48.229H582.55c120.754 0 218.66-1.78 218.66-48.229v-13.77c0-117.887-97.898-213.45-218.66-213.45z" p-id="7987"></path>
            </symbol>
            <symbol class="icon" viewBox="0 0 1024 1024" id="icon-password">
                <defs></defs>
                <path d="M780.8 354.579692 665.6 354.579692 665.6 311.689846c0-72.310154-19.849846-193.299692-153.6-193.299692-138.870154 0-153.6 135.049846-153.6 193.299692l0 42.889846L243.2 354.579692 243.2 311.689846C243.2 122.249846 348.790154 0 512 0s268.8 122.249846 268.8 311.689846L780.8 354.579692zM588.8 669.420308C588.8 625.900308 554.220308 590.769231 512 590.769231s-76.8 35.131077-76.8 78.651077c0 29.459692 15.399385 54.468923 38.439385 67.820308l0 89.639385c0 21.740308 17.250462 39.699692 38.4 39.699692s38.4-17.959385 38.4-39.699692l0-89.639385C573.44 723.889231 588.8 698.88 588.8 669.420308zM896 512l0 393.609846c0 65.260308-51.869538 118.390154-115.2 118.390154L243.2 1024c-63.291077 0-115.2-53.129846-115.2-118.390154L128 512c0-65.220923 51.869538-118.390154 115.2-118.390154l537.6 0C844.130462 393.609846 896 446.779077 896 512z" p-id="9230"></path>
            </symbol>
        </svg>
        <form action="###" method="post"  class="login-form">
            <h3 class="title">系统登录</h3>
            <div class="tips" v-if="isTips">
                <p>{{ errMsg }}</p>
            </div>
            <div class="form-item">
                <div class="form-group">
                    <span class="svg-container svg-container_login">
                        <svg data-v-20996423="" aria-hidden="true" class="svg-icon">
                            <use data-v-20996423="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-user"></use>
                        </svg>
                    </span>
                    <div class="input-group">
                        <input type="text" placeholder="用户名" v-model="account">
                    </div>
                </div>
            </div>
            <div class="form-item">
                <div class="form-group">
                    <span class="svg-container">
                        <svg data-v-20996423="" aria-hidden="true" class="svg-icon">
                            <use data-v-20996423="" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-password"></use>
                        </svg>
                    </span>
                    <div class="input-group">
                        <input id="pwd" type="password" placeholder="密码" v-model="password"  @keyup.enter="login">
                    </div>
                </div>
            </div>
            <button class="loginBtn" type="button" @click="login">登陆</button>
        </form>
   </div>
</template>

<script type="text/ecmascript-6">
    import { setCookie } from '../util/cookies'
    export default {
        data () {
            return {
                account: '',
                password: '',
                errMsg: '',
                isTips: false
            }
        },
        methods: {
            login () {
                if (!this.account || !this.password) {
                    this.isTips = true
                    this.errMsg = '用户名、密码不能为空'
                }
                this.$ajax.post('/users/login', {
                    account: this.account,
                    password: this.password
                }).then(response => {
                    let res = response.data
                    if (res.status === '1') {
                        this.$store.commit('SET_USERNAME', res.result.user.username)
                        this.$store.commit('SET_ROLE', res.result.user.role)
                        setCookie('sessionId', res.result.sessionId)
                        this.$router.push('/admin')
                    } else {
                        this.isTips = true
                        this.errMsg = '用户/密码错误,请重新输入'
                    }
                })
            }
        },
        components: {

        }
    }
</script>

<style lang="stylus" scoped>
    .login
        position relative
        width 100%
        height 100vh
        background-color #2d3a4b
        .login-form
            position absolute
            left 0
            right 0
            width 400px
            padding 35px 35px 15px 35px
            margin 240px auto
            box-sizing border-box
            .title
                height 29px
                font-size 26px
                font-weight 400
                color #eee
                margin 0px auto 40px auto
                text-align center
                font-weight bold
            .tips
                position absolute
                top 64px
                left 35px
                right 35px
                color #e4393c
                text-align center
            .form-item
                margin-bottom 22px
                border 1px solid rgba(255, 255, 255, 0.1)
                background rgba(0, 0, 0, 0.1)
                border-radius 5px
                color #454545
                &::before
                    display block
                    content ''
                &::after
                    display block
                    content ''
                    clear both
                .form-group
                    position relative
                    line-height 40px
                    font-size 14px
                    .svg-container_login
                        font-size 20px
                    .svg-container
                        padding 6px 5px 6px 15px
                        color #889aa4
                        vertical-align middle
                        width 30px
                        display inline-block
                        box-sizing border-box
                        .svg-icon
                            width 1em
                            height 1em
                            vertical-align -.05em
                            fill currentColor
                            overflow hidden
                    .input-group
                        position relative
                        display inline-block
                        height 47px
                        width 85%
                        font-size 14px
                        input
                            background transparent
                            border 0px
                            -webkit-appearance none
                            border-radius 0px
                            padding 12px 5px 12px 15px
                            color #eee
                            width 100%
                            height 47px
                            line-height 1
                            outline 0
                            box-sizing border-box
                            -webkit-box-shadow: 0 0 0px 1000px #293444 inset !important
                            -webkit-text-fill-color: #fff !important
            .loginBtn
                width 100%
                margin-bottom 30px
                display inline-block
                line-height 1
                white-space nowrap
                cursor pointer
                background #fff
                border 1px solid #dcdfe6
                -webkit-appearance none
                text-align center
                box-sizing border-box
                outline: 0
                margin: 0
                transition .1s
                font-weight 500
                padding 12px 20px
                font-size 14px
                border-radius 4px
                color #fff
                background-color #409eff
                border-color #409eff
                &:hover
                    background #66b1ff
                    border-color #66b1ff
                    color #fff
</style>
