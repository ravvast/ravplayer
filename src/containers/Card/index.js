/* eslint-disable max-len */
import React from "react";
import { css } from "@emotion/core";
import { getDrumImage } from "utils/getDrumImage";
import { TITLES } from "constants/titles";
import { DrumContext } from "containers/CardContainer";
import {
  Button,
  Caption,
  Drum,
  Title,
  Body,
  Combination,
  OverlayMenu,
  ModeSwitch,
} from "components";
import colors from "styles/colors";
import { ReactComponent as MoreIcon } from "assets/more.svg";
import { ReactComponent as PlayIcon } from "assets/play.svg";
import { ReactComponent as StopIcon } from "assets/stop.svg";

const Card = () => {
  const {
    demoIsPlaying,
    toggleDemo,
    drum,
    selectDrum,
    isRu,
    isSimpleView,
    hasSticksMode,
    sticksMode,
    setSticksMode,
  } = React.useContext(DrumContext);

  const language = isRu ? "ru" : "en";
  const titles = TITLES[language];
  const shouldHideContent = isSimpleView;

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
          const drumImage = getDrumImage(drum.type);

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
                  {!shouldHideContent && (
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
                  )}
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
                  {!shouldHideContent && (
                    <Body
                      cx={css`
                        margin: 0 8px 8px;
                      `}
                    >
                      {isRu ? drum.descriptionRu : drum.description}
                    </Body>
                  )}
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
                        width: ${shouldHideContent ? "100%" : "50%"};
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
                    {!shouldHideContent && (
                      <Button
                        cx={css`
                          width: 50%;
                        `}
                        outline
                        onClick={() => window.open(drum.link)}
                      >
                        {titles.learnMore}
                      </Button>
                    )}
                  </div>
                </div>
                {!shouldHideContent && (
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
                )}
              </div>
            </div>
          );
        }}
      </OverlayMenu>
    </div>
  );
};

export default Card;
