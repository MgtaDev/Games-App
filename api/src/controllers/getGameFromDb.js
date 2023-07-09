const { Videogame, Genre } = require('../db.js')
//Solicitamos nuestra tabla de pokemons a nuestra db para proceder con la respectiva funcion
//Obtenemos los pokemones desde nuestra instancia de nuestra base de datos

const getGameFromDb = async (req, res) => {
  try {
    //El método findAll() nos trae todos los registros de esta tabla.
    const games = await Videogame.findAll();
    return res.json(games);
    
  } catch (error) {
    return res.status(404).json({ error: error.message });
  }
}
module.exports = getGameFromDb;