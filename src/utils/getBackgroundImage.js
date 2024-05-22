import Drum from 'assets/drum.svg';
import Moon from 'assets/moon.svg';
import Pan from 'assets/pan.svg';
import Mystic from 'assets/mystic.svg';


export const getBackgroundImage = ({ isPan, isMoon, isMystic }) => {
  switch (true) {
    case isPan:
      return Pan;
    case isMoon:
      return Moon;
    case isMystic:
      return Mystic;
    default:
      return Drum;
  }
};
