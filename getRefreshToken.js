const { google } = require("googleapis");
require("dotenv").config();

const client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,   // Usará el nuevo client_id
  process.env.GOOGLE_CLIENT_SECRET,  // Usará el nuevo client_secret
  "http://localhost:8080"  // Redirección a localhost para obtener el código
);

const getAuthURL = async () => {
  const authUrl = client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/drive.file"],  // Permisos de Google Drive
  });
  console.log("🔗 Autoriza la app visitando este enlace:", authUrl);
};

const getRefreshToken = async (code) => {
  const { tokens } = await client.getToken(code);  // Obtiene el refresh token
  console.log("🆕 Nuevo Refresh Token:", tokens.refresh_token);  // Muestra el nuevo refresh token
};

// Si pasas un código, obtiene el token de actualización
const code = process.argv[2];
if (code) {
  getRefreshToken(code);
} else {
  getAuthURL();  // Si no pasas el código, genera la URL para autorizar
}
