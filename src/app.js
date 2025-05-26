import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import { initializeDatabase } from "./config/database.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);

// Ruta principal
app.get("/", (req, res) => {
  res.json({
    message: "JWT Auth API working",
    endpoints: {
      login: "POST /api/auth/login",
      register: "POST /api/auth/register (protected)",
      profile: "GET /api/auth/profile (protected)",
    },
  });
});

// Inicializar servidor
const startServer = async () => {
  await initializeDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();
