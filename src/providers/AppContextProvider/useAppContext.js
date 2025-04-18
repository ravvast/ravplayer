import { useContext } from 'react';
import { AppContext } from './AppContextProvider';

export const useAppContext = () => {
  const {
    language,
    selectedDrum,
    setSelectedDrum,
    audioBuffer,
    setAudioBuffer,
    isDemoPlaying,
    setIsDemoPlaying,
    isSticksMode,
    setIsSticksMode,
  } = useContext(AppContext);

  return {
    language,
    selectedDrum,
    setSelectedDrum,
    audioBuffer,
    setAudioBuffer,
    isDemoPlaying,
    setIsDemoPlaying,
    isSticksMode,
    setIsSticksMode,
  };
};
