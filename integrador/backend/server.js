import express from "express";
import bodyParser from "body-parser";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";

const app = express();
const PORT = process.env.PORT || 4321;

app.use(bodyParser.json());

app.use("/api", userRoutes);

/*Conexion con mongo*/
/*
async function connect() {
  await mongoose.connect(process.env.MONGODB_CONECCTION_STRING);
  console.log("Connected to MongoDB");
}

connect().catch(console.error);
*/
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
