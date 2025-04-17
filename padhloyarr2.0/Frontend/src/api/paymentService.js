// import api from './authService'

// export const createRazorpayOrder = (amount) => api.post('/payment/create-order', { amount })
// export const verifyPayment = (paymentData) => api.post('/payment/verify', paymentData)


// paymentService.js
import api from './authService'

const paymentService = {
  createRazorpayOrder: (amount) => api.post('/payment/create-order', { amount }),
  verifyPayment: (paymentData) => api.post('/payment/verify', paymentData)
}

export default paymentService