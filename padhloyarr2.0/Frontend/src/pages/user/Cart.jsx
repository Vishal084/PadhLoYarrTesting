// import { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { useCart } from '../context/CartContext'
// import LoadingSpinner from '../components/ui/LoadingSpinner'

// const Cart = () => {
//   const { cart, cartCount, removeFromCart } = useCart()
//   const [loading, setLoading] = useState(true)
//   const [total, setTotal] = useState(0)

//   useEffect(() => {
//     if (cart) {
//       const amount = cart.reduce((sum, item) => sum + item.price, 0)
//       setTotal(amount)
//       setLoading(false)
//     }
//   }, [cart]) 

//   const handleRemove = async (courseId) => {
//     await removeFromCart(courseId)
//   }

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Your Cart ({cartCount})</h1>
      
//       {cartCount === 0 ? (
//         <div className="bg-white rounded-lg shadow-md p-6 text-center">
//           <p className="text-gray-600 mb-4">Your cart is empty</p>
//           <Link 
//             to="/" 
//             className="text-blue-600 hover:text-blue-800 font-medium"
//           >
//             Browse courses
//           </Link>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <div className="lg:col-span-2">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               {cart.map((course) => (
//                 <div key={course._id} className="flex items-center justify-between border-b py-4">
//                   <div className="flex items-center">
//                     <img 
//                       src={course.thumbnail || '/placeholder-course.jpg'} 
//                       alt={course.title}
//                       className="w-16 h-16 object-cover rounded mr-4"
//                     />
//                     <div>
//                       <h3 className="font-medium">{course.title}</h3>
//                       <p className="text-gray-600 text-sm">By {course.instructor?.name}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-center">
//                     <span className="font-bold mr-4">₹{course.price}</span>
//                     <button
//                       onClick={() => handleRemove(course._id)}
//                       className="text-red-600 hover:text-red-800"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <div className="lg:col-span-1">
//             <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
//               <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
//               <div className="space-y-3 mb-6">
//                 <div className="flex justify-between">
//                   <span>Subtotal ({cartCount} items)</span>
//                   <span>₹{total}</span>
//                 </div>
//                 <div className="flex justify-between font-bold text-lg border-t pt-3">
//                   <span>Total</span>
//                   <span>₹{total}</span>
//                 </div>
//               </div>

//               <Link
//                 to="/checkout"
//                 className="block w-full text-center bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
//               >
//                 Proceed to Checkout
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Cart

import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../../context/CartContext'
import CourseCard from '../../components/course/CourseCard'
import LoadingSpinner from '../../components/ui/LoadingSpinner'

const Cart = () => {
  const { cart, cartCount, removeFromCart } = useCart()
  const [loading, setLoading] = useState(true)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((sum, item) => sum + item.price, 0)
      setTotalAmount(amount)
      setLoading(false)
    }
  }, [cart])

  const handleRemove = async (courseId) => {
    const result = await removeFromCart(courseId)
    if (!result.success) {
      alert(result.message)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Your Cart ({cartCount})</h1>
      
      {cartCount === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty</p>
          <Link 
            to="/" 
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              {cart.map((course) => (
                <div key={course._id} className="flex items-center border-b py-4">
                  <CourseCard course={course} compact={true} />
                  <button
                    onClick={() => handleRemove(course._id)}
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹{totalAmount}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>₹0</span>
                </div>
                <div className="flex justify-between font-bold text-lg border-t pt-3">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <Link
                to="/checkout"
                className="block w-full text-center bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700"
              >
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart