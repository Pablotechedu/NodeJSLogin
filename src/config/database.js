import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

// Configuracion basica de la base de datos
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

export const connection = await mysql.createConnection(dbConfig);

// Funcion para crear la tabla si no existe
export const initializeDatabase = async () => {
  try {
    // Crear la tabla users
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Base de datos lista");
  } catch (error) {
    console.log("Error con la base de datos:", error);
  }
};
