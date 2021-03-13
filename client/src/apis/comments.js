import { apiHelper } from '../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getComments (id) {
    return apiHelper.get(`/comments/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  addComment (data) {
    return apiHelper.post('/comments', data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  updateComment (id, data) {
    return apiHelper.put(`/comments/${id}`, data, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteComment (id) {
    return apiHelper.delete(`/comments/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
