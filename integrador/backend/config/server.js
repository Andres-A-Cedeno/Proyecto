import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import supabase from "./supabaseClient.js";
import userRoutes from "../routes/userRoutes.js"; // Asegúrate de la ruta correcta
import profileRoutes from "../routes/profileRoutes.js"; // Asumiendo que tienes rutas de perfil

// Cargar variables de entorno
dotenv.config();

const app = express();
const port = process.env.PORT || 4321;

app.use(cors());
app.use(express.json());

// Utiliza las rutas importadas
app.use("/api", userRoutes); 
app.use("/api", profileRoutes); 

// Ruta de prueba de conexión
app.get("/api/test-connection", async (req, res) => {
  try {
    const { data, error } = await supabase.from("perfiles").select("*").limit(1);
    if (error) throw error;
    res.json({ message: "Connection successful", data });
  } catch (error) {
    res.status(500).json({ message: "Connection failed", error: error.message });
  }
});

// Middleware de manejo de errores global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});