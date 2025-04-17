// // import { Routes, Route, Navigate } from 'react-router-dom'
// // // import { useAuth } from '../context/AuthContext'
// // import { useAuth } from '../context/AuthContext'
// // // import Home from '../pages/Home'
// // import Home from './../pages/course/Home'
// // import CourseDetail from './../pages/course/CourseDetail'
// // import Login from './../pages/auth/Login'
// // import Register from './../pages/auth/Register'
// // import Cart from '../pages/auth/Register'
// // // import Checkout from '../pages/Checkout'
// // import checkout from '../pages/user/Checkout'
// // // import Wishlist from '../pages/Wishlist'
// // import Wishlist from '../pages/user/Wishlist'
// // import Dashboard from '../pages/Dashboard'
// // import AdminCourses from '../pages/admin/AdminCourses'
// // import CreateCourse from './../pages/admin/CourseBuilder'
// // import Profile from '../pages/Profile'
// // import ProfileSettings from '../pages/user/ProfileSettings'
// // import MyCertificates from '../pages/user/MyCertificates'
// // import CourseBuilder from '../pages/instructor/CourseBuilder'
// // import AdminDashboard from '../pages/admin/AdminDashboard'

// // const AppRoutes = () => {
// //   const { user } = useAuth()
  
// //   return (
// //     <Routes>
// //       <Route path="/" element={<Home />} />
// //       <Route path="/courses/:id" element={<CourseDetail />} />
// //       <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
// //       <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
// //       <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
// //       <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
// //       <Route path="/wishlist" element={user ? <Wishlist /> : <Navigate to="/login" />} />
// //       <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
// //       <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
// //       <Route path="/profile/settings" element={user ? <ProfileSettings /> : <Navigate to="/login" />} />
// //       <Route path="/my-certificates" element={user ? <MyCertificates /> : <Navigate to="/login" />} />
      
// //       {/* Instructor routes */}
// //       <Route path="/instructor/courses/:id/build" element={user?.isInstructor ? <CourseBuilder /> : <Navigate to="/" />} />
      
// //       {/* Admin routes */}
// //       <Route path="/admin/courses" element={user?.isAdmin ? <AdminCourses /> : <Navigate to="/" />} />
// //       <Route path="/admin/courses/create" element={user?.isAdmin ? <CreateCourse /> : <Navigate to="/" />} />
// //       <Route path="/admin/courses/edit/:id" element={user?.isAdmin ? <CreateCourse /> : <Navigate to="/" />} />
// //       <Route path="/admin/dashboard" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
// //     </Routes>
// //   ) 
// // }

// // export default AppRoutes


// "use client"

// import { Routes, Route, Navigate } from "react-router-dom"
// import { useAuth } from "../context/AuthContext"
// import Home from "../pages/course/Home"
// import CourseDetail from "../pages/course/CourseDetail"
// import Login from "../pages/auth/Login"
// import Register from "../pages/auth/Register"
// import Cart from "../pages/user/Cart"
// import Checkout from "../pages/user/Checkout"
// import Wishlist from "../pages/user/Wishlist"
// import Dashboard from "../pages/Dashboard"
// import AdminCourses from "../pages/admin/AdminCourses"
// import CreateCourse from "../pages/admin/CourseBuilder"
// import Profile from "../pages/Profile"
// import ProfileSettings from "../pages/user/ProfileSettings"
// import MyCertificates from "../pages/user/MyCertificates"
// import CourseBuilder from "../pages/instructor/CourseBuilder"
// import AdminDashboard from "../pages/admin/AdminDashboard"

// const AppRoutes = () => {
//   const { user } = useAuth()

//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/courses/:id" element={<CourseDetail />} />
//       <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
//       <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
//       <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
//       <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
//       <Route path="/wishlist" element={user ? <Wishlist /> : <Navigate to="/login" />} />
//       <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
//       <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
//       <Route path="/profile/settings" element={user ? <ProfileSettings /> : <Navigate to="/login" />} />
//       <Route path="/my-certificates" element={user ? <MyCertificates /> : <Navigate to="/login" />} />

//       {/* Instructor routes */}
//       <Route
//         path="/instructor/courses/:id/build"
//         element={user?.isInstructor ? <CourseBuilder /> : <Navigate to="/" />}
//       />

//       {/* Admin routes */}
//       <Route path="/admin/courses" element={user?.isAdmin ? <AdminCourses /> : <Navigate to="/" />} />
//       <Route path="/admin/courses/create" element={user?.isAdmin ? <CreateCourse /> : <Navigate to="/" />} />
//       <Route path="/admin/courses/edit/:id" element={user?.isAdmin ? <CreateCourse /> : <Navigate to="/" />} />
//       <Route path="/admin/dashboard" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
//     </Routes>
//   )
// }

// export default AppRoutes
"use client"

import { Routes, Route, Navigate } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import Home from "../pages/course/Home"
import CourseDetail from "../pages/course/CourseDetail"
import Login from "../pages/auth/Login"
import Register from "../pages/auth/Register"
import Cart from "../pages/user/Cart"
import Checkout from "../pages/user/Checkout"
import Wishlist from "../pages/user/Wishlist"
import Dashboard from "../pages/Dashboard"
import AdminCourses from "../pages/admin/AdminCourses"
import CreateCourse from "../pages/admin/CourseBuilder"
import Profile from "../pages/Profile"
import ProfileSettings from "../pages/user/ProfileSettings"
import MyCertificates from "../pages/user/MyCertificates"
import CourseBuilder from "../pages/instructor/CourseBuilder"
import AdminDashboard from "../pages/admin/AdminDashboard"

const AppRoutes = () => {
  const { user } = useAuth()

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/courses/:id" element={<CourseDetail />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
      <Route path="/cart" element={user ? <Cart /> : <Navigate to="/login" />} />
      <Route path="/checkout" element={user ? <Checkout /> : <Navigate to="/login" />} />
      <Route path="/wishlist" element={user ? <Wishlist /> : <Navigate to="/login" />} />
      <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/login" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/profile/settings" element={user ? <ProfileSettings /> : <Navigate to="/login" />} />
      <Route path="/my-certificates" element={user ? <MyCertificates /> : <Navigate to="/login" />} />

      {/* Instructor routes */}
      <Route
        path="/instructor/courses/:id/build"
        element={user?.isInstructor ? <CourseBuilder /> : <Navigate to="/" />}
      />

      {/* Admin routes */}
      <Route path="/admin/courses" element={user?.isAdmin ? <AdminCourses /> : <Navigate to="/" />} />
      <Route path="/admin/courses/create" element={user?.isAdmin ? <CreateCourse /> : <Navigate to="/" />} />
      <Route path="/admin/courses/edit/:id" element={user?.isAdmin ? <CreateCourse /> : <Navigate to="/" />} />
      <Route path="/admin/dashboard" element={user?.isAdmin ? <AdminDashboard /> : <Navigate to="/" />} />
    </Routes>
  )
}

export default AppRoutes
