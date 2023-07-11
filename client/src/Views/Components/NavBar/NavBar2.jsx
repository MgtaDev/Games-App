import { useEffect } from 'react';
import style from './NavBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getGenres, filterGamesByGenre, addGames } from '../../../Redux/Actions';
import { useNavigate } from 'react-router-dom';

const NavBar2 = () => {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      console.log(genreToFilter);
      dispatch(filterGamesByGenre(genreToFilter));
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
          genres.map((genre, index) => (
            <li className={style.genres} key={index} onClick={handleTypesChange} value={genre.name}>
              {genre.name}
            </li>
          ))}
      </ul>
    </nav>
  );
};

export default NavBar2;