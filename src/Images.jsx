import styles from "./Images.module.css"
import PropTypes from "prop-types"

const Images = ({ quantities, onIncrease, onDecrease, onChange, useImageURL }) => {
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
    useImageURL: PropTypes.func.isRequired,
}

export default Images