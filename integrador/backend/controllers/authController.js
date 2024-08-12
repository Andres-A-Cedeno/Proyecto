import jwt from 'jsonwebtoken';
import * as userModel from "../models/userModel.js";

// Controlador para iniciar sesión
export const loginUser = async (req, res) => {
  const { emailOrUsername, contrasena } = req.body;

  try {
    // Buscar el usuario por correo electrónico o nombre de usuario
    const user = await userModel.getUserByEmailOrUsername(emailOrUsername);

    if (!user) {
      return res.status(401).json({ message: "Correo o nombre de usuario no encontrado" });
    }

    // Verificar la contraseña
    const isValid = await userModel.verifyPassword(user.contrasena, contrasena);

    if (!isValid) {
      return res.status(401).json({ message: "Contraseña inválida" });
    }

    // Crear un token JWT
    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ message: "Inicio de sesión exitoso", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};