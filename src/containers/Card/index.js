/* eslint-disable max-len */
import React from 'react';
import { css } from '@emotion/core';

import { ReactComponent as MoreIcon } from 'assets/more.svg';
import { ReactComponent as PlayIcon } from 'assets/play.svg';
import { ReactComponent as StopIcon } from 'assets/stop.svg';
import { DrumContext } from 'containers/CardContainer';
import Drum9 from 'assets/drum9.svg';
import Drum9P from 'assets/drum9P.svg';
import Drum10 from 'assets/drum10.svg';
import Drum11 from 'assets/drum11.svg';
import Drum12 from 'assets/drum12.svg';
import Drum13 from 'assets/drum13.svg';
import Drum14 from 'assets/drum14.svg';
import colors from 'styles/colors';


import {
  Button,
  Caption,
  Drum,
  Title,
  Body,
  Combination,
  OverlayMenu,
  ModeSwitch,
} from 'components';


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

const Card = () => {
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
        height: 100%;
        display: flex;
        position: relative;
      `}
    >
      <OverlayMenu>
        {({ openMenu }) => {
          const drumImage = selectDrumImage(drum.type);

          return (
            <div
              css={css`
                flex: 1;
                display: flex;
              `}
            >
              <div
                css={css`
                  display: flex;
                  flex: 0.45;
                  flex-direction: column;
                  border-right: solid 1px ${colors.dark.border};
                `}
              >
                <div
                  css={css`
                    flex: 1;
                    display: flex;
                    justify-content: center;
                    align-items: center;
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
              </div>
              <div
                css={css`
                  display: flex;
                  flex: 0.55;
                  flex-direction: column;
                `}
              >
                <div
                  css={css`
                    padding: 32px 16px 8px 24px;
                    display: flex;
                    justify-content: space-between;
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
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    padding: 0px 16px 8px 16px;
                  `}
                >
                  <Body
                    cx={css`
                      margin: 0 8px 8px;
                    `}
                  >
                    {isRu ? drum.descriptionRu : drum.description}
                  </Body>
                  <div
                    css={css`
                      flex: 1;
                      display: flex;
                      flex-direction: row;
                      justify-content: space-between;
                      margin: 8px 8px 0;
                      gap: 12px;
                    `}
                  >
                    <Button
                      dark
                      cx={css`
                        width: 50%;
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
                    <Button
                      cx={css`
                        width: 50%;
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
                    border-top: solid 1px ${colors.dark.border};
                    display: flex;
                    justify-content: center;
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
              </div>
            </div>
          );
        }}
      </OverlayMenu>
    </div>
  );
};

export default Card;
