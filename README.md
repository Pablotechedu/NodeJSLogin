Sistema de Autenticación JWT con Node.js

Como probar con Postman

1- Crear usuario inicial

Primero se necesita crear un usuario manualmente en la base de datos porque el registro está protegido:

bash:
mysql -u root -p

sql:
USE jwt_auth_db;

INSERT INTO users (username, email, password) VALUES 
('admin', 'admin@test.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

Credenciales del usuario:
- Email: admin@test.com
- Password: password

2- Importar colección en Postman

1. Abrir Postman
2. Click en "Import"
3. Seleccionar el archivo postman_collection.json (incluido en este repo)
4. Click "Import"

3- Ejecutar las pruebas en orden

1. Verificar que la API funciona
- **Método**: GET
- **URL**: `http://localhost:3000`
- **Resultado esperado**: Mensaje de bienvenida

2. Hacer login
- **Método**: POST
- **URL**: `http://localhost:3000/api/auth/login`
- **Headers**: `Content-Type: application/json`
- **Body (JSON)**:
```json
{
  "email": "admin@test.com",
  "password": "password"
}
```
- **Resultado esperado**: Token JWT
- **Importante**: Copiar el token de la respuesta

3. Ver perfil (ruta protegida)
- **Método**: GET
- **URL**: `http://localhost:3000/api/auth/profile`
- **Headers**: 
  - `Authorization: Bearer TU_TOKEN_AQUI`
- **Resultado esperado**: Datos del usuario

4. Registrar nuevo usuario (ruta protegida)
- **Método**: POST
- **URL**: `http://localhost:3000/api/auth/register`
- **Headers**: 
  - `Content-Type: application/json`
  - `Authorization: Bearer TU_TOKEN_AQUI`
- **Body (JSON)**:
```json
{
  "username": "juan",
  "email": "juan@test.com",
  "password": "123456"
}
```
- **Resultado esperado**: Usuario creado exitosamente

Probar acceso sin token (debe fallar)
- **Método**: GET
- **URL**: `http://localhost:3000/api/auth/profile`
- **Headers**: (no incluir Authorization)
- **Resultado esperado**: Error 401 "Token de acceso requerido"
