const colors: { [key: string]: string } = {
  Need: 'red.100',
  "Don't need": 'green.50',
  Have: 'green.100',
  'Need more': 'yellow.100',
};

export const getColor = (need: string): string => {
  return colors[need];
};
