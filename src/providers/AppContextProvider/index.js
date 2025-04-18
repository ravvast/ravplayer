import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import { getInitialLanguage } from 'utils/getInitialLanguage';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ language: getInitialLanguage() }}>
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.element,
};
