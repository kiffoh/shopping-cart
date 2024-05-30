import { useEffect, useState } from "react";
import styles from "./Images.module.css"
import PropTypes from "prop-types"

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

const Images = ({ quantities, onIncrease, onDecrease, onChange }) => {
    const { imageURL, error, loading } = useImageURL();
    
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
                        <button onClick={() => onDecrease(image.id)}>-</button>
                        <input 
                            type="number"
                            value={quantities[image.id] || 0}
                            onChange={(e) => onChange(image.id, e.target.value)}
                        />
                        <button onClick={() => onIncrease(image.id)}>+</button>
                    </div>
                </div>
                ))
            }
        </div>
    )
}

Images.propTypes = {
    quantities: PropTypes.object.isRequired,
    onIncrease: PropTypes.func.isRequired,
    onDecrease:PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default Images