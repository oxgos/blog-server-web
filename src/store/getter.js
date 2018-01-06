const getters = {
    formatRole: (state) => {
        let role = ''
        switch (state.role) {
            case 0:
                role = '普通用户'
                break
            case 1:
                role = '邮件激活后的用户'
                break
            case 2:
                role = '高级用户'
                break
            case 10:
                role = '管理'
                break
            case 50:
                role = '超级管理员'
                break
        }
        return role
    }
}

export default getters
