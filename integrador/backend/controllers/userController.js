import * as userModel from "../models/userModel.js";

// Controlador para obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
    console.log("Usuarios Obtenidos correctamente");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un usuario por ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await userModel.getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }
    res.json(user);
    console.log("Usuario Obtenido correctamente");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
  console.log("Datos recibidos para crear usuario:", req.body);

  if (!req.body || Object.keys(req.body).length === 0) {
    return res
      .status(400)
      .json({ error: "No se recibieron datos del formulario" });
  }

  const user = { ...req.body, perfil_id: 2 };

  try {
    const newUser = await userModel.createUser(user);
    res.status(201).json(newUser);
    console.log("Usuario creado correctamente");
  } catch (error) {
    console.error("Error al crear usuario:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Controlador para actualizar un usuario existente
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  console.log("Datos recibidos para actualizar:", updates);

  try {
    const updatedUser = await userModel.updateUser(id, updates);
    res.json(updatedUser);
    console.log("Usuario Actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar usuario:", error.message);
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.deleteUser(parseInt(id));
    res.status(204).send();
    console.log("Usuario Eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar usuario:", error.message);
    res.status(500).json({ error: error.message });
  }
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
