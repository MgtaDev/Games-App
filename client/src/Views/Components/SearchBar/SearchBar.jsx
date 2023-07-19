import { useState } from 'react';
import style from './SearchBar.module.css';
import { getGameForSearchBar } from '../../../Redux/Actions';
import { useDispatch } from 'react-redux';
import validate from './validate';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [gameSearched, setGameSearched] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const [formIsValid, setFormIsValid] = useState(true);

  const handleInputChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setGameSearched(searchValue);
    const errors = validate(searchValue);
    setErrorMessages(errors);
    setFormIsValid(errors.length === 0);
  };

  const dispatchSearchFunction = (searchValue) => {
    const name = searchValue.trim();
    dispatch(getGameForSearchBar(name));
  };
  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (formIsValid) {
        dispatchSearchFunction(gameSearched);
      }
    }
  };
  
  return (
    <div className={style.searchBar}>
      <input
        onChange={handleInputChange}
        type="search"
        name="search"
        placeholder="Search your game"
        value={gameSearched}
        onKeyDown={handleInputKeyDown}
      />
      <button onClick={() => dispatchSearchFunction(gameSearched)} disabled={!formIsValid}>
        <span>🔍</span>
      </button>
      {errorMessages && (
        <div className={style.errorMessages}>
          {errorMessages.map((error) => (
            <p className={style.error} key={error}>{error}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;