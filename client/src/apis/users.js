import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getCurrentUser () {
    return apiHelper.get('/get_current_user', {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  addFavorite (restaurantId) {
    return apiHelper.post('/user/favorite', { id: restaurantId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  deleteFavorite (restaurantId) {
    return apiHelper.delete(`/user/favorite/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  likeComment (commentId) {
    return apiHelper.post('/like', { commentId: commentId }, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  disLikeComment (commentId) {
    return apiHelper.delete(`/like/${commentId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  }
}
