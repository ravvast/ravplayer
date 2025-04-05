import React from 'react';
import { css } from '@emotion/core';
import qs from 'query-string';

import CardMobile from 'containers/CardMobile';
import Card from 'containers/Card';
import { Loader, Body, Button } from 'components';
import drums from 'content/drums';
import { useResizeEvent } from 'effects';
import { breakpoints, colors } from 'styles';

import context from './audioContext';

const DRUMS_AMOUNT = 36;

export const DrumContext = React.createContext();

const parseQuery = asPath => qs.parse(qs.extract(asPath), {
  arrayFormat: 'comma',
});

const getId = (asPath) => {
  const number = parseQuery(asPath).id;

  if (number >= 0 && number <= DRUMS_AMOUNT) {
    return number;
  }
  return 0;
};

const checkRuLanguage = (asPath) => {
  const languageKey = parseQuery(asPath).language;

  if (languageKey === 'ru') {
    return true;
  }
  return false;
};

const checkSimpleView = asPath => parseQuery(asPath).simpleView === 'true';

// eslint-disable-next-line react/prop-types
const CardContainer = () => {
  // eslint-disable-next-line max-len
  const id = getId(document.location.href);
  const isRu = checkRuLanguage(document.location.href);
  const isSimpleView = checkSimpleView(document.location.href);
  const [selectedDrum, selectDrum] = React.useState(drums[id]);
  const [demoIsPlaying, setDemoStatus] = React.useState(false);

  const [audioBuffer, setAudioBuffer] = React.useState({});
  const [preloaded, setPreloadedStatus] = React.useState(false);
  const [hasErrors, setHasErrors] = React.useState(false);

  const [currentDemoSource, setCurrentDemoSource] = React.useState(null);

  const [sticksMode, setSticksMode] = React.useState(false);

  const { audioContext } = React.useContext(context);

  const hasSticksMode = !!(selectedDrum.notesStick && selectedDrum.notesStick.length > 0);

  const toggleDemo = () => {
    if (demoIsPlaying && currentDemoSource) {
      currentDemoSource.stop();
      setCurrentDemoSource(null);
    }
    setDemoStatus(!demoIsPlaying);
  };

  const playSound = (key, onEnded) => {
    const buffer = audioBuffer[key];

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

  React.useEffect(() => {
    setAudioBuffer({});
    setPreloadedStatus(false);
    setHasErrors(false);

    const useSticksData = sticksMode && !!selectedDrum.notesStick;

    // eslint-disable-next-line prefer-const
    let localBuffer = {};
    // eslint-disable-next-line no-unused-vars
    let preloadedCounter = 0;

    const onAudioLoad = (key, buffer) => {
      preloadedCounter++;
      localBuffer[key] = buffer;
      if (preloadedCounter === selectedDrum.notes.length + 2) {
        setAudioBuffer(localBuffer);
        setPreloadedStatus(true);
      }
    };

    const centerNoterequest = new XMLHttpRequest();
    centerNoterequest.open(
      'get',
      `https://storage.googleapis.com/rav_app_bucket/soundsMP3/${selectedDrum.key}/${useSticksData ? selectedDrum.centerNoteStick.key : selectedDrum.centerNote.key}.mp3`,
      true,
    );
    centerNoterequest.responseType = 'arraybuffer';
    centerNoterequest.timeout = 20000;
    centerNoterequest.onload = () => {
      audioContext.decodeAudioData(centerNoterequest.response, (buffer) => {
        onAudioLoad(selectedDrum.centerNote.key, buffer);
      });
    };
    centerNoterequest.onerror = () => {
      setHasErrors(true);
    };
    centerNoterequest.ontimeout = () => {
      setHasErrors(true);
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
      audioContext.decodeAudioData(demoRequest.response, (buffer) => {
        onAudioLoad('DEMO', buffer);
      });
    };
    demoRequest.onerror = () => {
      setHasErrors(true);
    };
    demoRequest.ontimeout = () => {
      setHasErrors(true);
    };
    demoRequest.send();

    for (let i = 0; i <= selectedDrum.notes.length - 1; i += 1) {
      const request = new XMLHttpRequest();
      request.open(
        'get',
        `https://storage.googleapis.com/rav_app_bucket/soundsMP3/${selectedDrum.key}/${useSticksData ? selectedDrum.notesStick[i].key : selectedDrum.notes[i].key}.mp3`,
        true,
      );
      request.responseType = 'arraybuffer';
      request.timeout = 20000;
      request.onload = (event) => {
        if (event.target.status === 200) {
          audioContext.decodeAudioData(request.response, (buffer) => {
            onAudioLoad(selectedDrum.notes[i].key, buffer);
          });
        } else {
          setHasErrors(true);
        }
      };
      request.onerror = () => {
        setHasErrors(true);
      };
      request.ontimeout = () => {
        setHasErrors(true);
      };
      request.send();
    }
  }, [selectedDrum, sticksMode]);
  const innerWidth = useResizeEvent();

  let content = (
    <Loader />
  );

  if (hasErrors) {
    content = (
      <Body
        cx={css`
          text-align: center;
        `}
      >
        Someting went wrong.
        <br />
        Reload or contact with a support team.
        <Button
          outline
          cx={css`
            margin: 24px auto 0 auto;
            padding: 0 24px;
          `}
          onClick={() => window.location.reload()}
        >
          Reload page
        </Button>
      </Body>
    );
  }

  if (!hasErrors && preloaded) {
    if (innerWidth >= 960) {
      content = (
        <Card />
      );
    } else {
      content = (
        <CardMobile />
      );
    }
  }

  return (
    <DrumContext.Provider
      value={{
        demoIsPlaying,
        toggleDemo,
        drum: selectedDrum,
        selectDrum,
        playSound,
        isRu,
        isSimpleView,
        hasSticksMode,
        sticksMode,
        setSticksMode,
      }}
    >
      <div
        css={css`
          min-height: 100vh;
          width: 100vw;
          display: flex;
          justify-content: center;
          align-items: center;
        `}
      >
        <div
          css={css`
            min-height: 100vh;
            width: 100vw;
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
      </div>
    </DrumContext.Provider>
  );
};

export default CardContainer;
