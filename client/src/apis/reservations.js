import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getReservations () {
    return apiHelper.get('/user/reservations', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getReservation (id) {
    return apiHelper.get(`/user/reservations/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  addReservation (data) {
    return apiHelper.post('/user/reservations', data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
