import axios from 'axios';
let baseURL = '';
process.env.NODE_ENV == 'development' ? baseURL = '/' : baseURL = '';
axios.defaults.baseURL = baseURL;
axios.defaults.timeout = 10000;
//配置发送请求前的拦截器 可以设置token信息
axios.interceptors.request.use(
    config => {
        return config
    }, error => {
        return Promise.reject(error)
    }
)
axios.interceptors.response.use(
    res => {
        return Promise.resolve(res.data) // 这里直接返回data, 即接口返回的所有数据
    }, error => {
        return Promise.reject(error);
    }
)
export function login(data){
    axios.post('/institute/college/login',data)
    .then((res)=>{
        console.log(res);
    })
}
