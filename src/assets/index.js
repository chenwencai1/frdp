import {post} from './axios'
console.log(window.frdp,window)
//let api = window.frdp.baseUrl
// 首页普通候诊人次
export const pthzrc=params=>{
    return post('/seloutpatientscreen/selpthzrc',params)
}
// 首页普通候诊科室
export const pthzks=params=>{
    return post('/seloutpatientscreen/selpthzks',params)
}
// 首页医疗类型
export const yllx=params=>{
    return post('/seloutpatientscreen/selyllx',params)
}
// 门诊预约
export const mzyyks=params=>{
    return post('/seloutpatientscreen/selmzyyks',params)
}
// 病种分析
export const bzfx=params=>{
    return post('/seloutpatientscreen/selbzfx',params)
}
// 楼层医生信息
export const ysxx=params=>{
    return post('/seloutpatientscreen/selysxx',params)
}
// 医师详情页，医生预约列表
export const ysyylb=params=>{
    return post('/seloutpatientscreen/selysyyxx',params)
}
// 医师详情页，医生各项指标
export const ysgxzb=params=>{
    return post('/seloutpatientscreen/selysgxzb',params)
}
// 医师详情页，医生费用占比
export const ysfyzb=params=>{
    return post('/seloutpatientscreen/selysfyzb',params)
}
// 医师详情页，接诊患者列表
export const yshzbrid=params=>{
    return post('/seloutpatientscreen/selyshzbrid',params)
}