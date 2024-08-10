import supabase from "../config/supabaseClient.js";

// Función para obtener todos los usuarios
export const getAllUsers = async () => {
  const { data, error } = await supabase.from("usuarios").select(`
    id,
    nombre,
    apellido,
    alias,
    email,
    contrasena,
    perfil_id,
    genero_id,
    generos (genero_id, descripcion_genero
      
    ),
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
    .select(
      `
      id,
      nombre,
      apellido,
      alias,
      genero,
      email,
      contrasena,
      perfil_id,
      perfiles (
        id,
        tipo,
        descripcion
      )
    `
    )
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data;
};

// Función para crear un nuevo usuario con contraseña hasheada
export const createUser = async (user) => {
  const { nombre, apellido, alias, genero_id, email, contrasena, perfil_id } =
    user;

  console.log(user);

  // Llamar a la función RPC para hashear la contraseña
  const { data: hashedPassword, error: hashError } = await supabase.rpc(
    "hash_password",
    {
      password: contrasena,
    }
  );
  console.log("Conrtrasena hasheada", hashedPassword);

  if (hashError) {
    throw hashError;
  }

  // Insertar el nuevo usuario en la tabla 'usuarios'
  const { data, error: insertError } = await supabase
    .from("usuarios")
    .insert([
      {
        nombre,
        apellido,
        alias,
        genero_id,
        email,
        contrasena: hashedPassword,
        perfil_id,
      },
    ])
    .single();

  if (insertError) {
    throw insertError;
  }
  console.log("Usuario insertado correctamente:", data);
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

// Función para iniciar sesión de usuario
export const loginUser = async (email, contrasena) => {
  const { data: user, error } = await supabase
    .from("usuarios")
    .select("id, contrasena")
    .eq("email", email)
    .single();

  if (error || !user) {
    throw new Error("Usuario no encontrado o error en la consulta");
  }

  // Verificar la contraseña usando la función RPC
  const { data: isValid, error: verifyError } = await supabase.rpc(
    "verify_password",
    {
      password: contrasena,
      hashed_password: user.contrasena,
    }
  );

  if (verifyError) {
    throw verifyError;
  }

  return isValid;
};
