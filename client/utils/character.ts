import { Character } from '../interfaces';

const colors: { [key: string]: string } = {
  Tank: 'blue',
  Healer: 'green',
  DPS: 'red',
};

export const getColorScheme = (character: Character): string => {
  return colors[character.role] ?? 'gray';
};
