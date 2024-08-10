import express from "express";
import cors from "cors"; // Importar cors para manejo de políticas de acceso
import router from "./routes/userRoutes.js";
import dotenv from "dotenv";

dotenv.config(); // Cargar variables de entorno

const app = express();
const port = process.env.PORT || 4322; // Definir puerto desde variable de entorno o usar 4322

app.use(cors()); // Habilitar CORS para permitir solicitudes desde otros dominios
app.use(express.json()); // Habilitar JSON parsing en el cuerpo de la solicitud

app.use("/api", userRoutes);

/*Conexion con mongo*/
/*
async function connect() {
  await mongoose.connect(process.env.MONGODB_CONECCTION_STRING);
  console.log("Connected to MongoDB");
}

connect().catch(console.error);
*/

app.use("/api", router); // Usar las rutas definidas en userRoutes.js

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); // Iniciar servidor en el puerto especificado
