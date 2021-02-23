import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  postCart (data) {
    return apiHelper.post('/cart', data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
