import axios from "axios"
import { ADD_GAMES, ADD_GAMES_DB, FILTER_BY_HIGH_RATE, FILTER_BY_MIN_RATE, FILTER_GAMES_BY_GENRE, GET_GAMES_PER_NAME, GET_GENRES, SET_GENRES_RENDER, SET_ORDER_A_Z, SET_ORDER_Z_A, SHOW_ALL_GAMES,  } from "./Types"
import { getGameDetails } from "./api"

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
       console.log('Error inesperado')
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
         console.log('Error inesperado')
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

export const setGenresRender=(payload)=>({
  type:SET_GENRES_RENDER,
  payload
 })

 export const fetchGamesGenres = (genre) => async (dispatch) => {
  try {
    const response = await axios(`http://localhost:3001/genres/${genre}`);
    console.log(response);
    const games = response.data.games.map((game) => game.name);
    const gameDetails = await Promise.all(
      games.map(async (game) => {
        const detailsResponse = await axios(getGameDetails(game));
        const gameDetails = {
          id: detailsResponse.data.id,
          name: detailsResponse.data.name,
          date: detailsResponse.data.released,
          ratings: detailsResponse.data.ratings
        };
        return gameDetails;
      })
    );
    dispatch(setGenresRender(gameDetails));
  } catch (error) {
    console.log(error);
  }
};

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
      console.error(error);
    }
  };
};

export const filterGamesByGenre = (genre) => ({
  type: FILTER_GAMES_BY_GENRE,
  payload: genre 
});

export const reloadGames = () => ({
  type: FILTER_GAMES_BY_GENRE,
  payload: {}
});

