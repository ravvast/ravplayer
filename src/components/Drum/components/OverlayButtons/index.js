/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';

import { DrumContext } from 'containers/CardContainer';
import { useResizeEvent } from 'effects';

import Button from '../Button';


const OverlayButtons = ({ drum }) => {
  const innerWidth = useResizeEvent();

  const isPan = drum.type === '11' || drum.type === '9P';

  const [buttonWidth, setButtonWidth] = React.useState(80);
  const [bigButtonWidth, setBigButtonWidth] = React.useState(100);
  const [drumWidth, setDrumWidth] = React.useState(isPan ? 348 : 312);

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
  }, [innerWidth, drum]);

  const centerButtonX = (drumWidth - bigButtonWidth) / 2;
  const centerButtonY = (drumWidth - bigButtonWidth) / 2;

  const getDrumRadius = delta => drumWidth / delta;
  const getRadians = angle => Math.PI * angle / 180;
  const getXCoordinate = (delta, angle) => centerButtonX + getDrumRadius(delta) * Math.cos(getRadians(angle));
  const getYCoordinate = (delta, angle) => centerButtonY - getDrumRadius(delta) * Math.sin(getRadians(angle));

  const centerButtonRef = React.useRef();
  const buttonsRefs = React.useRef([]);

  const setButtonRef = id => (ref) => {
    if (!buttonsRefs.current) {
      buttonsRefs.current = [];
    }
    buttonsRefs.current[id] = ref;
  };

  const {
    demoIsPlaying,
    toggleDemo,
    playSound,
  } = React.useContext(DrumContext);


  React.useEffect(() => {
    if (demoIsPlaying) {
      playSound('DEMO', toggleDemo);

      if (drum.demo.length > 0) {
        for (let i = 0; i <= drum.demo.length - 1; i += 1) {
          setTimeout(() => {
            if (drum.demo[i].key === drum.centerNote.key) {
              centerButtonRef.current.animate();
            } else {
              buttonsRefs.current[drum.demo[i].key].animate();
            }
          }, drum.demo[i].delay);
        }
      }
    }
  }, [demoIsPlaying]);

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
        color={drum.centerNote.color}
        ref={centerButtonRef}
        demoIsPlaying={demoIsPlaying}
        playSound={() => playSound(drum.centerNote.key)}
      >
        {drum.centerNote.name}
      </Button>
      {drum.notes.map(object => (
        <Button
          key={object.key}
          width={buttonWidth}
          color={object.color}
          demoIsPlaying={demoIsPlaying}
          ref={setButtonRef(object.key)}
          playSound={() => playSound(object.key)}
          top={getXCoordinate(object.delta, object.angle)}
          left={getYCoordinate(object.delta, object.angle)}
        >
          {object.name}
        </Button>
      ))}
    </div>
  );
};

OverlayButtons.propTypes = {
  drum: PropTypes.any,
};

export default React.memo(OverlayButtons);
