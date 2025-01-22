import express from 'express';
import Product from '../models/product.js';

const router = express.Router();

// Search products by name
router.get('/search', async (req, res) => {
    try {
      const { search = '', page = 1, limit = 10 } = req.query;
        
      const query = search
        ? { adname: { $regex: search, $options: 'i' } } // Case-insensitive regex search
        : {};
  
      const products = await Product.find(query)
        .sort({ createdAt: -1 }) // Sort by creation time (descending)
        .skip((page - 1) * limit) // Skip items for pagination
        .limit(parseInt(limit)); // Limit the number of results
  
      const totalProducts = await Product.countDocuments(query); // Count matching products
  
      res.json({
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        products,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

// Get all products (sorted by creation time)
router.get('/', async (req, res) => {
    try {
      const { page = 1, limit = 10 } = req.query; // Default values: page 1, 10 items per page
  
      const products = await Product.find()
        .sort({ createdAt: -1 }) // Sort by creation time (descending)
        .skip((page - 1) * limit) // Skip items for previous pages
        .limit(parseInt(limit)); // Limit the number of items
  
      const totalProducts = await Product.countDocuments(); // Get total count of products
  
      res.json({
        currentPage: parseInt(page),
        totalPages: Math.ceil(totalProducts / limit),
        totalProducts,
        products,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//  Add a new product api
router.post('/', async (req, res) => {
  try {
    const { adname, category, description, price, imageUrl } = req.body;
    const product = new Product({ adname, category, description, price, imageUrl });
    const savedProduct = await product.save();
    res.status(201).json(savedProduct);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a product api
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id); 
    res.json({ message: 'Product deleted' });
  } catch (err) {
    res.status(500).json({ message:err.message });
  }
});

export default router;
