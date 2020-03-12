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


export function operation(params) {
  return request({
    url: '/operationstate',
    method: 'post',
    data: {
      ...params
    }
  })
}


