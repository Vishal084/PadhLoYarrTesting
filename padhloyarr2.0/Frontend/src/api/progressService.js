// import api from './authService'

// export const updateProgress = (data) => api.put('/progress', data)
// export const getProgress = (courseId) => api.get(`/progress/${courseId}`)


// progressService.js
import api from './authService'

const progressService = {
  updateProgress: (data) => api.put('/progress', data),
  getProgress: (courseId) => api.get(`/progress/${courseId}`)
}

export default progressService