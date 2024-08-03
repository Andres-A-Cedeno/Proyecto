import express from "express";
import cors from "cors"; // Importacion de cors
import supabase from "./config/supabaseClient.js"; //-> Al trabajar con modulo es importante importar con la extension .js

const app = express(); //-> Crear una instancia de Express
const port = process.env.PORT ?? 4322; //-> Se define por variable de entorno o el puerto 4321

app.use(cors()); //-> Habilitar CORS
app.use(express.json());

/*
//registar a un usuario en la base datos
app.post("/auth/register", async (req, res) => {
  try {
  } catch (error) {}
});

//Para que el usuario se pueda loguear sin problemas
app.post("/auth/login", async (req, res) => {
  try {
    const { data, error } = await supabase.from("Users").select("*");
    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/data", async (req, res) => {
  try {
    const { data, error } = await supabase.from("Users").select("*");
    if (error) {
      throw error;
    }
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
*/

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
}); // -> Diciendo que escuche el servidor en el puerto que declaramos en la variable de entorno o el puerto 4321
