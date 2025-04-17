// import { createContext, useContext, useState, useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
// import api from '../api/authService'
// import jwt_decode from 'jwt-decode'

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [token, setToken] = useState(localStorage.getItem('token'))
//   const navigate = useNavigate()

//   useEffect(() => {
//     if (token) {
//       const decoded = jwt_decode(token)
//       setUser(decoded)
//       api.defaults.headers.common['Authorization'] = `Bearer ${token}`
//     } else {
//       delete api.defaults.headers.common['Authorization']
//     }
//   }, [token])

//   const login = async (email, password) => {
//     try {
//       const response = await api.post('/auth/login', { email, password })
//       const { token, user } = response.data
//       localStorage.setItem('token', token)
//       setToken(token)
//       setUser(user)
//       return { success: true }
//     } catch (error) {
//       return { success: false, message: error.response?.data?.message || 'Login failed' }
//     }
//   }

//   const register = async (name, email, password) => {
//     try {
//       const response = await api.post('/auth/register', { name, email, password })
//       const { token, user } = response.data
//       localStorage.setItem('token', token)
//       setToken(token)
//       setUser(user)
//       return { success: true }
//     } catch (error) {
//       return { success: false, message: error.response?.data?.message || 'Registration failed' }
//     }
//   }

//   const logout = () => {
//     localStorage.removeItem('token')
//     setToken(null)
//     setUser(null)
//     navigate('/login')
//   }

//   return (
//     <AuthContext.Provider value={{ user, token, login, register, logout }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)




import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import api from "../api/authService"
// import { jwtDecode } from "jwt-decode" // Changed from import jwt_decode to import { jwtDecode }
import jwtDecode from 'jwt-decode';
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(localStorage.getItem("token"))
  const navigate = useNavigate()

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token) // Changed from jwt_decode to jwtDecode
      setUser(decoded)
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`
    } else {
      delete api.defaults.headers.common["Authorization"]
    }
  }, [token])

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password })
      const { token, user } = response.data
      localStorage.setItem("token", token)
      setToken(token)
      setUser(user)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Login failed" }
    }
  }

  const register = async (name, email, password) => {
    try {
      const response = await api.post("/auth/register", { name, email, password })
      const { token, user } = response.data
      localStorage.setItem("token", token)
      setToken(token)
      setUser(user)
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Registration failed" }
    }
  }

  const logout = () => {
    localStorage.removeItem("token")
    setToken(null)
    setUser(null)
    navigate("/login")
  }

  return <AuthContext.Provider value={{ user, token, login, register, logout }}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
