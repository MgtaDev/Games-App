const axios = require('axios');
const {VideoGame} = require('../db');

const getGameById = async(req, res)=>{
  const { id } = req.params;
  
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  if (uuidRegex.test(id)) {
     try {
      const gameDb = await VideoGame.findOne({ where: { id } });
      if (!gameDb) {
        return res.status(404).json({ message: 'Este juego no existe en la base de datos' });
      }
      return res.json(gameDb);

    } catch (error) {
      return res.status(400).send(error.message)
    }
  } else {

    try {
      const response = await axios(`https://api.rawg.io/api/games/${id}?key=bfd3e1995b9c42718220bbd425e2fdaf`);
      const game = response.data
      const gameApi = {
        id: game.id,
        name:game.name,
        image: game.background_image,
        platforms: game.platforms.map((platform) => platform.platform.name),
        description:game.description_raw,
        releaseDate: game.released,
        ratings: game.ratings[0].id,
        genres: game.genres.map(genre => genre.name)
      };
      return res.json(gameApi);

    } 
    catch (error) {
    return res.status(404).send({ message: 'Este juego no existe en la api' });
      } 
    }
  }
module.exports = getGameById;