// import api from './authService'

// export const addReview = (courseId, reviewData) => api.post(`/reviews/${courseId}`, reviewData)
// export const getCourseReviews = (courseId) => api.get(`/reviews/${courseId}`)

// reviewService.js
import api from './authService'

const reviewService = {
  addReview: (courseId, reviewData) => api.post(`/reviews/${courseId}`, reviewData),
  getCourseReviews: (courseId) => api.get(`/reviews/${courseId}`)
}

export default reviewService