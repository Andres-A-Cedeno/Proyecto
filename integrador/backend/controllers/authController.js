import { createUser } from "../models/userModel.js";

import { signInUser, getUserRole } from "../models/auth/authModel.js";

export const registerUser = async (req, res) => {
  console.log("Datos recibidas:", req.body);
  const { nombre, apellido, nickname, email, password, genero_id } = req.body;

  // Validar si todos los campos fueron enviados en la solicitud
  if (!nombre || !apellido || !nickname || !email || !password || !genero_id) {
    return res
      .status(400)
      .json({ error: "Todos los campos son obligatorios AUTH" });
  }

  try {
    // Llamar al modelo para crear el usuario
    const result = await createUser({
      nombre,
      apellido,
      nickname,
      email,
      password,
      genero_id,
    });
    res.status(200).json(result);
    console.log("Usuario creado", result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Correo electrónico y contraseña obligatorios" });
  }

  try {
    // Llama al modelo para iniciar sesión
    const { user, session } = await signInUser(email, password);

    if (!user || !session) {
      return res.status(500).json({ error: "Error al iniciar sesión" });
    }

    // Llama al modelo para obtener el rol del usuario
    const userRole = await getUserRole(user.id);

    // Enviar token y rol al cliente
    const access_token = session.access_token;
    const refresh_token = session.refresh_token;

    res.status(200).json({
      token: access_token,
      refreshToken: refresh_token,
      user: {
        id: user.id,
        email: user.email,
        role: userRole,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
