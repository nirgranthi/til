import Homepage from './pages/Homepage'
import { Checkout } from './pages/Checkout'
import { Orders } from './pages/Orders'
import { Routes, Route } from 'react-router'
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path='checkout' element={<Checkout />} />
      <Route path='orders' element={<Orders />} />
    </Routes>
  )
}

export default App
