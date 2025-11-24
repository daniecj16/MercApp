const app = require('./app');
require('dotenv').config();

// Se asume PORT=3000 en tu archivo .env
const PORT = process.env.PORT || 5000; 

app.listen(PORT, () => console.log(`🚀 Servidor backend corriendo en http://localhost:${PORT}`));