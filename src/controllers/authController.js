import jwt from "jsonwebtoken";
import { User } from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

// Generar token JWT
const generateToken = (userId, email) => {
  return jwt.sign({ id: userId, email: email }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
};

// Registrar usuario
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  // Validaciones basicas
  if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  if (password.length < 6) {
    return res.status(400).json({ message: "Password too short" });
  }

  // Verificar si el usuario ya existe
  const existingUser = await User.findByEmail(email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Crear nuevo usuario
  const newUser = new User(username, email, password);
  const savedUser = await newUser.save();

  res.status(201).json({
    message: "User created successfully",
    user: savedUser,
  });
};

// Login de usuario
export const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  // Buscar usuario
  const user = await User.findByEmail(email);
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Verificar contraseña
  const validPassword = await User.checkPassword(password, user.password);
  if (!validPassword) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generar token
  const token = generateToken(user.id, user.email);

  res.json({
    message: "Login successful",
    token: token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
  });
};

// Obtener perfil del usuario
export const getProfile = async (req, res) => {
  const userId = req.user.id;

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json({
    message: "Profile retrieved",
    user: user,
  });
};
