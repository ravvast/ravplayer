import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { useAudioPlayer } from 'shared/libs/hooks/useAudioPlayer/useAudioPlayer';
import { TITLES } from 'constants/titles';
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
import colors from 'styles/colors';
import { ReactComponent as MoreIcon } from 'assets/more.svg';
import { ReactComponent as PlayIcon } from 'assets/play.svg';
import { ReactComponent as StopIcon } from 'assets/stop.svg';

const Card = () => {
  const {
    language,
    selectedDrum,
    setSelectedDrum,
    isDemoPlaying,
    isStickMode,
    setIsStickMode,
  } = useContext(AppContext);

  const { toggleDemo } = useAudioPlayer();

  const hasSticksMode = !!(
    selectedDrum.notesStick && selectedDrum.notesStick.length > 0
  );

  const titles = TITLES[language];

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
        {({ openMenu }) => (
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
                  <Title>{selectedDrum.title}</Title>
                  <Caption>{selectedDrum.notesString}</Caption>
                </div>
                <Button
                  outline
                  cx={css`
                    padding: 0 12px;
                    white-space: nowrap;
                  `}
                  onClick={() => {
                    if (isDemoPlaying) {
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
                  {language === 'ru'
                    ? selectedDrum.descriptionRu
                    : selectedDrum.description}
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
                  <Button
                    cx={css`
                      width: 50%;
                    `}
                    outline
                    onClick={() => window.open(selectedDrum.link)}
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
                  drums={selectedDrum.combinesWith}
                  title={titles.combines}
                  selectDrum={setSelectedDrum}
                  demoIsPlaying={isDemoPlaying}
                  toggleDemo={toggleDemo}
                />
              </div>
            </div>
          </div>
        )}
      </OverlayMenu>
    </div>
  );
};

export default Card;
