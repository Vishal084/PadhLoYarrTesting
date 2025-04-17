// // import { useEffect, useState } from 'react'
// // import { Link } from 'react-router-dom'
// // import { getCourses } from '../api/courseService'
// // import CourseCard from '../components/course/CourseCard'
// // import LoadingSpinner from '../components/ui/LoadingSpinner'
// // import { useAuth } from '../context/AuthContext'

// // const Dashboard = () => {
// //   const [courses, setCourses] = useState([])
// //   const [loading, setLoading] = useState(true)
// //   const { user } = useAuth()

// //   useEffect(() => {
// //     const fetchCourses = async () => {
// //       try {
// //         const response = await getCourses()
// //         setCourses(response.data)
// //       } catch (error) {
// //         console.error('Error fetching courses:', error)
// //       } finally {
// //         setLoading(false)
// //       }
// //     }
// //     fetchCourses()
// //   }, [])

// //   if (loading) return <LoadingSpinner />

// //   return (
// //     <div className="container mx-auto px-4 py-8">
// //       <h1 className="text-2xl font-bold mb-6">Welcome back, {user?.name}</h1>
      
// //       <div className="mb-8">
// //         <h2 className="text-xl font-semibold mb-4">Your Courses</h2>
// //         {courses.length === 0 ? (
// //           <div className="bg-white rounded-lg shadow-md p-6 text-center">
// //             <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet</p>
// //             <Link 
// //               to="/" 
// //               className="text-blue-600 hover:text-blue-800 font-medium"
// //             >
// //               Browse courses
// //             </Link>
// //           </div>
// //         ) : (
// //           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //             {courses.map((course) => (
// //               <CourseCard key={course._id} course={course} />
// //             ))}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   )
// // }

// // export default Dashboard

// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { getCourses } from '../../api/courseService'
// import CourseCard from '../../components/course/CourseCard'
// import LoadingSpinner from '../../components/ui/LoadingSpinner'

// const Dashboard = () => {
//   const [courses, setCourses] = useState([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     const fetchCourses = async () => {
//       try {
//         const response = await getCourses()
//         setCourses(response.data.slice(0, 3)) // Show only 3 courses
//       } catch (error) {
//         console.error('Error fetching courses:', error)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchCourses()
//   }, [])

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      
//       <div className="mb-8">
//         <h2 className="text-xl font-semibold mb-4">Continue Learning</h2>
//         {courses.length > 0 ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {courses.map((course) => (
//               <CourseCard key={course._id} course={course} />
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-600">No courses in progress</p>
//         )}
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <Link 
//           to="/wishlist"
//           className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
//         >
//           <h3 className="text-lg font-semibold mb-2">Your Wishlist</h3>
//           <p className="text-gray-600">View your saved courses</p>
//         </Link>
        
//         <Link 
//           to="/my-certificates"
//           className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
//         >
//           <h3 className="text-lg font-semibold mb-2">Your Certificates</h3>
//           <p className="text-gray-600">View your earned certificates</p>
//         </Link>
        
//         <Link 
//           to="/profile"
//           className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
//         >
//           <h3 className="text-lg font-semibold mb-2">Profile Settings</h3>
//           <p className="text-gray-600">Update your profile information</p>
//         </Link>
//       </div>
//     </div>
//   )
// }

// export default Dashboard




import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
// import { getCourses } from "../api/courseService"
import courseService from "../api/courseService" 
import CourseCard from "../components/course/CourseCard"
import LoadingSpinner from "../components/UI/LoadingSpinner"

const Dashboard = () => {
  const [enrolledCourses, setEnrolledCourses] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        // In a real app, you'd fetch only enrolled courses
        const response = await getCourses()
        // Filter for enrolled courses (this is just a placeholder)
        const enrolled = response.data.filter((course) => course.isEnrolled)
        setEnrolledCourses(enrolled)
      } catch (error) {
        console.error("Error fetching courses:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">My Dashboard</h1>

      {enrolledCourses.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p className="text-gray-600 mb-4">You haven't enrolled in any courses yet.</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Browse courses
          </Link>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-semibold mb-4">My Courses</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {enrolledCourses.map((course) => (
              <div key={course._id}>
                <CourseCard course={course} />
                <div className="mt-2">
                  <Link
                    to={`/courses/${course._id}`}
                    className="block text-center bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                  >
                    Continue Learning
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Dashboard
