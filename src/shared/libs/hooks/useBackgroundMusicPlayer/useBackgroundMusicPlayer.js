import { useContext, useEffect, useRef } from 'react';
import { Howl } from 'howler';
import { AppContext } from 'providers/AppContextProvider';

const BACKGROUND_MUSIC_VOLUME = 0.75;

export const useBackgroundMusicPlayer = () => {
  const { selectedBackgroundMusicTrack, isBackgroundMusicPlaying } =
    useContext(AppContext);

  const soundRef = useRef(null);

  useEffect(() => {
    if (!selectedBackgroundMusicTrack) return undefined;

    const sound = new Howl({
      src: [selectedBackgroundMusicTrack.src],
      loop: true,
      volume: BACKGROUND_MUSIC_VOLUME,
      html5: true, // avoid decoding the whole (multi-minute) track into memory
    });
    soundRef.current = sound;

    if (isBackgroundMusicPlaying) {
      sound.play();
    }

    return () => {
      sound.unload();
      soundRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedBackgroundMusicTrack]);

  useEffect(() => {
    const sound = soundRef.current;
    if (!sound) return;

    if (isBackgroundMusicPlaying) {
      sound.play();
    } else {
      sound.pause();
    }
  }, [isBackgroundMusicPlaying]);
};
