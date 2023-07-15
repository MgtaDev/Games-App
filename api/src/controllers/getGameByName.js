const axios = require('axios');
const { Videogame } = require('../db.js');


const getGamesByName = async (req, res) => {
  const { name } = req.query;
  try {
    const responseDb = await Videogame.findAll({
      where: { name },
      include: { all: true, nested: true }
    });
    console.log(responseDb)

    // const response2 = await axios.get(`http://localhost:3001/gamesdb`);
    const dbGames = responseDb.map(game => ({
      id: game.id,
      name: game.name,
      image: game.image,
      release: game.release,
      ratings: game.ratings,
      genres: game.genres
    }));

    const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&page_size=15&key=bfd3e1995b9c42718220bbd425e2fdaf`);
    const games = response.data.results.map(game => ({
      id: game.id,
      name: game.name,
      image: game.background_image,
      platforms: game.platforms.map(platform => platform.platform.name),
      description: game.description_raw,
      release: game.released,
      ratings: game.ratings.length ? game.ratings[0].id : null,
      genres: game.genres.map(genre => genre.name),
    }));

    const responseToClient = [...dbGames, ...games]
    return res.status(200).json(responseToClient);
  } 
  catch (error) {
    console.log(error.message)
    return res.status(404).json(error.message)
  }

}
module.exports = getGamesByName;
