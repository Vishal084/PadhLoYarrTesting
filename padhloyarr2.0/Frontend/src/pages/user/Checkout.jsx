// import { useState, useEffect } from 'react'
// import { useCart } from '../context/CartContext'
// import { createRazorpayOrder, verifyPayment } from '../api/paymentService'
// import LoadingSpinner from '../components/ui/LoadingSpinner'

// const loadRazorpay = () => {
//   return new Promise((resolve) => {
//     const script = document.createElement('script')
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js'
//     script.onload = () => {
//       resolve(true)
//     }
//     script.onerror = () => {
//       resolve(false)
//     }
//     document.body.appendChild(script)
//   })
// }

// const Checkout = () => {
//   const { cart, cartCount, fetchCart } = useCart()
//   const [loading, setLoading] = useState(true)
//   const [totalAmount, setTotalAmount] = useState(0)

//   useEffect(() => {
//     if (cart) {
//       const amount = cart.reduce((sum, item) => sum + item.price, 0)
//       setTotalAmount(amount)
//       setLoading(false)
//     }
//   }, [cart])

//   const handlePayment = async () => {
//     setLoading(true)
    
//     try {
//       // Load Razorpay script
//       const isLoaded = await loadRazorpay()
//       if (!isLoaded) {
//         throw new Error('Razorpay SDK failed to load')
//       }

//       // Create order
//       const orderResponse = await createRazorpayOrder(totalAmount)
//       const { order } = orderResponse.data

//       // Razorpay options
//       const options = {
//         key: import.meta.env.VITE_RAZORPAY_KEY_ID,
//         amount: order.amount,
//         currency: order.currency,
//         name: 'PadhloYarr',
//         description: 'Course Purchase',
//         order_id: order.id,
//         handler: async function(response) {
//           try {
//             await verifyPayment(response)
//             alert('Payment successful!')
//             fetchCart() // Refresh cart
//           } catch (error) {
//             console.error('Payment verification failed:', error)
//             alert('Payment verification failed')
//           }
//         },
//         prefill: {
//           name: 'User Name',
//           email: 'user@example.com',
//           contact: '9999999999'
//         },
//         theme: {
//           color: '#3399cc'
//         }
//       }

//       const rzp = new window.Razorpay(options)
//       rzp.open()
//     } catch (error) {
//       console.error('Payment error:', error)
//       alert('Payment failed: ' + error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   if (loading) return <LoadingSpinner />

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         <div className="lg:col-span-2">
//           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4">Your Courses ({cartCount})</h2>
//             {cart.map((course) => (
//               <div key={course._id} className="flex items-center border-b py-4">
//                 <img 
//                   src={course.thumbnail || '/placeholder-course.jpg'} 
//                   alt={course.title}
//                   className="w-16 h-16 object-cover rounded mr-4"
//                 />
//                 <div className="flex-grow">
//                   <h3 className="font-medium">{course.title}</h3>
//                   <p className="text-gray-600 text-sm">By {course.instructor?.name}</p>
//                 </div>
//                 <div className="font-bold">₹{course.price}</div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="lg:col-span-1">
//           <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
//             <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            
//             <div className="space-y-3 mb-6">
//               <div className="flex justify-between">
//                 <span>Subtotal</span>
//                 <span>₹{totalAmount}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span>Tax</span>
//                 <span>₹0</span>
//               </div>
//               <div className="flex justify-between font-bold text-lg border-t pt-3">
//                 <span>Total</span>
//                 <span>₹{totalAmount}</span>
//               </div>
//             </div>

//             <button
//               onClick={handlePayment}
//               disabled={loading || cartCount === 0}
//               className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
//             >
//               {loading ? 'Processing...' : 'Proceed to Payment'}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default Checkout




import { useState, useEffect } from "react"
import { useCart } from "../../context/CartContext"
// import { createRazorpayOrder, verifyPayment } from "../../api/paymentService"
import paymentService from "../../api/paymentService"
import LoadingSpinner from "../../components/UI/LoadingSpinner"

const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script")
    script.src = "https://checkout.razorpay.com/v1/checkout.js"
    script.onload = () => {
      resolve(true)
    }
    script.onerror = () => {
      resolve(false)
    }
    document.body.appendChild(script)
  })
}

const Checkout = () => {
  const { cart, cartCount, fetchCart } = useCart()
  const [loading, setLoading] = useState(true)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(() => {
    if (cart) {
      const amount = cart.reduce((sum, item) => sum + item.price, 0)
      setTotalAmount(amount)
      setLoading(false)
    }
  }, [cart])

  const handlePayment = async () => {
    setLoading(true)

    try {
      // Load Razorpay script
      const isLoaded = await loadRazorpay()
      if (!isLoaded) {
        throw new Error("Razorpay SDK failed to load")
      }

      // Create order
      const orderResponse = await createRazorpayOrder(totalAmount)
      const { order } = orderResponse.data

      // Razorpay options
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        amount: order.amount,
        currency: order.currency,
        name: "PadhloYarr",
        description: "Course Purchase",
        order_id: order.id,
        handler: async (response) => {
          try {
            await verifyPayment(response)
            alert("Payment successful!")
            fetchCart() // Refresh cart
          } catch (error) {
            console.error("Payment verification failed:", error)
            alert("Payment verification failed")
          }
        },
        prefill: {
          name: "User Name",
          email: "user@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#3399cc",
        },
      }

      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error("Payment error:", error)
      alert("Payment failed: " + error.message)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Your Courses ({cartCount})</h2>
            {cart.map((course) => (
              <div key={course._id} className="flex items-center border-b py-4">
                <img
                  src={course.thumbnail || "/placeholder-course.jpg"}
                  alt={course.title}
                  className="w-16 h-16 object-cover rounded mr-4"
                />
                <div className="flex-grow">
                  <h3 className="font-medium">{course.title}</h3>
                  <p className="text-gray-600 text-sm">By {course.instructor?.name}</p>
                </div>
                <div className="font-bold">₹{course.price}</div>
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

            <button
              onClick={handlePayment}
              disabled={loading || cartCount === 0}
              className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Processing..." : "Proceed to Payment"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Checkout
