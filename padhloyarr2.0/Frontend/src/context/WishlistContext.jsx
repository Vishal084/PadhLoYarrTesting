import { createContext, useContext, useState, useEffect } from 'react'
// import api from '../api/wishlistService'
import wishlistService from '../api/wishlistService'
const WishlistContext = createContext()

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([])
  const [wishlistCount, setWishlistCount] = useState(0)

  const fetchWishlist = async () => {
    try {
      const response = await api.getWishlistItems()
      setWishlist(response.data.wishlist)
      setWishlistCount(response.data.wishlist.length)
    } catch (error) {
      console.error('Error fetching wishlist:', error)
    }
  }

  const addToWishlist = async (courseId) => {
    try {
      await api.addToWishlist(courseId)
      await fetchWishlist()
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to add to wishlist' }
    }
  }

  const removeFromWishlist = async (courseId) => {
    try {
      await api.removeFromWishlist(courseId)
      await fetchWishlist()
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to remove from wishlist' }
    }
  }

  const moveToCart = async (courseId) => {
    try {
      await api.moveToCart(courseId)
      await fetchWishlist()
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to move to cart' }
    }
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  return (
    <WishlistContext.Provider value={{ 
      wishlist, 
      wishlistCount, 
      addToWishlist, 
      removeFromWishlist, 
      moveToCart,
      fetchWishlist
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export const useWishlist = () => useContext(WishlistContext)