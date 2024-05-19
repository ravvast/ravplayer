import colors from 'styles/colors';

const POSITIONS = {
  // Классический синий барабан
  9: [
    { delta: 2.8, angle: -6 },
    { delta: 3.1, angle: 45 },
    { delta: 3.5, angle: 95 },
    { delta: 3.4, angle: 146 },
    { delta: 3.2, angle: 186 },
    { delta: 3, angle: 225 },
    { delta: 2.9, angle: 266 },
    { delta: 2.7, angle: 309 },
  ],
  // Барабан с двойным язычком сверху
  10: [
    {
      delta: 2.8,
      angle: -3,
    },
    {
      delta: 3.2,
      angle: 47,
    },
    {
      delta: 3.5,
      angle: 96,
    },
    {
      delta: 3.5,
      angle: 145,
    },
    {
      delta: 2.8,
      angle: 186,
    },
    {
      delta: 4.6,
      angle: 190,
    },
    {
      delta: 3.1,
      angle: 225,
    },
    {
      delta: 2.9,
      angle: 269,
    },
    {
      delta: 2.6,
      angle: 312,
    },
  ],
};

export const getNotePositions = ({ type, notes }) => {
  const currentDrumPositions = POSITIONS[type];

  return notes.map((note, index) => ({
    ...note,
    color: colors.buttons.yellow,
    ...currentDrumPositions[index],
  }));
};
