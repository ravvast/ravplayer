import { parseQuery } from '../parseQuery/parseQuery';

export const getLegacySize = () => {
  const value = parseQuery(window.location.href).size;
  return value === 'old' || value === 'fixed';
};
