// lib/upgrades.ts
export interface Buildings {
  id: string;
  name: string;
  type: 'sustainable' | 'industrial';
  baseCost: number;
  energy: number;
  costMultiplier?: number;
  pollution: number;
  pollutionReduction?: number;
}

const defaultMultiplier = 1.15;

export const buildings: Buildings[] = [
  {
    id: 'solar-farm',
    name: 'Solar Farm',
    type: 'sustainable',
    baseCost: 50,
    energy: 0.1,
    costMultiplier: defaultMultiplier,
    pollution: 0,
    pollutionReduction: 0.1,
  },
  {
    id: 'wind-turbine',
    name: 'Wind Turbine',
    type: 'sustainable',
    baseCost: 100,
    energy: 0.2,
    costMultiplier: defaultMultiplier,
    pollution: 0,
    pollutionReduction: 0.2,
  },
  {
    id: 'hydroelectric-plant',
    name: 'Hydroelectric Plant',
    type: 'sustainable',
    baseCost: 500,
    energy: 0.5,
    costMultiplier: defaultMultiplier,
    pollution: 0,
    pollutionReduction: 0.5,
  },
  {
    id: 'coal-power-plant',
    name: 'Coal Power Plant',
    type: 'industrial',
    baseCost: 10,
    energy: 0.2,
    costMultiplier: defaultMultiplier,
    pollution: 0.3,
  },
];
