import { Character } from '../interfaces';

const tanks = ['WAR', 'PLD', 'DRK', 'GNB'];
const healers = ['WHM', 'SCH', 'AST', 'SGE'];
const dps = [
  'MNK',
  'DRG',
  'NIN',
  'SAM',
  'RPR',
  'BRD',
  'MCH',
  'DNC',
  'BLM',
  'SMN',
  'RDM',
  'BLU',
];

const colors: { [key: string]: string } = {
  Tank: 'blue',
  Healer: 'green',
  DPS: 'red',
  Unknown: 'gray',
};

export const isTank = (character: Character): boolean => {
  return tanks.includes(character.job);
};

export const isHealer = (character: Character): boolean => {
  return healers.includes(character.job);
};

export const isDPS = (character: Character): boolean => {
  return dps.includes(character.job);
};

export const getRole = (character: Character): string => {
  if (isTank(character)) {
    return 'Tank';
  } else if (isHealer(character)) {
    return 'Healer';
  } else if (isDPS(character)) {
    return 'DPS';
  }
  return 'Unknown';
};

export const getColorScheme = (character: Character): string => {
  return colors[getRole(character)];
};
