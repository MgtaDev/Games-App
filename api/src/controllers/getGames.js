const axios = require('axios');
const { Videogame } = require('../db.js')

const getGames = async (req, res) => {
  try {
    let ourGames = [];
    const gamesDb = await Videogame.findAll(); // esperamos a que se resuelva la promesa de findAll()

    for (let page = 1; page <= 2; page++) {
      const url = `https://api.rawg.io/api/games?key=bfd3e1995b9c42718220bbd425e2fdaf&page=${page}&page_size=40`;
      const response = await axios.get(url);
      const games = response.data.results;

      const modifiedGames = games.map((game) => ({
        id: game.id,
        name: game.name.charAt(0).toUpperCase() + game.name.slice(1),
        image: game.background_image,
        platforms: game.platforms.map((platform) => platform.platform.name),
        description: game.description_raw,
        release: game.released,
        ratings: game.ratings[0].id,
        genres: game.genres.map((genre) => genre.name),
      }));

      ourGames = [...ourGames, ...modifiedGames];
    }

    let allGames = [...ourGames];

    if (gamesDb.length > 0) {
      const modifiedGamesDb = gamesDb.map((game) => ({
        id: game.id,
        name: game.name,
        image: game.image,
        platforms: game.platforms.map((platform) => platform.name),
        description: game.description,
        release: game.release,
        ratings: game.ratings,
        genres: game.genres.map((genre) => genre.name),
      }));

      allGames = [...ourGames, ...modifiedGamesDb];
    }

    return res.status(200).json(allGames);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getGames;
