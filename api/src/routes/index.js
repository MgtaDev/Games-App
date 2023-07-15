//Nos traemos a Router de express
const { Router } = require('express');

//Importamos nuestros controladores:
const getGameFromDb = require('../controllers/getGameFromDb.js')
const getGames = require('../controllers/getGames.js');
const getGamesById = require('../controllers/getGamesById.js')
const getGameByName = require('../controllers/getGameByName.js');
const postGame = require('../controllers/postGame.js');
const getGenres = require('../controllers/getGenres.js');
const getApiGames = require('../controllers/getGamesApi.js')
const deleteGames = require('../controllers/deleteGame.js')
//Asignamos el router
const router = Router();

router.get('/games', getGames)
router.get('/games/:id', getGamesById)
router.get('/genres',getGenres)
router.get('/gamesbyname/:name',getGameByName)
router.get('/gamesapi', getApiGames)

router.delete('/games/:id', deleteGames);
router.post('/games',postGame)
router.post('/gamesdb',postGame)
router.get('/gamesdb', getGameFromDb)



http://localhost:3001/genres
module.exports = router;
