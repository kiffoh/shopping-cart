import './App.css'
import { Link } from 'react-router-dom'
import Images from './Images'
import style from "./App.module.css"

function App() {
  return (
    <>
      <nav>
        <ul className={style.navbar}>
          <Link to="/">Home</Link>
          <Link to="shopping-cart">Shopping Cart</Link>
        </ul>
      </nav>
      <h1>Home</h1>
        <Images />
      
    </>
  )
}

export default App
