import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

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

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

