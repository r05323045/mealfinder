import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getRestaurants (page, filter) {
    let queryString = page ? `?page=${page}` : ''
    if (filter) {
      queryString += filter.join('&')
    }
    return apiHelper.get(`/restaurants${queryString}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getUserRestaurants (page, filter) {
    let queryString = page ? `?page=${page}` : ''
    if (filter) {
      queryString += filter.join('&?')
    }
    return apiHelper.get(`/users/restaurants${queryString}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
