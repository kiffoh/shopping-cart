import './App.css'
import { useOutletContext } from 'react-router-dom'
import Images from './Images'
import PropTypes from 'prop-types';

function App() {
  const [quantities, handleIncrease, handleDecrease, handleChange, useImageURL] = useOutletContext();

  return (
    <>
      <Images 
        quantities={quantities}
        onIncrease={handleIncrease}
        onDecrease={handleDecrease}
        onChange={handleChange}
        useImageURL={useImageURL}
      />
    </>
  )
}

App.propTypes = {
  quantities: PropTypes.object.isRequired,
  handleIncrease: PropTypes.func.isRequired,
  handleDecrease: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  useImageURL: PropTypes.func.isRequired,
}

export default App
