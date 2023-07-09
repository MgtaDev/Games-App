//Nos traemos a Router de express
const { Router } = require('express');

//Importamos nuestros controladores:
const getGameFromDb = require('../controllers/getGameFromDb.js')
const getGames = require('../controllers/getGames.js');
const getGamesById = require('../controllers/getGamesById.js')
const getGameByName = require('../controllers/getGameByName.js');
const postGame = require('../controllers/postGame.js');
const getGenres = require('../controllers/getGenres.js');
//Asignamos el router
const router = Router();

// Checked
router.get('/games', getGames)
router.get('/games/:id', getGamesById)
router.get('/genres',getGenres)
router.get('/gamesbyname/:name',getGameByName)
router.post('/gamesdb',postGame)
router.get('/gamesdb', getGameFromDb)


http://localhost:3001/genres
module.exports = router;