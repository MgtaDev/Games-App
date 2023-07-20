import axios from "axios"
import { ADD_GAMES, ADD_GAMES_API, ADD_GAMES_DB, DELETE_GAME, FILTER_BY_GAMES_PLATFORM, FILTER_BY_HIGH_RATE, FILTER_BY_MIN_RATE, FILTER_GAMES_BY_GENRE, GET_GAMES_PER_NAME, GET_GENRES, SET_ORDER_A_Z, SET_ORDER_Z_A, SHOW_ALL_GAMES,  } from "./Types"
import swal from "sweetalert"

export const addGames = ()=> {
    const myUrl = 'http://localhost:3001/games'
    return async (dispatch)=> {
    try {
        const { data } = await axios.get(myUrl)
        if(!data) return ('No hay juegos en estos momentos')
        return dispatch({
            type: ADD_GAMES,
            payload: data
        })

    } catch (error) {
      swal('ERROR' ,'Error loading all games', 'error');
    }
    }
    }
export const addGamesApi= ()=> {
      const myUrl = 'http://localhost:3001/gamesapi'
      return async (dispatch)=> {
      try {
          const { data } = await axios.get(myUrl)
          if(!data) return ('No hay juegos en estos momentos')
          return dispatch({
              type: ADD_GAMES_API,
              payload: data
          })
  
      } catch (error) {
        swal('ERROR' ,'Error loading api games', 'error');
      }
      }
    }
  
export const addGamesDb= ()=> {
    const myUrl = 'http://localhost:3001/gamesdb'
    return async (dispatch)=> {
    try {
        const { data } = await axios.get(myUrl)
        if(!data) return ('No hay juegos en estos momentos')
        return dispatch({
            type: ADD_GAMES_DB,
            payload: data
        })
  
    } catch (error) {
      swal('ERROR' ,'Error loading created games', 'error');
    }
    }
    }

//Filtros:
export const orderA_Z=()=>({
    type:SET_ORDER_A_Z,
    
  })
  
  export const orderZ_A=()=>({
    type:SET_ORDER_Z_A,
    
  })

  export const filterByHighRate = () => ({
    type: FILTER_BY_HIGH_RATE
  });

  export const filterByMinRate = () => ({
    type: FILTER_BY_MIN_RATE
  });

  export const filterAllGames = (payload) => ({
    type: SHOW_ALL_GAMES,
    payload: payload
  })
  //

export const getGenres = (payload) => ({
  type:GET_GENRES,
  payload: payload
});

export const getGameForSearchBar = (name) => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`http://localhost:3001/gamesbyname/search?name=${name}`)
      dispatch({
        type: GET_GAMES_PER_NAME,
        payload: response.data
      });
      console.log(response)
    } catch (error) {
      swal('ERROR' ,'There is no game with this name', 'error');
    }
  };
};

export const filterGamesByGenre = (genre) => ({
  type: FILTER_GAMES_BY_GENRE,
  payload: genre 
});

export const filterGamesByPlatform = (platform) => ({
  type: FILTER_BY_GAMES_PLATFORM,
  payload: platform
});


export const reloadGames = () => ({
  type: FILTER_GAMES_BY_GENRE,
  payload: {}
});

export const deleteGame = (id) => {
  return (dispatch) => {
    fetch(`http://localhost:3001/games/${id}`, {
      method: 'DELETE',
    })
    .then(res => res.json())
    .then(data => {
      console.log('Successfully deleted game:', data);
      swal('GAME DELETED','The game was succesfully deleted', 'success')
      dispatch({ type: DELETE_GAME, payload: id });
    })
    .catch(error => swal('ERROR','There was an error deleting the game', 'error'));
  };
};
