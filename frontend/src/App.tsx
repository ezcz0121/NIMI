import { useEffect, useState } from 'react';

// Define the exact shape of our SQLite data
interface Product {
  product_id: number;
  name: string;
  variant: string;
  current_stock: number;
  par_level: number;
  price: number;
}

function App() {
  // Set up a state array to hold our products
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Fetch the real merchandise data from your new route
    fetch('http://localhost:5000/api/products')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching inventory:', error));
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <h2>NIMI Artist Alley Inventory</h2>
      
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
        <thead>
          <tr style={{ backgroundColor: '#2c3e50', color: 'white', textAlign: 'left' }}>
            <th style={{ padding: '12px' }}>Item</th>
            <th style={{ padding: '12px' }}>Variant</th>
            <th style={{ padding: '12px' }}>Stock</th>
            <th style={{ padding: '12px' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.product_id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px' }}>{product.name}</td>
              <td style={{ padding: '12px' }}>{product.variant}</td>
              <td style={{ padding: '12px' }}>
                {/* If stock is at or below par level, color it red as a warning! */}
                <span style={{ 
                  color: product.current_stock <= product.par_level ? '#e74c3c' : '#27ae60',
                  fontWeight: 'bold' 
                }}>
                  {product.current_stock}
                </span>
              </td>
              <td style={{ padding: '12px' }}>${product.price.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;