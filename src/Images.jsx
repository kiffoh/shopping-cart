import { useEffect, useState } from "react";
import styles from "./Images.module.css"

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

const Images = () => {
    const { imageURL, error, loading } = useImageURL();
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
    
    if (loading) return <h1>Loading...</h1>
    if (error) return <h1>A network error was encountered</h1>


    return (
        <div className={styles.grid}>
            {imageURL && 
                imageURL.map(image => (
                <div key={image.id}>
                    <h3>{image.title}</h3>
                    <div className={styles.imgContainer}>
                        <img src={image.image} alt={image.title} />
                    </div>
                    <p>{image.description}</p>
                    <div className={styles.bottomBar}>
                        <p>Rating: {image.rating.rate}</p>
                        <p>Price: ${image.price}</p>
                    </div>
                    <div className={styles.quantityControl}>
                        <button onClick={() => handleDecrease(image.id)}>-</button>
                        <input 
                            type="number"
                            value={quantities[image.id] || 0}
                            onChange={(e) => handleChange(image.id, e.target.value)}
                        />
                        <button onClick={() => handleIncrease(image.id)}>+</button>
                    </div>
                </div>
                ))
            }
        </div>
    )
}

export default Images