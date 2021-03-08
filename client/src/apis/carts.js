import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getCart () {
    return apiHelper.get('/user/cart', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  postCart (data) {
    return apiHelper.post('/user/cart', data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteCart (id) {
    return apiHelper.delete(`/user/cart/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  addCartItem (id) {
    return apiHelper.post(`/user/cartItem/${id}/add`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  reduceCartItem (id) {
    return apiHelper.post(`/user/cartItem/${id}/reduce`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  postTradeInfo (data) {
    return apiHelper.post('/user/order', data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  /*
  postOrder (data) {
    return apiHelper.post('/order', data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  */
  getOrders () {
    return apiHelper.get('/order', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getOrder (id) {
    return apiHelper.get(`/order/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
