// import api from './authService'

// export const getCartItems = () => api.get('/cart')
// export const addToCart = (courseId) => api.post('/cart', { courseId })
// export const removeFromCart = (courseId) => api.delete(`/cart/${courseId}`)

// cartService.js
import api from './authService'

const cartService = {
  getCartItems: () => api.get('/cart'),
  addToCart: (courseId) => api.post('/cart', { courseId }),
  removeFromCart: (courseId) => api.delete(`/cart/${courseId}`)
}

export default cartService