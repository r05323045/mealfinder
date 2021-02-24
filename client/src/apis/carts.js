import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getCart () {
    return apiHelper.get('/cart', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  postCart (data) {
    return apiHelper.post('/cart', data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteCart (id) {
    return apiHelper.delete(`/cart/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  addCartItem (id) {
    return apiHelper.post(`/cartItem/${id}/add`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  reduceCartItem (id) {
    return apiHelper.post(`/cartItem/${id}/reduce`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
