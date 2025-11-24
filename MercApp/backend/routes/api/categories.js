const express = require('express');
const router = express.Router();
const Category = require('../../models/Category'); // Importar el modelo Category

// @route GET /api/categories
// @desc Obtener todas las categorías
// @access Public (se asume que las categorías son públicas para el catálogo)
router.get('/', async (req, res) => {
  try {
    // Buscar todas las categorías en la base de datos
    const categories = await Category.find();

    // Devolver la lista de categorías en formato JSON
    res.json(categories);
  } catch (err) {
    console.error(err.message);
    // Manejo de error 500 (Error Interno del Servidor)
    res.status(500).json({ msg: 'Error 500: Error del servidor al obtener categorías.' });
  }
});

// En este caso, no se requiere POST, PUT o DELETE para Categorías,
// según el diseño de la API (Tarea 1), pero podrían añadirse aquí.

module.exports = router;