// backend/controllers/productController.js

const Product = require('../models/Product');
const Category = require('../models/Category');

// 1. OBTENER TODOS LOS PRODUCTOS (GET /api/products)
// Tarea 4/6: Necesaria para cargar el catálogo.
exports.getAllProducts = async (req, res) => {
    try {
        // Usar .populate('categoryId') para incluir el nombre de la categoría en el JSON de respuesta.
        const products = await Product.find().populate('categoryId'); 
        res.json(products);
    } catch (error) {
        // Manejar Error 500: Error interno del servidor
        res.status(500).json({ error: 'Error del servidor al obtener productos.', details: error.message });
    }
};

// 2. OBTENER PRODUCTO POR ID (GET /api/products/:id)
// Tarea 8: Necesaria para la vista ProductDetail.vue.
exports.getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categoryId');
        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado.' });
        }
        res.json(product);
    } catch (error) {
        // Manejar IDs inválidos de Mongoose
        if (error.kind === 'ObjectId') {
             return res.status(400).json({ msg: 'ID de producto inválido.' });
        }
        res.status(500).json({ error: 'Error del servidor al obtener el producto.' });
    }
};

// 3. CREAR NUEVO PRODUCTO (POST /api/products)
// Tarea 9: Maneja la inserción desde NewProductView.vue.
exports.createProduct = async (req, res) => {
    // Los datos se obtienen de req.body
    const { name, description, price, imageUrl, categoryId, stock } = req.body;

    try {
        // 💡 Verificación de Categoría: Asegurar que el ID proporcionado existe
        const categoryExists = await Category.findById(categoryId);
        if (!categoryExists) {
            return res.status(400).json({ msg: 'ID de categoría no válido.' });
        }

        const newProduct = new Product({
            name, description, price, imageUrl, categoryId, stock
        });

        const product = await newProduct.save();
        // Devuelve el producto recién creado con código 201 (Created)
        res.status(201).json(product); 
    } catch (error) {
        // Manejar errores de validación (campos requeridos, tipos)
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: 'Error de validación: Verifique los campos requeridos.', details: error.message });
        }
        res.status(500).json({ error: 'Error del servidor al crear el producto.' });
    }
};


// 4. ACTUALIZAR PRODUCTO POR ID (PUT/PATCH /api/products/:id)
// Tarea 9: Permite la edición desde NewProductView.vue (en modo edición).
exports.updateProduct = async (req, res) => {
    const { categoryId } = req.body;
    
    try {
        // 💡 Verificación de Categoría: Si se intenta cambiar la categoría, verificar que exista
        if (categoryId) {
            const categoryExists = await Category.findById(categoryId);
            if (!categoryExists) {
                return res.status(400).json({ msg: 'ID de categoría no válido.' });
            }
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id, 
            req.body, // Actualiza con todos los datos enviados en el body
            { 
                new: true, // Devuelve el documento actualizado
                runValidators: true // Ejecuta las validaciones del esquema (name: required, price: min, etc.)
            } 
        ).populate('categoryId');

        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado para actualizar.' });
        }

        res.json(product);
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'ID de producto inválido.' });
        }
        if (error.name === 'ValidationError') {
            return res.status(400).json({ msg: 'Error de validación: Verifique los campos.' });
        }
        res.status(500).json({ error: 'Error del servidor al actualizar el producto.' });
    }
};


// 5. ELIMINAR PRODUCTO POR ID (DELETE /api/products/:id)
// Tarea 9: Permite eliminar el producto desde la interfaz de edición o detalle.
exports.deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ msg: 'Producto no encontrado para eliminar.' });
        }

        // Devolver un mensaje de éxito simple (código 200 OK)
        res.json({ msg: 'Producto eliminado con éxito.' });
    } catch (error) {
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ msg: 'ID de producto inválido.' });
        }
        res.status(500).json({ error: 'Error del servidor al intentar eliminar el producto.' });
    }
};