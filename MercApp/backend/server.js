// backend/server.js

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

// Rutas
const productRoutes = require("./routes/productRoutes");

const app = express();

// --------------------------------------
// 1. Conectar a la base de datos
// --------------------------------------
connectDB();

// --------------------------------------
// 2. Middleware para parsear JSON
// --------------------------------------
app.use(express.json());

// --------------------------------------
// 3. CORS — CONFIGURACIÓN CORRECTA
// --------------------------------------

const allowedOrigins = [
  'http://localhost:5173',
  'https://merc-app-eight.vercel.app',
  'https://merc-app-git-main-daniecj16s-projects.vercel.app'
];



app.use((req, res, next) => {
  console.log("🌐 Origin recibido:", req.headers.origin);
  next();
});

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // Postman / server-side requests
      if (allowedOrigins.includes(origin)) {
        console.log("🟢 CORS permitido para:", origin);
        return callback(null, true);
      }
      console.log("🔴 CORS bloqueado para:", origin);
      return callback(new Error("CORS no permitido"));
    },
    credentials: true,
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  })
);

// --------------------------------------
// 4. Rutas
// --------------------------------------
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK", message: "API funcionando 🚀" });
});

app.use("/api/products", productRoutes);

// --------------------------------------
// 5. Ruta 404
// --------------------------------------
app.use((req, res) => {
  res.status(404).json({ message: "Ruta no encontrada." });
});

// --------------------------------------
// 6. Iniciar servidor
// --------------------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Servidor Express corriendo en el puerto ${PORT}`);
  console.log("🌍 Orígenes permitidos:", allowedOrigins);
});
