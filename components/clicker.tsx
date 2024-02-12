import React, { useState, useEffect } from 'react';
import { Buildings, buildings } from '../lib/buildings';

export const Clicker: React.FC = () => {
  const [energy, setEnergy] = useState(0);
  const [pollution, setPollution] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [purchasedBuildings, setPurchasedBuildings] = useState<{ [key: string]: number }>({});

  const handleClick = () => {
    if (!gameOver) {
      setEnergy(energy + 1); // Assuming each click generates 1 unit of energy for simplicity
    }
  };

  const calculateCost = (building: Buildings): number => {
    const numberOfPurchases = purchasedBuildings[building.id] || 0;
    return Math.ceil(building.baseCost * Math.pow(building.costMultiplier || 1.15, numberOfPurchases));
  };

  const buyBuilding = (building: Buildings) => {
    const cost = calculateCost(building);
    if (energy >= cost && !gameOver) {
      setEnergy(energy - cost);
      setPurchasedBuildings((prevBuildings) => ({
        ...prevBuildings,
        [building.id]: (prevBuildings[building.id] || 0) + 1,
      }));

      // For industrial buildings, increase pollution immediately upon purchase
      if (building.type === 'industrial') {
        setPollution((prevPollution) => prevPollution + building.pollution);
      }
    }
  };

  // Effect for buildings: energy generation and pollution handling
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        let totalPollutionReduction = 0;

        Object.keys(purchasedBuildings).forEach((buildingId) => {
          const building = buildings.find((b) => b.id === buildingId);
          if (building) {
            // Increase energy based on the building's energy output
            setEnergy((prevEnergy) => prevEnergy + building.energy * (purchasedBuildings[buildingId] || 0));

            // Handle pollution generation or reduction
            if (building.type === 'industrial') {
              setPollution((prevPollution) => prevPollution + building.pollution * (purchasedBuildings[buildingId] || 0));
            } else if (building.pollutionReduction) {
              totalPollutionReduction += building.pollutionReduction * (purchasedBuildings[buildingId] || 0);
            }
          }
        });

        // Apply total pollution reduction from all sustainable buildings
        setPollution((prevPollution) => Math.max(0, prevPollution - totalPollutionReduction));
      }
    }, 1000); // every second

    return () => clearInterval(interval);
  }, [purchasedBuildings, gameOver]);

  // Check for game over condition based on pollution
  useEffect(() => {
    if (pollution >= 1000000) {
      setGameOver(true);
    }
  }, [pollution]);

  return (
    <div>
      {gameOver ? (
        <h2>Game Over! You&apos;ve generated too much pollution.</h2>
      ) : (
        <>
          <button onClick={handleClick}>Generate Energy</button>
          <p>Energy generated: {energy.toFixed(2)}</p>
          <p>Pollution generated: {pollution.toFixed(2)}</p>
          <br />
          <div>
            <h2>Shop</h2>
            {buildings.map((building) => (
              <button
                key={building.id}
                onClick={() => buyBuilding(building)}
                style={{ display: 'block', margin: '10px 0' }} // Added style here
              >
                Buy {building.name} for {calculateCost(building)} energy units
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
