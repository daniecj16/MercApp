const Product = require('../models/Product');
const Category = require('../models/Category'); // Necesario para verificar existencia
const fs = require('fs'); // Para manejar archivos (eliminar imagen al borrar producto)

// Función auxiliar para validación mínima
const validateProduct = async (req, res, next) => {
    const { name, price, categoryId, stock } = req.body;

    // 1. Campos obligatorios
    if (!name || !price || !categoryId || stock === undefined) {
        return res.status(400).json({ msg: 'Faltan campos obligatorios: name, price, categoryId, stock.' });
    }

    // 2. Tipos y Rangos
    if (typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ msg: 'El nombre es inválido.' });
    }
    if (isNaN(price) || price <= 0) {
        return res.status(400).json({ msg: 'El precio debe ser un número mayor que 0.' });
    }
    if (isNaN(stock) || stock < 0) {
        return res.status(400).json({ msg: 'El stock debe ser un número mayor o igual a 0.' });
    }

    // 3. Validación de ID de Categoría (existencia en DB)
    try {
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(400).json({ msg: 'El categoryId proporcionado no existe.' });
        }
    } catch (err) {
        return res.status(400).json({ msg: 'El categoryId es inválido.' });
    }
    
    // Si todo es válido, continúa
    next();
};


// @route GET /api/products
// @desc Obtener todos los productos y buscar por nombre/descripción
exports.getProducts = async (req, res) => {
    try {
        const { search } = req.query;
        let filter = {};

        // Implementación de búsqueda para la Tarea 6
        if (search) {
            const regex = new RegExp(search, 'i'); // 'i' para case-insensitive
            filter.$or = [
                { name: regex },
                { description: regex }
            ];
        }

        const products = await Product.find(filter).populate('categoryId', 'name');
        res.json(products);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Error 500: Error del servidor al obtener productos.' });
    }
};

// @route GET /api/products/:id
// @desc Obtener un producto por ID
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categoryId', 'name');

        if (!product) {
            return res.status(404).json({ msg: 'Error 404: Producto no encontrado.' });
        }
        res.json(product);
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectId') {
            return res.status(404).json({ msg: 'Error 404: ID de producto inválido o no encontrado.' });
        }
        res.status(500).json({ msg: 'Error 500: Error del servidor.' });
    }
};

// @route POST /api/products
// @desc Crear un nuevo producto (con validación)
exports.createProduct = [
    validateProduct, // Usar el middleware de validación
    async (req, res) => {
        try {
            const { name, price, description, categoryId, stock } = req.body;
            
            // Si hay un archivo cargado (multer), usar su ruta; sino, usar una por defecto o ninguna.
            const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl || '/uploads/default.png';

            const newProduct = new Product({
                name,
                price,
                description,
                categoryId,
                stock,
                imageUrl
            });

            const product = await newProduct.save();
            res.status(201).json(product);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Error 500: Error al guardar el producto.' });
        }
    }
];

// @route PUT /api/products/:id (o PATCH)
// @desc Actualizar un producto existente (con validación)
exports.updateProduct = [
    validateProduct, // Usar el middleware de validación
    async (req, res) => {
        try {
            const updateFields = { ...req.body };

            // Si se sube una nueva imagen, actualizar la URL
            if (req.file) {
                updateFields.imageUrl = `/uploads/${req.file.filename}`;
            }

            const product = await Product.findByIdAndUpdate(
                req.params.id,
                { $set: updateFields },
                { new: true } // Devolver el documento actualizado
            );

            if (!product) {
                return res.status(404).json({ msg: 'Error 404: Producto no encontrado para actualizar.' });
            }

            res.json(product);
        } catch (err) {
            console.error(err.message);
            res.status(500).json({ msg: 'Error 500: Error al actualizar el producto.' });
        }
    }
];

// @route DELETE /api/products/:id
// @desc Eliminar un producto
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Error 404: Producto no encontrado para eliminar.' });
        }

        // Opcional: Eliminar el archivo de imagen asociado del sistema de archivos
        if (product.imageUrl && product.imageUrl.startsWith('/uploads/')) {
            const filePath = `backend/${product.imageUrl}`;
            fs.unlink(filePath, (err) => {
                if (err) console.error(`Error al eliminar el archivo ${filePath}: ${err.message}`);
            });
        }
        
        res.json({ msg: 'Producto eliminado correctamente.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Error 500: Error al eliminar el producto.' });
    }
};