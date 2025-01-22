import Product from '../models/productModel.js';

// Get all products with pagination and search
export const getProducts = async (req, res) => {
    try {
        const { page = 1, limit = 10, name = '' } = req.query;
        const searchQuery = name ? { adname: { $regex: name, $options: 'i' } } : {};
        
        const products = await Product.find(searchQuery)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        const totalProducts = await Product.countDocuments(searchQuery);

        res.json({
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalProducts / limit),
            totalProducts,
            products,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Add a new product
export const addProduct = async (req, res) => {
    try {
        const { adname, category, description, price, imageUrl } = req.body;
        const product = new Product({ adname, category, description, price, imageUrl });
        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Delete a product
export const deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
