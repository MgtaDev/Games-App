const axios = require('axios');
const { Op } = require('sequelize');
const { Videogame } = require('../db.js');

const getGamesByName = async (req, res) => {
  const { name } = req.query;
  try {
    const response = await axios.get(`https://api.rawg.io/api/games?search=${name}&page_size=15&key=bfd3e1995b9c42718220bbd425e2fdaf`);

    const games = response.data.results.map(game => ({
      id: game.id,
      name: game.name,
      image: game.background_image,
      platforms: game.platforms.map((platform)=> platform.platform.name),
      description: game.description_raw,
      release: game.released,
      ratings: game.ratings.length ? game.ratings[0].id : null,
      genres: game.genres.map(genre => genre.name),
    }));



    return res.status(200).json(games);
  } catch (error) {
    const games = await Videogame.findAll({
      where: { 
        name: { 
          [Op.iLike]: `%${name}%`,
        },
      },
      limit: 15,
      attributes: ['id', 'name', 'image', 'platforms', 'description', 'release', 'ratings'],
      order: [['name', 'ASC']]
    });

    if (games.length > 0) {
      return res.json(games);
    } else {
      return res.status(404).json({ message: 'No se encontraron juegos con ese nombre' });
    }
  }
};

module.exports = getGamesByName;