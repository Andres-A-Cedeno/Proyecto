// models/authModel.js
import supabase from "../../config/supabaseClient.js";

export const signInUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  const user = data.user;

  // Obtener el rol del usuario desde la tabla 'usuarios'
  const { data: userData, error: userError } = await supabase
    .from("usuarios")
    .select("perfil_id")
    .eq("id", user.perfil_id)
    .single();

  if (userError) {
    throw new Error(userError.message);
  }

  console.log("Sesion iniciada:", data);

  return { ...data, rol: userData.rol };
};
