import React, { useState } from 'react';

function PriceRangeFilter({ onFilterChange }) {
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleFilterChange = () => {
    onFilterChange(minPrice, maxPrice);
  };

  const inputStyle = {
    width: '120px',
    height: '30px',
    boxShadow: '0 4px 9px -4px #fbfbfb',
    padding: '10px',
    border: '1px solid gray',
    borderRadius: '15px',
    textAlign: 'center'
  }

  const buttonStyle = {
    width: '70px',
    height: '30px',
    backgroundColor: 'rgb(58 104 120)',
    boxShadow: '0 4px 9px -4px #fbfbfb',
    color: 'white',
    border: '1px solid #f2eaea',
    borderRadius: '10px',
    textAlign: 'center'
  };

  
  return (
    <div>
      <label>Select Price Range:</label>
      &nbsp;
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        style={inputStyle}
      />
      &nbsp;
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        style={inputStyle}
      />
      &nbsp;
      <button style={buttonStyle} onClick={handleFilterChange}>Apply</button>
    </div>
  );
}

export default PriceRangeFilter;
