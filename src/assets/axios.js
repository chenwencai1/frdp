import axios from 'axios'
/* import qs from 'qs' */
import { Message } from 'element-ui'

let env = process.env.NODE_ENV;
 switch (env) {
    case 'production':
        axios.defaults.baseURL = window.frdp.baseUrl;
        break;
    case 'test':
        axios.defaults.baseURL = 'http://192.169.170.10:9372';
        break;
    default:
        axios.defaults.baseURL = 'http://192.168.43.169:9372';
        break;
}
//axios.defaults.baseURL='http://192.168.0.116:8080'
axios.defaults.timeout = 100000 // 响应时间
// 允许携带凭证
//axios.defaults.withCredentials = true
// 设置post请求头
// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 发送请求前处理request数据
/* axios.defaults.transformRequest = data => qs.stringify(data) */
// axios.defaults.validateStatus = status => (status >= 200 && status <= 300)
// 设置请求拦截器
axios.interceptors.request.use(config => {
    /*  if(config.method==='post'){
         config.data=qs.stringify(config.data)
     } */
    return config
}, err => {
    return Promise.reject(err)
})
// 设置相应拦截器
axios.interceptors.response.use(response => {
    // response:成功返回的结果
    return response.data
}, reason => {
    // reason:失败返回的结果
    // 根据不同失败情况，统一提示
    if (reason.response) {
        switch (reason.response.status) {
            case 401:
                sessionStorage.clear()
                location.href = '/'
                break;
            case 403:
                Message('请重新登录')
                break;
            case 404:
                Message('地址错误')
        }
    } else {
        // 检查是否断网
        if (!navigator.onLine) {
            Message('请重新连接网络')
        }
    }
})
export function get(url, params) {
    return new Promise((resolve, reject) => {
        axios.get(url, {params}).then(res => {
            resolve(res.data)
        }).catch(err => {
            if (!err.response) {
                Message({
                    showClose: true,
                    message: 'get请求错误',
                    type: 'error'
                })
            } else {
                reject(err.data)
            }
        })
    })
}
export function post(url, params) {
    return new Promise((resolve, reject) => {
        axios.post(url, params)
            .then(response => {
                resolve(response)
            }, err => {
                reject(err)
            })
            .catch((error) => {
                reject(error)
            })
    })
}
export default {
    post,
    get
}