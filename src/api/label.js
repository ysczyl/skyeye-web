import request from '@/utils/request'

/*生成标签功能有关接口*/
export function createLabel(params) {
  return request({
    url: '/createLabel',
    method: 'post',
    data: {
      ...params
    }
  })
}



export function findList(params) {
  return request({
    url: '/findLabelByUserId',
    method: 'post',
    data: {
      ...params
    }
  })
}


export function findListAll(params) {
  return request({
    url: '/findLabelAll',
    method: 'post',
    data: {
      ...params
    }
  })
}


export function operation(params) {
  return request({
    url: '/operationstate',
    method: 'post',
    data: {
      ...params
    }
  })
}

//////////////////////////////////////////////手动同步数据接口
export function updateOnce(params) {
  return request({
    url: '/updateCustomerOnce',
    method: 'post',
    data: {
      ...params
    }
  })
}



export function topN(params) {
  return request({
    url: '/topN',
    method: 'post',
    data: {
      ...params
    }
  })
}
