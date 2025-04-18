import { useEffect, useRef, useState } from 'react';
import { useAppContext } from 'providers/AppContextProvider';
import { audioContext } from '../../audioContext/audioContext';

export const useAudioPlayer = () => {
  const { audioBuffer, isDemoPlaying, setIsDemoPlaying } = useAppContext();
  const [currentDemoSource, setCurrentDemoSource] = useState(null);
  const [isAudioContextReady, setIsAudioContextReady] = useState(false);
  const pendingSoundRef = useRef(null);
  const isInitialized = useRef(false);

  const stopSoundSource = source => {
    if (!source) return;
    try {
      /* eslint-disable no-param-reassign */
      source.onended = null;
      source.stop();
      source.disconnect();
    } catch (e) {
      console.warn('Stop error:', e);
    }
  };

  const playSoundInternal = (key, onEnded) => {
    const buffer = audioBuffer[key];
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

  const initializeAudio = (soundKey, onEnded) => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    const init = () => {
      setIsAudioContextReady(true);
      if (soundKey) {
        const source = playSoundInternal(soundKey, onEnded);
        if (soundKey === 'DEMO') {
          setCurrentDemoSource(source);
          setIsDemoPlaying(true);
        }
      }
    };

    if (audioContext.state === 'suspended') {
      audioContext.resume().then(init).catch(console.error);
    } else {
      init();
    }
  };

  const playSound = (key, onEnded) => {
    if (!isAudioContextReady) {
      pendingSoundRef.current = { key, onEnded };
      initializeAudio(key, onEnded);
      return undefined;
    }
    return playSoundInternal(key, onEnded);
  };

  const toggleDemo = () => {
    // Останавливаем текущее демо, если играет
    if (isDemoPlaying) {
      stopSoundSource(currentDemoSource);
      setCurrentDemoSource(null);
      setIsDemoPlaying(false);
      return;
    }

    // Если контекст не готов, инициализируем с DEMO
    if (!isAudioContextReady) {
      pendingSoundRef.current = { key: 'DEMO' };
      initializeAudio('DEMO');
      return;
    }

    // Запускаем демо
    const source = playSoundInternal('DEMO');
    setCurrentDemoSource(source);
    setIsDemoPlaying(true);
  };

  useEffect(() => {
    const handleClick = () => {
      if (!isInitialized.current && pendingSoundRef.current) {
        const { key, onEnded } = pendingSoundRef.current;
        initializeAudio(key, onEnded);
      }
    };

    window.addEventListener('click', handleClick, { once: true });
    return () => window.removeEventListener('click', handleClick);
  }, []);

  useEffect(
    () => () => {
      stopSoundSource(currentDemoSource);
    },
    [currentDemoSource],
  );

  return { playSound, toggleDemo, isDemoPlaying };
};
