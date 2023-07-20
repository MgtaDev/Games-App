import axios from "axios"

  export const getGGenres = () => {
    return axios
      .get(`http://localhost:3001/genres/`)
      .catch((err) => console.log(err));
  };
  