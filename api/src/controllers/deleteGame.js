const { Videogame } = require('../db.js');


const deleteGames = async (req, res) => {
  try {
    const { id } = req.params;

    // Buscamos el juego por ID y lo eliminamos
   await Videogame.destroy({ 
  where: { 
    id: id //La variable "id" debe contener el ID del juego que deseas eliminar
  } 
});

    // Enviamos una respuesta de éxito al front
    return res.status(200).json({ message: 'El juego ha sido borrado satisfactoriamente.' });
  } catch (error) {
    // Manejamos cualquier error que pueda ocurrir
    console.error('Error en deleteGames:', error);
    return res.status(500).json({ message: 'Ha ocurrido un error al intentar borrar el juego.' });
  }
}
module.exports = deleteGames;
