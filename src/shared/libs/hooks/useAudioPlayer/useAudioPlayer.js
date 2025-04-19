import { useContext } from 'react';
import { AppContext } from 'providers/AppContextProvider';

export const useAudioPlayer = () => {
  const {
    audioBuffer,
    isStickMode,
    isDemoPlaying,
    setIsDemoPlaying,
    currentDemoSound,
    setCurrentDemoSound,
  } = useContext(AppContext);

  const getSoundKey = key => {
    if (key === 'DEMO') return key;
    return `${key}${isStickMode ? 'S' : ''}`;
  };

  const playSound = (key, onEnd) => {
    const sound = audioBuffer[getSoundKey(key)];
    if (!sound) return;

    sound.stop(); // Останавливаем предыдущие звуки перед воспроизведением
    sound.play();

    if (onEnd) {
      sound.once('end', onEnd); // Слушаем событие завершения воспроизведения
    }

    if (key === 'DEMO') {
      setCurrentDemoSound(sound);
      setIsDemoPlaying(true);
    }
  };

  const stopSound = sound => {
    if (sound) {
      sound.stop();
    }
  };

  const toggleDemo = () => {
    if (isDemoPlaying) {
      stopSound(currentDemoSound);
      setIsDemoPlaying(false);
      return;
    }

    playSound('DEMO', () => {
      setIsDemoPlaying(false);
      setCurrentDemoSound(null);
    });
  };

  return { playSound, toggleDemo, isDemoPlaying };
};
