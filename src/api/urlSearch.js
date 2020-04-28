import request from '@/utils/request'

//状态列表
export function getlistById(params) {
  return request({
    url: '/url/getUrlListByUserId',
    method: 'post',
    data: {
      ...params
    }
  })
}

//新增查询
export function addUrlSearch(params) {
  return request({
    url: '/url/addUrlSearch',
    method: 'post',
    data: {
      ...params
    }
  })
}


//获取url详情
export function getUrlList(params) {
  return request({
    url: '/url/getUrlList',
    method: 'post',
    data: {
      ...params
    }
  })
}

//发起探索请求
export function getExplore(params) {
  return request({
    url: '/url/getExplore',
    method: 'post',
    data: {
      ...params
    }
  })
}


//发起推送请求
export function getCgpExplore(params) {
  return request({
    url: '/url/getCgpExplore',
    method: 'post',
    data: {
      ...params
    }
  })
}

