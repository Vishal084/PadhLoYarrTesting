import { createContext, useContext, useState, useEffect } from 'react'
import cartService from '../api/cartService'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [cartCount, setCartCount] = useState(0)

  const fetchCart = async () => {
    try {
      const response = await api.get('/cart')
      setCart(response.data)
      setCartCount(response.data.length)
    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }

  const addToCart = async (courseId) => {
    try {
      await api.post('/cart', { courseId })
      await fetchCart()
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to add to cart' }
    }
  }

  const removeFromCart = async (courseId) => {
    try {
      await api.delete(`/cart/${courseId}`)
      await fetchCart()
      return { success: true }
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Failed to remove from cart' }
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  return (
    <CartContext.Provider value={{ cart, cartCount, addToCart, removeFromCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)