import { parseQuery } from '../parseQuery/parseQuery';

const DRUMS_AMOUNT = 36;

export const getDrumId = () => {
  const number = parseQuery(window.location.href).id;

  if (number >= 0 && number <= DRUMS_AMOUNT) {
    return number;
  }
  return 0;
};
