const POSITIONS = {
  // Классический синий барабан
  9: [
    { delta: 2.8, angle: -6 },
    { delta: 3.1, angle: 45 },
    { delta: 3.3, angle: 95 },
    { delta: 3.4, angle: 146 },
    { delta: 3.2, angle: 186 },
    { delta: 3, angle: 225 },
    { delta: 2.7, angle: 266 },
    { delta: 2.7, angle: 309 },
  ],
};

export const getNotePositions = ({ type, notes }) => {
  const currentDrumPositions = POSITIONS[type];

  return notes.map((note, index) => ({ ...note, ...currentDrumPositions[index] }));
};
