import { useContext, useEffect } from 'react';
import { AppContext } from 'providers/AppContextProvider';
import { Howl } from 'howler';

export const useDrumSounds = (setIsLoading, setIsError) => {
  const { isStickMode, selectedDrum, setAudioBuffer } = useContext(AppContext);

  useEffect(() => {
    // Определяем платформу
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

    const useSticks = isStickMode && selectedDrum.notesStick;
    const centerNote = useSticks
      ? selectedDrum.centerNoteStick
      : selectedDrum.centerNote;
    const localBuffer = {};
    let loaded = 0;

    const notes = useSticks ? selectedDrum.notesStick : selectedDrum.notes;
    const soundsPerNote = selectedDrum.hasEffects ? 2 : 1;
    const totalToLoad = notes.length * soundsPerNote + 1 + (centerNote ? 1 : 0);

    const loadSound = (key, url) => {
      const sound = new Howl({
        src: [url],
        format: ['mp3'],
        html5: isIOS,
        onload: () => {
          localBuffer[key] = sound;
          loaded++;
          if (loaded === totalToLoad) {
            setAudioBuffer(localBuffer);
            setIsLoading(false);
          }
        },
        onloaderror: (_, err) => {
          console.error(`Error loading ${key}:`, err);
          setIsError(true);
        },
        onerror: () => setIsError(true),
      });
    };

    const baseUrl = `https://storage.googleapis.com/rav_app_bucket/soundsMP3/${selectedDrum.key}`;

    // Центр
    if (centerNote) {
      loadSound(centerNote.key, `${baseUrl}/${centerNote.key}.mp3`);
    }

    // DEMO
    loadSound('DEMO', `${baseUrl}/DEMO.mp3`);

    // Все ноты
    notes.forEach(note => {
      loadSound(note.key, `${baseUrl}/${note.key}.mp3`);
      if (selectedDrum.hasEffects) {
        loadSound(`${note.key}E`, `${baseUrl}/${note.key}E.mp3`);
      }
    });
  }, [selectedDrum, isStickMode]);
};
