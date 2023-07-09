const axios = require('axios');

const getGames = async (req, res) => {
  try {
    let ourGames = [];
    for (let page = 1; page <= 5; page++) {
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

    return res.status(200).json(ourGames);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = getGames;