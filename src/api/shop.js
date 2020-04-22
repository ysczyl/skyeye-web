import request from '@/utils/request'

  /*购物车接口*/
export function getlistById(params) {
  return request({
    url: '/getShopByUserId',
    method: 'post',
    data: {
      ...params
    }
  })
}


export function addToShop(params) {
  return request({
    url: '/addShop',
    method: 'post',
    data: {
      ...params
    }
  })
}



export function deleteShop(params) {
  return request({
    url: '/deleteShop',
    method: 'post',
    data: {
      ...params
    }
  })
}


export function deleteAll(params) {
  return request({
    url: '/deleteAllShop',
    method: 'post',
    data: {
      ...params
    }
  })
}
