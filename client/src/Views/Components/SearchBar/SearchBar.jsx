import { useState } from 'react';
import style from './SearchBar.module.css';
import { getGameForSearchBar } from '../../../Redux/Actions';
import { useDispatch } from 'react-redux';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [gameSearched, setGameSearched] = useState('');

  const handleInputChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setGameSearched(searchValue);
    // dispatchSearchFunction(searchValue);
  };

  const dispatchSearchFunction = (searchValue) => {
    const name = searchValue.trim();
    dispatch(getGameForSearchBar(name));
  };
  const handleInputKeyDown = (event) => {
    if (event.key === "Enter") {
      dispatchSearchFunction(gameSearched);
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
      <button  onClick={() => dispatchSearchFunction(gameSearched)}>
        <span>🔍</span>
      </button>
    </div>
  );
};

export default SearchBar;