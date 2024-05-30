import { Link, useOutletContext } from "react-router-dom"
import style from "./App.module.css"

function ShoppingCart() {

    return (
        <>
            <nav>
                <ul className={style.navbar}>
                <Link to="/">Home</Link>
                <Link to="/shopping-cart">Shopping Cart</Link>
                </ul>
            </nav>
            <h1>Shopping Cart</h1>
            <div className={style.grid}>

            </div>
        </>
    )
}

export default ShoppingCart