import colors from 'styles/colors';

const POSITIONS = {
  // Классический синий барабан
  9: [
    { delta: 3, angle: 0 },
    { delta: 3.3, angle: 50 },
    { delta: 3.5, angle: 100 },
    { delta: 3.4, angle: 146 },
    { delta: 3.2, angle: 186 },
    { delta: 3, angle: 225 },
    { delta: 2.9, angle: 266 },
    { delta: 2.9, angle: 309 },
  ],
  // Барабан с двойным язычком сверху
  10: [
    {
      delta: 2.7,
      angle: -5,
    },
    {
      delta: 3.1,
      angle: 43,
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
      delta: 4.3,
      angle: 190,
    },
    {
      delta: 3.1,
      angle: 225,
    },
    {
      delta: 2.9,
      angle: 267,
    },
    {
      delta: 2.6,
      angle: 307,
    },
  ],
  // RAV Moon
  14: [
    { delta: 2.7, angle: 340 },
    { delta: 3, angle: 25 },
    { delta: 2.6, angle: 303 },
    { delta: 3.2, angle: 66 },
    { delta: 2.7, angle: 260 },
    { delta: 3.5, angle: 120 },
    { delta: 3.1, angle: 220 },
    { delta: 3.5, angle: 170 },
  ],
  // Anima
  16: [
    { delta: 5.5, angle: 100 }, // D3
    { delta: 2.75, angle: 195 }, // A4
    { delta: 2.7, angle: 230 }, // E4
    { delta: 2.5, angle: 270 }, // C4
    { delta: 2.4, angle: 315 }, // A3
    { delta: 2.4, angle: 355 }, // E3
    { delta: 2.6, angle: 45 }, // G3
    { delta: 2.8, angle: 85 }, // B3
    { delta: 2.9, angle: 125 }, // D4
    { delta: 2.85, angle: 160 }, // G4
    { delta: 5.8, angle: 160 }, // C3
    { delta: 5, angle: 225 }, // A2
    { delta: 6, angle: 35 }, // G2
    { delta: 4.5, angle: 290 }, // F2
  ],
};

export const getNotePositions = ({ type, notes }) => {
  const currentDrumPositions = POSITIONS[type];
  const isAnima = String(type) === '16';

  return notes.map((note, index) => ({
    ...note,
    color: colors.buttons.yellow,
    ...(isAnima && { labelColor: 'transparent' }),
    ...currentDrumPositions[index],
  }));
};
