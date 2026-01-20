import Homepage from './pages/Homepage/Homepage'
import { Checkout } from './pages/Checkout'
import { Orders } from './pages/Orders'
import { Tracking } from './pages/Tracking'
import { Routes, Route } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
      .then((cartItems) => {
        setCart(cartItems.data)
      })
  }, [])


  return (
    <Routes>
      <Route index element={<Homepage cart={cart} />} />
      <Route path='checkout' element={<Checkout cart={cart} />} />
      <Route path='orders' element={<Orders cart={cart} />} />
      <Route path='tracking' element={<Tracking cart={cart} />} />
    </Routes>
  )
}

export default App
