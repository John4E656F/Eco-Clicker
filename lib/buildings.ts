// lib/upgrades.ts
export interface Buildings {
  id: string;
  name: string;
  baseCost: number; // Rename to baseCost for clarity
  energy: number;
  costMultiplier?: number;
  pollution: number;
}

export const buildings: Buildings[] = [
  {
    id: 'auto-clicker',
    name: 'Auto-Clicker',
    baseCost: 10,
    energy: 1,
    costMultiplier: 1.15,
    pollution: 0.2,
  },
];
