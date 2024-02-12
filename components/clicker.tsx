import React, { useState, useEffect } from 'react';
import { Upgrade, upgrades } from '../lib/upgrades'; // Adjust the path as necessary

export const Clicker: React.FC = () => {
  const [count, setCount] = useState(0);
  const [pollution, setPollution] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [purchasedUpgrades, setPurchasedUpgrades] = useState<{ [key: string]: number }>({});

  const handleClick = () => {
    if (!gameOver) {
      setCount(count + 1);
    }
  };

  const calculateCost = (upgrade: Upgrade): number => {
    const numberOfPurchases = purchasedUpgrades[upgrade.id] || 0;
    return Math.ceil(upgrade.baseCost * Math.pow(1.15, numberOfPurchases));
  };

  const buyUpgrade = (upgrade: Upgrade) => {
    const cost = calculateCost(upgrade);
    if (count >= cost && !gameOver) {
      setCount(count - cost);
      setPurchasedUpgrades((prevUpgrades) => ({
        ...prevUpgrades,
        [upgrade.id]: (prevUpgrades[upgrade.id] || 0) + 1,
      }));
      // Increment pollution based on the specific upgrade's pollution rate
      setPollution((prevPollution) => prevPollution + upgrade.pollution);
    }
  };

  // Effect for auto-clickers and generating pollution
  useEffect(() => {
    const interval = setInterval(() => {
      if (!gameOver) {
        Object.keys(purchasedUpgrades).forEach((upgradeId) => {
          const upgrade = upgrades.find((u) => u.id === upgradeId);
          if (upgrade) {
            setCount((prevCount) => prevCount + upgrade.increment * (purchasedUpgrades[upgradeId] || 0));
            // Generate pollution for each active auto-clicker every second
            setPollution((prevPollution) => prevPollution + upgrade.pollution * (purchasedUpgrades[upgradeId] || 0));
          }
        });
      }
    }, 1000); // every second

    return () => clearInterval(interval);
  }, [purchasedUpgrades, gameOver]);

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
            {upgrades.map((upgrade) => (
              <button key={upgrade.id} onClick={() => buyUpgrade(upgrade)}>
                Buy {upgrade.name} for {calculateCost(upgrade)} cookies
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};
