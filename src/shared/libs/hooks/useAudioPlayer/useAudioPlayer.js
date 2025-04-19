import { useContext, useEffect, useRef, useState } from 'react';
import { AppContext } from 'providers/AppContextProvider';
import { audioContext } from '../../audioContext/audioContext';

export const useAudioPlayer = () => {
  const { audioBuffer, isStickMode, isDemoPlaying, setIsDemoPlaying } =
    useContext(AppContext);
  const [currentDemoSource, setCurrentDemoSource] = useState(null);
  const [isAudioContextReady, setIsAudioContextReady] = useState(false);
  const pendingSoundRef = useRef(null);

  const getSoundKey = key => {
    if (key === 'DEMO') return key;
    return `${key}${isStickMode ? 'S' : ''}`;
  };

  const stopSoundSource = source => {
    if (!source) return;
    try {
      source.onended = null;
      source.stop();
      source.disconnect();
    } catch (e) {
      console.warn('Stop error:', e);
    }
  };

  const playSoundInternal = (key, onEnded) => {
    const buffer = audioBuffer[getSoundKey(key)];
    if (!buffer) return null;

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);

    source.onended = () => {
      if (key === 'DEMO') {
        setCurrentDemoSource(null);
        setIsDemoPlaying(false);
      }
      if (onEnded) onEnded();
    };

    source.start(0);
    return source;
  };

  const playSound = (key, onEnded) => {
    if (!isAudioContextReady) {
      pendingSoundRef.current = { key, onEnded };
      return undefined;
    }

    return playSoundInternal(key, onEnded);
  };

  const toggleDemo = () => {
    if (isDemoPlaying) {
      stopSoundSource(currentDemoSource);
      setCurrentDemoSource(null);
      setIsDemoPlaying(false);
      return;
    }

    if (!isAudioContextReady) {
      pendingSoundRef.current = { key: 'DEMO' };
      return;
    }

    const source = playSoundInternal('DEMO');
    setCurrentDemoSource(source);
    setIsDemoPlaying(true);
  };

  useEffect(() => {
    const unlockAudioContext = () => {
      if (audioContext.state === 'suspended') {
        audioContext
          .resume()
          .then(() => {
            setIsAudioContextReady(true);

            if (pendingSoundRef.current) {
              const { key, onEnded } = pendingSoundRef.current;
              const source = playSoundInternal(key, onEnded);
              if (key === 'DEMO') {
                setCurrentDemoSource(source);
                setIsDemoPlaying(true);
              }
            }
          })
          .catch(err => {
            console.error('Failed to resume audio context:', err);
          });
      } else {
        setIsAudioContextReady(true);

        if (pendingSoundRef.current) {
          const { key, onEnded } = pendingSoundRef.current;
          const source = playSoundInternal(key, onEnded);
          if (key === 'DEMO') {
            setCurrentDemoSource(source);
            setIsDemoPlaying(true);
          }
        }
      }
    };

    window.addEventListener('click', unlockAudioContext, { once: true });
    window.addEventListener('touchstart', unlockAudioContext, { once: true });

    return () => {
      window.removeEventListener('click', unlockAudioContext);
      window.removeEventListener('touchstart', unlockAudioContext);
    };
  }, []);

  useEffect(() => {
    return () => {
      stopSoundSource(currentDemoSource);
    };
  }, [currentDemoSource]);

  return { playSound, toggleDemo, isDemoPlaying };
};
