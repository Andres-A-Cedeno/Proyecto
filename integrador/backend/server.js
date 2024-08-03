import express from "express";
import cors from "cors"; // Importacion de cors
import supabase from "./config/supabaseClient.js"; //-> Al trabajar con modulo es importante importar con la extension .js

const app = express(); //-> Crear una instancia de Express
const port = process.env.PORT ?? 4322; //-> Se define por variable de entorno o el puerto 4321

app.use(cors()); //-> Habilitar CORS
app.use(express.json());

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); // -> Diciendo que escuche el servidor en el puerto que declaramos en la variable de entorno o el puerto 4321
