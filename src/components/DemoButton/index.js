import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { useAudioPlayer } from 'shared/libs/hooks/useAudioPlayer/useAudioPlayer';
import { TITLES } from 'constants/titles';
import { breakpoints } from 'styles';
import { ReactComponent as StopIcon } from 'assets/stop.svg';
import { ReactComponent as PlayIcon } from 'assets/play.svg';
import { Button } from '../';

const DemoButton = ({ cx }) => {
  const { language, isDemoPlaying } = useContext(AppContext);

  const { toggleDemo } = useAudioPlayer();

  const titles = TITLES[language];

  return (
    <Button
      dark
      cx={[
        css`
          width: 100%;
        `,
        cx,
      ]}
      onClick={toggleDemo}
    >
      {isDemoPlaying ? titles.stop : titles.play}
      {isDemoPlaying ? (
        <StopIcon
          css={css`
            margin-left: 12px;

            @media (max-width: ${breakpoints.mobile}) {
              width: 3.2vw;
              height: 3.2vw;
              min-width: 22px;
              min-height: 22px;
            }
          `}
        />
      ) : (
        <PlayIcon
          css={css`
            margin-left: 12px;

            @media (max-width: ${breakpoints.mobile}) {
              width: 3.2vw;
              height: 3.2vw;
              min-width: 22px;
              min-height: 22px;
            }
          `}
        />
      )}
    </Button>
  );
};

DemoButton.propTypes = {
  cx: PropTypes.string,
};

export default React.memo(DemoButton);
