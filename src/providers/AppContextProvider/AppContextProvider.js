import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrumId } from 'shared/libs/getDrumId/getDrumId';
import { getInitialLanguage } from 'shared/libs/getInitialLanguage/getInitialLanguage';
import drums from 'shared/assets/drums';
import { getBackgroundMusicTrackForDrum } from 'shared/assets/backgroundMusic';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [selectedDrum, setSelectedDrum] = useState(drums[getDrumId()]);
  const [audioBuffer, setAudioBuffer] = useState({});
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [isStickMode, setIsStickMode] = useState(false);
  const [isEffectsMode, setIsEffectsMode] = useState(false);
  const [currentDemoSound, setCurrentDemoSound] = useState(null);
  const [selectedBackgroundMusicTrack, setSelectedBackgroundMusicTrack] =
    useState(getBackgroundMusicTrackForDrum(selectedDrum.key));
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] =
    useState(false);
  const [backgroundMusicVolume, setBackgroundMusicVolume] = useState(0.5);

  useEffect(() => {
    if (!selectedDrum.hasEffects) {
      setIsEffectsMode(false);
    }

    const track = getBackgroundMusicTrackForDrum(selectedDrum.key);
    setSelectedBackgroundMusicTrack(track);
    if (!track) {
      setIsBackgroundMusicPlaying(false);
    }
  }, [selectedDrum]);

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
        isEffectsMode,
        setIsEffectsMode,
        currentDemoSound,
        setCurrentDemoSound,
        selectedBackgroundMusicTrack,
        isBackgroundMusicPlaying,
        setIsBackgroundMusicPlaying,
        backgroundMusicVolume,
        setBackgroundMusicVolume,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.element,
};
