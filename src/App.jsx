import './App.css'
import { Link, Outlet } from 'react-router-dom'
import Images from './Images'
import style from "./App.module.css"
import { useState } from 'react'

function App() {
  const [quantities, setQuantities] = useState({});

    const handleIncrease = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: (prev[id] || 0) + 1
        }))
    }

    const handleDecrease = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: (prev[id] || 0) - 1 > 0 ? (prev[id] || 0) - 1 : 0
        }))
    }

    const handleChange = (id, value) => {
        const number = parseInt(value, 10)
        setQuantities(prev => ({
            ...prev,
            [id]: number >= 0 ? number : 0
        }))
    }

    const totalQuantity = Object.values(quantities).reduce((acc, qty) => acc + qty, 0)
    
  return (
    <>
      <nav>
        <ul className={style.navbar}>
          <Link to="/" className={style.shoppingCart}>Home</Link>
          <Link to="shopping-cart" className={style.shoppingCart}>Shopping Cart</Link>
          {totalQuantity > 0 && (
            <div className={style.totalQuantity}>
              {totalQuantity}
            </div>
          )}
        </ul>
      </nav>
      <h1>Home</h1>
      <Images 
        quantities={quantities}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onChange={handleChange}
      />
      <Outlet context={{ quantities }} />
    </>
  )
}

export default App
