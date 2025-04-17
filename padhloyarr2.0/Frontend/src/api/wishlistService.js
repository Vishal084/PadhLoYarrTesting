// import api from './authService'
import authService from './authService'

const wishlistService = {
  getWishlistItems: () => api.get('/wishlist'),
  addToWishlist: (courseId) => api.post('/wishlist', { courseId }),
  removeFromWishlist: (courseId) => api.delete(`/wishlist/${courseId}`),
  moveToCart: (courseId) => api.post(`/wishlist/${courseId}/move-to-cart`)
}

export default wishlistService