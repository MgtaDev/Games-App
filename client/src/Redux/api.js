import axios from "axios"

export const getGames = () => {
    return axios.get('http://localhost:3001/games')
      .then((res) => res.data.results)
      .catch((err) => console.log(err));
  };

  export const getGGenres = () => {
    return axios
      .get(`http://localhost:3001/genres/`)
      .catch((err) => console.log(err));
  };
  
  export const getGameDetails = (name) => {
    return axios
      .get(`http://localhost:3001/games/${name}`)
      .catch((err) => console.log(err));
  };
  