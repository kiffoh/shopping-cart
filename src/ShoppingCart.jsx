import { useOutletContext } from "react-router-dom"
import style from "./App.module.css"
import { useEffect, useState } from "react";

function ShoppingCart() {
    const [quantities, handleIncrease, handleDecrease, handleChange, useImageURL] = useOutletContext();

    const { imageURL, loading, error } = useImageURL();

    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        if (imageURL && Object.keys(quantities).length > 0) {
            const total = imageURL.reduce((accumulator, item) => {
                const quantity = parseInt(quantities[item.id]);
                if (quantity > 0) {
                    return accumulator + (parseFloat(item.price).toFixed(2) * quantity);
                }
                return accumulator;
            }, 0);
            setTotalPrice(total);
        }
    }, [quantities, imageURL]);

    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>A network error was encountered</h1>

    return (
        <div className={style.grid}>
        {imageURL.map(item => {
            if (Object.keys(quantities).includes(item.id.toString())) {
                return (
                    <div key={item.id} className={style.gridItem}>
                        <img src={item.image} alt={item.title} />
                        <h3>{item.title}</h3>
                        <div>
                            <p>Quantity: {quantities[item.id]}</p>
                            <p>Price: {item.price}</p>
                            <p>Total: {parseInt(quantities[item.id]) * parseFloat(item.price)}</p>
                        </div>
                    </div>
                )
            }
            return null;
        })}
        {totalPrice > 0 ? 
        <h2>Grand Total: {totalPrice}</h2> : 
        null
        }
        
        </div>
    );
}

export default ShoppingCart