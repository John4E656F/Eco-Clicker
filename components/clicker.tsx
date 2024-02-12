import React, { useState, useEffect } from 'react';
import { Buildings, buildings } from '../lib/buildings'; // Adjust the path as necessary

export const Clicker: React.FC = () => {
  const [count, setCount] = useState(0);
  const [pollution, setPollution] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [purchasedBuildings, setPurchasedBuildings] = useState<{ [key: string]: number }>({});

  const handleClick = () => {
    if (!gameOver) {
      setCount(count + 1);
    }
  };

  const calculateCost = (buildings: Buildings): number => {
    const numberOfPurchases = purchasedBuildings[buildings.id] || 0;
    return Math.ceil(buildings.baseCost * Math.pow(1.15, numberOfPurchases));
  };

  const buyBuildings = (buildings: Buildings) => {
    const cost = calculateCost(buildings);
    if (count >= cost && !gameOver) {
      setCount(count - cost);
      setPurchasedBuildings((prevBuildings) => ({
        ...prevBuildings,
        [buildings.id]: (prevBuildings[buildings.id] || 0) + 1,
      }));

      setPollution((prevPollution) => prevPollution + buildings.pollution);
    }
  };

  // Effect for auto-clickers and generating pollution
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        Object.keys(purchasedBuildings).forEach((buildingsId) => {
          const building = buildings.find((u) => u.id === buildingsId);
          if (building) {
            setCount((prevCount) => prevCount + building.energy * (purchasedBuildings[buildingsId] || 0));
            // Generate pollution for each active auto-clicker every second
            setPollution((prevPollution) => prevPollution + building.pollution * (purchasedBuildings[buildingsId] || 0));
          }
        });
      }
    }, 1000); // every second

    return () => clearInterval(interval);
  }, [purchasedBuildings, gameOver]);

  // Check for game over condition based on pollution
  useEffect(() => {
    if (pollution >= 1000000) {
      // 1 million pollution leads to game over
      setGameOver(true);
    }
  }, [pollution]);

  return (
    <div>
      {gameOver ? (
        <h2>Game Over! You&apos;ve generated too much pollution.</h2>
      ) : (
        <>
          <button onClick={handleClick}>Click Me!</button>
          <p>Energy generated: {count}</p>
          <p>Pollution generated: {pollution.toFixed(0)}</p>
          <br />
          <div>
            <h2>Shop</h2>
            {buildings.map((buildings) => (
              <button key={buildings.id} onClick={() => buyBuildings(buildings)}>
                Buy {buildings.name} for {calculateCost(buildings)} cookies
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
