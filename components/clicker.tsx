import React, { useState, useEffect } from 'react';
import { Buildings, industrialBuildings, ecoBuildings } from '../lib/buildings';

export const Clicker: React.FC = () => {
  const [energy, setEnergy] = useState(10000); //edit this number to change the base energy
  const [pollution, setPollution] = useState(0);
  const [pollutionLimit, setPollutionLimit] = useState(1000); //Edit this number to change the pollution limit
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
      const addLimit = building.addPollutionLimit;
      if (typeof addLimit === 'number') {
        setPollutionLimit((prevLimit) => prevLimit + addLimit);
      }
    }
  };

  useEffect(() => {
    if (pollution >= pollutionLimit) {
      setGameOver(true);
    }
  }, [pollution, pollutionLimit]);

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

  return (
    <div className='flex flex-col gap-5'>
      {gameOver ? (
        <h2>Game Over! You&apos;ve generated too much pollution.</h2>
      ) : (
        <>
          <div className='flex flex-col justify-center'>
            <button onClick={handleClick} className='bg-slate-500 rounded-full hover:bg-slate-400 p-2'>
              Generate Energy
            </button>
            <p>Energy generated: {energy.toFixed(0)}</p>
            <p>
              Pollution generated: {pollution.toFixed(0)} - Pollution Limit: {pollutionLimit}
            </p>
          </div>
          <div className='flex flex-row gap-5'>
            <div>
              <h2>Industrial Buildings</h2>
              {industrialBuildings.map((building) => (
                <button key={building.id} onClick={() => buyBuilding(building)} style={{ display: 'block', margin: '10px 0' }}>
                  Buy {building.name} for {calculateCost(building)} energy
                </button>
              ))}
            </div>
            <div>
              <h2>Eco Buildings</h2>
              {ecoBuildings.map((building) => (
                <button key={building.id} onClick={() => buyBuilding(building)} style={{ display: 'block', margin: '10px 0' }}>
                  Buy {building.name} for {calculateCost(building)} energy
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
