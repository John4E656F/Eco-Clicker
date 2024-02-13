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

const defaultIndustrialMultiplier = 1.15;
const defaultEcoMultiplier = 1.2;

export const industrialBuildings: Buildings[] = [
  {
    id: 'coal-power-plant',
    name: 'Coal Power Plant',
    type: 'industrial',
    baseCost: 10,
    energy: 0.2,
    costMultiplier: defaultIndustrialMultiplier,
    pollution: 0.5,
  },
  {
    id: 'natural-gas-plant',
    name: 'Natural Gas Plant',
    type: 'industrial',
    baseCost: 80,
    energy: 0.4,
    costMultiplier: defaultIndustrialMultiplier,
    pollution: 0.2,
  },
  {
    id: 'oil-fired-plant',
    name: 'Oil-Fired Plant',
    type: 'industrial',
    baseCost: 400,
    energy: 0.8,
    costMultiplier: defaultIndustrialMultiplier,
    pollution: 0.6,
  },
  {
    id: 'diesel-generator-building',
    name: 'Diesel Generator Building',
    type: 'industrial',
    baseCost: 650,
    energy: 1.5,
    costMultiplier: defaultIndustrialMultiplier,
    pollution: 0.8,
  },
  {
    id: 'incinerator',
    name: 'Incinerator',
    type: 'industrial',
    baseCost: 800,
    energy: 1,
    costMultiplier: defaultIndustrialMultiplier,
    pollution: 1.5,
  },
];

export const ecoBuildings: Buildings[] = [
  {
    id: 'solar-farm',
    name: 'Solar Farm',
    type: 'sustainable',
    baseCost: 50,
    energy: 0.1,
    costMultiplier: defaultEcoMultiplier,
    pollution: 0,
    pollutionReduction: 0.1,
  },
  {
    id: 'wind-turbine',
    name: 'Wind Turbine',
    type: 'sustainable',
    baseCost: 100,
    energy: 0.2,
    costMultiplier: defaultEcoMultiplier,
    pollution: 0,
    pollutionReduction: 0.2,
  },
  {
    id: 'hydroelectric-plant',
    name: 'Hydroelectric Plant',
    type: 'sustainable',
    baseCost: 500,
    energy: 0.5,
    costMultiplier: defaultEcoMultiplier,
    pollution: 0,
    pollutionReduction: 0.5,
  },
];
