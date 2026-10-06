import { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState<string>('Loading...');

  useEffect(() => {
    // Fetching data from your Node.js backend
    fetch('http://localhost:5000/api/inventory')
      .then((response) => response.json())
      .then((data) => setMessage(data.message))
      .catch((error) => {
        console.error('Error fetching data:', error);
        setMessage('Failed to connect to backend.');
      });
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>NIMI Artist Alley Inventory</h1>
      <div style={{ marginTop: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <p>Backend Status: <strong>{message}</strong></p>
      </div>
    </div>
  );
}

export default App;