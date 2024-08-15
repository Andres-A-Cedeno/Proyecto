import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import genresRoutes from "./routes/genresRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { authenticateToken } from "./middleware/authMiddleware.js";

const app = express();
const port = process.env.PORT || 4322;

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

// Conexión con MongoDB
async function connect() {
  await mongoose.connect(process.env.MONGODB_CONECCTION_STRING);
  console.log("Connected to MongoDB");
}
connect().catch(console.error);

// Rutas públicas
app.use("/api/auth", authRoutes);
app.use("/api/genres", genresRoutes);

// Rutas protegidas
app.use("/api/users", authenticateToken, userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
