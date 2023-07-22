import axios from "axios"

  export const getGGenres = () => {
    return axios
      .get(`/genres`)
      .catch((err) => console.log(err));
  };
  