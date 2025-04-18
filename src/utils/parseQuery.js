import qs from 'query-string';

export const parseQuery = asPath =>
  qs.parse(qs.extract(asPath), {
    arrayFormat: 'comma',
  });
