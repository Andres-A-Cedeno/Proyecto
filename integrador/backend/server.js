import express from "express";
import cors from "cors"; // Importacion de cors
import router from "./routes/userRoutes.js";

const app = express(); //-> Crear una instancia de Express
const port = process.env.PORT ?? 4321; //-> Se define por variable de entorno o el puerto 4321

app.use(cors()); //-> Habilitar CORS
app.use(express.json());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); // -> Diciendo que escuche el servidor en el puerto que declaramos en la variable de entorno o el puerto 4321
