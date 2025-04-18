import React, { useState } from 'react';
import { css } from '@emotion/core';
import { useAppContext } from 'providers/AppContextProvider';
import { useResizeEvent } from 'effects';
import { useAudioPlayer } from 'shared/libs/hooks/useAudioPlayer/useAudioPlayer';
import Button from '../Button';

const OverlayButtons = () => {
  const { selectedDrum, isDemoPlaying } = useAppContext();

  const { playSound } = useAudioPlayer();

  const innerWidth = useResizeEvent();

  const isPan = selectedDrum.type === '11' || selectedDrum.type === '9P';
  const isMoon = selectedDrum.type === '14';

  const [buttonWidth, setButtonWidth] = useState(80);
  const [bigButtonWidth, setBigButtonWidth] = useState(100);
  const [drumWidth, setDrumWidth] = useState(isPan ? 348 : 312);

  React.useEffect(() => {
    if (innerWidth >= 768 && innerWidth < 960) {
      setButtonWidth(100);
      setBigButtonWidth(120);
      setDrumWidth(400);
    }
    if (innerWidth < 768 || innerWidth >= 960) {
      setButtonWidth(80);
      setBigButtonWidth(100);
      setDrumWidth(312);
    }
  }, [innerWidth, selectedDrum]);

  const centerButtonX = (drumWidth - bigButtonWidth) / 2;
  const centerButtonY = (drumWidth - bigButtonWidth) / 2;

  const getDrumRadius = delta => drumWidth / delta;
  const getRadians = angle => (Math.PI * angle) / 180;
  const getXCoordinate = (delta, angle) =>
    centerButtonX + getDrumRadius(delta) * Math.cos(getRadians(angle));
  const getYCoordinate = (delta, angle) =>
    centerButtonY - getDrumRadius(delta) * Math.sin(getRadians(angle));

  const centerButtonRef = React.useRef();
  const buttonsRefs = React.useRef([]);

  const setButtonRef = id => ref => {
    if (!buttonsRefs.current) {
      buttonsRefs.current = [];
    }
    buttonsRefs.current[id] = ref;
  };

  return (
    <div
      css={css`
        width: ${drumWidth}px;
        height: ${drumWidth}px;
        position: absolute;
        border-radius: 1000px;
      `}
    >
      <Button
        width={bigButtonWidth}
        top={centerButtonY}
        left={centerButtonX}
        color={selectedDrum.centerNote.color}
        ref={centerButtonRef}
        demoIsPlaying={isDemoPlaying}
        playSound={() => playSound(selectedDrum.centerNote.key)}
        isMoon={isMoon}
      >
        {selectedDrum.centerNote.name}
      </Button>
      {selectedDrum.notes.map(object => (
        <Button
          key={object.key}
          width={buttonWidth}
          color={object.color}
          demoIsPlaying={isDemoPlaying}
          ref={setButtonRef(object.key)}
          playSound={() => playSound(object.key)}
          top={getXCoordinate(object.delta, object.angle)}
          left={getYCoordinate(object.delta, object.angle)}
          isMoon={isMoon}
        >
          {object.name}
        </Button>
      ))}
    </div>
  );
};

export default React.memo(OverlayButtons);
