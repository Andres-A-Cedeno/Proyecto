import supabase from "../config/supabaseClient.js";

// Función para obtener todos los usuarios
export const getAllUsers = async () => {
  const { data, error } = await supabase.from("usuarios").select(`
    id,
    nombre,
    apellido,
    alias,
    genero,
    email,
    contraseña,
    perfil_id,
    perfiles (
      id,
      tipo,
      descripcion
    )
  `);

  if (error) {
    throw error;
  }

  return data;
};

// Función para obtener un usuario por ID
export const getUserById = async (id) => {
  const { data, error } = await supabase
    .from("usuarios")
    .select(`
      id,
      nombre,
      apellido,
      alias,
      genero,
      email,
      contraseña,
      perfil_id,
      perfiles (
        id,
        tipo,
        descripcion
      )
    `)
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Función para crear un nuevo usuario
export const createUser = async (user) => {
  const { data, error } = await supabase.from("usuarios").insert([user]);

  if (error) {
    throw error;
  }

  return data;
};

// Función para actualizar un usuario existente
export const updateUser = async (id, updates) => {
  const { data, error } = await supabase
    .from("usuarios")
    .update(updates)
    .eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// Función para eliminar un usuario
export const deleteUser = async (id) => {
  const { data, error } = await supabase.from("usuarios").delete().eq("id", id);

  if (error) {
    throw error;
  }

  return data;
};

// Función para obtener un usuario por correo electrónico
export const getUserByEmail = async (email) => {
  const { data, error } = await supabase
    .from("usuarios")
    .select("*")
    .eq("email", email)
    .single();

  if (error) {
    throw error;
  }

  return data;
};