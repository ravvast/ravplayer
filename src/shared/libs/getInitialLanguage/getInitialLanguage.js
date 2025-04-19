import { parseQuery } from '../parseQuery/parseQuery';

export const getInitialLanguage = () => {
  const languageKey = parseQuery(document.location.href).language;

  if (languageKey === 'ru') return languageKey;

  return 'en';
};
