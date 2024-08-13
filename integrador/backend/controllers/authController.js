import { createUser } from "../models/userModel.js";
import { signInUser } from "../models/auth/authModel.js";

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
    const { session, rol } = await signInUser(email, password);
    const { access_token, refresh_token } = session;

    // Configurar cookies para el acceso
    res.cookie("sb-access-token", access_token, {
      httpOnly: true, // Asegura las cookies en producción
      path: "/",
    });
    res.cookie("sb-refresh-token", refresh_token, {
      httpOnly: true,
      path: "/",
    });

    // Responder con un mensaje de éxito y el rol del usuario
    res.status(200).json({ message: "Inicio de sesión exitoso", rol });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
