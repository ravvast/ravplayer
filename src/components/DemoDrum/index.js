import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { TITLES } from 'constants/titles';
import { DrumContext } from 'containers/CardContainer';
import { breakpoints } from 'styles';
import { ReactComponent as StopIcon } from 'assets/stop.svg';
import { ReactComponent as PlayIcon } from 'assets/play.svg';
import { Drum, Button } from '../';

const DemoDrum = ({ drumImage }) => {
  const { demoIsPlaying, toggleDemo, drum } = useContext(DrumContext);
  const { language } = useContext(AppContext);

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
        <Drum drum={drum} src={drumImage} />
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
        {demoIsPlaying ? titles.stop : titles.play}
        {demoIsPlaying ? (
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

DemoDrum.propTypes = {
  drumImage: PropTypes.string,
};

export default React.memo(DemoDrum);
