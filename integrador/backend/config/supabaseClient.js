import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

// Cargar variables de entorno
dotenv.config();

console.log("SUPABASE_URL:", process.env.SUPABASE_URL); // Log para verificar
console.log("SUPABASE_KEY:", process.env.SUPABASE_KEY); // Log para verificar

// Configuracion de credenciales de Supabase
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_KEY;

// Creando una instancia de client de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;