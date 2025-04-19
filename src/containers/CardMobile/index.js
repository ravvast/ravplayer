import React, { useContext } from 'react';
import { css } from '@emotion/core';
import { AppContext } from 'providers/AppContextProvider';
import { useAudioPlayer } from 'shared/libs/hooks/useAudioPlayer/useAudioPlayer';
import { TITLES } from 'constants/titles';
import {
  Caption,
  Button,
  Title,
  Combination,
  OverlayMenu,
  Drum,
  ModeSwitch,
  DemoButton,
} from 'components';
import { colors } from 'styles';
import { ReactComponent as MoreIcon } from 'assets/more.svg';

const CardMobile = () => {
  const onMenuClose = () => {
    window.scrollTo(0, 0);
  };

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
        display: flex;
        flex-direction: column;
        position: relative;
        min-height: 100vh;
      `}
    >
      <OverlayMenu onMenuClose={onMenuClose}>
        {({ openMenu }) => (
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
                  <Title>{selectedDrum.title}</Title>
                  <Caption>{selectedDrum.notesString}</Caption>
                </div>
              }
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
                display: flex;
                flex-direction: column;
                margin-bottom: 16px;
              `}
            >
              <p>
                {language === 'ru'
                  ? selectedDrum.descriptionRu
                  : selectedDrum.description}
              </p>
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
                  display: flex;
                  margin: 16px 0;
                  flex-direction: row;
                  gap: 16px;
                `}
              >
                <DemoButton />
                <Button
                  cx={css`
                    width: 100%;
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
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 16px 0 12px;
                border-top: solid 1px ${colors.dark.border};
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
          </>
        )}
      </OverlayMenu>
    </div>
  );
};

export default CardMobile;
