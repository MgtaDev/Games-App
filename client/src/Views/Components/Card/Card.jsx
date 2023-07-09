import style from './Card.module.css'
import {Link} from 'react-router-dom'


const Card = ({id, img, name, genres, release, ratings}) => {

    const renderStars = (num) => {
        let stars = '';
        for(let i = 0; i < num; i++) {
          stars += '★';
        }
        return <h6 style={{color:'yellow'}}>{stars}</h6>;
      }

   const genresJoined = genres ? genres.join(' / ') : ''
      
    return(
    <div className={style.card}>

    <div className={style.cardTop}>
    <img src={img} alt='pic' />
    <h4>{name}</h4>
    </div>
    
    <div className={style.cardContent}> 
    <h6>Released date:</h6>
    <h6>{release}</h6>

    <h6>Ratings</h6>
  {renderStars(ratings)}

    <h6>Genres: {genresJoined}</h6>

    <div className={style.types}>
   
    </div>
   

    <p className={style.id}>#00{id}</p>
    <Link to={`/details/${id}`}>
    <button>Read more</button>
    </Link>

    <div className={style.cardStats}>
    </div>
    </div>
    
    </div>

    )
}
export default Card;