import style from './CreateForm.module.css';
import validate from './Validate';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getGenres } from '../../../Redux/Actions';
import swal from 'sweetalert'

const CreateForm = () => {
  const [step, setStep] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    release: '',
    ratings: '',
    description: '',
    platforms: [],
    genres: [],
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const genres = useSelector((state) => state.genres);

  useEffect(() => {
    fetch('http://localhost:3001/genres')
      .then((response) => response.json())
      .then((data) => dispatch(getGenres(data)))
      .catch((error) => console.error('Error fetching genres:', error));
  }, [dispatch]);

  useEffect(() => {
    const errors = validate(formData);
    // elimina el campo "genres" del objeto de errores
    const { genres, platforms ,...otherErrors } = errors;
    setErrors(otherErrors);
    setIsValid(Object.keys(otherErrors).length === 0);
  }, [formData]);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    setErrors({
      ...errors,
      [event.target.name]: event.target.value,
    });
  };

  const handleGenreChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      if (formData.genres.length >= 2) {
        // Si ya se han seleccionado 2 géneros, se muestra el mensaje de error.
        setErrors((prevErrors) => ({ ...prevErrors, genres: '⚠️ You can only select up to 2 genres' }));
        return;
      }
      setFormData((prevFormData) => ({
        ...prevFormData,
        genres: [...prevFormData.genres, value],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        genres: prevFormData.genres.filter((genre) => genre !== value),
      }));
      // No eliminamos el error aquí, solo lo establecemos en `null`.
      setErrors((prevErrors) => ({ ...prevErrors, genres: null }));
    }
  };
  const handlePlatformChange = (event) => {
  const { checked, value } = event.target;
  if (checked) {
    if (formData.platforms.length >= 4) {
      // Si ya se han seleccionado 4 plataformas, se muestra el mensaje de error.
      setErrors((prevErrors) => ({ ...prevErrors, platforms: '⚠️ You can only select up to 4 platforms' }));
      return;
    }

    setFormData((prevFormData) => ({
      ...prevFormData,
      platforms: [...prevFormData.platforms, value],
    }));
  } else {
    setFormData((prevFormData) => ({
      ...prevFormData,
      platforms: prevFormData.platforms.filter((platform) => platform !== value),
    }));
  }
};

  const handleSubmit = (event) => {
    event.preventDefault();
    const gameData = {
      name: formData.name,
      image: formData.image,
      release: formData.release,
      ratings: formData.ratings,
      description: formData.description,
      platforms: formData.platforms,
      genres: formData.genres,
    };
    fetch('http://localhost:3001/games', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(gameData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Game created successfully', data);
        swal('GAME CREATED','The game was created succesfully!', 'success' );
      })
      .catch((error) => {
        swal('ERROR' ,'Error creating game', 'error');
        console.log('Fetch error:', error.message);
      });
    navigate('/home');
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
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
    <div className={style.Form}>
      <NavLink to="/home">
        <button>Back</button>
      </NavLink>

      {step === 0 && (
        <form onSubmit={handleSubmit}>
          <h2>Create your Game</h2>
          <div className={style.Content}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <p>{errors.name}</p>}

            <label htmlFor="image">Image</label>
            <input
              type="text"
              id="img"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
            {errors.image && <p>{errors.image}</p>}

            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            />
            {errors.description && <p>{errors.description}</p>}

            <label htmlFor="release">Release Date</label>
            <input
              type="date"
              id="release"
              name="release"
              value={formData.release}
              onChange={handleChange}
            />
            {errors.release && <p>{errors.release}</p>}

            <label htmlFor="ratings">Rating</label>
            <input
              type="number"
              name="ratings"
              value={formData.ratings}
              onChange={handleChange}
            />
            {errors.ratings && <p>{errors.ratings}</p>}

            <button
              className={!isValid ? style.off : style.button}
              type="submit"
              disabled={!isValid}
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </form>
      )}
       {step === 1 && (
   <form onSubmit={handleSubmit} className={style.form2}>
     <h2>Select up to 4 platforms</h2>

     {platforms.map((platform) => (
       <label key={platform.id} value={platform.id} className={style.genres}>
         <input
           type="checkbox"
           name={platform.name}
           value={platform.name}
           key={platform.id}
           onChange={handlePlatformChange}
           checked={formData.platforms.includes(platform.name)}
         />
         {platform.name}
       </label>
     ))}
    {errors.platforms && <p>{errors.platforms}</p>}

     <div className={style.buttons}>
       <button onClick={handlePrevious}>Previous</button>
       <button
         type="submit"
         disabled={!isValid}
         onClick={handleNext}
       >
         Next
       </button>
     </div>
   </form>
 )}

      {step === 2 && (
        <form onSubmit={handleSubmit} className={style.form2}>
          <h2>Select up to 2 Genres</h2>

          {genres.map((genre) => (
            <label key={genre.id} value={genre.id} className={style.genres}>
              <input
                type="checkbox"
                name={genre.name}
                value={genre.name}
                onChange={handleGenreChange}
                checked={formData.genres.includes(genre.name)}
              />
              {genre.name}
            </label>
          ))}

          {errors.genres && <p>{errors.genres}</p>}

          <div className={style.buttons}>
            <button onClick={handlePrevious}>Previous</button>
            <button type="submit" disabled={formData.genres.length > 2}>
              Create Game
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CreateForm;

