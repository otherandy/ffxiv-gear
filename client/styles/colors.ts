import { Character } from '../interfaces';

const characterColors: { [key: string]: string } = {
  Tank: 'blue',
  Healer: 'green',
  DPS: 'red',
};

export const characterColor = (character: Character): string => {
  return characterColors[character.role] ?? 'gray';
};

const needColors: { [key: string]: string } = {
  Need: 'red.100',
  "Don't need": 'green.50',
  Have: 'green.100',
  'Need more': 'yellow.100',
};

export const needColor = (need: string): string => {
  return needColors[need];
};
