import React, { useState, useEffect } from 'react';
import { Buildings, industrialBuildings, ecoBuildings } from '../lib/buildings'; // Ensure correct import paths

export const Clicker: React.FC = () => {
  const [energy, setEnergy] = useState(0);
  const [pollution, setPollution] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [purchasedBuildings, setPurchasedBuildings] = useState<{ [key: string]: number }>({});

  const handleClick = () => {
    if (!gameOver) {
      setEnergy(energy + 1);
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

      if (building.type === 'industrial') {
        setPollution((prevPollution) => prevPollution + building.pollution);
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        let totalPollutionReduction = 0;

        Object.keys(purchasedBuildings).forEach((buildingId) => {
          const building = [...industrialBuildings, ...ecoBuildings].find((b) => b.id === buildingId);
          if (building) {
            setEnergy((prevEnergy) => prevEnergy + building.energy * (purchasedBuildings[buildingId] || 0));

            if (building.type === 'industrial') {
              setPollution((prevPollution) => prevPollution + building.pollution * (purchasedBuildings[buildingId] || 0));
            } else if (building.pollutionReduction) {
              totalPollutionReduction += building.pollutionReduction * (purchasedBuildings[buildingId] || 0);
            }
          }
        });

        setPollution((prevPollution) => Math.max(0, prevPollution - totalPollutionReduction));
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [purchasedBuildings, gameOver]);

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
          <p>Energy generated: {energy.toFixed(0)}</p>
          <p>Pollution generated: {pollution.toFixed(0)}</p>
          <br />
          <div>
            <h2>Industrial Buildings</h2>
            {industrialBuildings.map((building) => (
              <button key={building.id} onClick={() => buyBuilding(building)} style={{ display: 'block', margin: '10px 0' }}>
                Buy {building.name} for {calculateCost(building)} energy units
              </button>
            ))}
            <h2>Eco Buildings</h2>
            {ecoBuildings.map((building) => (
              <button key={building.id} onClick={() => buyBuilding(building)} style={{ display: 'block', margin: '10px 0' }}>
                Buy {building.name} for {calculateCost(building)} energy units
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
