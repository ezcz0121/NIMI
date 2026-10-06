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