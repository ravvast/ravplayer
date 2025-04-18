import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { TITLES } from 'constants/titles';
import { DrumContext } from 'containers/CardContainer';
import { breakpoints, colors } from 'styles';
import { ReactComponent as StopIcon } from 'assets/stop.svg';
import { ReactComponent as PlayIcon } from 'assets/play.svg';
import { Drum, Button, ModeSwitch, Title, Caption } from '../';

const SimpleDrum = ({ drumImage }) => {
  const {
    demoIsPlaying,
    toggleDemo,
    drum,
    sticksMode,
    hasSticksMode,
    setSticksMode,
  } = useContext(DrumContext);
  const { language } = useContext(AppContext);

  const titles = TITLES[language];

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
          <Drum drum={drum} src={drumImage} />
          {hasSticksMode && (
            <ModeSwitch
              onChange={() => {
                setSticksMode(!sticksMode);
              }}
              checked={sticksMode}
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
          <Title>{drum.title}</Title>
          <Caption>{drum.notesString}</Caption>
        </div>
        <Button
          dark
          cx={css`
            width: 100%;
          `}
          onClick={toggleDemo}
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
    </div>
  );
};

SimpleDrum.propTypes = {
  drumImage: PropTypes.string,
};

export default React.memo(SimpleDrum);
