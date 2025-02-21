import React, { useState } from 'react';
import './App.css';

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(input);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        throw new Error("Invalid JSON format. 'data' must be an array.");
      }

      const apiResponse = await fetch('https://your-backend-url/bfhl', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsedInput)
      });

      const data = await apiResponse.json();
      setResponse(data);
      setError('');
    } catch (err) {
      setError(err.message);
      setResponse(null);
    }
  };

  const handleFilterChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter(filter => filter !== value));
    }
  };

  const renderFilteredResponse = () => {
    if (!response) return null;

    const filteredResponse = {};
    if (selectedFilters.includes('numbers')) {
      filteredResponse.numbers = response.numbers;
    }
    if (selectedFilters.includes('alphabets')) {
      filteredResponse.alphabets = response.alphabets;
    }
    if (selectedFilters.includes('highest_alphabet')) {
      filteredResponse.highest_alphabet = response.highest_alphabet;
    }

    return (
      <div>
        {Object.entries(filteredResponse).map(([key, value]) => (
          <p key={key}>{key}: {value.join(', ')}</p>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>ABCD123</h1> {/* Replace with your roll number */}
      <textarea
        placeholder='Enter JSON input e.g., { "data": ["M", "1", "334", "4", "B"] }'
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {response && (
        <div>
          <h3>Multi Filter</h3>
          <label>
            <input
              type="checkbox"
              value="numbers"
              onChange={handleFilterChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="alphabets"
              onChange={handleFilterChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="highest_alphabet"
              onChange={handleFilterChange}
            />
            Highest Alphabet
          </label>

          <h3>Filtered Response</h3>
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;