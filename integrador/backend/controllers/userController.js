import * as userModel from "../models/userModel.js";
import supabase from "../config/supabaseClient.js";

// Controlador para iniciar sesión
export const loginUser = async (req, res) => {
  const { email, contrasena } = req.body;

  try {
    const isValid = await userModel.loginUser(email, contrasena);
    if (!isValid) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }
    res.json({ message: "Inicio de sesión exitoso" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener todos los usuarios
export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
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
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para crear un nuevo usuario
export const createUser = async (req, res) => {
  try {
    let { nombre, apellido, alias, genero_id, email, contraseña } = req.body;

    // Validar que todos los campos requeridos estén presentes
    if (!nombre || !apellido || !alias || !email || !contraseña) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    // Asignar un género predeterminado si genero_id está vacío
    if (!genero_id) {
      genero_id = 1; // "Masculino" por defecto
    }

    console.log("Datos recibidos:", req.body);

    // Encriptar la contraseña usando la función RPC en Supabase
    const { data: hashedPassword, error: hashError } = await supabase.rpc(
      "hash_password",
      { password: contraseña }
    );

    if (hashError) {
      console.error("Error en la encriptación:", hashError.message);
      throw new Error(hashError.message);
    }

    // Almacenar la información del usuario en la base de datos
    const { data, error: insertError } = await supabase
      .from("usuarios")
      .insert([{ nombre, apellido, alias, genero_id, email, contrasena: hashedPassword, perfil_id: 2 }]);

    if (insertError) {
      console.error("Error en la inserción de usuario:", insertError.message);
      throw new Error(insertError.message);
    }

    res.status(201).json(data);
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

  try {
    const updatedUser = await userModel.updateUser(id, updates);
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    await userModel.deleteUser(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};