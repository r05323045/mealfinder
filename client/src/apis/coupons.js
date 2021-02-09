import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getCoupons (page, filter) {
    let queryString = page ? `?page=${page}` : ''
    if (filter && filter.length > 1) {
      queryString += filter.join('&')
    }
    return apiHelper.get(`/coupons${queryString}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
