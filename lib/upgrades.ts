// lib/upgrades.ts
export interface Upgrade {
  id: string;
  name: string;
  baseCost: number; // Rename to baseCost for clarity
  increment: number;
  costMultiplier?: number;
  pollution: number;
}

export const upgrades: Upgrade[] = [
  {
    id: 'auto-clicker',
    name: 'Auto-Clicker',
    baseCost: 10,
    increment: 1,
    costMultiplier: 1.15,
    pollution: 0.2,
  },
  // Add more upgrades here
];
