/* eslint-disable max-len */
import React from 'react';
import Switch from 'react-switch';
import { css } from '@emotion/core';

import { ReactComponent as PlayIcon } from 'assets/play.svg';
import { ReactComponent as StopIcon } from 'assets/stop.svg';
import { ReactComponent as MoreIcon } from 'assets/more.svg';

import Drum9 from 'assets/drum9.svg';
import Drum9P from 'assets/drum9P.svg';
import Drum10 from 'assets/drum10.svg';
import Drum11 from 'assets/drum11.svg';
import Drum12 from 'assets/drum12.svg';
import Drum13 from 'assets/drum13.svg';
import Drum14 from 'assets/drum14.svg';
import { DrumContext } from 'containers/CardContainer';
import {
  Caption,
  Button,
  Title,
  Body,
  Combination,
  OverlayMenu,
  Drum,
} from 'components';
import { colors, breakpoints } from 'styles';


const selectDrumImage = (type) => {
  if (type === '9') {
    return Drum9;
  }
  if (type === '10') {
    return Drum10;
  }
  if (type === '9P') {
    return Drum9P;
  }
  if (type === '12') {
    return Drum12;
  }
  if (type === '13') {
    return Drum13;
  }
  if (type === '14') {
    return Drum14;
  }
  return Drum11;
};

const CardMobile = () => {
  const onMenuClose = () => {
    window.scrollTo(0, 0);
  };

  const {
    demoIsPlaying,
    toggleDemo,
    drum,
    selectDrum,
    isRu,
    hasSticksMode,
    sticksMode,
    setSticksMode,
  } = React.useContext(DrumContext);

  const getTitles = React.useCallback(() => {
    if (isRu) {
      return {
        play: 'Прослушать Демо',
        stop: 'Остановить Демо',
        learnMore: 'Узнать больше',
        select: 'Выбрать Модель',
        combines: 'Хорошо комбинирует с',
      };
    }

    return {
      play: 'Play Demo',
      stop: 'Stop Demo',
      learnMore: 'Learn more',
      select: 'Select Model',
      combines: 'Combines well with',
    };
  }, [isRu]);

  const titles = getTitles();

  return (
    <div
      css={css`
        flex: 1;
        display: flex;
        flex-direction: column;
        position: relative;
        min-height: 100vh;
      `}
    >
      <OverlayMenu onMenuClose={onMenuClose}>
        {({ openMenu }) => {
          const drumImage = selectDrumImage(drum.type);
          return (
            <>
              <div
                css={css`
                  padding: 12px 12px 12px 16px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex-direction: column;
                    margin-right: 8px;
                  `}
                >
                  <Title>{drum.title}</Title>
                  <Caption>{drum.notesString}</Caption>
                </div>
                <Button
                  outline
                  cx={css`
                    padding: 0 12px;
                    white-space: nowrap;
                  `}
                  onClick={() => {
                    if (demoIsPlaying) {
                      toggleDemo();
                    }
                    openMenu();
                  }}
                >
                  <MoreIcon
                    css={css`
                      margin-right: 12px;
                      white-space: nowrap;
                    `}
                  />
                  {titles.select}
                </Button>
              </div>
              <div
                css={css`
                  display: flex;
                  flex-direction: column;
                  padding: 16px;
                `}
              >
                <Body>{isRu ? drum.descriptionRu : drum.description}</Body>
              </div>

              <div
                css={css`
                  display: flex;
                  flex: 1;
                  justify-content: center;
                  flex-direction: column;
                `}
              >
                <div
                  css={css`
                    display: flex;
                    flex: 1;
                    justify-content: center;
                    align-items: center;
                  `}
                >
                  <Drum drum={drum} src={drumImage} />
                </div>
                {hasSticksMode && (
                  <div
                    css={css`
                      display: flex;
                      flex: 1;
                      justify-content: center;
                      align-items: center;
                    `}
                  >
                    <Switch
                      onChange={() => {
                        setSticksMode(!sticksMode);
                      }}
                      checked={sticksMode}
                    />
                  </div>
                )}
                <div
                  css={css`
                    display: flex;
                    padding: 16px;
                    flex-direction: row;
                  `}
                >
                  <Button
                    dark
                    cx={css`
                      margin-right: 8px;
                      width: 100%;
                    `}
                    onClick={toggleDemo}
                  >
                    {demoIsPlaying ? titles.stop : titles.play}
                    {demoIsPlaying ? (
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
                  <Button
                    cx={css`
                      width: 100%;
                      margin-left: 8px;
                    `}
                    outline
                    onClick={() => window.open(drum.link)}
                  >
                    {titles.learnMore}
                  </Button>
                </div>
              </div>

              <div
                css={css`
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  padding: 8px 0;
                  border-top: solid 1px ${colors.dark.border};
                `}
              >
                <Combination
                  drums={drum.combinesWith}
                  title={titles.combines}
                  selectDrum={selectDrum}
                  demoIsPlaying={demoIsPlaying}
                  toggleDemo={toggleDemo}
                />
              </div>
            </>
          );
        }}
      </OverlayMenu>
    </div>
  );
};

export default CardMobile;
