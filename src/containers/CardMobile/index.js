/* eslint-disable max-len */
import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { getDrumImage } from 'utils/getDrumImage';
import { TITLES } from 'constants/titles';
import { DrumContext } from 'containers/CardContainer';
import {
  Caption,
  Button,
  Title,
  Body,
  Combination,
  OverlayMenu,
  Drum,
  ModeSwitch,
} from 'components';
import { colors, breakpoints } from 'styles';
import { ReactComponent as PlayIcon } from 'assets/play.svg';
import { ReactComponent as StopIcon } from 'assets/stop.svg';
import { ReactComponent as MoreIcon } from 'assets/more.svg';

const CardMobile = () => {
  const onMenuClose = () => {
    window.scrollTo(0, 0);
  };

  const {
    demoIsPlaying,
    toggleDemo,
    drum,
    selectDrum,
    hasSticksMode,
    sticksMode,
    setSticksMode,
  } = useContext(DrumContext);
  const { language } = useContext(AppContext);

  const titles = TITLES[language];

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
          const drumImage = getDrumImage(drum.type);

          return (
            <>
              <div
                css={css`
                  margin-bottom: 28px;
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                `}
              >
                {
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
                }
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
                  margin-bottom: 16px;
                `}
              >
                <Body>
                  {language === 'ru' ? drum.descriptionRu : drum.description}
                </Body>
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
                    display: flex;
                    margin: 16px 0;
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
                  padding: 16px 0 12px;
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
