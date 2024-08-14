import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  const token = req.cookies.access_token; // Obtener el token de las cookies

  if (!token) {
    return res.status(401).json({ message: "No autorizado" });
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token no válido" });
    }

    req.user = user;
    next();
  });
};
