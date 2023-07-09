import { useEffect, useState } from 'react';
import style from './NavBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, filterGamesByGenre, addGames } from '../../../Redux/Actions';
import { useNavigate } from 'react-router-dom'

const NavBar2 = () => {
  const genres = useSelector((state) => state.genres);

  // eslint-disable-next-line no-unused-vars
  const [showGenres, setShowGenres] = useState(true);
  // eslint-disable-next-line no-unused-vars
  const [showPlatforms, setShowPlatforms] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    let genres = [];
    fetch('http://localhost:3001/genres')
      .then((response) => response.json())
      .then((response) => {
        response.forEach((genre) => {
          genres.push(genre.name);
        });
        dispatch(getGenres(genres));
      })
      .catch((err) => console.error(err));
  }, [dispatch]);
  const handleTypesChange = (event) => {
    try {
      const genreToFilter = event.target.textContent;
      console.log(genreToFilter)
      dispatch(filterGamesByGenre(genreToFilter));
      console.log('Games per genre fetched successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const navigate = useNavigate()
const goHome = ()=>{
  navigate('/home')
}

console.log(genres)
  return (
    <nav className={style.sidebar}>
      <ul>
      <li onClick={goHome} className={style.header}>Home</li>
      <li onClick={addGames} className={style.header}>Reload</li>
      <li className={style.header}>Genres</li>
        {showGenres ? (
          genres.map((genre) => (
            <li className={style.genres} key={genre} onClick={handleTypesChange} value={genre}>
              {genre}
            </li>
          ))
        ) : (
          ''
        )}
       
      </ul>
    </nav>
  );
};

export default NavBar2;