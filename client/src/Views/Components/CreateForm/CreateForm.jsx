import style from './CreateForm.module.css';
import validate from './Validate';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getGenres } from '../../../Redux/Actions';

const CreateForm = () => {
  const genres = useSelector((state) => state.genres);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('http://localhost:3001/genres')
      .then((response) => response.json())
      .then((data) => dispatch(getGenres(data)))
      .catch((error) => console.error('Error fetching genres:', error));
  }, [dispatch]);

  const [step, setStep] = useState(0);
  const [isValid, setIsValid] = useState(false);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    image: '',
    release: '',
    ratings: '',
    description: '',
    platforms: '',
    genres: [],
  });

  console.log("formData ->", JSON.stringify(formData))

  useEffect(() => {
    const errors = validate(formData);
    // elimina el campo "genres" del objeto de errores
    const { genres, ...otherErrors } = errors;
    setErrors(otherErrors);
    setIsValid(Object.keys(otherErrors).length === 0);
  }, [formData]);

  const [errors, setErrors] = useState({});

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

  const handleTypeChange = (event) => {
    const { checked, value } = event.target;
    if (checked) {
      if (formData.genres.length >= 2) {
        // Si ya se han seleccionado 2 géneros, se muestra el mensaje de error.
        setErrors(prevErrors => ({ ...prevErrors, genres: 'You can only select up to 2 genres' }));
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const gameData = {
      name: formData.name,
      image: formData.image,
      release: formData.release,
      ratings: formData.ratings,
      description: formData.description,
      platforms: [formData.platforms],
      genres: formData.genres
    }
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
        window.alert('Game created successfully');
        // navigate('/home');
      })
      .catch((error) => {
        console.error('Error creating game:', error);
        console.log('Fetch error:', error.message);
      });
      navigate('/home')
  };

  const handlePrevious = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleNext = () => {
    setStep((prevStep) => prevStep + 1);
  };

 

  return (
    <div className={style.Form}>
      <NavLink to={'/home'}>
      <button>Back</button>
      </NavLink>

      {step === 0 && (
        <form onSubmit={handleSubmit}>
          <h2>Create your Game</h2>
          <div className={style.Content}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} />
            {errors.name && <p>{errors.name}</p>}

            <label htmlFor="image">Image</label>
            <input type="text" id="img" name="image" value={formData.image} onChange={handleChange} />
            {errors.image && <p>{errors.image}</p>}

            <label htmlFor="description">Description</label>
            <input type="text" id="description" name="description" value={formData.description} onChange={handleChange} />
            {errors.description && <p>{errors.description}</p>}

            <label htmlFor="platforms">Platforms</label>
            <input type="text" id="platforms" name="platforms" value={formData.platforms} onChange={handleChange} />
            {errors.platforms && <p>{errors.platforms}</p>}

            <label htmlFor="release">Release Date</label>
            <input type="date" id="release" name="release" value={formData.release} onChange={handleChange} />
            {errors.release && <p>{errors.release}</p>}

            <label htmlFor="ratings">Rating</label>
            <input type="number" name="ratings" value={formData.ratings} onChange={handleChange} />
            {errors.ratings && <p>{errors.ratings}</p>}

            <button className={!isValid ? style.off : style.button} type="submit" disabled={!isValid} onClick={handleNext}>
              Next
            </button>
          </div>
        </form>
      )}

      {step === 1 && (
        <form onSubmit={handleSubmit} className={style.form2}>
          <h2>Select up to 2 Genres</h2>

          {genres.map((genre) => (
          <label key={genre.id} value={genre.id} className={style.genres}>
            <input
              type="checkbox"
              name={genre.name}
              value={genre.name}
              onChange={handleTypeChange}
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