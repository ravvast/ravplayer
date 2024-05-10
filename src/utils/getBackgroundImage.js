import Drum from 'assets/drum.svg';
import Moon from 'assets/moon.svg';
import Pan from 'assets/pan.svg';

export const getBackgroundImage = ({ isPan, isMoon }) => {
  switch (true) {
    case isPan:
      return Pan;
    case isMoon:
      return Moon;
    default:
      return Drum;
  }
};
