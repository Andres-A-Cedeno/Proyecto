// backend/middlewares/authMiddleware.js
import { supabase } from "../config/supabaseClient.js";

export const isAdmin = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const {
    data: { user },
    error,
  } = await supabase.auth.api.getUser(token);

  if (error || !user) {
    return res.status(401).json({ message: "No autorizado" });
  }

  // Verificar si el usuario tiene el rol de 'admin'
  if (user.perfil_id !== 1) {
    return res.status(403).json({
      message:
        "Acceso denegado. Solo administradores pueden realizar esta acción.",
    });
  }

  // Adjuntar el usuario a la solicitud
  req.user = user;
  next();
};
