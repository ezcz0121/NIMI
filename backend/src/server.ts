import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import dbPromise from './db'; //

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// MID
app.use(cors());
app.use(express.json());

// TESTING
app.get('/api/inventory', (req, res) => {
  res.json({ message: 'Artist Alley Inventory API is running!' });
});

// <-- 2. This new route tests the SQLite connection
app.get('/api/db-test', async (req, res) => {
  try {
    const db = await dbPromise;
    const result = await db.get('SELECT sqlite_version() AS version');
    res.json({ message: 'SQLite connected successfully!', version: result.version });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Database connection failed' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// --- INVENTORY API ROUTES ---

// 1. GET: Fetch all products from the database
app.get('/api/products', async (req, res) => {
  try {
    const db = await dbPromise;
    // db.all() grabs multiple rows, similar to a SQL ResultSet in Java
    const products = await db.all('SELECT * FROM products');
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch inventory' });
  }
});

// 2. POST: Add a new product to the database
app.post('/api/products', async (req, res) => {
  // We extract the JSON payload sent by the frontend
  const { name, variant, current_stock, par_level, price } = req.body;

  try {
    const db = await dbPromise;
    // The ? marks are parameterized queries, preventing SQL injection attacks
    const result = await db.run(
      'INSERT INTO products (name, variant, current_stock, par_level, price) VALUES (?, ?, ?, ?, ?)',
      [name, variant, current_stock, par_level, price]
    );
    
    // result.lastID returns the primary key of the newly created row
    res.json({ message: 'Product added successfully!', id: result.lastID });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: 'Failed to add product to inventory' });
  }
});

// 4. PUT: Update an existing product's details
app.put('/api/products/:id', async (req, res) => {
  const { id } = req.params; // Grabs the ID from the URL
  // Extracts the new updated values from the request body
  const { name, variant, current_stock, par_level, price } = req.body; 

  try {
    const db = await dbPromise;
    // Overwrites the existing row where the product_id matches
    await db.run(
      'UPDATE products SET name = ?, variant = ?, current_stock = ?, par_level = ?, price = ? WHERE product_id = ?',
      [name, variant, current_stock, par_level, price, id]
    );
    
    res.json({ message: `Product ${id} updated successfully!` });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});