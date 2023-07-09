import styles from './ButtonsContainer.module.css'
import { useDispatch } from 'react-redux';
import { orderA_Z, orderZ_A, filterByHighRate, filterByMinRate, addGames, addGamesDb  } from '../../../Redux/Actions'

  const ButtonsContainer = () => {
  const dispatch = useDispatch();
  

  // Filtrado
  const handleFiltrosChange = (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case 'orderAZ':
        dispatch(orderA_Z());
        break;
      case 'orderZA':
        dispatch(orderZ_A());
        break;
      case 'highRate':
        dispatch(filterByHighRate());
        break;
      case 'minRate':
        dispatch(filterByMinRate());
        break;
      case 'all' :
          dispatch(addGames())
          break;
    
      case 'db' :
        dispatch(addGamesDb())
        break;
        
      default:
        break
    }
  };


  
  return (
    <div className={styles.ButtonsContainer}>
      
      <select value="filtros" name="filtros" id="filtros" onChange={handleFiltrosChange}>
        <option value="">Filtros</option>
        <option value="orderAZ">A-Z</option>
        <option value="orderZA">Z-A</option>
        <option value="highRate">High Rate</option>
        <option value="minRate">Min Rate</option>
      </select>

      <select value="origen" name="origen" id="origen" onChange={handleFiltrosChange}>
      <option value="">Origen</option>
      <option value="all">All</option>
      <option value="db">Created</option>
      </select>
    </div>
  
  )
}


export default ButtonsContainer;