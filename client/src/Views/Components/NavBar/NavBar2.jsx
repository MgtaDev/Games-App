import { useEffect } from 'react';
import style from './NavBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, filterGamesByGenre, addGames, filterGamesByPlatform } from '../../../Redux/Actions';
import { useNavigate } from 'react-router-dom';

const NavBar2 = () => {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3001/genres')
      .then((response) => response.json())
      .then((response) => {
        dispatch(getGenres(response)); // Actualiza el estado local `genres` con los géneros y sus respectivos IDs
      })
      .catch((err) => console.error(err));
  }, [dispatch]);

  const handleTypesChange = (event) => {
    try {
      const genreToFilter = event.target.textContent;
      dispatch(filterGamesByGenre(genreToFilter));
      console.log('Games per genre fetched successfully');
    } catch (error) {
      console.error(error);
    }
  };
  const handlePlatformsChange = (event) => {
    try {
      const genreToFilter = event.target.textContent;
      dispatch(filterGamesByPlatform(genreToFilter));
      console.log('Games per genre fetched successfully');
    } catch (error) {
      console.error(error);
    }
  };

  const reloadGames = async () => {
    dispatch(addGames());
  };

  const goHome = () => {
    navigate('/home');
  };

  const platforms = [
    { id: 1, name: 'macOS' },
    { id: 2, name:'iOS'},
    { id: 3, name: 'Nintendo Switch' },
    { id: 4, name: 'Linux' },
    { id: 5, name: 'Xbox One' },
    { id: 6, name: 'Xbox 360' },
    { id: 7, name: 'PlayStation 3' },
    { id: 8, name: 'PlayStation 4' },
    { id: 9, name: 'PlayStation 5' },
    { id: 10, name: 'PC' },
    { id: 11, name: 'Android' },
    { id: 12, name: 'Xbox Series S/X' },
    { id: 13, name: 'Wii U' },
    { id: 14, name: 'Web' },
  ];
  
  return (
    <nav className={style.sidebar}>
      {genres.length > 1 ? (
        <div className={style.topNav}>
          <p onClick={goHome} className={style.header}>
            Home
          </p>
          <p onClick={reloadGames} className={style.header}>
            Reload
          </p>
          <p className={style.header}>Genres</p>
        </div>
      ) : null}
      <ul className={style.ul}>
        {genres &&
          genres.map((genre) => (
            <li className={style.genres} key={genre.id} onClick={handleTypesChange} value={genre}>
              {genre.name}
            </li>
          ))}
         <p className={style.platforms}>Platforms</p>
           {platforms &&
          platforms.map((platform) => (
            <li className={style.genres} key={platform.id} onClick={handlePlatformsChange} value={platform}>
              {platform.name}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default NavBar2;