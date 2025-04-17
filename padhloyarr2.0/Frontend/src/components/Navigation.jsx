// import { Link } from 'react-router-dom'
// import { useAuth } from '../context/AuthContext'
// import { useCart } from '../context/CartContext'
// import { useWishlist } from '../context/WishlistContext'
// import NotificationBell from './components/NotificationBell'

// const Navigation = () => {
//   const { user, logout } = useAuth()
//   const { cartCount } = useCart()
//   const { wishlistCount } = useWishlist()
  
//   return (
//     <nav className="bg-white shadow-md">
//       <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//         <Link to="/" className="text-xl font-bold text-blue-600">PadhloYarr</Link>
        
//         <div className="flex items-center space-x-6">
//           {user ? (
//             <>
//               <Link to="/dashboard" className="hover:text-blue-600">Dashboard</Link>
//               <Link to="/wishlist" className="hover:text-blue-600 flex items-center">
//                 Wishlist
//                 {wishlistCount > 0 && (
//                   <span className="ml-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {wishlistCount}
//                   </span>
//                 )}
//               </Link>
//               <Link to="/cart" className="hover:text-blue-600 flex items-center">
//                 Cart
//                 {cartCount > 0 && (
//                   <span className="ml-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
//                     {cartCount}
//                   </span>
//                 )}
//               </Link>
//               {/* Added NotificationBell component */}
//               <NotificationBell />
//               {user.isAdmin && (
//                 <Link to="/admin/courses" className="hover:text-blue-600">Admin</Link>
//               )}
//               <Link to="/profile" className="hover:text-blue-600">Profile</Link>
//               <button onClick={logout} className="hover:text-blue-600">Logout</button>
//             </>
//           ) : (
//             <>
//               <Link to="/login" className="hover:text-blue-600">Login</Link>
//               <Link to="/register" className="hover:text-blue-600">Register</Link>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   )
// }

// export default Navigation

"use client"

import { Link } from "react-router-dom"
import { useAuth } from "../context/AuthContext"
import { useCart } from "../context/CartContext"
import { useWishlist } from "../context/WishlistContext"
import NotificationBell from "./UI/NotificationBell"

const Navigation = () => {
  const { user, logout } = useAuth()
  const { cartCount } = useCart()
  const { wishlistCount } = useWishlist()

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-blue-600">
          PadhloYarr
        </Link>

        <div className="flex items-center space-x-6">
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-600">
                Dashboard
              </Link>
              <Link to="/wishlist" className="hover:text-blue-600 flex items-center">
                Wishlist
                {wishlistCount > 0 && (
                  <span className="ml-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>
              <Link to="/cart" className="hover:text-blue-600 flex items-center">
                Cart
                {cartCount > 0 && (
                  <span className="ml-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>
              {/* Added NotificationBell component */}
              <NotificationBell />
              {user.isAdmin && (
                <Link to="/admin/courses" className="hover:text-blue-600">
                  Admin
                </Link>
              )}
              <Link to="/profile" className="hover:text-blue-600">
                Profile
              </Link>
              <button onClick={logout} className="hover:text-blue-600">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-600">
                Login
              </Link>
              <Link to="/register" className="hover:text-blue-600">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
