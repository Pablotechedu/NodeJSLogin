import { connection } from "../config/database.js";
import bcrypt from "bcryptjs";

export class User {
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

  // Guardar usuario en la base de datos
  async save() {
    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(this.password, 10);

    const [result] = await connection.execute(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [this.username, this.email, hashedPassword]
    );

    return {
      id: result.insertId,
      username: this.username,
      email: this.email,
    };
  }

  // Buscar usuario por email
  static async findByEmail(email) {
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    return rows[0];
  }

  // Buscar usuario por ID
  static async findById(id) {
    const [rows] = await connection.execute(
      "SELECT id, username, email FROM users WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  // Verificar contraseña
  static async checkPassword(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
  }
}
