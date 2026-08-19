import React, { createContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrumId } from 'shared/libs/getDrumId/getDrumId';
import { getInitialLanguage } from 'shared/libs/getInitialLanguage/getInitialLanguage';
import drums from 'shared/assets/drums';
import { getBackgroundMusicTracksForDrum } from 'shared/assets/backgroundMusic';
import { karaokeSequences } from 'shared/assets/karaokeSequences';

export const AppContext = createContext({});

export const AppContextProvider = ({ children }) => {
  const [selectedDrum, setSelectedDrum] = useState(drums[getDrumId()]);
  const [audioBuffer, setAudioBuffer] = useState({});
  const [isDemoPlaying, setIsDemoPlaying] = useState(false);
  const [isStickMode, setIsStickMode] = useState(false);
  const [isEffectsMode, setIsEffectsMode] = useState(false);
  const [currentDemoSound, setCurrentDemoSound] = useState(null);
  const [selectedBackgroundMusicTrack, setSelectedBackgroundMusicTrack] =
    useState(getBackgroundMusicTracksForDrum(selectedDrum.key)[0] || null);
  const [isBackgroundMusicPlaying, setIsBackgroundMusicPlaying] =
    useState(false);
  const [selectedKaraokeSequence, setSelectedKaraokeSequence] = useState(
    karaokeSequences[0],
  );
  const [isKaraokePlaying, setIsKaraokePlaying] = useState(false);

  useEffect(() => {
    if (!selectedDrum.hasEffects) {
      setIsEffectsMode(false);
    }

    const tracks = getBackgroundMusicTracksForDrum(selectedDrum.key);
    setSelectedBackgroundMusicTrack(tracks[0] || null);
    if (tracks.length === 0) {
      setIsBackgroundMusicPlaying(false);
    }

    if (!selectedDrum.karaokeChords) {
      setIsKaraokePlaying(false);
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
        setSelectedBackgroundMusicTrack,
        isBackgroundMusicPlaying,
        setIsBackgroundMusicPlaying,
        selectedKaraokeSequence,
        setSelectedKaraokeSequence,
        isKaraokePlaying,
        setIsKaraokePlaying,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppContextProvider.propTypes = {
  children: PropTypes.element,
};
