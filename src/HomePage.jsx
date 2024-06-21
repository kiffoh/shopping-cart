import { Link, Outlet, useLocation } from "react-router-dom"
import style from "./App.module.css"
import { useState, useEffect } from "react";

function Home() {
    const useImageURL = () => {
        const [imageURL, setImageURL] = useState(null);
        const [error, setError] = useState(null);
        const [loading, setLoading] = useState(true);
    
        useEffect(() => {
            fetch('https://fakestoreapi.com/products/', { mode: "cors"})
                .then((response) => {
                    if (!response.ok) {
                        throw new Error("Server error")
                    }
                    return response.json();
                })
                .then((json) => {
                    setImageURL(json)
                })
                .catch((error) => {
                    setError(error)
                    console.log(error)
                })
                .finally(() => setLoading(false));
        }, [])
    
        return {imageURL, error, loading}
    }

    const [quantities, setQuantities] = useState({});
    const [title, setTitle] = useState("Home");
    const location = useLocation();

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

    useEffect(() => {
        const pathToTitle = {
            "/": "Home",
            "/items": "Items",
            "/shopping-cart": "Shopping Cart"
        };
        setTitle(pathToTitle[location.pathname] || "Page Not Found");
    }, [location]);

    return (
        <>
            <nav>
                <ul className={style.navbar}>
                <Link to="/">Home</Link>
                <Link to="/items">Items</Link>
                <Link to="/shopping-cart">Shopping Cart</Link>
                {totalQuantity > 0 && (
                    <div className={style.totalQuantity}>
                    {totalQuantity}
                    </div>
                )}
                </ul>
            </nav>
            <h1>{title}</h1>
            <Outlet context={[quantities, handleIncrease, handleDecrease, handleChange, useImageURL]}/>
        </>
    )
}

export default Home