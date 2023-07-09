const { Videogame, Genre } = require('../db.js');

//Creamos un nuevo pokemon en nuestra app
const postGame = async (req,res) => {
try {
  //Nos traemos los datos que requerira el pokemon por body
  const { name, image ,genres, platforms, ratings, description, release} = req.body;
  
   //Creamos un nuevo pokemon con sus valores por default en undefined
   const newGame = await Videogame.create({
    name,
    image,
    release,
    description,
    ratings,
    platforms,
    genres,
   })

   const genreForOurGame = await Genre.findOne({ where: { name: genres} });
   
   await newGame.addGenres(genreForOurGame);
   return res.status(200).json(newGame)
       

} catch (error) {
  return res.status(400).send(error.message)
}
}

module.exports = postGame;