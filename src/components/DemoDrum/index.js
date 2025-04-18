import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { useAudioPlayer } from 'shared/libs/hooks/useAudioPlayer/useAudioPlayer';
import { TITLES } from 'constants/titles';
import { breakpoints } from 'styles';
import { ReactComponent as StopIcon } from 'assets/stop.svg';
import { ReactComponent as PlayIcon } from 'assets/play.svg';
import { Drum, Button } from '../';

const DemoDrum = () => {
  const { language, isDemoPlaying } = useContext(AppContext);

  const { toggleDemo } = useAudioPlayer();

  const titles = TITLES[language];

  return (
    <div
      css={css`
        height: 100%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 30px;
      `}
    >
      <div
        css={css`
          @media (max-width: ${breakpoints.mobile}) {
            height: 100%;
            display: flex;
            align-items: center;
          }
        `}
      >
        <Drum />
      </div>
      <Button
        dark
        onClick={toggleDemo}
        cx={css`
          max-width: 312px;
          width: 100%;

          @media (max-width: ${breakpoints.mobile}) {
            max-width: none;
          }
        `}
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
  );
};

export default React.memo(DemoDrum);
