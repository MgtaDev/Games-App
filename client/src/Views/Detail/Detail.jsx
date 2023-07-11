import { useNavigate, useParams } from 'react-router-dom';
import style from './Detail.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios'
import NavBar from '../Components/NavBar/NavBar'
import NavBar2 from '../Components/NavBar/NavBar2';
import PlayStation from '../assets/logotipo-de-playstation.png'
import Xbox from '../assets/logotipo-de-xbox.png'
import Steam from '../assets/logotipo-de-steam.png'
import Loading2 from '../Loading 2/Loading2';



const Detail = () => {
  const { id } = useParams();
  const [game, setGame] = useState({});
  const [showDetails, setShowDetails] = useState(false);  
  const navigate = useNavigate()
  const genresJoined = game.genres ? game.genres.join(' / ') : ''
  const navigateHome = () => {
    navigate('/home')
  }
console.log(game)
  
useEffect(() => {
  axios(`http://localhost:3001/games/${id}`)
    .then((response) => {
      console.log('API Response:', response)
      return response.data
    })
    .then((data) => {
      if (data.id) {
        setGame(data);
        setTimeout(() => setShowDetails(true), 50); // ajusta el tiempo aquí
      } else {
        window.alert("No existe ese juego.");
      }
    })
    .catch((err) => {
      console.error(err);
      window.alert("Hubo un error al obtener los detalles del juego.");
    });
}, [id]);

  const renderStars = (num) => {
  let stars = '';
  for(let i = 0; i < num; i++) {
    stars += '★';
  }
  return <p style={{color:'yellow'}}>{stars}</p>;
  }

  const renderIcons = (platforms) => {
    const uniquePlatforms = new Set(platforms); // Crea un conjunto de plataformas únicas
    const renderedPlatforms = []; // Mantener un registro de las plataformas ya renderizadas
    const icons = []; // Array para almacenar las imágenes
  
    // Renderizar una imagen por plataforma
    uniquePlatforms.forEach((platform) => {
      if (!renderedPlatforms.includes(platform)) {
        switch (platform) {
          case 'PlayStation 5':
          case 'PlayStation 4':
          case 'PlayStation 3':
            if (!renderedPlatforms.includes('PlayStation')) { // Verifica si la plataforma PlayStation ya se renderizó anteriormente
              icons.push(<img key="PlayStation" className={style.filtericon} style={{ width: '50px' }} src={PlayStation} alt="PlayStation" />);
              renderedPlatforms.push('PlayStation');
            }
            break;
          case 'Xbox Series S/X':
          case 'Xbox One':
          case 'Xbox 360':
            if (!renderedPlatforms.includes('Xbox')) { // Verifica si la plataforma Xbox ya se renderizó anteriormente
              icons.push(<img key="Xbox" className={style.filtericon} style={{ width: '50px' }} src={Xbox} alt="Xbox" />);
              renderedPlatforms.push('Xbox');
            }
            break;
          case 'PC':
            if (!renderedPlatforms.includes('PC')) { // Verifica si la plataforma PC ya se renderizó anteriormente
              icons.push(<img key="PC" className={style.filtericon} style={{ width: '50px' }} src={Steam} alt="PC" />);
              renderedPlatforms.push('PC');
            }
            break;
          default:
            break;
        }
      }
    });
  
    return icons;
  }
  function renderIcons2(platforms) {
  const uniquePlatforms = new Set(platforms); // Crea un conjunto de plataformas únicas

  return Array.from(uniquePlatforms).map(platform => {

      switch (platform) {
          case 'PlayStation 5':
          case 'PlayStation 4':
          case 'PlayStation 3':
              return <><img className={style.filtericon} style={{ width: '50px' }} src={PlayStation} alt={platform} /><p className={style.availablePlatforms}>{platform}</p></> ;
          case 'Xbox Series S/X':
          case 'Xbox One':
          case 'Xbox 360':
              return<><img className={style.filtericon} style={{ width: '50px' }} src={Xbox} alt={platform} /><p className={style.availablePlatforms}>{platform}</p></>;
          case 'PC':
              return <><img className={style.filtericon} style={{ width: '50px' }} src={Steam} alt={platform} /><p className={style.availablePlatforms}>{platform}</p></>;
          default:
              break;
      }

      return (
          <div key={platform}>
          </div>
      );
  });
}
    return(
        <>
        {
          !showDetails
          
          ?   
          <><NavBar /><NavBar2 /><Loading2 /></>
          : 
          <>
          <NavBar/>
          <NavBar2/>
          <div className={style.Detail}>
              <div className={style.image}>
                <img src={game.image} alt="" />
                <h3>{game?.name}</h3>
                <h4 className={style.header}>Genres: </h4>
                <p >{genresJoined}</p>
                <h4 className={style.header}>Realease date: <p>{game.releaseDate}</p></h4>
                <h4 className={style.header}>Platforms:  <p className={style.platforms}>{renderIcons(game.platforms)}</p></h4>

                <h4 className={style.header}>Ratings: {renderStars(game.ratings)}</h4>


                <div className={style.button}>
                  <button className={style.button} onClick={navigateHome}>
                    Back
                  </button>
                </div>

              </div>

              <div className={style.info}>
                <h1>{game?.name}</h1>
                {renderStars(game.ratings)}
                <p>#00{game?.id}</p>
                <h4>Description</h4>
                <p>{game.description}</p>
                <h4>Available for:</h4>
                <p className={style.availablePlatforms}>{renderIcons2(game.platforms)}</p>
              </div>

          </div>
          </>
        }
     
        </>

    )
}
export default Detail;