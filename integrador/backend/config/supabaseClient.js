import { createClient } from "@supabase/supabase-js";

// Configuracion de credenciales de Supabase
const SUPABASE_URL = "https://pfsptabieumayootmnkv.supabase.co";
const SUPABASE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBmc3B0YWJpZXVtYXlvb3Rtbmt2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4ODY5NjAsImV4cCI6MjAzNzQ2Mjk2MH0.Fad1mhMOBX4UEYbhtlIoeKwWmjS-UCv2jqdng5P91I4";

// Creando una instancia de client de Supabase
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default supabase;
