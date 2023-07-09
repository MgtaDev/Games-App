// Importamos nuestros types para usarlos en el reducer
import {GET_GAMES_PER_NAME ,SET_GENRES_RENDER,SET_ORDER_A_Z,SET_ORDER_Z_A, SHOW_DB_GAMES, SHOW_API_GAMES,GET_GENRES,FILTER_BY_HIGH_RATE,FILTER_BY_MIN_RATE,ADD_GAMES, FILTER_GAMES_BY_GENRE, ADD_GAMES_DB} from './Types'

//Estado inicial de nuestro reducer
const initialstate = {
    games: [],
    genres:[]
  }

// Creamos a nuestro reducer
const Reducer = (state = initialstate, action) => {
switch (action.type) {
    //Con este type que nos trae la funcion de nuestra action le decimos al reducer lo que hara
    //con la info que tiene en nuestro estado global
    case ADD_GAMES:
    return{
        ...state,
        games: action.payload
    }
    case SET_ORDER_A_Z:
        return{
            ...state,
            games: state.games.slice().sort((a, b) => a.name.localeCompare(b.name))
        }
    case SET_ORDER_Z_A:
        return {
             ...state,
             games: state.games.slice().sort((a, b) => b.name.localeCompare(a.name))
            }
    case FILTER_BY_HIGH_RATE:
        return{
            ...state,
            games: state.games.slice().sort((a, b) => b.ratings - a.ratings)
        }
    case FILTER_BY_MIN_RATE:
        return{
            ...state,
            games: state.games.slice().sort((a, b) => a.ratings - b.ratings)
        }
    case GET_GENRES:
        return {
             ...state,
              genres: action.payload  
        }
    case  SET_GENRES_RENDER:
        return { ...state,  
            games: action.payload  
        };
    case  GET_GAMES_PER_NAME:
        return{
            ...state,
            games: action.payload
        }
    
    case ADD_GAMES_DB:
        return{
            ...state,
            games: action.payload
        }


    case FILTER_GAMES_BY_GENRE:
    const  genre  = action.payload;
    const filteredGames = state.games.filter(game => game.genres.includes(genre));
 
    return{
        ...state,
        games: filteredGames
    }



    default:
        return{
            ...state
        }
}
}
export default Reducer;