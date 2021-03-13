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
    return apiHelper.post('/user/cartItem/add', { id: id }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  reduceCartItem (id) {
    return apiHelper.post('/user/cartItem/reduce', { id: id }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  postTradeInfo (data) {
    return apiHelper.post('/user/order', data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getPaymentInfo (no) {
    return apiHelper.get(`/user/payment/${no}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getOrders () {
    return apiHelper.get('/user/order', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getOrder (id) {
    return apiHelper.get(`/user/order/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
