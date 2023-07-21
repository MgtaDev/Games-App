import styles from './ButtonsContainer.module.css'
import { useDispatch } from 'react-redux';
import { orderA_Z, orderZ_A, filterByHighRate, filterByMinRate, addGames, addGamesDb, addGamesApi  } from '../../../Redux/Actions'

  const ButtonsContainer = ({setSelectedPage, setCurrentPage}) => {
  const dispatch = useDispatch();


  // Filtrado
  const handleFiltrosChange = (event) => {
    const selectedOption = event.target.value;
    switch (selectedOption) {
      case 'orderAZ':
        dispatch(orderA_Z());
        setSelectedPage(1)
        setCurrentPage(1)
        break;
      case 'orderZA':
        dispatch(orderZ_A());
        setSelectedPage(1)
        setCurrentPage(1)
        break;
      case 'highRate':
        dispatch(filterByHighRate());
        setSelectedPage(1)
        setCurrentPage(1)
        break;
      case 'minRate':
        dispatch(filterByMinRate());
        setSelectedPage(1)
        setCurrentPage(1)
        break;
      case 'all' :
          dispatch(addGames())
          setSelectedPage(1)
          setCurrentPage(1)
          break;
    
      case 'api' :
          dispatch(addGamesApi())
          setSelectedPage(1)
          setCurrentPage(1)
          break;

      case 'db' :
           dispatch(addGamesDb())
           setSelectedPage(1)
           setCurrentPage(1)
           break;

      default:
        break
    }
  };

  const resetFilter = () => {
    dispatch(addGames())
  }

  
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
      <option value="api">Api</option>
      <option value="db">Created</option>
      </select>

      <button onClick={resetFilter} className={styles.button}>
        Reset Filter
      </button>
    </div>
  
  )
}


export default ButtonsContainer;