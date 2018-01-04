export function setCookie (key, value) {
    let expireTime = new Date()
    expireTime.setTime(expireTime.getTime() + 24 * 3600 * 1000 * 7)
    document.cookie = key + '=' + value + ';expires=' + expireTime
    document.cookie = 'name=gjw'
}

export function getCookie (key) {
    if (document.cookie.length > 0) {
        let str = document.cookie
        console.log(str)
        console.log(str.indexOf(key + '='))
        // if (str.indexOf(key + '=') > -1) {
            let reg = new RegExp('^' + key + '=(.*);$')
            console.log(str.match(reg))
        // }
    }
}

export function delCookie (key) {
    if (document.cookie.length > 0) {
        document.cookie = key + '=;expires=Thu, 01-Jan-70 00:00:01 GMT'
    }
}
