import Homepage from './pages/Homepage'
import { Routes, Route } from 'react-router'
import './App.css'

function App() {
  return (
    <Routes>
      <Route index element={<Homepage />} />
      <Route path='checkout' element={<div>checkout</div>} />
    </Routes>
  )
}

export default App
