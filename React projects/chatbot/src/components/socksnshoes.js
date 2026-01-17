import React from 'react';
import { useState } from 'react';

function Shop() {
  const [cost, sCost] = useState(22);
  
  const handleSocksPurchase = () => {
    sCost(prevCost => prevCost + 10);
    console.log('Socks purchased! Total cost: ' + (cost + 10));
  };

  const handleShoesPurchase = () => {
    sCost(prevCost => prevCost + 20);
    console.log('Shoes purchased! Total cost: ' + (cost + 20));
  };

  return (
    <div className="App">
      <p>Buy socks for 10</p>
      <button id="socks" onClick={handleSocksPurchase}>Purchase</button>
      <p>Buy shoes for 20</p>
      <button id="shoes" onClick={handleShoesPurchase}>Purchase</button>
      <p>Total cost: {cost}</p>
    </div>
  );
}

export default Shop;
