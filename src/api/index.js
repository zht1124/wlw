// 将这个项目所有的请求封装为一个文件
import qs from "qs"
import axios from "axios";
import store from '../store'
axios.defaults.baseURL="https://www.liulongbin.top:8888/api/private/v1"
// http和https的区别是什么？
// http缓存你知道吗？你用过吗？
// 在地址栏中输入一个网址，点击回车整个网页渲染的过程？
// 登录接口
export let loginapi = (data)=>{
    return axios.post("/login",qs.stringify(data))
}
// 请求拦截器
axios.interceptors.request.use(config=>{
    config.headers.Authorization=store.state.token;
    return config
})
// 面试问题
// axio的底层 
// es6提供的promise
// .then()
// .all()
// .race()
// async   await

// 左侧列表接口
export let menus =(data)=>{
    return axios.get('/menus')
}
// 用户列表接口
export let userapi =(data)=>{
    return axios.get("/users",{params:data})
}
// 用户角色列表
export let rolesapi = ()=>{
    return axios.get('/roles')
}
// 树状反显所有权限列表
export let treeapi = ()=>{
    return axios.get('/rights/tree')
}
// 修改权限
export let editqxapi =(url,data)=>{
    return axios.post(url,data)
}
// 商品分类列表渲染
export let typesapi =(url,data)=>{
    return axios.get(url,data)
}

