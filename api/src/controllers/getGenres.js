const axios = require('axios');
const { Genre } = require('../db')
require('dotenv').config()
const { API_KEY } = process.env

const getGenres = async (req, res) => {
  try {
    const response = await axios.get(`https://api.rawg.io/api/genres?key=${API_KEY}`);
    const genres = response.data.results;

    const ourGenres = [];
    
    // Recorre todos los géneros obtenidos
    for (let genre of genres) {
      // Crea el género en la base de datos
      const [newGenre, created] = await Genre.findOrCreate({
        where: { name: genre.name}
          })
        
      
      // Agrega el género creado al arreglo que se enviará en la respuesta
      ourGenres.push(newGenre.toJSON());
    }
    
    res.status(200).json(ourGenres);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = getGenres;