import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrumId } from 'shared/libs/getDrumId/getDrumId';
import { getInitialLanguage } from 'shared/libs/getInitialLanguage/getInitialLanguage';
import drums from 'shared/assets/drums';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [selectedDrum, setSelectedDrum] = useState(drums[getDrumId()]);
  const [audioBuffer, setAudioBuffer] = useState({});
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [isStickMode, setIsStickMode] = useState(false);

  return (
    <AppContext.Provider
      value={{
        language: getInitialLanguage(),
        selectedDrum,
        setSelectedDrum,
        audioBuffer,
        setAudioBuffer,
        isDemoPlaying,
        setIsDemoPlaying,
        isStickMode,
        setIsStickMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.element,
};
