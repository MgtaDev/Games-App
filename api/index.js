//Aqui levantamos nuestro servidor. Y nos lo traemos de app.js
const server = require("./src/app.js");
const {conn}=require("./src/db.js")
const port = process.env.PORT ;
require('dotenv').config();

(async () => {
  try {
    //Probamos la conexion al servidor
    await conn.authenticate();
    console.log('Connection has been established successfully.');
    
    //Sincronizamos todos nuestros modelos
    await conn.sync({force:true});
    console.log('All models were synchronized successfully.');

    //Indicamos a nuestro servidor que puerto escuchar.
    server.listen(port, () => {
      console.log(`Server listening at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();
server
