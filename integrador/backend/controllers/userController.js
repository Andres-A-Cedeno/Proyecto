// controllers/userController.js

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
  const user = req.body;
  try {
    const newUser = await userModel.createUser(user);
    res.status(201).json(newUser);
    console.log("Usuario Creado correctamente");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para actualizar un usuario existente
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  console.log("Datos recibidos para actualizar:", updates); // Log para ver los datos recibidos

  try {
    const updatedUser = await userModel.updateUser(id, updates);
    res.json(updatedUser);
    console.log("Usuario Actualizado correctamente");
  } catch (error) {
    console.error("Error al actualizar usuario:", error.message); // Log para ver el error específico
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un usuario
import * as userModel from "../models/userModel.js";

// Controlador para eliminar un usuario
export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    await userModel.deleteUser(parseInt(id));
    res.status(204).send();
    console.log("Usuario Eliminado correctamente");
  } catch (error) {
    console.error("Error al eliminar usuario:", error.message); // Log para ver el error específico
    res.status(500).json({ error: error.message });
  }
};
