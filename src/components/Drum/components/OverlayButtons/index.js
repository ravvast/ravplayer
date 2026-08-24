import React, { useContext, useEffect, useState } from 'react';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { useResizeEvent } from 'effects';
import { useAudioPlayer } from 'shared/libs/hooks/useAudioPlayer/useAudioPlayer';
import { getLegacySize } from 'shared/libs/getLegacySize/getLegacySize';
import Button from '../Button';
import KaraokeHint from '../KaraokeHint';

const OverlayButtons = () => {
  const {
    selectedDrum,
    isDemoPlaying,
    isKaraokePlaying,
    selectedKaraokeSequence,
    karaokeStepDuration,
  } = useContext(AppContext);

  const { playSound } = useAudioPlayer();

  const innerWidth = useResizeEvent();

  const isPan = selectedDrum.type === '11' || selectedDrum.type === '9P';
  const isLegacySize = getLegacySize();

  const [buttonWidth, setButtonWidth] = useState(80);
  const [bigButtonWidth, setBigButtonWidth] = useState(100);
  const [drumWidth, setDrumWidth] = useState(isPan ? 348 : 312);

  React.useEffect(() => {
    if (isLegacySize) {
      if (innerWidth >= 768 && innerWidth < 960) {
        setButtonWidth(100);
        setBigButtonWidth(120);
        setDrumWidth(400);
      } else {
        setButtonWidth(80);
        setBigButtonWidth(100);
        setDrumWidth(312);
      }
    } else if (innerWidth < 768) {
      setButtonWidth(80);
      setBigButtonWidth(100);
      setDrumWidth(Math.round(innerWidth * 0.9));
    } else if (innerWidth >= 768 && innerWidth < 960) {
      setButtonWidth(100);
      setBigButtonWidth(120);
      setDrumWidth(Math.round(innerWidth * 0.8));
    } else {
      setButtonWidth(80);
      setBigButtonWidth(100);
      setDrumWidth(312);
    }
  }, [innerWidth, selectedDrum, isLegacySize]);

  const centerButtonX = (drumWidth - bigButtonWidth) / 2;
  const centerButtonY = (drumWidth - bigButtonWidth) / 2;

  const getDrumRadius = delta => drumWidth / delta;
  const getRadians = angle => (Math.PI * angle) / 180;
  const getXCoordinate = (delta, angle) =>
    centerButtonX + getDrumRadius(delta) * Math.cos(getRadians(angle));
  const getYCoordinate = (delta, angle) =>
    centerButtonY - getDrumRadius(delta) * Math.sin(getRadians(angle));

  const { karaokeChords } = selectedDrum;
  const karaokeChordsList = (selectedKaraokeSequence
    && selectedKaraokeSequence.chords) || [];

  const [karaokeIndex, setKaraokeIndex] = useState(0);
  const [karaokeFlightId, setKaraokeFlightId] = useState(0);
  const karaokeIndexRef = React.useRef(0);

  useEffect(() => {
    if (!isKaraokePlaying || !karaokeChords || karaokeChordsList.length === 0) {
      return undefined;
    }

    karaokeIndexRef.current = 0;
    setKaraokeIndex(0);
    setKaraokeFlightId(id => id + 1);

    const interval = setInterval(() => {
      karaokeIndexRef.current =
        (karaokeIndexRef.current + 1) % karaokeChordsList.length;
      setKaraokeIndex(karaokeIndexRef.current);
      setKaraokeFlightId(id => id + 1);
    }, karaokeStepDuration);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isKaraokePlaying, karaokeChords, karaokeChordsList, karaokeStepDuration]);

  let karaokeHint = null;
  if (isKaraokePlaying && karaokeChords && karaokeChordsList.length > 0) {
    const activeChord = karaokeChordsList[karaokeIndex];
    const activeNote = selectedDrum.notes.find(
      note => note.key === karaokeChords[activeChord],
    );

    if (activeNote) {
      const hintSize = Math.round(buttonWidth * 0.4);
      const targetTop =
        getXCoordinate(activeNote.delta, activeNote.angle) +
        buttonWidth / 2 -
        hintSize / 2;
      const targetLeft =
        getYCoordinate(activeNote.delta, activeNote.angle) +
        buttonWidth / 2 -
        hintSize / 2;
      const edgeRadius = (drumWidth / 2) * 0.92;
      const radians = getRadians(activeNote.angle);
      const startTop =
        drumWidth / 2 + edgeRadius * Math.cos(radians) - hintSize / 2;
      const startLeft =
        drumWidth / 2 - edgeRadius * Math.sin(radians) - hintSize / 2;

      karaokeHint = (
        <KaraokeHint
          flightKey={karaokeFlightId}
          size={hintSize}
          color={activeNote.color}
          startTop={startTop}
          startLeft={startLeft}
          endTop={targetTop}
          endLeft={targetLeft}
          duration={karaokeStepDuration}
        />
      );
    }
  }

  return (
    <div
      css={css`
        width: ${drumWidth}px;
        height: ${drumWidth}px;
        position: absolute;
        border-radius: 1000px;
      `}
    >
      {selectedDrum.centerNote && (
      <Button
        width={bigButtonWidth}
        top={centerButtonY}
        left={centerButtonX}
        color={selectedDrum.centerNote.color}
        demoIsPlaying={isDemoPlaying}
        playSound={() => playSound(selectedDrum.centerNote.key)}
      >
        {selectedDrum.centerNote.name}
      </Button>
      )}
      {selectedDrum.notes.map(object => (
        <Button
          key={object.key}
          width={buttonWidth}
          color={object.color}
          labelColor={object.labelColor}
          demoIsPlaying={isDemoPlaying}
          playSound={() => playSound(object.key)}
          top={getXCoordinate(object.delta, object.angle)}
          left={getYCoordinate(object.delta, object.angle)}
        >
          {object.name}
        </Button>
      ))}
      {karaokeHint}
    </div>
  );
};

export default React.memo(OverlayButtons);
