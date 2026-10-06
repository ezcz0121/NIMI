import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

// This opens the local .db file you just created
const dbPromise = open({
  filename: './nimi_inventory.db',
  driver: sqlite3.Database
});

export default dbPromise;