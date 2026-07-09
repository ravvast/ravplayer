import drums from 'shared/assets/drums';
import { parseQuery } from '../parseQuery/parseQuery';

export const getDrumId = () => {
  const number = Number(parseQuery(window.location.href).id);
  const maxId = drums.length - 1;

  if (!Number.isNaN(number) && number >= 0 && number <= maxId) {
    return number;
  }
  return 0;
};
