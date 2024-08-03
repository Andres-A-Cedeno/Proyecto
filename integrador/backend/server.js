import express from "express";
import cors from "cors"; 
import userRoutes from "./routes/userRoutes.js"; // Importando rutas de usuario
//import authRoutes from "./routes/authRoutes.js"; // Importando rutas de autenticación

const app = express(); 
const port = process.env.PORT ?? 4321; 

app.use(cors());
app.use(express.json());

// Usar rutas de usuario
app.use("/api", userRoutes);
// Usar rutas de autenticación
//app.use("/api", authRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});