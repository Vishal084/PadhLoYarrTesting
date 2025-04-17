// import { useEffect, useState } from 'react' 
// import { useParams, Link } from 'react-router-dom' 
// // import { getCourseDetails } from '../api/courseService'
// import { getCourseDetails } from '../../api/courseService' 
// // import LoadingSpinner from '../components/ui/LoadingSpinner' 
// import LoadingSpinner from '../../components/ui/LoadingSpinner'
// // import CourseContent from '../components/course/CourseContent' 
// import CourseContent from '../../components/course/CourseContent'
// // import CourseReviews from '../components/course/CourseReviews' 
// import CourseReviews from '../../components/course/CourseReviews'
// // import { useCart } from '../context/CartContext' 
// import { useCart } from '../../context/CartContext'
// // import CourseProgress from '../components/course/CourseProgress'   
// import CourseProgress from '../../components/course/CourseProgress'

// const CourseDetail = () => {   
//   const { id } = useParams()   
//   const [course, setCourse] = useState(null)   
//   const [loading, setLoading] = useState(true)   
//   const [activeTab, setActiveTab] = useState('content')   
//   const { addToCart } = useCart()    
  
//   useEffect(() => {     
//     const fetchCourse = async () => {       
//       try {         
//         const response = await getCourseDetails(id)         
//         setCourse(response.data)       
//       } catch (error) {         
//         console.error('Error fetching course:', error)       
//       } finally {         
//         setLoading(false)       
//       }     
//     }     
//     fetchCourse()   
//   }, [id])    
  
//   const handleAddToCart = async () => {     
//     const result = await addToCart(course._id)     
//     if (result.success) {       
//       alert('Course added to cart!')     
//     } else {       
//       alert(result.message)     
//     }   
//   }    
  
//   if (loading) return <LoadingSpinner />    
  
//   if (!course) return <div>Course not found</div>    
  
//   return (     
//     <div className="container mx-auto px-4 py-8">       
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">         
//         <div className="md:flex">           
//           <div className="md:w-1/3">             
//             <img                
//               src={course.thumbnail || '/placeholder-course.jpg'}                
//               alt={course.title}               
//               className="w-full h-64 object-cover"             
//             />           
//           </div>           
//           <div className="p-6 md:w-2/3">             
//             <h1 className="text-2xl font-bold mb-2">{course.title}</h1>             
//             <p className="text-gray-600 mb-4">Instructor: {course.instructor?.name}</p>             
//             <p className="text-gray-800 mb-4">{course.description}</p>             
//             <CourseProgress courseId={course._id} />
//             <div className="flex items-center mb-4">               
//               <span className="text-yellow-500 mr-1">★ {course.averageRating?.toFixed(1) || '0.0'}</span>               
//               <span className="text-gray-600">({course.reviews?.length || 0} reviews)</span>             
//             </div>             
//             <div className="flex justify-between items-center">               
//               <span className="text-2xl font-bold">₹{course.price}</span>               
//               <button                  
//                 onClick={handleAddToCart}                 
//                 className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"               
//               >                 
//                 Add to Cart               
//               </button>             
//             </div>           
//           </div>         
//         </div>          
//         <div className="border-t border-gray-200">           
//           <div className="flex border-b">             
//             <button               
//               className={`px-4 py-2 ${activeTab === 'content' ? 'border-b-2 border-blue-500' : ''}`}               
//               onClick={() => setActiveTab('content')}             
//             >               
//               Content             
//             </button>             
//             <button               
//               className={`px-4 py-2 ${activeTab === 'reviews' ? 'border-b-2 border-blue-500' : ''}`}               
//               onClick={() => setActiveTab('reviews')}             
//             >               
//               Reviews             
//             </button>           
//           </div>            
//           <div className="p-6">             
//             {activeTab === 'content' ? (               
//               <CourseContent courseId={course._id} />             
//             ) : (               
//               <CourseReviews courseId={course._id} reviews={course.reviews} />             
//             )}           
//           </div>         
//         </div>       
//       </div>     
//     </div>   
//   )
// }  

// export default CourseDetail

"use client"

import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
// import { getCourseDetails } from "../../api/courseService"
import courseService from "../../api/courseService"
import LoadingSpinner from "../../components/UI/LoadingSpinner"
import CourseContent from "../../components/course/CourseContent"
import CourseReviews from "../../components/course/CourseReviews"
import { useCart } from "../../context/CartContext"
import CourseProgress from "../../components/course/CourseProgress"

const CourseDetail = () => {
  const { id } = useParams()
  const [course, setCourse] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("content")
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getCourseDetails(id)
        setCourse(response.data)
      } catch (error) {
        console.error("Error fetching course:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchCourse()
  }, [id])

  const handleAddToCart = async () => {
    const result = await addToCart(course._id)
    if (result.success) {
      alert("Course added to cart!")
    } else {
      alert(result.message)
    }
  }

  if (loading) return <LoadingSpinner />

  if (!course) return <div>Course not found</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <img
              src={course.thumbnail || "/placeholder-course.jpg"}
              alt={course.title}
              className="w-full h-64 object-cover"
            />
          </div>
          <div className="p-6 md:w-2/3">
            <h1 className="text-2xl font-bold mb-2">{course.title}</h1>
            <p className="text-gray-600 mb-4">Instructor: {course.instructor?.name}</p>
            <p className="text-gray-800 mb-4">{course.description}</p>
            <CourseProgress courseId={course._id} />
            <div className="flex items-center mb-4">
              <span className="text-yellow-500 mr-1">★ {course.averageRating?.toFixed(1) || "0.0"}</span>
              <span className="text-gray-600">({course.reviews?.length || 0} reviews)</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">₹{course.price}</span>
              <button onClick={handleAddToCart} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-200">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 ${activeTab === "content" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("content")}
            >
              Content
            </button>
            <button
              className={`px-4 py-2 ${activeTab === "reviews" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews
            </button>
          </div>
          <div className="p-6">
            {activeTab === "content" ? (
              <CourseContent courseId={course._id} />
            ) : (
              <CourseReviews courseId={course._id} reviews={course.reviews} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetail
