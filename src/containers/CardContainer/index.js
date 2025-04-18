import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { css } from '@emotion/core';
import { getDrumImage } from 'utils/getDrumImage';
import { parseQuery } from 'utils/parseQuery';
import CardMobile from 'containers/CardMobile';
import Card from 'containers/Card';
import { Loader, MinimalDrum, DemoDrum, SimpleDrum, Error } from 'components';
import drums from 'content/drums';
import { useResizeEvent } from 'effects';
import { breakpoints, colors } from 'styles';
import context from './audioContext';

const DRUMS_AMOUNT = 36;

export const DrumContext = createContext();

const getId = asPath => {
  const number = parseQuery(asPath).id;

  if (number >= 0 && number <= DRUMS_AMOUNT) {
    return number;
  }
  return 0;
};

const checkSimpleView = asPath => parseQuery(asPath).simpleView === 'true';
const checkMinimalView = asPath => parseQuery(asPath).minimalView === 'true';
const checkDemoView = asPath => parseQuery(asPath).demoView === 'true';

const CardContainer = () => {
  const id = getId(document.location.href);
  const isSimpleView = checkSimpleView(document.location.href);
  const isMinimalView = checkMinimalView(document.location.href);
  const isDemoView = checkDemoView(document.location.href);
  const [selectedDrum, selectDrum] = useState(drums[id]);
  const [demoIsPlaying, setDemoStatus] = useState(false);
  const [audioBuffer, setAudioBuffer] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [currentDemoSource, setCurrentDemoSource] = useState(null);
  const [sticksMode, setSticksMode] = useState(false);
  const [audioContextReady, setAudioContextReady] = useState(false);

  const pendingSoundRef = useRef(null);
  const { audioContext } = useContext(context);

  const hasSticksMode = !!(
    selectedDrum.notesStick && selectedDrum.notesStick.length > 0
  );

  const toggleDemo = () => {
    if (demoIsPlaying && currentDemoSource) {
      currentDemoSource.stop();
      setCurrentDemoSource(null);
    }
    setDemoStatus(!demoIsPlaying);
  };

  const playSoundInternal = (key, onEnded) => {
    const buffer = audioBuffer[key];
    if (!buffer) return;

    const source = audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(audioContext.destination);
    source.start(0);
    if (key === 'DEMO') {
      setCurrentDemoSource(source);
    }
    if (onEnded) {
      source.addEventListener('ended', () => onEnded());
    }
  };

  const handleFirstUserInteraction = (soundKey, onEnded) => {
    if (audioContext.state === 'suspended') {
      audioContext.resume().then(() => {
        setAudioContextReady(true);
        if (soundKey) {
          playSoundInternal(soundKey, onEnded);
        }
      });
    } else {
      setAudioContextReady(true);
    }
  };

  const playSound = (key, onEnded) => {
    if (!audioContextReady) {
      pendingSoundRef.current = { key, onEnded };
      handleFirstUserInteraction(key, onEnded);
      return;
    }
    playSoundInternal(key, onEnded);
  };

  const renderDrumContent = content => {
    if (isMinimalView) {
      return <MinimalDrum drumImage={getDrumImage(selectedDrum.type)} />;
    }

    if (isDemoView) {
      return <DemoDrum drumImage={getDrumImage(selectedDrum.type)} />;
    }

    if (isSimpleView) {
      return <SimpleDrum drumImage={getDrumImage(selectedDrum.type)} />;
    }

    return (
      <div
        css={css`
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;

          @media (min-width: ${breakpoints.mobile}) {
            min-height: auto;
            height: 536px;
            border: solid 1px ${colors.dark.border};
            width: 960px;
          }
        `}
      >
        {content}
      </div>
    );
  };

  useEffect(() => {
    const handleInteraction = () => {
      if (!audioContextReady && pendingSoundRef.current) {
        handleFirstUserInteraction(
          pendingSoundRef.current.key,
          pendingSoundRef.current.onEnded,
        );
      }
    };

    window.addEventListener('click', handleInteraction, { once: true });
    return () => window.removeEventListener('click', handleInteraction);
  }, [audioContextReady]);

  useEffect(() => {
    const useSticksData = sticksMode && !!selectedDrum.notesStick;

    // eslint-disable-next-line prefer-const
    let localBuffer = {};
    let preloadedCounter = 0;

    const onAudioLoad = (key, buffer) => {
      preloadedCounter++;
      localBuffer[key] = buffer;
      if (preloadedCounter === selectedDrum.notes.length + 2) {
        setAudioBuffer(localBuffer);
        setIsLoading(false);
      }
    };

    const centerNoterequest = new XMLHttpRequest();
    centerNoterequest.open(
      'get',
      `https://storage.googleapis.com/rav_app_bucket/soundsMP3/${
        selectedDrum.key
      }/${
        useSticksData
          ? selectedDrum.centerNoteStick.key
          : selectedDrum.centerNote.key
      }.mp3`,
      true,
    );
    centerNoterequest.responseType = 'arraybuffer';
    centerNoterequest.timeout = 20000;
    centerNoterequest.onload = () => {
      audioContext.decodeAudioData(centerNoterequest.response, buffer => {
        onAudioLoad(selectedDrum.centerNote.key, buffer);
      });
    };
    centerNoterequest.onerror = () => {
      setIsError(true);
    };
    centerNoterequest.ontimeout = () => {
      setIsError(true);
    };
    centerNoterequest.send();

    const demoRequest = new XMLHttpRequest();
    demoRequest.open(
      'get',
      `https://storage.googleapis.com/rav_app_bucket/soundsMP3/${selectedDrum.key}/DEMO.mp3`,
      true,
    );
    demoRequest.responseType = 'arraybuffer';
    demoRequest.timeout = 20000;
    demoRequest.onload = () => {
      audioContext.decodeAudioData(demoRequest.response, buffer => {
        onAudioLoad('DEMO', buffer);
      });
    };
    demoRequest.onerror = () => {
      setIsError(true);
    };
    demoRequest.ontimeout = () => {
      setIsError(true);
    };
    demoRequest.send();

    for (let i = 0; i <= selectedDrum.notes.length - 1; i += 1) {
      const request = new XMLHttpRequest();
      request.open(
        'get',
        `https://storage.googleapis.com/rav_app_bucket/soundsMP3/${
          selectedDrum.key
        }/${
          useSticksData
            ? selectedDrum.notesStick[i].key
            : selectedDrum.notes[i].key
        }.mp3`,
        true,
      );
      request.responseType = 'arraybuffer';
      request.timeout = 20000;
      request.onload = event => {
        if (event.target.status === 200) {
          audioContext.decodeAudioData(request.response, buffer => {
            onAudioLoad(selectedDrum.notes[i].key, buffer);
          });
        } else {
          setIsError(true);
        }
      };
      request.onerror = () => {
        setIsError(true);
      };
      request.ontimeout = () => {
        setIsError(true);
      };
      request.send();
    }
  }, [selectedDrum, sticksMode]);
  const innerWidth = useResizeEvent();

  let content;

  if (innerWidth >= 960) {
    content = <Card />;
  } else {
    content = <CardMobile />;
  }

  if (isLoading) return <Loader />;

  if (isError) return <Error />;

  return (
    <DrumContext.Provider
      value={{
        demoIsPlaying,
        toggleDemo,
        drum: selectedDrum,
        selectDrum,
        playSound,
        hasSticksMode,
        sticksMode,
        setSticksMode,
      }}
    >
      {renderDrumContent(content)}
    </DrumContext.Provider>
  );
};

export default CardContainer;
