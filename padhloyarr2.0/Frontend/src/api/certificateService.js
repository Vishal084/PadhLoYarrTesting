
// import api from "./authService"

// export const generateCertificate = (courseId) => api.get(`/certificates/${courseId}/generate`, { responseType: "blob" })
// export const verifyCertificate = (certificateId) => api.get(`/certificates/${certificateId}/verify`)
// export const getUserCertificates = () => api.get("/certificates/me")


// certificateService.js
import api from "./authService"

const certificateService = {
  generateCertificate: (courseId) => api.get(`/certificates/${courseId}/generate`, { responseType: "blob" }),
  verifyCertificate: (certificateId) => api.get(`/certificates/${certificateId}/verify`),
  getUserCertificates: () => api.get("/certificates/me")
}

export default certificateService