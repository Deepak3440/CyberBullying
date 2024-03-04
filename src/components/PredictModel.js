
import React, { useState } from 'react';
import CardList from './CardList';
import './Card.css';

const PredictModel = () => {
    const [text, setText] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setText(e.target.value);
  };

  const handleSubmit = () => {
    if (!text) {
      setError('Please enter text for classification.');
      setResult('');
      return;
    }

    setError('');

    fetch('http://127.0.0.1:5000/classify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
          setResult('');
        } else {
          setError('');
          setResult(data.result);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setError('An error occurred while processing your request.');
        setResult('');
      });
  };
  return <div>
     <h1>Text Classification</h1>
        <textarea
         className="custom-textarea"
          placeholder="Enter text for classification"
          value={text}
          onChange={handleInputChange}
         
        />
        <br></br>
        <button className='classify-button' onClick={handleSubmit}>Classify</button>

        
        {error && <p className="error">{error}</p>}
        {result && (
          <div>
            <h1>Classification Result:</h1>
            <h2>{result}</h2>
           
          </div>
        )}
         <h2>Card List</h2>
      <CardList />
  </div>;
};

export default PredictModel;