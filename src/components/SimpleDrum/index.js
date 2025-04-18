import React from 'react';
import { css } from '@emotion/core';
import { useAppContext } from 'providers/AppContextProvider';
import { TITLES } from 'constants/titles';
import { breakpoints, colors } from 'styles';
import { ReactComponent as StopIcon } from 'assets/stop.svg';
import { ReactComponent as PlayIcon } from 'assets/play.svg';
import { Drum, Button, ModeSwitch, Title, Caption } from '../';

const SimpleDrum = () => {
  const {
    language,
    selectedDrum,
    isDemoPlaying,
    toggleDemo,
    isStickMode,
    setIsStickMode,
  } = useAppContext();

  const titles = TITLES[language];

  const hasSticksMode = !!(
    selectedDrum.notesStick && selectedDrum.notesStick.length > 0
  );

  return (
    <div
      css={css`
        display: flex;
        height: 536px;
        max-width: 960px;
        width: 100%;
        border: solid 1px ${colors.dark.border};

        @media (max-width: ${breakpoints.mobile}) {
          border: none;
          max-width: none;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 45%;
          height: 100%;
          border-right: solid 1px ${colors.dark.border};
        `}
      >
        <div>
          <Drum />
          {hasSticksMode && (
            <ModeSwitch
              onChange={() => {
                setIsStickMode(!isStickMode);
              }}
              checked={isStickMode}
            />
          )}
        </div>
      </div>
      <div
        css={css`
          width: 55%;
          padding: 32px 24px;
        `}
      >
        <div
          css={css`
            display: flex;
            flex-direction: column;
            margin-bottom: 16px;
          `}
        >
          <Title>{selectedDrum.title}</Title>
          <Caption>{selectedDrum.notesString}</Caption>
        </div>
        <Button
          dark
          cx={css`
            width: 100%;
          `}
          onClick={toggleDemo}
        >
          {isDemoPlaying ? titles.stop : titles.play}
          {isDemoPlaying ? (
            <StopIcon
              css={css`
                margin-left: 12px;
              `}
            />
          ) : (
            <PlayIcon
              css={css`
                margin-left: 12px;
              `}
            />
          )}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(SimpleDrum);
