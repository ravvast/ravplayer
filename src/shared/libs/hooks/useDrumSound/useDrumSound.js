import { useContext, useEffect } from 'react';
import { AppContext } from 'providers/AppContextProvider';
import { audioContext } from '../../audioContext/audioContext';

export const useDrumSounds = (setIsLoading, setIsError) => {
  const { isStickMode, selectedDrum, setAudioBuffer } = useContext(AppContext);

  useEffect(() => {
    const useSticks = isStickMode && selectedDrum.notesStick;
    const localBuffer = {};
    let loaded = 0;

    const totalToLoad = selectedDrum.notes.length + 2;

    const loadSound = (key, url) => {
      const request = new XMLHttpRequest();
      request.open('get', url, true);
      request.responseType = 'arraybuffer';
      request.timeout = 20000;
      request.onload = () => {
        audioContext.decodeAudioData(request.response, buffer => {
          localBuffer[key] = buffer;
          loaded++;
          if (loaded === totalToLoad) {
            setAudioBuffer(localBuffer);
            setIsLoading(false);
          }
        });
      };
      request.onerror = () => setIsError(true);
      request.ontimeout = () => setIsError(true);
      request.send();
    };

    const baseUrl = `https://storage.googleapis.com/rav_app_bucket/soundsMP3/${selectedDrum.key}`;

    // Центр
    const centerKey = useSticks
      ? selectedDrum.centerNoteStick.key
      : selectedDrum.centerNote.key;
    loadSound(centerKey, `${baseUrl}/${centerKey}.mp3`);

    // DEMO
    loadSound('DEMO', `${baseUrl}/DEMO.mp3`);

    // Все ноты
    const notes = useSticks ? selectedDrum.notesStick : selectedDrum.notes;
    notes.forEach(note => {
      loadSound(note.key, `${baseUrl}/${note.key}.mp3`);
    });
  }, [selectedDrum, isStickMode]);
};
