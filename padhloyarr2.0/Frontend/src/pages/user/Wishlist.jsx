// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useWishlist } from '../context/WishlistContext'
// import { useCart } from '../context/CartContext'
// import CourseCard from '../components/course/CourseCard'
// import LoadingSpinner from '../components/ui/LoadingSpinner'

// const Wishlist = () => {
//   const { wishlist, removeFromWishlist, moveToCart } = useWishlist()
//   const { addToCart } = useCart()
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     if (wishlist !== null) {
//       setLoading(false)
//     }
//   }, [wishlist])

//   const handleMoveToCart = async (courseId) => {
//     const result = await moveToCart(courseId)
//     if (result.success) {
//       alert('Course moved to cart!')
//     } else {
//       alert(result.message)
//     }
//   }

//   const handleRemove = async (courseId) => {
//     const result = await removeFromWishlist(courseId)
//     if (!result.success) {
//       alert(result.message)
//     }
//   }

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>
      
//       {wishlist.length === 0 ? (
//         <div className="text-center py-12">
//           <p className="text-gray-600 mb-4">Your wishlist is empty</p>
//           <Link 
//             to="/" 
//             className="text-blue-600 hover:text-blue-800 font-medium"
//           >
//             Browse courses
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//           {wishlist.map((course) => (
//             <div key={course._id} className="relative">
//               <CourseCard course={course} />
//               <div className="mt-2 flex justify-between">
//                 <button
//                   onClick={() => handleMoveToCart(course._id)}
//                   className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                 >
//                   Add to Cart
//                 </button>
//                 <button
//                   onClick={() => handleRemove(course._id)}
//                   className="text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
//                 >
//                   Remove
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   )
// }

// export default Wishlist



import { useEffect, useState } from "react"
import cartService from "../../api/cartService"
import { Link } from "react-router-dom"
import { useWishlist } from "../../context/WishlistContext"
import { useCart } from "../../context/CartContext"
import CourseCard from "../../components/course/CourseCard"
import LoadingSpinner from "../../components/UI/LoadingSpinner"

const Wishlist = () => {
  const { wishlist, removeFromWishlist, moveToCart } = useWishlist()
  const { addToCart } = useCart()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (wishlist !== null) {
      setLoading(false)
    }
  }, [wishlist])

  const handleMoveToCart = async (courseId) => {
    const result = await moveToCart(courseId)
    if (result.success) {
      alert("Course moved to cart!")
    } else {
      alert(result.message)
    }
  }

  const handleRemove = async (courseId) => {
    const result = await removeFromWishlist(courseId)
    if (!result.success) {
      alert(result.message)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Wishlist</h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your wishlist is empty</p>
          <Link to="/" className="text-blue-600 hover:text-blue-800 font-medium">
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((course) => (
            <div key={course._id} className="relative">
              <CourseCard course={course} />
              <div className="mt-2 flex justify-between">
                <button
                  onClick={() => handleMoveToCart(course._id)}
                  className="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleRemove(course._id)}
                  className="text-sm bg-gray-200 text-gray-800 px-3 py-1 rounded hover:bg-gray-300"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Wishlist
