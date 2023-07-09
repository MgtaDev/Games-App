const axios = require('axios');
const { Genre } = require('../db')

const getGenres = async (req, res) => {
  try {
    const response = await axios.get('https://api.rawg.io/api/genres?key=bfd3e1995b9c42718220bbd425e2fdaf');
    const genres = response.data.results;

    const ourGenres = [];
    
    // Recorre todos los géneros obtenidos
    for (let genre of genres) {
      // Crea el género en la base de datos
      const [newGenre, created] = await Genre.findOrCreate({
        where: { name: genre.name },
        defaults: {
          games: genre.games.map((game)=>{
            return{
              id:game.id,
              name:game.name,
            }
          })
        },
      });
      
      // Agrega el género creado al arreglo que se enviará en la respuesta
      ourGenres.push(newGenre.toJSON());
    }
    
    res.status(200).json(ourGenres);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};

module.exports = getGenres;